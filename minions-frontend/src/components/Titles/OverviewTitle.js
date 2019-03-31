import React, { Component } from 'react';
import "./PagesTitle.css"

class OverviewTitle extends Component{

    render() {
        return(
            <div className="position" style={{ paddingBottom:'16px'}}>
                <div className="title1">OVERVIEW OF REAL-TIME DATA</div>
                <div className="title2">网站今日实时数据汇总</div>
                <div className="title3">实时网站浏览指标数据 7日趋势比较</div>
            </div>
        );
    }
}

export default OverviewTitle;