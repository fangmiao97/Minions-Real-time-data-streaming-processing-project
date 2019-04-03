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
import java.util.HashMap;
import java.util.Map;

/**
 * imooc_course_clickcount的DAO
 */

@Component
public class ClickCountDAO {

    @Autowired
    private HBaseUtils hBaseUtils;

    private static String tablename = "imooc_course_clickcount";

    /**
     * 获取不同了类目的点击次数
     * @param condition
     * @return
     * @throws IOException
     */
    public Map<String, Long> queryClickCountByDate(String condition) throws IOException {

        Map<String, Long> map = new HashMap<>();

        HTable table = hBaseUtils.getTable(tablename);

        //ATTENTION!!!
        String cf = "info"; //column family
        String qualifier = "click_count"; //qualifier--similar to column name

        Scan scan = new Scan();

        Filter filter = new PrefixFilter(Bytes.toBytes(condition));
        scan.setFilter(filter);

        ResultScanner rs = table.getScanner(scan);

        for (Result result : rs) {
            String row = Bytes.toString(result.getRow());
            long clickCount = Bytes.toLong(result.getValue(cf.getBytes(), qualifier.getBytes()));
            map.put(row, clickCount);
        }

        rs.close();

        return map;
    }

    /**
     * 根据日期获得总的页面浏览量
     * @param condition
     * @return
     * @throws IOException
     */
    public long getPageViewsByDate(String condition) throws IOException {
        long res = 0;

        HTable table = hBaseUtils.getTable(tablename);

        String cf = "info";
        String qualifier = "click_count";

        Scan scan = new Scan();

        Filter filter = new PrefixFilter(Bytes.toBytes(condition));
        scan.setFilter(filter);

        ResultScanner rs = table.getScanner(scan);

        for (Result result : rs) {
            res += Bytes.toLong(result.getValue(cf.getBytes(), qualifier.getBytes()));
        }

        rs.close();

        return res;
    }

}
