import React from "react";
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Column2D from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
ReactFC.fcRoot(FusionCharts,Column2D,FusionTheme)

function LineChart({data}) {
  const chartConfigs = {
    type:"line",
    width:"100%",
    height:"300",
    dataFormat:"json",
    theme:"fusion",
    dataSource:{
    chart: {
      caption: "Monthly expense",
      xAxisName: "Month",
      yAxisName: "Expense (in INR)",
      theme: "fusion",
    },
    data,
  }
}
  return (
    <ReactFC
      {...chartConfigs}
    />
  );
}

export default LineChart;
