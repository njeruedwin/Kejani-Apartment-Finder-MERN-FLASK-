import React, { Component } from "react";
import axios from "axios";

export class MyApartments extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list: [],
      message: "",
      deleteApartment: "",
    };

    this.listView = this.listView.bind(this);
    this.deleteApartmentModal = this.deleteApartmentModal.bind(this);
    this.deleteApartment = this.deleteApartment.bind(this);
  }

  componentDidMount() {
    axios
      .get(
        "http://localhost:5000/api/admin/getspecificrooms?housingCooperativeName=" +
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
          list: res.data,
        });

        console.log(this.state.list);
      });
  }
  listView() {
    const sortedRooms = this.state.list.sort((a, b) => {
      const dateAInMillis = new Date(a.createdAt).getTime();
      const dateBInMillis = new Date(b.createdAt).getTime();
      return dateBInMillis - dateAInMillis;
    });
    return sortedRooms.map((apartment) => {
      console.log(apartment.createdAt);
      return (
        <div
          key={apartment._id}
          class="card "
          style={{
            backgroundColor: "rgb(255, 255, 255,0.8)",
            borderRadius: "0px",
            boxShadow: "rgb(38,57,77) 0px 20px 30px -10px",
            color: "black",
          }}
        >
          <img class="card-img-top" alt="" />
          <div
            class="card-body"
            style={{ borderRadius: "20px", margin: "20px" }}
          >
            <h4 class="card-title">
              {this.props.housingCooperativeName} Housing Cooperative
            </h4>
            <p class="card-text">Apartment Type : {apartment.type}</p>
            <p class="card-text">Apartment price : {apartment.price}</p>
            <p class="card-text">Apartment Status : {apartment.status}</p>
            <p class="card-text">
              Date posted :{" "}
              {new Date(apartment.createdAt).toLocaleDateString("en-us", {
                weekday: "long",
                year: "numeric",
                month: "short",
                day: "numeric",
              })}{" "}
            </p>
            <p class="card-text">
              <button
                type="button"
                class="btn btn-primary"
                data-toggle="modal"
                data-target="#deleteModal"
              >
                Delete
              </button>
            </p>
            <br />
          </div>
          {this.deleteApartmentModal(apartment._id)}
        </div>
      );
    });
  }

  deleteApartmentModal = (apartment) => {
    return (
      <div>
        <div
          class="modal fade"
          id="deleteModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="modelTitleId"
          aria-hidden="true"
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Delete Apartment</h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                Are You sure You want to delete the Apartment.
                <br />
                If Deleted it cant be viewed by customers.
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  class="btn btn-primary"
                  data-dismiss="modal"
                  onClick={() => {
                    this.deleteApartment(apartment);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  deleteApartment = (apartment) => {
    axios
      .delete("http://localhost:5000/api/admin/deleteroom?_id=" + apartment)
      .then(
        this.setState({
          list: this.state.list.filter((room) => room._id !== apartment),
        })
      );
  };

  render() {
    return (
      <div style={{ backgroundColor: "rgb(0,0,0,0.5)" }}>
        <p style={{ textAlign: "center", fontSize: "40px" }}>
          {this.props.housingCooperativeName} Posted Apartments
        </p>
        <hr />
        <div>{this.listView()}</div>
      </div>
    );
  }
}

export default MyApartments;
