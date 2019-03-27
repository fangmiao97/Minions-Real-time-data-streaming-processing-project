import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import "./Homepage.css";
import GlobalFooter from 'ant-design-pro/lib/GlobalFooter';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";
import Overview from "../../contents/Overview/Overview";
import BrowseAnalysis from "../../contents/BrowseAnalysis/BrowseAnalysis";
import Clock from 'react-live-clock';
import App from "../../App";
import HistoryData from "../../contents/HistoryData/HistoryData";

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

    state = {
        collapsed: false,
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    render() {
        return (
            <div className="page">
            <Router>
            <Layout style={{ height: '100%'}}>
                <Sider
                    trigger={null}
                    collapsible
                    collapsed={this.state.collapsed}
                >
                    <div className="logo">
                        MINIONS
                    </div>

                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
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
                        <Menu.Item key="2">
                            <Icon type="fund" />
                            <span>页面浏览分析</span>
                            <Link to='/browseanalysis'/>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <Icon type="radar-chart" />
                            <span>页面行为分析</span>
                        </Menu.Item>
                        <SubMenu key="sub1" title={<span><Icon type="mail" /><span>Navigation One</span></span>}>
                            <Menu.Item key="11">Option 1</Menu.Item>
                            <Menu.Item key="12">Option 2</Menu.Item>
                            <Menu.Item key="13">Option 3</Menu.Item>
                            <Menu.Item key="14">Option 4</Menu.Item>
                        </SubMenu>
                    </Menu>
                </Sider>
                <Layout>
                    <div>
                    <Header style={{ background: '#fff', padding: 0 }}>
                        <Icon
                            className="trigger"
                            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.toggle}
                        />
                        <Clock
                            className="clock"
                            format="YYYY.MM.DD HH:mm:ss"
                            ticking={true}
                            interval={1000} />
                    </Header>
                    <Content style={{
                        margin: '16px 16px', padding: 12 , minHeight: 280,
                    }}
                    >
                        <Route exact path='/' component={Overview}/>
                        <Route path='/overview' component={Overview}/>
                        <Route path='/history' component={HistoryData}/>
                        <Route path='/browseanalysis' component={App}/>
                    </Content>
                    </div>
                    <GlobalFooter links={links} copyright={copyright} />
                </Layout>
            </Layout>

            </Router>
            </div>
        );
    }
}

export default Homepage;