package com.paquery.packages.dto.builder;

import com.paquery.commons.dto.UserDto;
import com.paquery.packages.excel.UploadMassivePackageDto;

public class UserDtoBuilder {

    public UserDto build(UploadMassivePackageDto uploadDto) {
        UserDto dto = new UserDto();

        dto.setName(uploadDto.getDestinoNombre());
        dto.setEmail(uploadDto.getMailDestinatario());
        dto.setMobile(uploadDto.getDestinoTelefono());

        return dto;
    }
}
