package com.chaoyue.minions.controller;

import com.chaoyue.minions.DTO.MiniAreaDTO;
import com.chaoyue.minions.DTO.PieChartDTO;
import com.chaoyue.minions.DTO.TopReferWebListDTO;
import com.chaoyue.minions.dao.ClickCountDAO;
import com.chaoyue.minions.dao.SearchClickCountDAO;
import com.chaoyue.minions.utils.DateUtils;
import com.jcraft.jsch.MAC;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * 历史数据页面
 */
@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@EnableAutoConfiguration
public class DataQueryController {

    @Autowired
    private ClickCountDAO clickCountDAO;

    @Autowired
    private SearchClickCountDAO searchClickCountDAO;

    @Autowired
    private DateUtils dateUtils;

    /**
     * 根据选择的日期获取HBase中clickcount的信息
     * @param request
     * @return
     * @throws IOException
     */
    @GetMapping("getClickData")
    private List<PieChartDTO> getHistoryClickData(HttpServletRequest request) throws IOException {

        String date = request.getParameter("date");

        List<PieChartDTO>list = new ArrayList<>();

        Map<String, Long> map = clickCountDAO.queryClickCountByDate(date);

        for (Map.Entry<String, Long> entry : map.entrySet()) {
            PieChartDTO model = new PieChartDTO();
            model.setX(entry.getKey());
            model.setY(Math.toIntExact(entry.getValue()));
            list.add(model);
        }

        return list;

    }

    /**
     * 根据日期返回总的页面浏览量
     * @param request
     * @return
     * @throws IOException
     */
    @GetMapping("getPVData")
    private int getPVData(HttpServletRequest request) throws IOException {
        int res = 0;

        String date = request.getParameter("date");

        res = (int) clickCountDAO.getPageViewsByDate(date);
        return res;
    }

    /**
     * 得到date当天关于来源网站的信息
     * @param request
     * @return
     * @throws IOException
     */
    @GetMapping("getTopWebList")
    private List<TopReferWebListDTO> getTopWebList(HttpServletRequest request) throws IOException {

        List<TopReferWebListDTO> res = new ArrayList<>();

        String date = request.getParameter("date");

        Map<String, Long> map = searchClickCountDAO.getTopReferWebsList(date);

        int rank = 1;
        for(Map.Entry<String, Long> entry : map.entrySet()) {
            TopReferWebListDTO item = new TopReferWebListDTO();
            item.setRank(rank);
            rank++;
            item.setWebsite(entry.getKey());
            item.setCount(Math.toIntExact(entry.getValue()));
            res.add(item);
        }

        return res;
    }

    /**
     * 得到date日期前7天的pv数据，用来看趋势
     * @param request
     * @return
     */
    @GetMapping("getSevenDaysPVDate")
    private List<MiniAreaDTO> getSevenDaysPVDate(HttpServletRequest request) throws IOException, ParseException {

        List<MiniAreaDTO> res = new ArrayList<>();

        String date = request.getParameter("date");

        for (int i = 6; i >= 0; i--) {
            if(i == 6){
                date = dateUtils.dayBefore(date, i);
            }else
                date = dateUtils.dayBefore(date, -1);
            MiniAreaDTO item = new MiniAreaDTO();
            String formateDate = date.substring(0,4)+"-"+date.substring(4,6)+"-"+date.substring(6);
            item.setX(formateDate);
            item.setY(Math.toIntExact(clickCountDAO.getPageViewsByDate(date)));

            res.add(item);
        }

        return res;
    }
}
