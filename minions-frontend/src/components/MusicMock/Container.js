import React, {Component} from 'react';
import MockSongComponent from "./Song";
import { Row } from 'antd';
import "./Container.css";

class MusicWebMockContainer extends Component{

    render() {
        return (
            <div >
                <Row>
                    <MockSongComponent/>
                    <MockSongComponent/>
                </Row>
            </div>
        );
    }
}

export default MusicWebMockContainer;