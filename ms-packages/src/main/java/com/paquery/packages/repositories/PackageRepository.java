package com.paquery.packages.repositories;

import com.paquery.packages.domain.PaqueryPackage;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface PackageRepository extends PagingAndSortingRepository<PaqueryPackage, Long> {

    /* -----------------   Querys : Basic Package   ----------------- */

    @Query("select pack FROM PaqueryPackage pack where pack.externalCode LIKE %:externalCode% and pack.active=true and pack.deleted=false")
    Page<PaqueryPackage> findByExternalCode(@Param("externalCode") String externalCode, Pageable pageable);

    @Query("select pack FROM PaqueryPackage pack" +
            " where pack.externalCode=:externalCode" +
            " and pack.active=true" +
            " and pack.deleted=false")
    PaqueryPackage findByExternalCode(@Param("externalCode") String externalCode);

    @Query(" select case when count(pack)> 0 then true else false end" +
            " FROM PaqueryPackage pack" +
            " where pack.externalCode=:externalCode" +
            " and pack.active=true and pack.deleted=false")
    boolean existsByExternalCode(@Param("externalCode") String externalCode);

    @Query("select pack FROM PaqueryPackage pack " +
            " join fetch pack.shippingSchedules " +
            " left join  pack.logStatusPackages " +
            " where pack.id =:id " +
            " and pack.active=true" +
            " and pack.deleted=false")
    PaqueryPackage getPackagePickupByID(@Param("id") Long id);


    /*
    @Query("select pack from PaqueryPackage pack where pack.packageType = :packageType and upper(pack.ExternalCode) like CONCAT(:externalCode, '%')")
    List<PaqueryPackage> findByContainingExternalCode(@Param("externalCode") String externalCode, @Param("packageType") Integer packageType);
   */

    /* -----------------   Querys :Pick Up Package   ----------------- */

    @Query("select pack FROM PaqueryPackage  pack " +
            " JOIN pack.shippingSchedules ssche" +
            " JOIN pack.user user" +
            " where pack.packageType=:packageType" +
            " and pack.status in :statusPackages" +
            " and ssche.scheduleType =:scheduleType " +
            " and (:packageStatus is null or pack.status =:packageStatus) " +
            " and ((:sinceDate is null or pack.deliveryDate >:sinceDate) " +
            "      and (:toDate is null or pack.deliveryDate <:toDate )" +
            "     or ((:sinceDate is null or pack.cancelationDate >:sinceDate) " +
            "       and (:toDate is null or pack.cancelationDate <:toDate ))) " +
            " and ((:ownerID is null or pack.ownerID=:ownerID) and (:ownerType is null or pack.ownerType=:ownerType)) " +
            " and ( :search is null or :search = '' or (" +
            "   pack.caption LIKE concat('%',concat(:search,'%')) or" +
            "   pack.externalCode LIKE concat('%',concat(:search,'%')) or" +
            "   pack.detail LIKE concat('%',concat(:search,'%')) or" +
            "   pack.user.name LIKE concat('%',concat(:search,'%')) or" +
            "   pack.user.email LIKE concat('%',concat(:search,'%')) or" +
            "   pack.user.lastName LIKE concat('%',concat(:search,'%')) or" +
            "   ssche.name LIKE concat('%',concat(:search,'%')) " +
            "))")
    Page<PaqueryPackage> getPackagesFromPickup(@Param("search") String search,
                                               @Param("ownerID") Long ownerID,
                                               @Param("ownerType") Integer ownerType,
                                               @Param("packageStatus") Integer packageStatus,
                                               @Param("sinceDate") LocalDateTime sinceDate,
                                               @Param("toDate") LocalDateTime toDate,
                                               Pageable pageable,
                                               @Param("packageType") Integer packageType,
                                               @Param("scheduleType") Integer scheduleType,
                                               @Param("statusPackages") List<Integer> statusPackages);


    /* -----------------   Querys :Store Withdrawal Package   ----------------- */

    @Query("select pack FROM PaqueryPackage  pack " +
            " JOIN pack.shippingSchedules ssche" +
            " JOIN pack.user user" +
            " where pack.packageType=:packageType" +
            " and pack.status in :statusPackages" +
            " and ssche.scheduleType =:scheduleType " +
            " and (:packageStatus is null or pack.status =:packageStatus) " +
            " and ((:sinceDate is null or pack.deliveryDate >:sinceDate) " +
            "      and (:toDate is null or pack.deliveryDate <:toDate )" +
            "     or ((:sinceDate is null or pack.cancelationDate >:sinceDate) " +
            "       and (:toDate is null or pack.cancelationDate <:toDate ))) " +
            " and ((:ownerID is null or pack.ownerID=:ownerID) and (:ownerType is null or pack.ownerType=:ownerType)) " +
            " and ( :search is null or :search = '' or (" +
            "   pack.caption LIKE concat('%',concat(:search,'%')) or" +
            "   pack.externalCode LIKE concat('%',concat(:search,'%')) or" +
            "   pack.detail LIKE concat('%',concat(:search,'%')) or" +
            "   pack.user.name LIKE concat('%',concat(:search,'%')) or" +
            "   pack.user.email LIKE concat('%',concat(:search,'%')) or" +
            "   pack.user.lastName LIKE concat('%',concat(:search,'%')) or" +
            "   ssche.name LIKE concat('%',concat(:search,'%')) " +
            "))")
    Page<PaqueryPackage> getPackagesFromStoreWithdrawal(@Param("search") String search,
                                                        @Param("ownerID") Long ownerID,
                                                        @Param("ownerType") Integer ownerType,
                                                        @Param("packageStatus") Integer packageStatus,
                                                        @Param("sinceDate") LocalDateTime sinceDate,
                                                        @Param("toDate") LocalDateTime toDate,
                                                        Pageable pageable,
                                                        @Param("packageType") Integer packageType,
                                                        @Param("scheduleType") Integer scheduleType,
                                                        @Param("statusPackages") List<Integer> statusPackages);

    @Query("select pack FROM PaqueryPackage pack " +
            " join fetch pack.shippingSchedules ssh" +
            " left join  pack.logStatusPackages " +
            " left join  ssh.paquer " +
            " where pack.id =:id " +
            " and (:packageType is null or pack.packageType =:packageType) " +
            " and pack.active=true" +
            " and pack.deleted=false")
    PaqueryPackage getPackageByIDAndType(@Param("id") Long id, @Param("packageType") Integer packageType);

    @Query("select pack FROM PaqueryPackage pack " +
            " join pack.shippingSchedules ssche " +
            " where ssche.paquer.id =:driverID " +
            " and ((:sinceDate is null or pack.deliveryDate >:sinceDate) " +
            "      and (:toDate is null or pack.deliveryDate <:toDate )" +
            "     or ((:sinceDate is null or pack.cancelationDate >:sinceDate) " +
            "       and (:toDate is null or pack.cancelationDate <:toDate ))) " +
            " and ssche.scheduleType =:scheduleType " +
            " and pack.status in :packageStatus" +
            " and pack.active=true " +
            " and pack.deleted=false" +
            " ORDER BY pack.creationDate desc ")
    Page<PaqueryPackage> packagesHistoryByPaquerID(@Param("driverID") Long driverID,
                                                   Pageable pageable,
                                                   @Param("sinceDate") LocalDateTime sinceDate,
                                                   @Param("toDate") LocalDateTime toDate,
                                                   @Param("scheduleType") Integer scheduleType,
                                                   @Param("packageStatus") List<Integer> packageStatus
    );

    @Query("select pack FROM PaqueryPackage pack " +
            " join pack.shippingSchedules ssche " +
//            " where ssche.shippingSchedules=:shippingScheduleID " +
            " where pack.active=true " +
            " and pack.deleted=false ")
    PaqueryPackage findByShippingScheduleID(@Param("shippingScheduleID") Long shippingScheduleID);

    List<PaqueryPackage> findByExternalCodeContainingIgnoreCaseAndPackageType(String externalCode, Integer packageType);

    List<PaqueryPackage> findByExternalCodeContainingIgnoreCaseAndPackageTypeAndStatus(String externalCode, Integer packageType, Integer status);

//    @Query("SELECT distinct p " +
//           "    FROM PaqueryPackage p " +
//           "        JOIN p.user user  " +
//           "        JOIN p.shippingSchedules shipping " +
//           "        JOIN shipping.shippingAddress address " +
//           "    WHERE p.active = true " +
//           "    and p.status in :statusList " +
//           "    and (  :search is null " +
//           "           or p.caption like :search " +
//           "           user.email like :search or user.name like :search or user.lastName :search " +
//           "           or shipping.name like :search or shipping.destinationEmail like :search " +
//           "           or address.addressDetail like :search or address.name like :search " +
//           "       )"
//    )
//    Page<PaqueryPackage> findBySearchAndStatus(@Param("search")String search, @Param("statusList") List<PackageStatus> statusList, Pageable pageable);


    @Query("SELECT p " +
            "    FROM PaqueryPackage p " +
            "        JOIN p.user user" +
            "        JOIN p.shippingSchedules shipping " +
            "        JOIN shipping.shippingAddress address " +
            "    WHERE p.active = true " +
            "    and p.status in :statusList   " +
            "    and shipping.scheduleType = :scheduleType " +
            "    and shipping.paquer.id in :paquerIds  " +
            "    and (  :search is null  or p.caption like :search )"// +
//            "           or user.email like :search or user.name like :search or user.lastName :search " +
//            "           or shipping.name like :search or shipping.destinationEmail like :search " +
//            "           or address.addressDetail like :search or address.name like :search " +
//            "       )"
    )
    Page<PaqueryPackage> findBySearchAndStatusAndTakedByDrivers(@Param("search") String search,
                                                                @Param("scheduleType") Integer scheduleType,
                                                                @Param("statusList") List<Integer> statusList,
                                                                @Param("paquerIds") List<Long> paquersIds,
                                                                Pageable pageable);

    @Query("select pack FROM PaqueryPackage pack " +
            " join fetch pack.shippingSchedules " +
            " where pack.id =:packageID " +
            " and pack.active=true " +
            " and pack.deleted=false ")
    PaqueryPackage getPackageAndShippingSchedulesByPackageID(@Param("packageID") Long packageID);


    @Query(
            value = "select \n" +
                    "   pkg.ExternalCode as ExternalCode,\n" +
                    "   pkg.Caption as Detalle,\n" +
                    "   mk.Name as Marketplace, " +
                    "   case \n" +
                    "       when pkg.Status = 2 then 'Arrivado a PaqueryPoint'\n" +
                    "       when pkg.Status = 24 then 'Disponible en Tienda'\n" +
                    "       when pkg.Status = 7 then 'Aceptado por Paquer'\n" +
                    "       when pkg.Status = 3 then 'En Poder del Paquer'\n" +
                    "       when pkg.Status = 31 then 'Intento de Entrega 1'\n" +
                    "       when pkg.Status = 32 then 'Intento de Entrega 2'\n" +
                    "       when pkg.Status = 4 then 'En camino'\n" +
                    "       when pkg.Status = 5 then 'Pendiente de programar'\n" +
                    "       when pkg.Status = 19 then 'Entregado pendiente de Firma'\n" +
                    "       when pkg.Status = 21 then 'Cancelado'\n" +
                    "       when pkg.Status = 25 then 'Dirección Incorrecta'\n" +
                    "       when pkg.Status = 26 then 'No es posible entregar en zona de destino'\n" +
                    "       when pkg.Status = 27 then 'Contingencia de entrega'\n" +
                    "       when pkg.Status = 30 then 'Pendiente de Pago'\n" +
                    "       when pkg.Status = 40 then 'Devuelto'\n" +
                    "       when pkg.Status = 50 then 'Expirado'\n" +
                    "           else cast(pkg.Status as varchar)\n" +
                    "       end as Estado,\n" +
                    "   case \n" +
                    "       when pkg.DeliveryTerm = 1 then '48hs'    \n" +
                    "       when pkg.DeliveryTerm = 2 then 'NextDay' \n" +
                    "       when pkg.DeliveryTerm = 3 then 'SameDay' \n" +
                    "       when pkg.DeliveryTerm = 4 then 'SameDayExpress' \n" +
                    "           else '' \n" +
                    "   end as Plazo, \n" +
                    "   pkg.CreationDate as FechaCreacion,\n" +
                    "   (select Min(l.CreationDate) from PQ_ChangeStatusLog l where l.PackageID = pkg.ID and l.NextStatus = 2) as FechaArrivo,\n" +
                    "   shi.ScheduledDate as FechaProgramada,\n" +
                    "   (select MIN(CreationDate) from PQ_Visit where ShippingScheduleID = shi.ID) as Visita1,\n" +
                    "   (select MAX(CreationDate) from PQ_Visit where ShippingScheduleID = shi.ID HAVING count(1) > 1) as Visita2\n" +
                    "       from PQ_Package pkg\n" +
                    "       inner join PQ_ShippingSchedule shi on shi.PackageID = pkg.ID and shi.ScheduleType = 2 " +
                    "       left join PQ_Marketplace mk on mk.ID = pkg.OwnerID and pkg.OwnerType = 40 " +
                    "   where \n" +
                    "       pkg.Status >= 2 and pkg.Status not in (22, 23)" +
                    "   and pkg.DeliveryDate is null" +
                    "   and pkg.CancelationDate is null" +
                    "   and pkg.PackageType = 2 " +
                    "   and shi.ScheduledDate < CURRENT_TIMESTAMP+1 and pkg.CreationDate > CURRENT_TIMESTAMP - 30",
            nativeQuery = true
    )
    List getResultPackageForExpiration();
}
