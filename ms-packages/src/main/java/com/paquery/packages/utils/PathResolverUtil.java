package com.paquery.packages.utils;

import org.springframework.core.env.Environment;

public class PathResolverUtil {

    private static Environment appEnviroment;

    private static final String URL_REMITO = "api/packageadmin/generateremito?packageID=";

    public static String resolveAvatarPath(long id, String name) {
        return commonPath(id, name, "/");
    }

    public static String resolveSignaturePath(long id, String name) {
        return commonPath(id, name, "/Signature/");
    }

    public static String resolveVisitPath(long id, String name) {
        return commonPath(id, name, "/Visit/");
    }

    public static String resolvePaquerAvatarPath(long id, String name) {
        return commonPath(null, name, +id + "/").replace("package", "Driver");
    }

    public static String commonPath(Long id, String name, String path) {

        if (name == null)
            return "";

        String basePath = getBaseResourcePath();
        String baseUrl = getBaseResourceUrl();
        String pathCommon;
        if (id == null) {
            pathCommon = basePath + path;
        } else {
            pathCommon = basePath + id + path;
        }

        if ("".equals(name))
            return pathCommon;

        return baseUrl + pathCommon + name;
    }

    private static String getBaseResourceUrl() {
        return appEnviroment.getProperty("paquery.resourceBaseUrl", "/");
    }

    private static String getBaseResourcePath() {
        return appEnviroment.getProperty("paquery.resourceBasePath", "/");
    }

    public static void setAppEnviroment(Environment enviroment) {
        appEnviroment = enviroment;
    }

    public static String getUrlRemito(Long id) {
        return getBaseResourceUrl() + URL_REMITO + id;
    }
}
