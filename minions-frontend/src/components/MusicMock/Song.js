import React, { Component} from 'react';
import { Card, Icon} from 'antd';

const { Meta } = Card;

Icon.setTwoToneColor('#fe2d55');

class MockSongComponent extends Component{

    render() {
        return(
            <div>
              <Card
                  style={{width: '200px'}}
              cover={<img height='200px' src="https://wx3.sinaimg.cn/mw1024/6a49516fly1g1ks3pae6sj20go0gowfv.jpg"/>}
              actions={[<Icon type="play-circle" theme="twoTone" />, <Icon type="heart" theme="twoTone" />, <Icon type="edit" theme="twoTone" />]}>
                  <Meta
                      title="Card title"
                      description="This is the description"
                  />
              </Card>
            </div>
        );
    }
}

export default MockSongComponent;