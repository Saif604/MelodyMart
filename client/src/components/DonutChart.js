import React from "react";
import ReactFC from "react-fusioncharts";

function DonutChart({ data }) {
  const chartConfigs = {
    type: "doughnut2d",
    width: "100%",
    height: "300",
    dataFormat: "json",
    theme: "fusion",
    dataSource: {
      chart: {
        caption: "Company-wise expense",
        numberSuffix: "%",
        showPercentValues: "1",
        theme: "fusion",
      },
      data,
    },
  };
  return <ReactFC {...chartConfigs} />;
}

export default DonutChart;
