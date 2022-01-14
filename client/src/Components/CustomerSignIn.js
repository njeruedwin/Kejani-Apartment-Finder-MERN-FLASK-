import React, { Component } from "react";
import "../css/signIn.css";
import Admin from "./Admin";
import { Link } from "react-router-dom";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { setInStorage } from "../utils/storage";
import signinapartment from "../images/apartment4.jpg";
import beautifulblack from "../images/beautifulblack.jpg";

class CustomerSignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      customerName: "",
      password: "",

      signInError: "",
      signedIn: false,
    };

    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleCustomerNameChange = this.handleCustomerNameChange.bind(this);

    this.submitData = this.submitData.bind(this);
  }

  handlePasswordChange(event) {
    this.setState({
      password: event.target.value,
    });
  }

  handleCustomerNameChange(event) {
    this.setState({
      customerName: event.target.value,
    });
  }

  submitData(event) {
    event.preventDefault();
    const { customerName, password } = this.state;

    const data = {
      customerName,
      password,
    };

    axios
      .post("http://localhost:5000/api/admin/customersignIn", data)
      .then((res) => {
        const { success, message, token } = res.data;
        if (!success) {
          return this.setState({
            signInError: message,
          });
        }
        setInStorage("Parcel_app", { token: token });
        this.setState({
          signedIn: true,
          password: "",
        });
      });

    console.log(this.state);
  }

  render() {
    const { password, signedIn, signInError } = this.state;
    if (signedIn) {
      //remainder:change signedIn state back to false
      return (
        <Redirect
          to={{
            pathname: "/admin",
            state: {
              customerName: this.state.customerName,
            },
          }}
        />
      );
    }
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
        <div
          className="container"
          style={{
            color: "white",
            borderRadius: "0px",
            paddingTop: "150px",
            boxShadow: "rgb(38,57,77) 0px 20px 30px -10px",
          }}
        >
          <h1 style={{ textAlign: "center" }}>Sign In</h1>
          <div className="row">
            <div className="col-md-4"></div>
            <div className="col-md-4">
              <div className="form-group">
                <br />
                <br />
                <input
                  type="text"
                  className="form-control"
                  id="customerName"
                  aria-describedby="helpId"
                  onChange={this.handleCustomerNameChange}
                />
                <small
                  id="helpId"
                  className="form-text text-muted"
                  style={{ color: "white" }}
                >
                  User Name
                </small>
                <br />
                <br />
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  aria-describedby="password"
                  onChange={this.handlePasswordChange}
                />
                <small
                  id="passwordHelpId"
                  className="form-text text-muted"
                  style={{ color: "white" }}
                >
                  Password
                </small>
                <br />
                <div className="form-group">
                  {signInError ? (
                    <div class="alert alert-danger ">{signInError}</div>
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
                <strong>
                  If do not have an account{" "}
                  <Link to="/customersignup">Sign Up</Link>
                </strong>
              </div>
            </div>
            <div className="col-md-4"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default CustomerSignIn;
