import React, { Component } from "react";

class Header extends Component {
  render() {
    return (
      <div className="text-center">
        <img
          src="https://elecle.bike/logo_red.svg"
          width="300"
          className="img-thumbnail"
          style={{ marginTop: "20px" }}
        />
        <hr />
        <h5>
          <i>Jung In Choi</i>
        </h5>
        <h1>{this.props.title}</h1>
      </div>
    );
  }
}

export default Header;