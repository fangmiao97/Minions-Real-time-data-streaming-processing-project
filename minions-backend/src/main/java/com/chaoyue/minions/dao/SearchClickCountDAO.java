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
import java.util.*;

/**
 * imooc_course_search_clickcount的DAO
 */
@Component
public class SearchClickCountDAO {

    @Autowired
    private HBaseUtils hBaseUtils;

    private static String tablename = "imooc_course_search_clickcount";



    public Map<String, Long> getTopReferWebsList(String date) throws IOException {

        Map<String, Long> res = new HashMap<>();


        HTable table = hBaseUtils.getTable(tablename);

        String cf = "info";
        String qualifier = "click_count";

        Scan scan = new Scan();

        Filter filter = new PrefixFilter(Bytes.toBytes(date));
        scan.setFilter(filter);

        ResultScanner scanner = table.getScanner(scan);

        for (Result result : scanner) {

            String rowKey = Bytes.toString(result.getRow());
            long clickCount = Bytes.toLong(result.getValue(Bytes.toBytes(cf), Bytes.toBytes(qualifier)));

            String[] tmp = rowKey.split("_");

            if(res.containsKey(tmp[1])) {
                long clickNum = res.get(tmp[1]) + clickCount;
                res.replace(tmp[1], clickNum);
            }else {
                res.put(tmp[1], clickCount);
            }

        }

        scanner.close();


        return res;
    }
}
