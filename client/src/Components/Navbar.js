import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../css/navbar.css";

class Navbar extends Component {
  render() {
    return (
      <nav
        class="navbar navbar-inverse"
        style={{ backgroundColor: "rgb(239, 248, 248)", borderRadius: "0px" }}
        role="navigation"
      >
        <div class="navbar-header">
          <a class="navbar-brand ">
            <span
              style={{
                fontFamily: "Georgia, Times New Roman, Times, serif",
                letterSpacing: "5px",
                fontSize: "30px",
              }}
            >
              <span style={{ color: "red" }}>Ke</span>
              <span style={{ color: "green" }}>jani</span>
            </span>
          </a>
          {/*  */}
        </div>
      </nav>
    );
  }
}

export default Navbar;
