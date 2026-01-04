import React, { useEffect } from "react";
import axios from "axios";
import "chart.js/auto";
import { Line } from "react-chartjs-2";
import { Data } from "../Data";
import "../styles/Header.css";
/**
 * Website https://www.alphavantage.co/
 * my key: VQ9NKWAWAZGY4ASZ
 * go to the above website click on get free api key and sign up to get apikey
 * two symbols to try: IBM, AAPL, MSFT, GOOGL, TSCO
 * @param {*} props
 * @returns
 */
function Header(props) {
  useEffect(() => {
    axios
      .get(
        `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=VQ9NKWAWAZGY4ASZ`
      )
      .then((data) => {
        console.log("Initial fetch data:", data);
        const payload = data && data.data ? data.data : data;
        if (!payload || !payload["Time Series (Daily)"]) {
          console.error("Invalid API response:", payload);
          return;
        }

        const newDayIntervalDataLabels = [];
        const newDayIntervalDataOpenDataSet = [];
        const newDayIntervalDataHighDataSet = [];
        const newDayIntervalDataLowDataSet = [];
        const newDayIntervalDataCloseDataSet = [];

        for (const [Key, value] of Object.entries(
          payload["Time Series (Daily)"]
        )) {
          newDayIntervalDataLabels.push(Key.slice(5, Key.length));
          newDayIntervalDataOpenDataSet.push(value["1. open"]);
          newDayIntervalDataHighDataSet.push(value["2. high"]);
          newDayIntervalDataLowDataSet.push(value["3. low"]);
          newDayIntervalDataCloseDataSet.push(value["4. close"]);
        }

        props.setDayIntervalData({
          newDayIntervalDataLabels,
          newDayIntervalDataOpenDataSet,
          newDayIntervalDataHighDataSet,
          newDayIntervalDataLowDataSet,
          newDayIntervalDataCloseDataSet,
        });
      })
      .catch((err) => console.error("API Error:", err));
  }, []);

  function handleChange(event) {
    props.setName(event.target.value);
  }

  function handleClick() {
    if (props.name.trim() === "") return;
    console.log("Stock entered: " + props.name);
    axios
      .get(
        `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${props.name}&apikey=VQ9NKWAWAZGY4ASZ`
      )
      .then((data) => {
        console.log("Fetch data on search:", data.data["Meta Data"]);
        const payload = data && data.data ? data.data : data;
        if (!payload || !payload["Time Series (Daily)"]) {
          console.error("Invalid API response:", payload);
          return;
        }

        const newDayIntervalDataLabels = [];
        const newDayIntervalDataOpenDataSet = [];
        const newDayIntervalDataHighDataSet = [];
        const newDayIntervalDataLowDataSet = [];
        const newDayIntervalDataCloseDataSet = [];

        for (const [Key, value] of Object.entries(
          payload["Time Series (Daily)"]
        )) {
          newDayIntervalDataLabels.push(Key.slice(5));
          newDayIntervalDataOpenDataSet.push(value["1. open"]);
          newDayIntervalDataHighDataSet.push(value["2. high"]);
          newDayIntervalDataLowDataSet.push(value["3. low"]);
          newDayIntervalDataCloseDataSet.push(value["4. close"]);
        }

        props.setDayIntervalData({
          newDayIntervalDataLabels,
          newDayIntervalDataOpenDataSet,
          newDayIntervalDataHighDataSet,
          newDayIntervalDataLowDataSet,
          newDayIntervalDataCloseDataSet,
        });
      })
      .catch((err) => console.error("API Error:", err));
  }
  return (
    <div>
      <div id="header-wrapper">
        <div id="heading">Stock Market App</div>
        <div id="search-wrapper">
          <input
            type="text"
            id="search-bar"
            placeholder="Search for a stock..."
            value={props.name}
            onChange={handleChange}
          />
          <button id="search-button" onClick={handleClick}>
            Search
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;
