package com.chaoyue.minions.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.PreparedStatementSetter;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.RowMapperResultSetExtractor;
import org.springframework.stereotype.Component;

import java.io.Serializable;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * mock歌曲信息DAO
 * created by Chaoyue
 */
@Component
public class MusicInfoDAO implements Serializable {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public List<Map<String, String>> getSongInfoList() {

        String executeSql = "SELECT * FROM MessageWikiPro.SongInfo";

        List dateList = (ArrayList) jdbcTemplate.query(executeSql,
                new PreparedStatementSetter() {
                    @Override
                    public void setValues(java.sql.PreparedStatement preparedStatement) throws SQLException {
                    }
                },
                new RowMapperResultSetExtractor(new RowMapper() {
                    public Object mapRow(ResultSet rs, int index)
                            throws SQLException {
                        Map u = new HashMap();
                        u.put("SongID", rs.getString("idSongInfo"));
                        u.put("name", rs.getString("name"));
                        u.put("artist", rs.getString("artist"));
                        u.put("album", rs.getString("album"));
                        u.put("coverUrl", rs.getString("coverUrl"));
                        return u;
                    }
                }));

        return dateList;
    }

    public String getSongNameNArtist(String songID) {

        String executeSql = "select concat_ws('-',name,artist) as result from MessageWikiPro.SongInfo where idSongInfo = ?";

        String res = jdbcTemplate.queryForObject(executeSql,
                new Object[] {songID}, String.class);

        return res;

    }
}
