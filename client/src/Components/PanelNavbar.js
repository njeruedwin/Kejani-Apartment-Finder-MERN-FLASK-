import React, { Component } from "react";
import { Link } from "react-router-dom";

class PanelNavbar extends Component {
  render() {
    return (
      <nav class="navbar navbar-default " role="navigation">
        <div>
          <ul class="nav navbar-nav">
            <li>
              <Link to="/admin">
                <a style={{ textDecoration: "none" }}>Register Panel</a>
              </Link>
            </li>

            <li>
              <a href="#"></a>
            </li>

            <li>
              <Link to="/addcar">
                <a href="#" style={{ textDecoration: "none" }}>
                  Add Car Panel
                </a>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default PanelNavbar;
