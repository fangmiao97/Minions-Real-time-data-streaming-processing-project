package com.chaoyue.minions.DTO;

/**
 * ant-d pro Pie数据传输对象，与具体业务逻辑无关，与前端展示有关
 */
public class PieChartDTO {

    private String x;
    private int y;

    public String getX() {
        return x;
    }

    public void setX(String x) {
        this.x = x;
    }

    public int getY() {
        return y;
    }

    public void setY(int y) {
        this.y = y;
    }
}
