package com.chaoyue.minions.DTO;

/**
 * 歌曲播放信息TABLE DTO
 */
public class SongDataTableDTO {

    //TODO... 修改table结构 歌手 专辑单独放

    private int key;//table-key
    private String songInfo;
    private int play_count;

    public int getKey() {
        return key;
    }

    public void setKey(int key) {
        this.key = key;
    }

    public String getSongInfo() {
        return songInfo;
    }

    public void setSongInfo(String songInfo) {
        this.songInfo = songInfo;
    }

    public int getPlay_count() {
        return play_count;
    }

    public void setPlay_count(int play_count) {
        this.play_count = play_count;
    }
}
