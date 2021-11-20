import React from 'react';
import {Card, Col, Button, Row} from 'antd';
import SoilElements from './SoilElements';


  
const tabListNoTitle = [
    {
      key: 'Soil',
      tab: 'Soil',
    }
  ];

const contentListNoTitle = {

    Soil: 
      <div>
        <Col span={20} >
          <SoilElements />
        </Col>
      </div>
  };
  
class StatCard extends React.Component {
    
    state = {
      noTitleKey: 'Soil',
    };
  
    onTabChange = (key, type) => {
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