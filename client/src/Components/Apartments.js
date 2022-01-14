import React, { Component } from "react";
import { Link } from "react-router-dom";
import AnalysisCard from "./HousingCooperative/View/AnalysisCard";
import ocean from "../images/ocean.jpg";

import axios from "axios";

import "../css/apartment.css";

class Apartments extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allRooms: [],
      rooms: [],
      comment: "",
      sentiment: "",
      aspect: "",
      housingCooperativeName: "",
      customerName: "",
      commentError: "",
      message: "",

      searchType: "",
      searchPrice: "",
    };

    this.handleCommentChange = this.handleCommentChange.bind(this);
    this.apartmentsView = this.apartmentsView.bind(this);
    this.myNavigation = this.myNavigation.bind(this);
    this.submitData = this.submitData.bind(this);
  }

  componentDidMount = () => {
    axios.get("http://localhost:5000/api/admin/getrooms").then((res) => {
      console.log(res.data);
      if (res.data.success == false) {
        return this.setState({
          message: res.data.message,
        });
      }

      this.setState({
        allRooms: res.data,
        rooms: res.data,
        customerName: this.props.customerName,
      });

      console.log(this.state.customerName);
    });
  };

  handleCommentChange(event) {
    this.setState({
      comment: event.target.value,
    });
  }

  apartmentsView = () => {
    //sort the posted apartments by date
    const sortedRooms = this.state.rooms.sort((a, b) => {
      const dateAInMillis = new Date(a.createdAt).getTime();
      const dateBInMillis = new Date(b.createdAt).getTime();
      return dateBInMillis - dateAInMillis;
    });
    console.log(sortedRooms);
    return sortedRooms.map((room) => {
      return (
        <div style={{ fontFamily: "sans-serif" }}>
          <div
            className="row"
            style={{
              backgroundColor: "rgb(255, 255, 255,0.8)",
              borderRadius: "0px",
              boxShadow: "rgb(38,57,77) 0px 20px 30px -10px",
            }}
          >
            <div className="col-md-8">
              <div class="card text-left">
                <img class="card-img-top" src="holder.js/100px180/" alt="" />
                <div class="card-body">
                  <h4
                    class="card-title"
                    style={{
                      letterSpacing: "2px",
                      fontSize: "20px",
                    }}
                  >
                    <Link
                      to={{
                        pathname: "/housingCooperativeProfile",
                        housingCooperativeName: room.housingCooperativeName,
                      }}
                    >
                      {room.housingCooperativeName}
                    </Link>
                  </h4>
                  <p class="card-text">
                    <strong>Apartments Type</strong>:{" "}
                    <span style={{ fontStyle: "italic" }}> {room.type} </span>
                  </p>
                  <p class="card-text">
                    <strong>price: </strong>
                    <span style={{ fontStyle: "italic" }}> {room.price} </span>
                  </p>
                  <p class="card-text">
                    <strong>Description:</strong>{" "}
                    <span style={{ fontStyle: "italic" }}> {room.status} </span>
                  </p>
                  <p class="card-text">
                    <strong style={{ color: "green", fontStyle: "italic" }}>
                      <Link
                        to={{
                          pathname: "/housingCooperativeProfile",
                          housingCooperativeName: room.housingCooperativeName,
                        }}
                      >
                        Contact for Booking
                      </Link>
                    </strong>{" "}
                  </p>

                  <div class="form-group">
                    <label for=""></label>
                    <div class="form-group">
                      <label for=""></label>
                      {this.state.commentError ? (
                        <div class="alert alert-warning" role="alert">
                          {this.state.commentError}
                        </div>
                      ) : null}
                      <select
                        class="form-control form-control-sm"
                        onChange={(event) => {
                          return this.setState({
                            aspect: event.target.value,
                          });
                        }}
                      >
                        <option value="">Select Aspect To Comment On</option>
                        <option value="Water">Water</option>
                        <option value="Electricity">Electricity</option>
                        <option value="Sanitation">Sanitation</option>
                        <option value="Internet">Internet</option>
                        <option value="Security">Security</option>
                      </select>
                    </div>
                    <input
                      type="text"
                      class="form-control"
                      default={this.state.comment}
                      aria-describedby="helpId"
                      placeholder="your comment"
                      onChange={this.handleCommentChange}
                    />
                    <small id="helpId" class="form-text text-muted">
                      Enter Comment
                    </small>
                  </div>
                  <div className="form-group">
                    <button
                      type="submit"
                      value="ok"
                      className="btn btn-primary btn-block"
                      onClick={(event) =>
                        this.submitData(event, room.housingCooperativeName)
                      }
                    >
                      Send
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <AnalysisCard
              housingCooperativeName={room.housingCooperativeName}
            />
          </div>
          <br /> <br />
        </div>
      );
    });
  };

  submitData(event, housingCooperativeName) {
    event.preventDefault();
    const { comment } = this.state;
    console.log(comment);
    axios.get("/sentiment?text=" + comment).then((res) => {
      console.log(res.data);

      const { customerName, aspect } = this.state;

      const data = {
        housingCooperativeName,
        customerName,
        aspect,
        sentiment: res.data.sentiment,
        comment,
      };

      axios
        .post("http://localhost:5000/api/admin/addanalysis", data)
        .then((res) => {
          const { success, message } = res.data;
          if (!success) {
            return this.setState({
              commentError: message,
            });
          }
          this.setState({
            comment: "",
            message: message,
            commentError: "",
          });
          window.location.reload();
        });
    });
  }

  myNavigation = () => {
    return (
      <div
        style={{
          backgroundColor: "rgb(0,0,0,0.4)",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div class="card-body" style={{ opacity: "1.0" }}>
          <p
            class="h1 font-weight-bold mb-4 text-white"
            style={{ color: "white" }}
          >
            Discover the Amazing City
          </p>

          <div class="row justify-content-center" style={{ margin: "2px" }}>
            <div class="col-md-6 ">
              <div class="form-group">
                <select
                  class="form-control form-control-sm"
                  onChange={(event) => {
                    this.setState({
                      rooms: this.state.allRooms.filter((item) =>
                        item.type.includes(event.target.value)
                      ),
                    });
                  }}
                >
                  <option value="">Open this select menu</option>
                  <option value="One Bedroom">One Bedroom</option>
                  <option value="Two Bedroom">Two Bedroom</option>
                  <option value="Three Bedroom">Three Bedroom</option>
                  <option value="Bedsitter">Bedsitter</option>
                </select>
                <small
                  id="helpId"
                  className="form-text "
                  style={{ color: "white" }}
                >
                  what are you looking for?
                </small>
              </div>
            </div>
            <div class="col-md-4 "></div>
          </div>
        </div>
      </div>
    );
  };

  render() {
    return (
      <div style={{ height: "100vh" }}>
        <h1 style={{ textAlign: "center" }}>{this.myNavigation()}</h1>
        <hr />
        <div className="row">
          <div className="col-md-12"> {this.apartmentsView()}</div>
        </div>
      </div>
    );
  }
}

export default Apartments;
