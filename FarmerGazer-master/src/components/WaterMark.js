import React from 'react';
import { Tooltip, Progress } from 'antd';
import watermark from '../data.json';

const data = watermark;


class WaterMark extends React.Component {
    render() {
        return (
            <div>
                <p>Water Mark</p>
                <Tooltip title="Water Level ( Currrent / Required )">
                <Progress percent={data.watermark.req} successPercent={data.watermark.current} type="circle" />
                </Tooltip>
            </div>
        );
    }
}

export default WaterMark;