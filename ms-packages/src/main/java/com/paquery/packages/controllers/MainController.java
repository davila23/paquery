package com.paquery.packages.controllers;

//import com.paquery.security.SecuredApi;
//import com.paquery.security.UserRoleEnum;
import com.paquery.commons.utils.DateUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;
import java.util.LinkedHashMap;
import java.util.Map;

@RestController
public class MainController {

    private static Logger logger = LoggerFactory.getLogger(MainController.class);

    @GetMapping("/health")
    public ResponseEntity health() {
        Map map = new LinkedHashMap();
        map.put("newDate", new Date());
        map.put("system", DateUtils.now());
        map.put("localDateTime", DateUtils.nowLocalDateTime());
        return ResponseEntity.ok(map);
    }

    @GetMapping("/authtest")
    @com.paquery.security.SecuredApi(allowedRoles = com.paquery.security.UserRoleEnum.PAQUER)
    public ResponseEntity authTest(@RequestParam("atr") String atr) {
        logger.info("ATR: {}", atr);
        return health();
    }
}