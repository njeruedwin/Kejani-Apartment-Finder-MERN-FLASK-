import React, { Component } from "react";

import AnalysisCard from "./HousingCooperative/View/AnalysisCard";

import axios from "axios";

import "../css/apartment.css";

class Apartments extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rooms: [],
      comment: "",
      sentiment: "",
      aspect: "",
      housingCooperativeName: "",
      customerName: "",
      commentError: "",
      message: "",
    };

    this.handleCommentChange = this.handleCommentChange.bind(this);
    this.apartmentsView = this.apartmentsView.bind(this);
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
    return this.state.rooms.map((room) => {
      return (
        <div>
          <div className="row">
            <div className="col-md-8">
              <div class="card text-left">
                <img class="card-img-top" src="holder.js/100px180/" alt="" />
                <div class="card-body">
                  <h4 class="card-title">{room.housingCooperativeName}</h4>
                  <p class="card-text">Apartments Type: {room.type}</p>
                  <p class="card-text">price: {room.price}</p>
                  <p class="card-text">Description: {room.status}</p>
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
                        name=""
                        id=""
                      >
                        <option value="">Select Aspect To Comment On</option>
                        <option value="Water">Water</option>
                        <option value="Electricity">Electricity</option>
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

  render() {
    return (
      <div>
        <h1 style={{ textAlign: "center" }}>Ayee</h1>
        <div className="row">
          <div className="col-md-12"> {this.apartmentsView()}</div>
        </div>
      </div>
    );
  }
}

export default Apartments;
