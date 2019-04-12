package com.chaoyue.minions.dao;

import com.chaoyue.minions.utils.HBaseUtils;
import org.apache.hadoop.hbase.client.HTable;
import org.apache.hadoop.hbase.client.Result;
import org.apache.hadoop.hbase.client.ResultScanner;
import org.apache.hadoop.hbase.client.Scan;
import org.apache.hadoop.hbase.filter.Filter;
import org.apache.hadoop.hbase.filter.PrefixFilter;
import org.apache.hadoop.hbase.util.Bytes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

/**
 * clickcount_trend 的DAO 分类目每十分钟的间隔的访问量
 */
@Component
public class ClickCountTrendDAO {

    @Autowired
    private HBaseUtils hBaseUtils;

    private static String tablename = "clickcount_trend";

    /**
     * 返回这一天的访问量趋势，返回一天中每隔十分钟之间的PV量
     * @param condition
     * @return
     */
    public ArrayList<Map<String, String>> queryPVTrendByDate(String condition) throws IOException {

        ArrayList<Map<String, String>> list = new ArrayList<>();


        HTable table = hBaseUtils.getTable(tablename);

        String cf = "info";
        String qualifier = "click_count";

        Scan scan = new Scan();
        Filter filter = new PrefixFilter(Bytes.toBytes(condition));
        scan.setFilter(filter);

        ResultScanner rs = table.getScanner(scan);
        for (Result result : rs) {
            Map<String, String> map = new HashMap<>();
            String row = Bytes.toString(result.getRow());
            Long clickCount = Bytes.toLong(result.getValue(Bytes.toBytes(cf), Bytes.toBytes(qualifier)));
            map.put("time", row);
            map.put("clickcount", String.valueOf(clickCount));

            list.add(map);
        }

        rs.close();

        return list;
    }
}
