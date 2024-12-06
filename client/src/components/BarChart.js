import React from "react";
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Column2D from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme);

const BarChart = ({data}) => {
  const chartConfigs = {
    type: "column2d",
    width: "100%", 
    height: "200",
    dataFormat: "json", 
    dataSource: {
      chart: {
        caption: "Order per month",
        xAxisName: "Month",
        yAxisName: "Order",
        theme: "fusion",
      },
      data
    },
  };
  return (
     <ReactFC {...chartConfigs}/>
  )
}
export default BarChart;
