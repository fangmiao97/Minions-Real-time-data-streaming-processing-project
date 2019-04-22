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
 * daily_songlike的DAO
 */
@Component
public class DailySongsLikeDAO {

    @Autowired
    private HBaseUtils hBaseUtils;

    private static String tableName = "daily_songlike";

    public Map<String, Long> querySongsLikeDataByDate(String date) throws IOException {
        Map<String, Long> map = new HashMap<>();

        HTable table = hBaseUtils.getTable(tableName);

        String cf = "info";
        String qualifier = "like_count";

        Scan scan = new Scan();
        Filter filter = new PrefixFilter(Bytes.toBytes(date));
        scan.setFilter(filter);

        ResultScanner scanner = table.getScanner(scan);
        for (Result result: scanner) {
            String rowKey = Bytes.toString(result.getRow());
            long likeCount = Bytes.toLong(result.getValue(Bytes.toBytes(cf), Bytes.toBytes(qualifier)));
            map.put(rowKey, likeCount);
        }

        return map;
    }

}