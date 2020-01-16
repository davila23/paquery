package com.paquery.packages.enums;

import com.paquery.commons.enums.PackageType;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

@Component
public class PackageTypeConverter implements Converter<String, PackageType> {

    @Override
    public PackageType convert(String value) {
        return PackageType.valueOf(Integer.valueOf(value));
    }
}
