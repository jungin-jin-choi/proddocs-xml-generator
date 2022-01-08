import React, { Component, Fragment } from "react";
import Header from "./components/Header";
import Home from "./components/Home";

class App extends Component {
  render() {
    return (
      <Fragment>
        <Header title={'프로덕트 정책문서'}/>
        <Home />
      </Fragment>
    );
  }
}

export default App;
