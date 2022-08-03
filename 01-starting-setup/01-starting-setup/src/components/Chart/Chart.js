import React from "react";
import ChartBar from "./ChartBar";
import "./Chart.css";

const Chart = (props) => {
    const dataPointValues = props.dataPoints.map(dataPoint => dataPoint.value);   // transformisemo dataPoint objekat u vrednost; map vraca niz brojeva za svih 12 meseci
    const totalMaximum = Math.max(...dataPointValues);   // max trazi listu argumenata, a da ne bismo imali niz, koristimo ...

  return (
    <div className="chart">
      {" "}
      svaki dataPoint se mapira na chartbar komponentu
      {props.dataPoints.map((dataPoint) => (
        <ChartBar
          key={dataPoint.label}
          value={dataPoint.value}
          maxValue={totalMaximum}
          label={dataPoint.label}
        />
      ))}
    </div>
  );
};

export default Chart;
