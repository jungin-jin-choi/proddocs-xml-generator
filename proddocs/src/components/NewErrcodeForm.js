import React from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import axios from "axios";
import { API_URL } from "../constants";

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;


class NewErrcodeForm extends React.Component {
  state = {
    pk: 0,
    code: "",
    slug: ""
  };

  componentDidMount() {
    if (this.props.errorcode) {
      const { pk, code, slug } = this.props.errorcode;
      this.setState({ pk, code, slug });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  createErrcode = e => {
    e.preventDefault();
    axios.post(API_URL, this.state).then(() => {
      this.props.resetState();
      this.props.toggle();
    });
  };

  editErrcode = e => {
    e.preventDefault();
    axios.put(API_URL + this.state.pk, this.state).then(() => {
      this.props.resetState();
      this.props.toggle();
    });
  };

  defaultIfEmpty = value => {
    return value === "" ? "" : value;
  };

  render() {
    return (
      <Form onSubmit={this.props.errorcode ? this.editErrcode : this.createErrcode}>
        <FormGroup>
          <Label for="code">Error Code:</Label>
          <Input
            type="text"
            name="code"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.code)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="slug">Error Slug:</Label>
          <Input
            type="text"
            name="slug"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.slug)}
          />
        </FormGroup>
        <Button>Send</Button>
      </Form>
    );
  }
}

export default NewErrcodeForm;