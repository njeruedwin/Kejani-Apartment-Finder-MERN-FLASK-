import React, { Component } from "react";
import axios from "axios";

export class AnalysisCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      waterPositivityPercentage: "",
      electricityPositivityPercentage: "",
    };
  }

  componentDidMount() {
    //get the positivity percentage of each aspect
    axios
      .get(
        "http://localhost:5000/api/admin/getwateranalysis?housingCooperativeName=" +
          this.props.housingCooperativeName
      )
      .then((res) => {
        this.setState({
          waterPositivityPercentage: res.data[0].positivityPercentage,
        });
      });

    axios
      .get(
        "http://localhost:5000/api/admin/getelectricityanalysis?housingCooperativeName=" +
          this.props.housingCooperativeName
      )
      .then((res) => {
        this.setState({
          electricityPositivityPercentage: res.data[0].positivityPercentage,
        });
      });
  }

  render() {
    const { waterPositivityPercentage, electricityPositivityPercentage } =
      this.state;

    return (
      <div>
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">
              Analysis {this.props.housingCooperativeName}
            </h4>
            <p class="card-text">
              {/*Water Analysis*/}
              <div class="text-xs-center" id="progressId">
                Water {waterPositivityPercentage}
              </div>
              <div class="progress">
                <div
                  class="progress-bar progress-bar-striped progress-bar-animated bg-primary"
                  role="progressbar"
                  style={{ width: waterPositivityPercentage + "%" }}
                  aria-valuenow="25"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
              {/*Electricity Analysis*/}
              <div class="text-xs-center" id="progressId">
                Electricity
              </div>
              <div class="progress">
                <div
                  class="progress-bar progress-bar-striped progress-bar-animated bg-primary"
                  role="progressbar"
                  style={{
                    width: electricityPositivityPercentage + "%",
                  }}
                  aria-valuenow="25"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default AnalysisCard;
