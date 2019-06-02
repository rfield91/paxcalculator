import React from "react";
import "./Output.css";

class Output extends React.Component {
    render() {
        var categories = [];

        for (var category in this.props.paxValues) {
            var paxClasses = this.props.paxValues[category];

            var classes = [];

            for (var i in paxClasses) {
                var paxClass = paxClasses[i];

                var timeToBeat = (
                    (this.props.time * this.props.selectedClass) /
                    paxClass.Pax
                ).toFixed(3);

                classes.push(
                    <div className="class-result" key={paxClass.Name}>
                        <div className="class-name">{paxClass.Name}</div>
                        <div className="time">{timeToBeat}</div>
                    </div>
                );
            }

            categories.push(
                <div className="category" key={category}>
                    <h3>{category}</h3>
                    <div className="classes">{classes}</div>
                </div>
            );
        }

        return (
            <div className="output">
                <div className="categories">{categories}</div>
            </div>
        );
    }
}

export default Output;
