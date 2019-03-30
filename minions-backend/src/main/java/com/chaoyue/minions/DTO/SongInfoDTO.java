package com.chaoyue.minions.DTO;

public class SongInfoDTO {

    private int SongID;
    private String name;
    private String artist;
    private String album;
    private String coverUrl;

    public int getSongID() {
        return SongID;
    }

    public void setSongID(String songID) {
        SongID = Integer.parseInt(songID);
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getArtist() {
        return artist;
    }

    public void setArtist(String artist) {
        this.artist = artist;
    }

    public String getAlbum() {
        return album;
    }

    public void setAlbum(String album) {
        this.album = album;
    }

    public String getCoverUrl() {
        return coverUrl;
    }

    public void setCoverUrl(String coverUrl) {
        this.coverUrl = coverUrl;
    }
}
