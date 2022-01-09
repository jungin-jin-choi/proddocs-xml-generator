import React, { Component } from "react";
import { Col, Container, Row } from "reactstrap";
import ErrorcodeList from "./ErrorcodeList";
import NewErrorcodeModal from "./NewErrorcodeModal";
import axios from "axios";
import { API_URL } from "../constants";
import XmlGenerator from "./XmlGenerator";

class Home extends Component {
  state = {
    errorcodes: []
  };

  componentDidMount() {
    this.resetState();
  }

  getErrorcodes = () => {
    axios.get(API_URL).then(res => 
        this.setState({ errorcodes: res.data })
        );
    console.log(this.state.errorcodes);
  };

  resetState = () => {
    this.getErrorcodes();
  };

  render() {
    return (
      <Container style={{ marginTop: "20px" }}>
        <Row>
          <Col>
            <NewErrorcodeModal create={true} resetState={this.resetState}/>
            <XmlGenerator create={true} resetState={this.resetState} text="Code xml 생성하기" type="code"/>
            <XmlGenerator create={true} resetState={this.resetState} text="Slug xml 생성하기" type="slug"/>
          </Col>
          {/* <Col>
            <XmlGenerator create={true} resetState={this.resetState} />
          </Col> */}
        </Row>
        <Row style={{ marginTop: "20px" }}>
          <Col>
            <ErrorcodeList
              errorcodes={this.state.errorcodes}
              resetState={this.resetState}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Home;