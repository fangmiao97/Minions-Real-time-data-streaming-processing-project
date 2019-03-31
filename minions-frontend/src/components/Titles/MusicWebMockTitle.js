import React, { Component } from 'react';
import "./PagesTitle.css"

class MusicWebMockTitle extends Component{

    render() {
        return(
            <div className="position">
                <div className="title1">MUSIC WEB MOCK</div>
                <div className="title2">音乐网站用户行为分析模拟</div>
                <div className="title3">模拟前端埋点方式进行用户行为日志的收集 并展示相关实时处理结果</div>
            </div>
        );
    }
}

export default MusicWebMockTitle;