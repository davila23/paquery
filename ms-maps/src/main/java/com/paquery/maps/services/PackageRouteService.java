package com.paquery.maps.services;

import com.paquery.maps.dao.ShippingScheduleDao;
import com.paquery.maps.domain.ShippingAddress;
import com.paquery.maps.domain.ShippingSchedule;
import com.paquery.maps.domain.Zone;
import com.paquery.maps.dto.PackageDto;
import com.paquery.maps.dto.ShippingAddressDto;
import com.paquery.maps.dto.builder.PackageDtoBuilder;
import com.paquery.maps.dto.builder.ShippingSchduleDtoBuilder;
import com.paquery.maps.enums.PackageStatus;
import com.paquery.maps.enums.ScheduleType;
import com.paquery.maps.exception.NotFoundPackageException;
import com.paquery.maps.map.services.MapsService;
import com.paquery.maps.model.Coordenate;
import com.paquery.maps.repositories.PackageRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class PackageRouteService {

    private final static Logger logger = LoggerFactory.getLogger(PackageRouteService.class);

    @Value("${packageRoute.maximumDistancePackage}")
    private Double maximumDistancePackage;

    @Value("${packageRoute.limitDeliveryPackages}")
    private Integer limitDeliveryPackages;

    @Autowired
    private ShippingScheduleDao shippingScheduleDao;

    @Autowired
    private MapsService mapsService;

    @Autowired
    private PackageRepository packageRepository;

    public Set<PackageDto> getPackagesBySimilarDestination(Long id) throws NotFoundPackageException {

        if (!packageRepository.existsById(id))
            throw new NotFoundPackageException("No existe Package con ID: " + id);

        ShippingSchedule shSchedule = shippingScheduleDao.getShippingScheduleByPackageID(id);
        if (shSchedule == null)
            throw new NotFoundPackageException("No se encontro informacion de envio para Package: " + id);


        Optional<Zone> optZone = shSchedule.getDistributionZone().getZones().stream().findFirst();

        if (!optZone.isPresent())
            throw new NotFoundPackageException("No se encontro zona para paquete: " + id);

        // obtengo todos los paquetes con shipping de destino que pertenezcan a la misma zona que el paquete
        // original.
        Set<ShippingSchedule> shippingSchedulesDestination = shippingScheduleDao.filterShippingSchedule(
                optZone.get(),
                Arrays.asList(PackageStatus.ArrivedAtPaQueryPoint),
                ScheduleType.Destiny,
                id
        );
        if(shippingSchedulesDestination.isEmpty())
            throw new NotFoundPackageException("No se encontro paquetes en misma zona para PackageID: " + id);

        logger.info("Se encontraron {} paquetes para calcular distancia: ", shippingSchedulesDestination.size());

        List<Long> packagesID = this.filterPackagesByProximity(shSchedule, shippingSchedulesDestination);

        if (packagesID.isEmpty()) {
            logger.info("No se encontraron paquetes dentro de misma zona para PacakgeID: {}", id);
            throw new NotFoundPackageException("No se encontro paquetes en misma zona para PackageID: " + id);
        }

        logger.info("Se filtraron {} paquetes por cercania (radio={}): ", packagesID.size(), String.format("%.6f", maximumDistancePackage));

        Set<ShippingSchedule> shippingSchedulesOrigin = shippingScheduleDao.getShippingSchedulesByPackageID(packagesID, ScheduleType.Origin);

        return convertPackageResponseToDto(shippingSchedulesOrigin, shippingSchedulesDestination);
    }

    private List<Long> filterPackagesByProximity(ShippingSchedule shippingScheduleOriginal, Set<ShippingSchedule> otherPackageSchedules) {
        Coordenate packageCoor = resolveCoordenates(shippingScheduleOriginal.getShippingAddress());

        if (packageCoor == null) {
            logger.info("No se obtuvieron coordenadas para similitudes con shippinAddress: {}, shippingSchedule: {}", shippingScheduleOriginal.getShippingAddress().getId(), shippingScheduleOriginal.getId());
            return Arrays.asList();
        }

        logger.info("Coord Package Central: {}", packageCoor.toString());

        return otherPackageSchedules.stream()
                .filter((sche) -> insideOfRadious(packageCoor, sche))
                .limit(limitDeliveryPackages)
                .map((sche) -> sche.getPaqueryPackage().getId())
                .collect(Collectors.toList());
    }

    private Boolean insideOfRadious(Coordenate coorPackage, ShippingSchedule shippingSchedule) {
        Coordenate otherCoords = resolveCoordenates(shippingSchedule.getShippingAddress());

        if (otherCoords == null) {
            logger.info("No se obtuvieron coordenadas para shippingAddress: {}, (shippinSchedule: {})", shippingSchedule.getShippingAddress().getId(), shippingSchedule.getId());
            return false;
        }

        Double distance = coorPackage.calculateDistance(otherCoords);

        if (logger.isDebugEnabled())
            logger.debug("Distancia calculada: {}", String.format("%.6f",distance));

        return distance < maximumDistancePackage;
    }

    private Coordenate resolveCoordenates(ShippingAddress address) {
        Coordenate packageCoor;

        if (address.getLng() == null || address.getLat() == null) {
            packageCoor = mapsService.resolveCoordenatesByAddress(address.getAddressDetail());
        } else {
            packageCoor = new Coordenate(address.getLat(), address.getLng());
        }

        if (logger.isDebugEnabled())
            logger.debug("Coordenadas de ShippingAddres(id={}): {}", address.getId(), packageCoor);

        return packageCoor;
    }

    private Set<PackageDto> convertPackageResponseToDto(Set<ShippingSchedule> schedulesOrigin, Set<ShippingSchedule> schedulesDestination) {
        Set<PackageDto> packagesDto = new HashSet<>();
        for (ShippingSchedule origin : schedulesOrigin) {

            long idPackage = origin.getPaqueryPackage().getId();

            ShippingSchedule shippingAndAddress = schedulesDestination.stream()
                    .filter(sche -> sche.getPaqueryPackage().getId() == idPackage)
                    .findAny().get();

            ShippingSchedule destination = shippingAndAddress;

            ShippingAddressDto addressDestinationDto = new ShippingAddressDto(shippingAndAddress.getShippingAddress());
            ShippingAddressDto addressOriginDto = new ShippingAddressDto(origin.getShippingAddress());

            packagesDto.add(
                    new PackageDtoBuilder().PackageBuilder(origin.getPaqueryPackage(),
                            new ShippingSchduleDtoBuilder().builder(origin, addressOriginDto),
                            new ShippingSchduleDtoBuilder().builder(destination, addressDestinationDto)
                    ));
        }

        return packagesDto;
    }
}