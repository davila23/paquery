package com.paquery.packages.domain.projections;

import com.paquery.packages.domain.PaqueryPackage;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

import java.time.LocalDateTime;

@Projection(name = "packageMinimalProjection", types = {PaqueryPackage.class})
public interface PackageMinimalProjection {

    long getId();

    String getCaption();

    String getDetail();

    String getExternalCode();

    @Value("#{target.getStatus().getValue()}")
    Integer getStatus();

    @Value("#{target.getPackageSize().getValue()}")
    Integer getPackageSize();

    @Value("#{target.getPackageType().getValue()}")
    Integer getPackageType();

    @Value("#{target.getDeliveryTerm().getValue()}")
    Integer getDeliveryTerm();

    @Value("#{target.getOwnerType().getValue()}")
    Integer getOwnerType();

    Integer getOwnerID();

    Double getEstimatedCost();

    LocalDateTime getModificationDate();

    LocalDateTime getCancelationDate();

    LocalDateTime getCreationDate();

    LocalDateTime getDeliveryDate();

    LocalDateTime getArrivedAtPaqueryPointDate();

    String getRollContainerPosition();

    Boolean getRollContainerStatus();

    @Value("#{T(com.paquery.packages.utils.PathResolverUtil).resolveSignaturePath(target.id,target.signatureImage)}")
    String getSignatureImage();

    @Value("#{T(com.paquery.packages.utils.PathResolverUtil).resolveAvatarPath(target.id,target.avatar)}")
    String getAvatar();

    @Value("#{T(com.paquery.packages.utils.PathResolverUtil).getUrlRemito(target.id)}")
    String getRemitoUrl();
}
