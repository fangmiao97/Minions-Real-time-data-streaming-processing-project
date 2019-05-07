import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import "./Homepage.css";
import GlobalFooter from 'ant-design-pro/lib/GlobalFooter';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";
import Overview from "../../contents/Overview/Overview";
import Clock from 'react-live-clock';
import HistoryData from "../../contents/HistoryData/HistoryData";
import BrowseAnalysis from "../../contents/BrowseAnalysis/BrowseAnalysis";

const { Header, Sider, Content } = Layout;
const SubMenu = Menu.SubMenu;

const links = [{
    key: '帮助',
    title: '帮助',
    href: '',
}, {
    key: 'github',
    title: <Icon type="github" />,
    href: 'https://github.com/fangmiao97/Minions-Real-time-data-streaming-processing-project',
    blankTarget: true,
}, {
    key: '条款',
    title: '条款',
    href: '',
    blankTarget: true,
}];

const copyright = <div>Copyright <Icon type="copyright" /> 2019 HFUTer Fang Miao's Graduation Design - Minions</div>;

class Homepage extends Component{


    render() {
        return (
            <div className="page">
            <Router>
            <Layout style={{height:'100%'}}>
                <Sider
                    trigger={null}
                    width={240}
                    style={{ background: '#fff', boxShadow:'2px 0px 3px #cfcfcf'}}
                >
                    <div className="logo">
                        MINIONS
                    </div>

                    <Menu theme="light" mode="inline" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1">
                            <Icon type="bar-chart" />
                            <span>今日数据概览</span>
                            <Link to='/overview'/>
                        </Menu.Item>
                        <Menu.Item key="4">
                            <Icon type="area-chart" />
                            <span>历史数据查询</span>
                            <Link to='/history'/>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <Icon type="radar-chart" />
                            <span>页面行为分析Mock</span>
                            <Link to='/browseanalysis'/>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout style={{background:'#eeeef2'}}>
                    <div  style={{ height: '100%'}}>
                    <Header style={{ background: '#fff', padding: 0 ,borderBottom:'solid 2px #cfcfcf'}}>
                        <Clock
                            className="clock"
                            format="YYYY.MM.DD HH:mm:ss"
                            ticking={true}
                            interval={1000}
                            style={{ marginLeft:'32px', fontWeight:'500'}}/>
                    </Header>
                    <Content style={{
                        // margin: '16px 16px', padding: 12 , minHeight: 280
                    }}
                    >
                        <Route exact path='/' component={Overview}/>
                        <Route path='/overview' component={Overview}/>
                        <Route path='/history' component={HistoryData}/>
                        <Route path='/browseanalysis' component={BrowseAnalysis}/>
                        <GlobalFooter links={links} copyright={copyright} />
                    </Content>
                    </div>
                </Layout>
            </Layout>

            </Router>

            </div>
        );
    }
}

export default Homepage;