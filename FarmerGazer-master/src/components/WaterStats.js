import React from 'react';
import {
    Chart,
    Geom,
    Axis,
    Tooltip,
    Legend,
   } from "bizcharts";
import DataSet from "@antv/data-set";
import rawData from "../data.json";

const data = rawData.waterStats;

class WaterStats extends React.Component {
    render() {
      const ds = new DataSet();
      const dv = ds.createView().source(data);

      dv.transform({
        type: "fold",
        fields: ['0-30', '30-60', '60-90', '90-120', '120-150', '150-180', '180-210', '210-240', '240-270', '270-300', '300-330', '330-360'],
        key: "periods",
        value: "waterSupply"
      });
      return (
        <div>
          <Chart height={400} data={dv} forceFit>
            <Legend />
            <Axis name="periods"/>
            <Axis name="waterSupply" 
            label={{
              formatter: val => `${val}L`
            }}
            />
            <Tooltip />
            <Geom
              type="intervalStack"
              position="periods*waterSupply"
              color={"title"}
              style={{
                stroke: "#fff",
                lineWidth: 1
              }}
            />
          </Chart>
        </div>
      );
    }
   }

export default WaterStats;