package com.chaoyue.minions.DTO;

/**
 * 1小数窗口歌曲播放表DTO
 */
public class RecentlySongPlayTableDTO {

    private int key;
    private String name;
    private int play_count;

    public int getKey() {
        return key;
    }

    public void setKey(int key) {
        this.key = key;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getPlay_count() {
        return play_count;
    }

    public void setPlay_count(int play_count) {
        this.play_count = play_count;
    }
}
