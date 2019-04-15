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
 * recently_play_song_hour的DAO
 */
@Component
public class RecentlySongPLayDAO {

    @Autowired
    private HBaseUtils hBaseUtils;

    private static String tablename = "recently_play_song_hour";

    /**
     * 获取当日当时最近1小时内播放歌曲的情况
     * @param condition
     * @return
     */
    public Map<String, Long> queryRecentlyPlaySong(String condition) throws IOException {

        Map<String, Long> res = new HashMap<>();

        HTable table = hBaseUtils.getTable(tablename);

        String cf = "info";
        String qualifier = "play_count";

        Scan scan = new Scan();
        Filter filter = new PrefixFilter(Bytes.toBytes(condition));
        scan.setFilter(filter);

        ResultScanner scanner = table.getScanner(scan);
        for (Result result: scanner) {
            String rowKey = Bytes.toString(result.getRow());
            long playCount = Bytes.toLong(result.getValue(Bytes.toBytes(cf), Bytes.toBytes(qualifier)));
            res.put(rowKey, playCount);
        }

        return res;
    }
}
