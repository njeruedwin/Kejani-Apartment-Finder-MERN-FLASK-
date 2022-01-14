import React, { Component } from "react";
import axios from "axios";

export class UserProfileView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userData: [],
    };

    this.profile = this.profile.bind(this);
  }

  componentDidMount() {
    axios
      .get(
        "http://localhost:5000/api/admin/getuserprofile?housingCooperativeName=" +
          this.props.housingCooperativeName
      )
      .then((res) => {
        console.log(res.data);
        if (res.data.success == false) {
          return this.setState({
            message: res.data.message,
          });
        }

        this.setState({
          userData: res.data,
        });

        console.log(this.state.userData);
      });
  }

  profile = () => {
    return this.state.userData.map((data) => (
      <div style={{ backgroundColor: "rgb(0,0,0,0.5)" }}>
        <p style={{ textAlign: "center", fontSize: "40px" }}>
          {this.props.housingCooperativeName} User Profile{" "}
        </p>
        <div>
          <div class="col-md-6">
            <p style={{ backgroundColor: "rgb(0,0,0,0.5)", padding: "10px" }}>
              Email: {data.email}
            </p>
            <p style={{ backgroundColor: "rgb(0,0,0,0.5)", padding: "10px" }}>
              Address: {data.addressOne}
            </p>
            <p style={{ backgroundColor: "rgb(0,0,0,0.5)", padding: "10px" }}>
              Address 2: {data.addressTwo}
            </p>
            <p style={{ backgroundColor: "rgb(0,0,0,0.5)", padding: "10px" }}>
              description: {data.description}
            </p>
          </div>
          <div class="col-md-6">
            <p style={{ backgroundColor: "rgb(0,0,0,0.5)", padding: "10px" }}>
              Phone Number: {data.phoneNumber}
            </p>
            <p style={{ backgroundColor: "rgb(0,0,0,0.5)", padding: "10px" }}>
              Location: {data.location}
            </p>
          </div>
        </div>
      </div>
    ));
  };
  render() {
    return <div>{this.profile()}</div>;
  }
}

export default UserProfileView;
