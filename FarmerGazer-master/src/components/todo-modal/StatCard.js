import React from 'react';
import {Card, Col, Button, Row} from 'antd';
import WaterMark from '../WaterMark';
import SoilElements from '../SoilElements';
import WaterStats from '../WaterStats';


  
const tabListNoTitle = [
    {
      key: 'Water',
      tab: 'Water',
    },
    {
      key: 'Soil',
      tab: 'Soil',
    },
    {
      key: 'Bads',
      tab: 'Bads',
    },
  ];

const contentListNoTitle = {
    Water:
    <div>
        <Col span={20} >
          <Row type="flex" justify="start" align="middle">
            <WaterStats />
          </Row>  

        </Col>
        <Col span={4} >
          <WaterMark />
        </Col>
    </div>,
    Soil: 
      <div>
        <Col span={20} >
          <SoilElements />
        </Col>
      </div>,
    Bads: 
      <div>
        <Col span={20} >
          <p>Map</p>
          <img alt="map" src="/src/map-cairns.gif"></img>
        </Col>
        <Col span={4} >
          <Row >
            <Button type="Primary" size="large">Pest</Button>
            <Button type="Primary" size="large">Sickness</Button>
          </Row>
          <Row >
            <Button type="Primary" size="large">Drought</Button>
            <Button type="Primary" size="large">Storm</Button>
          </Row>    
        
        </Col>
      </div>,
  };
  
class StatCard extends React.Component {
    
    state = {
      noTitleKey: 'Water',
    };
  
    onTabChange = (key, type) => {
      //console.log(key, type);
      this.setState({ [type]: key });
    };
  
    render() {
      return (
        <div>
          <Card
            style={{ width: '100%' }}
            tabList={tabListNoTitle}
            activeTabKey={this.state.noTitleKey}

            onTabChange={key => {
              this.onTabChange(key, 'noTitleKey');
            }}
          >
            {contentListNoTitle[this.state.noTitleKey]}

          </Card>
        </div>
      );
    }
  }

export default StatCard;