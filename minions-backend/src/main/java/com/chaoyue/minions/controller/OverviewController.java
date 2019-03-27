package com.chaoyue.minions.controller;

import com.chaoyue.minions.DTO.PieChartDTO;
import com.chaoyue.minions.dao.TestDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.*;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@EnableAutoConfiguration
public class OverviewController {

    @Autowired
    private TestDAO testDAO;

    @GetMapping("itemSaleStatisticsInOverview")
    private List<PieChartDTO> getHBaseTest() throws IOException {

        List<PieChartDTO>list = new ArrayList<>();

        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyyMMdd");
        Date date = new Date();
        String today = simpleDateFormat.format(date);

        Map<String, Long> map = testDAO.query(today);

        for (Map.Entry<String, Long> entry : map.entrySet()) {
            PieChartDTO model = new PieChartDTO();
            model.setX(entry.getKey());
            model.setY(Math.toIntExact(entry.getValue()));
            list.add(model);
        }

        return list;

    }
}
