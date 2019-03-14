package com.chaoyue.minions.controller;

import org.apache.log4j.Logger;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.io.UnsupportedEncodingException;

@RestController
@EnableAutoConfiguration
public class HelloController {

    Logger logger = Logger.getLogger(HelloController.class.getName());

    @RequestMapping("/hello")
    private String index() {
        return "Hello!!!!";
    }

    @GetMapping("logtest")
    private int logTest(HttpServletRequest request) throws UnsupportedEncodingException {

        int res = 0;

        String headers = request.getParameter("headers");
        String body = request.getParameter("body");

        try {
            logger.info("headers:" + headers + "body:"+ body);
            res = 1;
        }catch (Exception e){
            logger.error("error:" + e);
            e.printStackTrace();
        }

        return res;

    }

}
