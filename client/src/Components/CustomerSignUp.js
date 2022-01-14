import React, { Component } from "react";
import { Link } from "react-router-dom";
import CustomerSignIn from "./CustomerSignIn";
import "whatwg-fetch";
import { json } from "body-parser";
import beautifulblack from "../images/beautifulblack.jpg";
import axios from "axios";

class CustomerSignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      customerName: "",
      password: "",
      signUpError: "",
      signedUp: false,
    };

    //handleFunctions
    this.onTextChange = this.onTextChange.bind(this);
    this.submitData = this.submitData.bind(this);
  }

  onTextChange(event) {
    this.setState({
      [event.target.id]: event.target.value,
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
      .post("http://localhost:5000/api/admin/customersignUp", data)
      .then((res) => {
        const { success, message } = res.data;
        if (!success) {
          return this.setState({
            signUpError: message,
          });
        }
        this.setState({
          signedUp: true,
          customerName: "",
          password: "",
        });
      });
  }
  render() {
    const { signUpError, signedUp } = this.state;
    if (signedUp) {
      //remainder:change signedUp state back to false
      return <CustomerSignIn />;
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
          <h1 style={{ textAlign: "center" }}>Sign Up</h1>

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
                  onChange={this.onTextChange}
                />
                <small id="helpId" className="form-text text-muted">
                  User Name
                </small>
                <br />
                <br />
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  aria-describedby="password"
                  onChange={this.onTextChange}
                />
                <small id="passwordHelpId" className="form-text text-muted">
                  Password
                </small>
                <br />
                <div className="form-group">
                  {signUpError ? (
                    <div class="alert alert-danger ">{signUpError}</div>
                  ) : null}

                  <div className="col-md-4"></div>

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
                    If you already have an account{" "}
                    <Link to="/customersignin">Sign in</Link>
                  </strong>
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

export default CustomerSignUp;
