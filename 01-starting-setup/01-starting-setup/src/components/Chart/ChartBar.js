import "./ChartBar.css";

const ChartBar = (props) => {
  let barFillHeight = "0%"; // string je zato sto ce se nadovezati u css fajl

  if (props.maxValue > 0) {
    barFillHeight = Math.round((props.value / props.maxValue) * 100) + "%";
  }

  return (
    <div className="chart-bar">
      <div className="chart-bar__inner">
        <div
          className="chart-bar__fill"
          style={{ height: barFillHeight }}  /* style kao vr. prima js objekat, pa zbog toga idu unutrasnje {}  */
        ></div>{" "}
        
      </div>
      <div className="chart-bar__label">{props.label}</div>
    </div>
  );
};

export default ChartBar;
