import React, { Component } from 'react';
import MusicWebMockTitle from "../../components/Titles/MusicWebMockTitle";
import { Row} from 'antd';
import MusicWebMockContainer from "../../components/MusicMock/SongsContainer";
import TodaySongsData from "../../components/MusicMock/TodaySongsData";

class BrowseAnalysis extends Component{


    render() {
        return (
            <div>
                <Row>
                    <MusicWebMockTitle/>
                </Row>
                    <MusicWebMockContainer/>
                    <TodaySongsData/>
            </div>
        );
    }
}

export default BrowseAnalysis;