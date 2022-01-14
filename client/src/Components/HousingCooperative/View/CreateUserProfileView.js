import React, { Component } from "react";
import axios from "axios";

export class CreateUserProfileView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      housingCooperativeName: this.props.housingCooperativeName,
      updated: false,
      email: "",
      phoneNumber: "",
      location: "",
      addressOne: "",
      adressTwo: "",
      description: "",
      error: "",
    };

    this.onTextChange = this.onTextChange.bind(this);
    this.updateUserProfile = this.updateUserProfile.bind(this);
  }

  onTextChange(event) {
    this.setState({
      [event.target.id]: event.target.value,
    });
  }

  updateUserProfile = (event) => {
    event.preventDefault();
    const {
      housingCooperativeName,
      email,
      phoneNumber,
      location,
      addressOne,
      addressTwo,
      description,
    } = this.state;
    const data = {
      housingCooperativeName,
      email,
      phoneNumber,
      location,
      addressOne,
      addressTwo,
      description,
    };

    axios
      .post("http://localhost:5000/api/admin/updateuserprofile", data)
      .then((res) => {
        const { success, message } = res.data;
        if (!success) {
          return this.setState({
            error: message,
          });
        }
        this.setState({
          updated: true,
          email: "",
          phoneNumber: "",
          location: "",
          addressOne: "",
          addressTwo: "",
          description: "",
          error: "",
        });
      });
  };

  render() {
    return (
      <div style={{ backgroundColor: "rgb(0,0,0,0.5)" }}>
        <p style={{ textAlign: "center", fontSize: "40px" }}>
          {this.props.housingCooperativeName} Create/ Edit User Profile{" "}
        </p>
        <div style={{ margin: "10px" }}>
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="email">Email</label>
              <input
                type="email"
                class="form-control"
                id="email"
                placeholder="Email"
                onChange={this.onTextChange}
              />
            </div>
            <div class="form-group col-md-6">
              <label for="phoneNumber">phone number</label>
              <input
                type="text"
                class="form-control"
                id="phoneNumber"
                placeholder="phone number"
                onChange={this.onTextChange}
              />
            </div>
          </div>
          <div class="form-group">
            <label for="addressOne">Address</label>
            <input
              type="text"
              class="form-control"
              id="addressOne"
              placeholder="1234 Main St"
              onChange={this.onTextChange}
            />
          </div>
          <div class="form-group">
            <label for="addressTwo">Address 2</label>
            <input
              type="text"
              class="form-control"
              id="addressTwo"
              placeholder="Apartment, studio, or floor"
              onChange={this.onTextChange}
            />
          </div>
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="location">Location</label>
              <input
                type="text"
                class="form-control"
                id="location"
                onChange={this.onTextChange}
              />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="description">
                Give Description about the cooperative
              </label>
              <textarea
                type="text"
                class="form-control"
                id="description"
                rows="4"
                cols="50"
                onChange={this.onTextChange}
              ></textarea>
            </div>
          </div>

          <button class="btn btn-primary" onClick={this.updateUserProfile}>
            Create User Profile
          </button>
          <br />
          {this.state.error ? (
            <div class="alert alert-danger ">{this.state.error}</div>
          ) : null}
          {this.state.updated ? (
            <div class="alert alert-success ">
              User Profile Successfully Updated
              <button
                type="button"
                class="close"
                data-dismiss="alert"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          ) : null}
        </div>
        <hr />
      </div>
    );
  }
}

export default CreateUserProfileView;
