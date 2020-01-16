package com.paquery.packages.services;

import com.paquery.commons.exception.BusinessException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import static com.paquery.packages.utils.PathResolverUtil.resolveAvatarPath;


@Service
public class AvatarService {

    @Autowired
    private ImageService imageService;

    public String addAvatarToPackage(Long id, String file) throws BusinessException {
        if (id == null || StringUtils.isEmpty(file))
            return "";

        String folder = resolveAvatarPath(id, "");

        return imageService.setAtributtesAndSendFile(folder, file);
    }
}
