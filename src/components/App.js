import React from "react";
import Calculator from "./Calculator";
import Output from "./Output";
import "./App.css";

class App extends React.Component {
    state = {
        paxValues: {
            Street: [
                { Name: "SS", Pax: 0.821 },
                { Name: "AS", Pax: 0.817 },
                { Name: "BS", Pax: 0.81 },
                { Name: "CS", Pax: 0.809 },
                { Name: "DS", Pax: 0.8 },
                { Name: "ES", Pax: 0.789 },
                { Name: "FS", Pax: 0.803 },
                { Name: "GS", Pax: 0.788 },
                { Name: "HS", Pax: 0.78 },
                { Name: "SSR", Pax: 0.843 }
            ],
            "Street Touring": [
                { Name: "SSC", Pax: 0.801 },
                { Name: "STS", Pax: 0.811 },
                { Name: "STX", Pax: 0.815 },
                { Name: "STR", Pax: 0.827 },
                { Name: "STU", Pax: 0.828 },
                { Name: "STH", Pax: 0.813 }
            ],
            CAM: [
                { Name: "CAM-T", Pax: 0.812 },
                { Name: "CAM-C", Pax: 0.82 },
                { Name: "CAM-S", Pax: 0.833 }
            ],
            "Street Prepared": [
                { Name: "SSP", Pax: 0.853 },
                { Name: "ASP", Pax: 0.85 },
                { Name: "BSP", Pax: 0.851 },
                { Name: "CSP", Pax: 0.857 },
                { Name: "DSP", Pax: 0.84 },
                { Name: "ESP", Pax: 0.836 },
                { Name: "FSP", Pax: 0.824 }
            ],
            "Street Modified": [
                { Name: "SMF", Pax: 0.841 },
                { Name: "SM", Pax: 0.855 },
                { Name: "SSM", Pax: 0.875 }
            ],
            Prepared: [
                { Name: "XP", Pax: 0.885 },
                { Name: "BP", Pax: 0.865 },
                { Name: "CP", Pax: 0.848 },
                { Name: "DP", Pax: 0.858 },
                { Name: "EP", Pax: 0.849 },
                { Name: "FP", Pax: 0.863 }
            ],
            Modified: [
                { Name: "AM", Pax: 1.0 },
                { Name: "BM", Pax: 0.96 },
                { Name: "CM", Pax: 0.891 },
                { Name: "DM", Pax: 0.895 },
                { Name: "EM", Pax: 0.894 },
                { Name: "FM", Pax: 0.907 },
                { Name: "FSAE", Pax: 0.962 }
            ],
            Kart: [
                { Name: "KM", Pax: 0.93 },
                { Name: "JA", Pax: 0.856 },
                { Name: "JB", Pax: 0.822 },
                { Name: "JC", Pax: 0.718 }
            ],
            Historic: [{ Name: "HCS", Pax: 0.793 }, { Name: "HCR", Pax: 0.814 }]
        },
        time: "",
        selectedClass: 0
    };

    onCalculate = data => {
        // console.log("Data: ", data);
        this.setState({
            time: data.time,
            selectedClass: data.selectedClass
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
