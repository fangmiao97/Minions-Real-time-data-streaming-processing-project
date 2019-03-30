import React, {Component} from 'react';
import MockSongComponent from "./Song";
import { Row, Col } from 'antd';
import "./Container.css";
import Overview from "../../contents/Overview/Overview";

class MusicWebMockContainer extends Component{

    render() {
        return (
            <div className="basement">
                    <MockSongComponent/>
                    <MockSongComponent/>
                <MockSongComponent/>
                <MockSongComponent/>
                <MockSongComponent/>
                <MockSongComponent/>
                <MockSongComponent/>
                <MockSongComponent/>
                <MockSongComponent/>
            </div>
        );
    }
}

export default MusicWebMockContainer;