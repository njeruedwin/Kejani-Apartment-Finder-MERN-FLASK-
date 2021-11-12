import React, { Component } from "react";
import axios from "axios";

export class Post extends Component {
  constructor(props) {
    super(props);

    this.state = {
      housingCooperativeName: this.props.housingCooperativeName,
      price: "",
      type: "",
      status: "",
      postError: false,
      postErrorMessage: "",
      successPost: false,
    };

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
    const { housingCooperativeName, price, type, status } = this.state;
    const data = {
      housingCooperativeName,
      price,
      type,
      status,
    };

    axios.post("http://localhost:5000/api/admin/postroom", data).then((res) => {
      const { success, message } = res.data;
      if (!success) {
        return this.setState({
          postError: true,
          postErrorMessage: message,
        });
      }
      this.setState({
        type: "",
        price: "",
        status: "",
        successPost: true,
      });
    });
  }

  render() {
    const { postError, postErrorMessage } = this.state;
    return (
      <div>
        <h1 style={{ textAlign: "center" }}>Post A New Apartment</h1>
        <hr />
        <div>
          <div className="row">
            <div className="col-md-4"></div>
            <div className="col-md-4">
              <div class="form-group">
                <input
                  type="text"
                  name=""
                  id="type"
                  class="form-control"
                  placeholder=" e.g two bedroom apartment"
                  aria-describedby="helpId"
                  onChange={this.onTextChange}
                />
                <small id="helpId" class="text-muted">
                  Apartment Type
                </small>
                <hr />

                <input
                  type="text"
                  name=""
                  id="status"
                  class="form-control"
                  placeholder=" e.g House is painted black"
                  aria-describedby="helpId"
                  onChange={this.onTextChange}
                />
                <small id="helpId" class="text-muted">
                  Enter Brief Description about the Apartment
                </small>

                <br />
                <hr />
                <span class="input-group-addon">Ksh. </span>
                <input
                  type="text"
                  name=""
                  id="price"
                  class="form-control"
                  placeholder=" e.g 500"
                  aria-describedby="helpId"
                  onChange={this.onTextChange}
                />

                <small id="helpId" class="text-muted">
                  Price
                </small>
                <br />
                <hr />
                {postError ? (
                  <div class="alert alert-danger ">
                    {postErrorMessage}
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
                <button
                  type="submit"
                  style={{ marginTop: 10 }}
                  className="btn btn-primary"
                  onClick={this.submitData}
                >
                  Submit
                </button>
              </div>
            </div>
            <div className="col-md-4"></div>
          </div>
        </div>
        {this.state.successPost ? (
          <div class="alert alert-success ">
            Apartment Succesfully Posted
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
    );
  }
}

export default Post;
