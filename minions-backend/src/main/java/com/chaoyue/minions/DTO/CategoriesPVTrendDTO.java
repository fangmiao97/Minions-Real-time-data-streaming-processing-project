package com.chaoyue.minions.DTO;

/**
 * 各类目PV DTO
 */
public class CategoriesPVTrendDTO {

    private String time;
    private int 最近播放;
    private int 瞩目艺人;
    private int 新近发布;
    private int 今日专辑;
    private int 为你推荐;
    private int 今日歌单;


    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public int get新近发布() {
        return 新近发布;
    }

    public void set新近发布(int 新近发布) {
        this.新近发布 = 新近发布;
    }

    public int get为你推荐() {
        return 为你推荐;
    }

    public void set为你推荐(int 为你推荐) {
        this.为你推荐 = 为你推荐;
    }

    public int get今日歌单() {
        return 今日歌单;
    }

    public void set今日歌单(int 今日歌单) {
        this.今日歌单 = 今日歌单;
    }

    public int get瞩目艺人() {
        return 瞩目艺人;
    }

    public void set瞩目艺人(int 瞩目艺人) {
        this.瞩目艺人 = 瞩目艺人;
    }

    public int get今日专辑() {
        return 今日专辑;
    }

    public void set今日专辑(int 今日专辑) {
        this.今日专辑 = 今日专辑;
    }

    public int get最近播放() {
        return 最近播放;
    }

    public void set最近播放(int 最近播放) {
        this.最近播放 = 最近播放;
    }
}
