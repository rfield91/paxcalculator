import React from "react";
import Calculator from "./Calculator";
import Output from "./Output";
import "./App.css";

class App extends React.Component {
  state = {
    paxValues: {
      Street: [
        { Name: "SS", Pax: 0.822 },
        { Name: "AS", Pax: 0.819 },
        { Name: "BS", Pax: 0.814 },
        { Name: "CS", Pax: 0.809 },
        { Name: "DS", Pax: 0.806 },
        { Name: "ES", Pax: 0.793 },
        { Name: "FS", Pax: 0.804 },
        { Name: "GS", Pax: 0.792 },
        { Name: "HS", Pax: 0.78 },
        { Name: "SSR", Pax: 0.843 },
      ],
      "Street Touring": [
        { Name: "SSC", Pax: 0.805 },
        { Name: "STS", Pax: 0.812 },
        { Name: "STX", Pax: 0.816 },
        { Name: "STR", Pax: 0.827 },
        { Name: "STU", Pax: 0.828 },
        { Name: "STH", Pax: 0.813 },
      ],
      CAM: [
        { Name: "CAMT", Pax: 0.817 },
        { Name: "CAMC", Pax: 0.818 },
        { Name: "CAMS", Pax: 0.833 },
      ],
      "Street Prepared": [
        { Name: "SSP", Pax: 0.853 },
        { Name: "ASP", Pax: 0.849 },
        { Name: "BSP", Pax: 0.852 },
        { Name: "CSP", Pax: 0.865 },
        { Name: "DSP", Pax: 0.842 },
        { Name: "ESP", Pax: 0.839 },
        { Name: "FSP", Pax: 0.823 },
      ],
      "Street Modified": [
        { Name: "SMF", Pax: 0.841 },
        { Name: "SM", Pax: 0.854 },
        { Name: "SSM", Pax: 0.875 },
      ],
      Prepared: [
        { Name: "XP", Pax: 0.88 },
        { Name: "BP", Pax: 0.867 },
        { Name: "CP", Pax: 0.851 },
        { Name: "DP", Pax: 0.866 },
        { Name: "EP", Pax: 0.85 },
        { Name: "FP", Pax: 0.868 },
      ],
      Modified: [
        { Name: "AM", Pax: 1.0 },
        { Name: "BM", Pax: 0.962 },
        { Name: "CM", Pax: 0.893 },
        { Name: "DM", Pax: 0.895 },
        { Name: "EM", Pax: 0.896 },
        { Name: "FM", Pax: 0.911 },
        { Name: "FSAE", Pax: 0.963 },
      ],
      Kart: [
        { Name: "KM", Pax: 0.93 },
        { Name: "JA", Pax: 0.855 },
        { Name: "JB", Pax: 0.82 },
        { Name: "JC", Pax: 0.718 },
      ],
      Historic: [
        { Name: "HCS", Pax: 0.794 },
        { Name: "HCR", Pax: 0.815 },
      ],
    },
    time: "",
    selectedClass: 0,
  };

  onCalculate = (data) => {
    this.setState({
      time: data.time,
      selectedClass: data.selectedClass,
    });
  };

  render() {
    return (
      <div className="app">
        <Calculator
          paxValues={this.state.paxValues}
          onCalculate={this.onCalculate}
        />
        <Output
          paxValues={this.state.paxValues}
          time={this.state.time}
          selectedClass={this.state.selectedClass}
        />
      </div>
    );
  }
}

export default App;
