package com.chaoyue.minions.controller;

import com.chaoyue.minions.DTO.MiniAreaDTO;
import com.chaoyue.minions.DTO.PieChartDTO;
import com.chaoyue.minions.DTO.TopReferWebListDTO;
import com.chaoyue.minions.dao.ClickCountDAO;
import com.chaoyue.minions.dao.ClickCountTrendDAO;
import com.chaoyue.minions.dao.SearchClickCountDAO;
import com.chaoyue.minions.utils.DateUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.text.ParseException;
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
    private ClickCountTrendDAO clickCountTrendDAO;

    @Autowired
    private DateUtils dateUtils;

    //类目标题映射表
    private final static Map<String, String> categoriesNameMap = new HashMap<>();
    static {
        categoriesNameMap.put("146", "新近发布");
        categoriesNameMap.put("112", "为你推荐");
        categoriesNameMap.put("145", "今日歌单");
        categoriesNameMap.put("128", "瞩目艺人");
        categoriesNameMap.put("131", "今日专辑");
        categoriesNameMap.put("130", "最近播放");
    }

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
            model.setX(categoriesNameMap.get(entry.getKey().substring(9)));
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
     * 返回 周同比 日环比 7日均值
     * @param request
     * @return
     */
    @GetMapping("getCompData")
    private Map<String, String> getCompareData(HttpServletRequest request) throws ParseException, IOException {
        Map<String, String> res = new HashMap<>();

        String date = request.getParameter("date");
        //周环比
        long todayPV = clickCountDAO.getPageViewsByDate(date);
        String sevenDayBefore = dateUtils.dayBefore(date, 7);
        long sevenDayBeforePV = clickCountDAO.getPageViewsByDate(sevenDayBefore);
        double wow = 0;
        if (sevenDayBeforePV != 0){
            wow = (todayPV * 1.0 / sevenDayBeforePV) * 100;
            if(String.valueOf(wow).length() > 6)
                res.put("wow", String.valueOf(wow).substring(0,6));
            else
                res.put("wow", String.valueOf(wow));
        }else
            res.put("wow", String.valueOf(wow));


        //日环比
        String yesterday = dateUtils.dayBefore(date, 1);
        long yesterdayPV = clickCountDAO.getPageViewsByDate(yesterday);
        double dod = 0;
        if (yesterdayPV != 0){
            dod = (todayPV * 1.0 / yesterdayPV) * 100;
            if(String.valueOf(dod).length() > 6)
                res.put("dod", String.valueOf(dod).substring(0,6));
            else
                res.put("dod", String.valueOf(dod));
        }else
            res.put("dod", String.valueOf(dod));


        //7日均值
        long sum = 0;
        for (int i = 6; i >= 0; i--) {
            if(i == 6){
                date = dateUtils.dayBefore(date, i);
            }else
                date = dateUtils.dayBefore(date, -1);
            sum += clickCountDAO.getPageViewsByDate(date);
        }
        int average = 0;
        if (sum != 0){
            average = Math.toIntExact(sum / 7);
        }
        res.put("average", String.valueOf(average));

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

        for(Map.Entry<String, Long> entry : map.entrySet()) {
            TopReferWebListDTO item = new TopReferWebListDTO();
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

    /**
     * 得到当前日期中每隔三十分钟的访问量
     * @param request
     * @return
     * @throws IOException
     */
    @GetMapping("getPVTrend")
    private List<MiniAreaDTO> getPVTrend(HttpServletRequest request) throws IOException {
        List<MiniAreaDTO> list = new ArrayList<>();

        String date = request.getParameter("date");

        ArrayList<Map<String, String>> maps = clickCountTrendDAO.queryPVTrendByDate(date);

        for (int i = 0; i < maps.size(); i++){
            Map<String, String> item = maps.get(i);
            MiniAreaDTO miniAreaDTO = new MiniAreaDTO();
            miniAreaDTO.setX(dateUtils.parseMinuteTime(item.get("time")));
            miniAreaDTO.setY(Integer.parseInt(item.get("clickcount")));
            list.add(miniAreaDTO);
        }

        return list;
    }

}
