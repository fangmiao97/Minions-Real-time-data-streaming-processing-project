package com.chaoyue.minions.utils;

import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.hbase.client.*;
import org.apache.hadoop.hbase.filter.Filter;
import org.apache.hadoop.hbase.filter.PageFilter;
import org.apache.hadoop.hbase.filter.PrefixFilter;
import org.apache.hadoop.hbase.util.Bytes;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.nio.ByteBuffer;
import java.util.HashMap;
import java.util.Map;

/**
 * HBase操作工具类，java工具类建议采用单例模式封装
 * created by Chaoyue
 */

@Component
public class HBaseUtils {

    HBaseAdmin admin = null;
    Configuration configuration = null;

    private HBaseUtils(){

        configuration = new Configuration();
        configuration.set("hbase.zookeeper.quorum", "hadoop000:2181");
        configuration.set("hbase.rootdir", "hdfs://hadoop000:8020/hbase");

        try {
            admin = new HBaseAdmin(configuration);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    //单例模式
    private static HBaseUtils instance = null;

    public static synchronized HBaseUtils getInstance(){
        if (null == instance){
            instance = new HBaseUtils();
        }
        return instance;
    }

    /**
     * 根据表名得到Htable实例
     * @param tableName
     * @return
     */
    public HTable getTable(String tableName){
        HTable table = null;
        try {
            table = new HTable(configuration, tableName);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return table;
    }


//    public static void main(String[] args) throws IOException {
//
//        Map<String, Long> map = HBaseUtils.getInstance().query("imooc_course_clickcount", "20190226");
//
//        for (Map.Entry<String, Long> entry : map.entrySet()) {
//            System.out.println(entry.getKey() + " : " + entry.getValue());
//        }
//
//
//    }

}
