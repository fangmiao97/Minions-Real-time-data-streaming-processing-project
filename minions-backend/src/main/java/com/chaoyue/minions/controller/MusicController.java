package com.chaoyue.minions.controller;

import com.chaoyue.minions.DTO.SongInfoDTO;
import com.chaoyue.minions.DTO.TagCloudDTO;
import com.chaoyue.minions.dao.DailySongsPlayDAO;
import com.chaoyue.minions.dao.MusicInfoDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@EnableAutoConfiguration
public class MusicController {

    @Autowired
    private MusicInfoDAO musicInfoDAO;

    @Autowired
    private DailySongsPlayDAO dailySongsPlayDAO;

    @GetMapping("SongInfoList")
    public List<SongInfoDTO> getSongInfoList() {

        List<SongInfoDTO> list = new ArrayList<>();
        ArrayList<Map<String, String>> maps = (ArrayList<Map<String, String>>) musicInfoDAO.getSongInfoList();

        for (int i = maps.size() - 1; i >= 0; i--) {
            Map<String, String> item = maps.get(i);
            String songid = item.get("SongID");
            String name = item.get("name");
            String artist = item.get("artist");
            String album = item.get("album");
            String coverUrl = item.get("coverUrl");

            SongInfoDTO songInfoDTO = new SongInfoDTO();
            songInfoDTO.setSongID(songid);
            songInfoDTO.setName(name);
            songInfoDTO.setArtist(artist);
            songInfoDTO.setAlbum(album);
            songInfoDTO.setCoverUrl(coverUrl);

            list.add(songInfoDTO);
        }

        return list;
    }

    @GetMapping("songPlayedData")
    public List<TagCloudDTO> getSongPlayedData(HttpServletRequest request) throws IOException {

        String date = request.getParameter("date");

        ArrayList<TagCloudDTO> list = new ArrayList<>();

        Map<String, Long> maps = dailySongsPlayDAO.querySongsPlayDataByDate(date);

        for (Map.Entry<String, Long> entry : maps.entrySet()) {
            TagCloudDTO item = new TagCloudDTO();
            item.setName(musicInfoDAO.getSongNameNArtist(entry.getKey().substring(9)));
            item.setValue(Math.toIntExact(entry.getValue()));
            list.add(item);
        }

        return list.subList(0,10);
    }


}
