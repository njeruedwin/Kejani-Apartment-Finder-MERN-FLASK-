import React, { Component } from "react";
import { Link } from "react-router-dom";

class CustomerPage extends Component {
  render() {
    return (
      <>
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
            <h2 className="section-detail">Client Panel</h2>
          </div>
          {/*right Pane*/}
          <div className="col-md-9">
            <div className="content-area">
              <CustomerContent />
            </div>
          </div>
        </div>
      </>
    );
  }
}

class CustomerContent extends Component {
  render() {
    return (
      <div class="jumbotron">
        <div class="container">
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
                By gathering data from user feedbacks, the application is suited
                so as to provide the best as from the people
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
    );
  }
}

export default CustomerPage;
