import React, { Component } from "react";
import AnalysisCard from "./AnalysisCard";

export class Dashboard extends Component {
  render() {
    return (
      <div style={{ backgroundColor: "rgb(0,0,0,0.5)" }}>
        <p style={{ textAlign: "center", fontSize: "40px" }}>
          {this.props.housingCooperativeName} Dashboard Analysis{" "}
        </p>
        <hr />
        <AnalysisCard
          housingCooperativeName={this.props.housingCooperativeName}
        />
      </div>
    );
  }
}

export default Dashboard;
