import React from "react";
import { Line } from "react-chartjs-2";
import "../styles/Data.css";

function DayIntervalChart(props) {
  console.log("DayIntervalChart props:", props.dayIntervalData);

  const labels = props.dayIntervalData?.newDayIntervalDataLabels ?? [];
  const openData = props.dayIntervalData?.newDayIntervalDataOpenDataSet ?? [];
  const highData = props.dayIntervalData?.newDayIntervalDataHighDataSet ?? [];
  const lowData = props.dayIntervalData?.newDayIntervalDataLowDataSet ?? [];
  const closeData = props.dayIntervalData?.newDayIntervalDataCloseDataSet ?? [];

  const stuff =
    props.id === "first"
      ? {
          labels,
          datasets: [
            {
              label: "High",
              data: highData,
              borderColor: "green",
              backgroundColor: "green",
            },
            {
              label: "Low",
              data: lowData,
              borderColor: "red",
              backgroundColor: "red",
            },
          ],
        }
      : {
          labels,
          datasets: [
            {
              label: "Open",
              data: openData,
              borderColor: "blue",
              backgroundColor: "blue",
            },
            {
              label: "Close",
              data: closeData,
              borderColor: "orange",
              backgroundColor: "orange",
            },
          ],
        };

  return (
    <div>
      <Line
        data={stuff}
        id="day-interval-data-wrapper"
        className="chart-wrapper"
      />
    </div>
  );
}

export default DayIntervalChart;
