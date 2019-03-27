package com.chaoyue.minions.controller;

import com.chaoyue.minions.DTO.PieChartDTO;
import com.chaoyue.minions.dao.TestDAO;
import com.chaoyue.minions.domain.CourseClickCount;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@EnableAutoConfiguration
public class HelloController {

    Logger logger = Logger.getLogger(HelloController.class.getName());

    @Autowired
    private TestDAO testDAO;

    @RequestMapping("/hello")
    private String index() {
        return "Hello!!!!";
    }

    @GetMapping("logtest")
    private int logTest(HttpServletRequest request) throws UnsupportedEncodingException {

        int res = 0;

        String k_topic = request.getParameter("K_topic");
        String contents = request.getParameter("contents");

        try {
            logger.info("topic:" + k_topic + " " + "contents:"+ contents + "try:bbb");
            res = 1;
        }catch (Exception e){
            logger.error("error:" + e);
            e.printStackTrace();
        }

        return res;

    }

    @GetMapping("logtest2")
    private int logTest2(HttpServletRequest request) throws UnsupportedEncodingException {

        int res = 0;

        String k_topic = request.getParameter("K_topic");
        String contents = request.getParameter("contents");

        try {
            logger.info("topic:" + k_topic + " " + "contents:"+ contents + "try:bbb");
            res = 1;
        }catch (Exception e){
            logger.error("error:" + e);
            e.printStackTrace();
        }

        return res;

    }





}
