import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getFromStorage } from "../utils/storage";
import { Redirect } from "react-router-dom";
import axios from "axios";

class RegisterHousingCooperative extends Component {
  constructor(props) {
    super(props);

    this.state = {
      housingCooperativeName: "",
      password: "",
      signUpError: "",
      signedUp: false,
      logOut: false,
      signedIn: true,
      isLoading: true,
    };

    //handleFunctions
    this.onTextChange = this.onTextChange.bind(this);
    this.submitData = this.submitData.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
    this.signedUp = this.signedUp.bind(this);
  }

  componentDidMount() {
    console.log("Component did mount");

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

  onTextChange(event) {
    this.setState({
      [event.target.id]: event.target.value,
    });
  }

  submitData(event) {
    event.preventDefault();
    const { housingCooperativeName, password } = this.state;
    const data = {
      housingCooperativeName,
      password,
    };

    axios
      .post("http://localhost:5000/api/admin/addhousingcooperative", data)
      .then((res) => {
        const { success, message } = res.data;
        if (!success) {
          return this.setState({
            signUpError: message,
          });
        }
        this.setState({
          signedUp: true,
          housingCooperativeName: "",
          password: "",
        });
      });
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

  signedUp() {
    this.setState({
      signedUp: false,
    });
  }

  render() {
    const { signUpError, signedUp } = this.state;
    const { logOut } = this.state;
    if (logOut) {
      return <p>{<Redirect to="/" />}</p>;
    }
    if (signedUp) {
      return (
        <div className="container">
          <div class="alert alert-success ">
            New Housing Cooperative Successfully Signed In
          </div>

          <Link to="/registerhousingcooperative">
            <button
              type="button"
              name=""
              id=""
              class="btn btn-default"
              onClick={this.signedUp}
            >
              {" "}
              Ok
            </button>
          </Link>
        </div>
      );
    }

    return (
      <div>
        <div className="container">
          <button
            type="btn btn-primary"
            className="btn "
            onClick={this.handleLogOut}
          >
            Log Out
          </button>
          <h1 style={{ textAlign: "center" }}>
            Register A New Housing Cooperative
          </h1>
          <div className="container">
            <div className="row">
              <div className="col-md-4"></div>
              <div className="col-md-4">
                <div className="form-group">
                  <br />
                  <br />
                  <input
                    type="text"
                    className="form-control"
                    id="housingCooperativeName"
                    aria-describedby="helpId"
                    onChange={this.onTextChange}
                  />
                  <small id="helpId" className="form-text text-muted">
                    Name of The Housing Cooperative
                  </small>
                  <br />
                  <br />
                  <input
                    type="email"
                    className="form-control"
                    id="password"
                    aria-describedby="password"
                    onChange={this.onTextChange}
                  />
                  <small id="passwordHelpId" className="form-text text-muted">
                    Password
                  </small>
                  <br />

                  <br />
                  <div className="form-group">
                    {signUpError ? (
                      <div class="alert alert-danger ">{signUpError}</div>
                    ) : null}

                    <div className="col-md-4"></div>
                  </div>
                  <br />

                  <button
                    type="submit"
                    style={{ marginTop: 10 }}
                    className="btn btn-primary"
                    onClick={this.submitData}
                  >
                    Submit
                  </button>
                  <br />
                </div>
              </div>
              <div className="col-md-4"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RegisterHousingCooperative;
