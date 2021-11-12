import React, { Component } from "react";
import "../css/admin.css";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import { getFromStorage } from "../utils/storage";
//views
import Post from "./HousingCooperative/View/Post";
import Dashboard from "./HousingCooperative/View/Dashboard";
import MyApartments from "./HousingCooperative/View/MyApartments";

class HousingCooperativeView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logOut: false,
      signedIn: true,
      isLoading: true,
      dashboardView: true,
      postView: false,
      myApartmentsView: false,
    };

    this.handleLogOut = this.handleLogOut.bind(this);
    this.changeView = this.changeView.bind(this);
    this.myView = this.myView.bind(this);
  }

  componentDidMount() {
    console.log("Component did mount");
    console.log(this.props.location.state.housingCooperativeName);

    const obj = getFromStorage("Parcel_app");
    if (obj && obj.token) {
      const { token } = obj;
      //verify the token
      console.log(token);
      axios
        .get("http://localhost:5000/api/admin/verify?token=" + token)
        .then((res) => {
          if (!res.data.success) {
            this.setState({
              logOut: true,
            });
          }

          console.log(this.state);
        });
    }
  }

  handleSignIn() {
    this.setState({
      signedIn: false,
    });
  }

  changeView(event) {
    if (event.target.id === "postView") {
      return this.setState({
        dashboardView: false,
        myApartmentsView: false,
        postView: true,
      });
    } else if (event.target.id === "myApartmentsView") {
      return this.setState({
        dashboardView: false,
        myApartmentsView: true,
        postView: false,
      });
    } else {
      return this.setState({
        dashboardView: true,
      });
    }
  }

  myView() {
    if (this.state.dashboardView) {
      return <Dashboard />;
    }
    if (this.state.postView) {
      return (
        <Post
          housingCooperativeName={
            this.props.location.state.housingCooperativeName
          }
        />
      );
    }
    if (this.state.myApartmentsView) {
      return (
        <MyApartments
          housingCooperativeName={
            this.props.location.state.housingCooperativeName
          }
        />
      );
    }
  }

  handleLogOut() {
    console.log("log out");
    const obj = getFromStorage("Parcel_app");
    const { token } = obj;
    axios
      .get("http://localhost:5000/api/admin/logout?token=" + token)
      .then((res) => {
        if (res.data.success) {
          this.setState({
            logOut: true,
          });
        }
        console.log(res.data.message);
        this.setState({
          isLoading: false,
        });

        console.log(this.state.logOut);
      });
  }

  render() {
    const housingCooperativeName =
      this.props.location.state.housingCooperativeName;
    const { logOut } = this.state;
    if (logOut) {
      return <p>{<Redirect to="/" />}</p>;
    }

    return (
      <div className="container">
        {/*left Pane*/}
        <div className="col-md-3">
          <br />
          {housingCooperativeName} Housing Cooperative
          <br />
          <hr />
          {this.props.name}
          <button
            type="btn btn-primary"
            className="btn "
            onClick={this.handleLogOut}
          >
            Log Out
          </button>
          <br />
          <hr />
          <button
            type="btn btn-primary"
            className="btn "
            id="dashboardView"
            onClick={this.changeView}
          >
            Dashboard View
          </button>
          <br />
          <hr />
          <button
            type="btn btn-primary"
            className="btn "
            id="postView"
            onClick={this.changeView}
          >
            Post An Apartment
          </button>
          <br />
          <hr />
          <button
            type="btn btn-primary"
            className="btn "
            id="myApartmentsView"
            onClick={this.changeView}
          >
            View My Apartments
          </button>
          <br />
          <hr />
          <h2 className="section-detail">Housing Cooperative view Panel</h2>
        </div>
        {/*right Pane*/}
        <div className="col-md-9">
          <div className="content-area">{this.myView()}</div>
        </div>
      </div>
    );
  }
}

export default HousingCooperativeView;
