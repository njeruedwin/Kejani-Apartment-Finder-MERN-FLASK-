import React, { Component } from "react";
import axios from "axios";

export class AnalysisCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      waterPositivityPercentage: "",
      electricityPositivityPercentage: "",
      sanitationPositivityPercentage: "",
      internetPositivityPercentage: "",
      securityPositivityPercentage: "",
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

    axios
      .get(
        "http://localhost:5000/api/admin/getsanitationanalysis?housingCooperativeName=" +
          this.props.housingCooperativeName
      )
      .then((res) => {
        this.setState({
          sanitationPositivityPercentage: res.data[0].positivityPercentage,
        });
      });
    axios
      .get(
        "http://localhost:5000/api/admin/getinternetanalysis?housingCooperativeName=" +
          this.props.housingCooperativeName
      )
      .then((res) => {
        this.setState({
          internetPositivityPercentage: res.data[0].positivityPercentage,
        });
      });

    axios
      .get(
        "http://localhost:5000/api/admin/getsecurityanalysis?housingCooperativeName=" +
          this.props.housingCooperativeName
      )
      .then((res) => {
        this.setState({
          securityPositivityPercentage: res.data[0].positivityPercentage,
        });
      });
  }

  render() {
    const {
      waterPositivityPercentage,
      electricityPositivityPercentage,
      sanitationPositivityPercentage,
      internetPositivityPercentage,
      securityPositivityPercentage,
    } = this.state;

    return (
      <div style={{ margin: "0px 30px 0px 30px" }}>
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">
              <br />
              Analysis {this.props.housingCooperativeName}
            </h4>
            <p className="card-text">
              {/*Water Analysis*/}
              <div className="text-xs-center" id="progressId">
                Water {waterPositivityPercentage}
              </div>
              <div className="progress">
                <div
                  className="progress-bar progress-bar-striped progress-bar-animated bg-primary"
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
              {/*Sanitation Analysis*/}
              <div className="text-xs-center" id="progressId">
                Sanitation {sanitationPositivityPercentage}
              </div>
              <div className="progress">
                <div
                  className="progress-bar progress-bar-striped progress-bar-animated bg-primary"
                  role="progressbar"
                  style={{ width: sanitationPositivityPercentage + "%" }}
                  aria-valuenow="25"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
              {/*Internet Analysis*/}
              <div class="text-xs-center" id="progressId">
                Internet
              </div>
              <div class="progress">
                <div
                  class="progress-bar progress-bar-striped progress-bar-animated bg-primary"
                  role="progressbar"
                  style={{
                    width: internetPositivityPercentage + "%",
                  }}
                  aria-valuenow="25"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
              {/*Security Analysis*/}
              <div class="text-xs-center" id="progressId">
                Security
              </div>
              <div class="progress">
                <div
                  class="progress-bar progress-bar-striped progress-bar-animated bg-primary"
                  role="progressbar"
                  style={{
                    width: securityPositivityPercentage + "%",
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
