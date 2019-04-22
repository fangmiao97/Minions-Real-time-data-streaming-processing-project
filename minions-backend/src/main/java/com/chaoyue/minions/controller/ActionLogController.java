package com.chaoyue.minions.controller;

import com.chaoyue.minions.dao.TestDAO;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.io.UnsupportedEncodingException;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@EnableAutoConfiguration
public class ActionLogController {

    Logger logger = Logger.getLogger(ActionLogController.class.getName());

    @GetMapping("actionLogger")
    private int actionLogger(HttpServletRequest request) throws UnsupportedEncodingException {

        int res = 0;

        System.out.println(request);

        String k_topic = request.getParameter("K_topic");
        String songID = request.getParameter("songId");

        try {
            logger.info("topic:" + k_topic + " songID:" + songID);
            res = 1;
        }catch (Exception e){
            logger.error("error:" + e);
            e.printStackTrace();
            res = 0;
        }
        return res;
    }


}
