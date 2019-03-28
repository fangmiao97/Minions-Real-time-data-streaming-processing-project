package com.chaoyue.minions.controller;

import com.chaoyue.minions.DTO.PieChartDTO;
import com.chaoyue.minions.dao.ClickCountDAO;
import com.chaoyue.minions.dao.TestDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * Overview页面 关于当前时间的数据统计controller
 */

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@EnableAutoConfiguration
public class OverviewController {

    @Autowired
    private ClickCountDAO clickCountDAO;

    @GetMapping("getTodayClickData")
    private List<PieChartDTO> getTodayClickData() throws IOException {

        List<PieChartDTO>list = new ArrayList<>();

        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyyMMdd");
        Date date = new Date();
        String today = simpleDateFormat.format(date);

        Map<String, Long> map = clickCountDAO.queryClickCountByDate(today);

        for (Map.Entry<String, Long> entry : map.entrySet()) {
            PieChartDTO model = new PieChartDTO();
            model.setX(entry.getKey());
            model.setY(Math.toIntExact(entry.getValue()));
            list.add(model);
        }

        return list;

    }

    @GetMapping("getTodayPV")
    private int getTodayPV() throws IOException {
        int res = 0;

        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyyMMdd");
        Date date = new Date();
        String today = simpleDateFormat.format(date);

        res = (int) clickCountDAO.getPageViewsByDate(today);
        return res;
    }
}
