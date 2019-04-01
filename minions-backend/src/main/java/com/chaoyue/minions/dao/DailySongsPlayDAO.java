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
 * daily_songplay的DAO
 */
@Component
public class DailySongsPlayDAO {

    @Autowired
    private HBaseUtils hBaseUtils;

    private static String tableName = "daily_songplay";

    public Map<String, Long> querySongsPlayDataByDate(String date) throws IOException {
        Map<String, Long> map = new HashMap<>();

        HTable table = hBaseUtils.getTable(tableName);

        String cf = "info";
        String qualifier = "play_count";

        Scan scan = new Scan();
        Filter filter = new PrefixFilter(Bytes.toBytes(date));
        scan.setFilter(filter);

        ResultScanner scanner = table.getScanner(scan);
        for (Result result: scanner) {
            String rowKey = Bytes.toString(result.getRow());
            long playCount = Bytes.toLong(result.getValue(Bytes.toBytes(cf), Bytes.toBytes(qualifier)));
            map.put(rowKey, playCount);
        }

        return map;
    }

}
