import React from "react";
import {
    Chart,
    Geom,
    Axis,
    Tooltip,
    Coord,
} from "bizcharts";
import DataSet from "@antv/data-set";

class Basic extends React.Component {
    render() {
        const data = [
            {
                fieldName: "1. Field",
                ndviIndex: 0.6
            },
            {
                fieldName: "2. Field",
                ndviIndex: 0.3
            },
            {
                fieldName: "3. Field",
                ndviIndex: 0.7
            },


        ];
        const ds = new DataSet();
        const dv = ds.createView().source(data);
        dv.source(data).transform({
            type: "sort-by",
            fields: [ 'ndviIndex' ],
            order: 'ASC'
        });
        return (
            <div>
                <Chart height={250} data={dv} forceFit padding={[ 20, 40, 20, 60]}>
                    <Coord transpose />
                    <Axis
                        name="fieldName"
                        label={{
                            offset: 12
                        }}
                    />
                    <Axis name="ndviIndex" />
                    <Tooltip />
                    <Geom type="interval" position="fieldName*ndviIndex" />
                </Chart>
            </div>
        );
    }
}

export default Basic;
