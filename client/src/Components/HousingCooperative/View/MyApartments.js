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
    return this.state.list.map((apartment) => {
      return (
        <div
          key={apartment._id}
          class="card text-white "
          style={{ backgroundColor: "white" }}
        >
          <img class="card-img-top" alt="" />
          <div class="card-body">
            <h4 class="card-title">
              {this.props.housingCooperativeName} Housing Cooperative
            </h4>
            <p class="card-text">Apartment Type : {apartment.type}</p>
            <p class="card-text">Apartment price : {apartment.price}</p>
            <p class="card-text">Apartment Status : {apartment.status}</p>
            <p class="card-text">Date posted : {apartment.createdAt}</p>
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
      <div>
        <h1 style={{ textAlign: "center" }}>
          {this.props.housingCooperativeName} Posted Apartments
        </h1>
        <hr />
        <div>{this.listView()}</div>
      </div>
    );
  }
}

export default MyApartments;
