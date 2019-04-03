package com.chaoyue.minions.utils;


import org.springframework.stereotype.Component;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Calendar;
import java.util.Date;

/**
 * Date相关转换工具类
 */
@Component
public class DateUtils {

    private static DateUtils instance = null;

    public static synchronized DateUtils getInstance() {
        if (null == instance) {
            instance = new DateUtils();
        }
        return instance;
    }


    /**
     * 返回20190401的前一天20190331
     * @param strDate
     * @return
     * @throws ParseException
     */
    public String dayBefore(String strDate, long days) throws ParseException {

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd");
        //LocalDateTime date = LocalDateTime.parse(strDate);

        LocalDate date = LocalDate.parse(strDate, formatter);

        LocalDate dayAhead = date.minusDays(days);

        String dayBefore = dayAhead.format(formatter).toString();

        return dayBefore;

    }

    public static void main(String[] args) throws ParseException {
        System.out.println(DateUtils.getInstance().dayBefore("20190401",(long)5));
    }

}
