package com.chaoyue.minions.DTO;

/**
 * 来源网站最多的列表TopWebReferList的DTO
 */
public class TopReferWebListDTO {

    private String website;
    private int count;


    public String getWebsite() {
        return website;
    }

    public void setWebsite(String website) {
        this.website = website;
    }

    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }
}
