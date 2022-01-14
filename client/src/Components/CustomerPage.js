import React, { Component } from "react";
import { Link } from "react-router-dom";
import apartment from "../images/apartment2.jpg";
import apartmentMainView from "../images/apartment1.webp";
import beautifulblack from "../images/beautifulblack.jpg";

class CustomerPage extends Component {
  render() {
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
        <div className="container">
          {/*left Pane*/}
          <div className="col-md-3">
            <br />
            <hr />
            <Link to="/customersignin">
              <button type="buttton" className="btn ">
                Search For Apartment
              </button>
            </Link>
            <br />
            <hr />
            <Link to="/housingcooperativesignin">
              <button type="buttton" className="btn ">
                Housing Cooperative Sign In
              </button>
            </Link>
            <br />
            <hr />
            <div className="section-detail" style={{ color: "rgb(16,12,8)" }}>
              <div className="card" style={{ margin: "15px" }}>
                <span style={{ height: "100%" }}>
                  Discover
                  <hr />
                  finding You the best Apartments
                </span>
              </div>
            </div>
          </div>
          {/*right Pane*/}
          <div className="col-md-9">
            <div className="content-area">
              <CustomerContent />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class CustomerContent extends Component {
  render() {
    return (
      <div>
        <div
          class="jumbotron"
          style={{
            backgroundImage: `url(${apartmentMainView})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            color: "white",
          }}
        >
          <div
            className="container card"
            style={{ backgroundColor: "rgb(0,0,0,0.5)" }}
          >
            <h1
              style={{ fontFamily: 'Georgia, "Times New Roman", Times, serif' }}
            >
              Welcome to Kejani Web Application!
            </h1>
            <p>Kejani. Finding Your Home.</p>
            <p>
              <button
                type="button"
                class="btn btn-primary btn-lg"
                data-toggle="collapse"
                data-target="#demo"
              >
                Learn More
              </button>{" "}
              <div id="demo" class="collapse">
                <p>
                  Kejani web Application is a dedicated apartment finder
                  application custom made to enable you find an apartment that
                  best suites your requirements.
                </p>
                <p>
                  By gathering data from user feedbacks, the application is
                  suited so as to provide the best as from the people
                  persepective(arguably the best perspective).
                </p>
                <p>
                  Find yourself an apartment today and help provide feedback for
                  all those that shall come looking for more information.
                </p>
              </div>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default CustomerPage;
