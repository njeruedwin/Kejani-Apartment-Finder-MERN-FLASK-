import React, { Component } from "react";
import "../css/admin.css";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import { getFromStorage } from "../utils/storage";
//views
import Post from "./HousingCooperative/View/Post";
import Dashboard from "./HousingCooperative/View/Dashboard";
import MyApartments from "./HousingCooperative/View/MyApartments";
import beautifulblack from "../images/beautifulblack.jpg";
import CreateUserProfileView from "./HousingCooperative/View/CreateUserProfileView";
import UserProfileView from "./HousingCooperative/View/UserProfileView";

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
      createUserProfileView: false,
      userProfileView: false,
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
        createUserProfileView: false,
        userProfileView: false,
      });
    } else if (event.target.id === "myApartmentsView") {
      return this.setState({
        dashboardView: false,
        myApartmentsView: true,
        postView: false,
        createUserProfileView: false,
        userProfileView: false,
      });
    } else if (event.target.id === "createUserProfileView") {
      return this.setState({
        dashboardView: false,
        createUserProfileView: true,
        postView: false,
        myApartmentsView: false,
        userProfileView: false,
      });
    } else if (event.target.id === "userProfileView") {
      return this.setState({
        dashboardView: false,
        createUserProfileView: false,
        postView: false,
        myApartmentsView: false,
        userProfileView: true,
      });
    } else {
      return this.setState({
        dashboardView: true,
      });
    }
  }

  myView() {
    if (this.state.dashboardView) {
      return (
        <Dashboard
          housingCooperativeName={
            this.props.location.state.housingCooperativeName
          }
        />
      );
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
    if (this.state.createUserProfileView) {
      return (
        <CreateUserProfileView
          housingCooperativeName={
            this.props.location.state.housingCooperativeName
          }
        />
      );
    }
    if (this.state.userProfileView) {
      return (
        <UserProfileView
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
      <div
        style={{
          backgroundImage: `url(${beautifulblack})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          color: "white",
        }}
      >
        <div className="container">
          {/*left Pane*/}
          <div
            className="col-md-3"
            style={{ backgroundColor: "rgb(0,0,0,0.5)" }}
          >
            <br />
            <button
              style={{ color: "black" }}
              type="btn btn-primary"
              className="btn "
              id="userProfileView"
              onClick={this.changeView}
            >
              {housingCooperativeName} Housing Cooperative
            </button>
            <br />
            <hr />
            {this.props.name}
            <button
              style={{ color: "black" }}
              type="btn btn-primary"
              className="btn "
              onClick={this.handleLogOut}
            >
              Log Out
            </button>
            <br />
            <hr />
            <button
              style={{ color: "black" }}
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
              style={{ color: "black" }}
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
              style={{ color: "black" }}
              type="btn btn-primary"
              className="btn "
              id="myApartmentsView"
              onClick={this.changeView}
            >
              View My Apartments
            </button>
            <br />
            <hr />
            <button
              style={{ color: "black" }}
              type="btn btn-primary"
              className="btn "
              id="createUserProfileView"
              onClick={this.changeView}
            >
              Edit user Profile
            </button>
            <br />
            <hr />
            <h2 className="section-detail">
              <br />
              Housing Cooperative view Panel
              <br />
              <br />
              <br />
              <br />
            </h2>
          </div>
          {/*right Pane*/}
          <div className="col-md-9">
            <div
              className="content-area jumbotron"
              style={{
                backgroundColor: "rgb(255,255,255,0.2)",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",

                color: "white",
              }}
            >
              {this.myView()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HousingCooperativeView;
