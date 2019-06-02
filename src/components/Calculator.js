import React from "react";
import "./Calculator.css";

class Calculator extends React.Component {
    state = {
        time: "",
        selectedClass: ""
    };

    constructor(props) {
        super(props);

        this.state.selectedClass = this.props.paxValues["Street"][0].Pax;
    }

    onClassChange = event => {
        this.setState({
            selectedClass: event.target.value
        });

        this.props.onCalculate({
            time: this.state.time,
            selectedClass: event.target.value
        });
    };

    onTimeChange = event => {
        var time = event.target.value;

        this.setState({
            time: time
        });

        this.props.onCalculate({
            time: time,
            selectedClass: this.state.selectedClass
        });
    };

    render() {
        var options = [];

        var paxTime = (this.state.time * this.state.selectedClass).toFixed(3);

        for (const category in this.props.paxValues) {
            var paxClasses = this.props.paxValues[category];

            var optionItems = [];

            for (const i in paxClasses) {
                var paxClass = paxClasses[i];

                optionItems.push(
                    <option key={paxClass.Name} value={paxClass.Pax}>
                        {paxClass.Name}
                    </option>
                );
            }

            options.push(
                <optgroup label={category} key={category}>
                    {optionItems}
                </optgroup>
            );
        }

        return (
            <div className="calculator">
                <div className="inputs">
                    <div>
                        <input
                            type="number"
                            step="any"
                            placeholder="Your time"
                            value={this.state.time}
                            onChange={this.onTimeChange}
                        />
                    </div>
                    <div>
                        <select
                            className="ui selection dropdown"
                            value={this.state.selectedClass}
                            onChange={this.onClassChange}
                        >
                            {options}
                        </select>
                    </div>
                </div>
                <div className="pax-time">
                    <h3>PAX Time</h3>
                    <div>{paxTime}</div>
                </div>
            </div>
        );
    }
}

export default Calculator;
