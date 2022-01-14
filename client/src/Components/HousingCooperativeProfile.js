import React, { Component } from "react";
import axios from "axios";
import beautifulblack from "../images/beautifulblack.jpg";
import blackcoach from "../images/blackcoach.jpg";

class HousingCooperativeProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userData: [],
    };

    this.profile = this.profile.bind(this);
  }

  componentDidMount() {
    console.log(this.props.location.housingCooperativeName);
    axios
      .get(
        "http://localhost:5000/api/admin/getuserprofile?housingCooperativeName=" +
          this.props.location.housingCooperativeName
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
    console.log("hereee");
    return this.state.userData.map((data) => (
      <div>
        <p style={{ textAlign: "center", fontSize: "40px" }}>
          {this.props.location.housingCooperativeName} User Profile{" "}
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
    console.log(this.props.location.housingCooperativeName);
    return (
      <div
        style={{
          backgroundImage: `url(${beautifulblack})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          height: "100vh",
        }}
      >
        <div style={{ paddingTop: "50px" }}>
          <div
            class="jumbotron"
            style={{
              backgroundColor: "rgb(255,255,255,0.2)",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",

              color: "white",
            }}
          >
            <div
              className="container card"
              style={{ backgroundColor: "rgb(0,0,0,0.5)" }}
            >
              <h1
                style={{
                  fontFamily: 'Georgia, "Times New Roman", Times, serif',
                }}
              >
                {this.props.location.housingCooperativeName}
              </h1>
              <p>Kejani. Finding Your Home.</p>

              <p>
                <button
                  type="button"
                  class="btn btn-primary btn-lg"
                  data-toggle="collapse"
                  data-target="#demo"
                >
                  View Profile
                </button>{" "}
                <div id="demo" class="collapse">
                  {this.profile()}
                </div>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HousingCooperativeProfile;
