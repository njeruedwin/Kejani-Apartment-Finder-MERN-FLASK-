import React, { Component } from "react";

export class Dashboard extends Component {
  render() {
    return (
      <div>
        <div class="progress">
          <div
            class="progress-bar progress-bar-striped progress-bar-animated bg-primary"
            role="progressbar"
            style={{ width: "80%" }}
            aria-valuemin="0"
            aria-valuemax="100"
          >
            Positivity
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
