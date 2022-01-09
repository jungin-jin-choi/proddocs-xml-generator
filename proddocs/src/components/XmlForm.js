import React from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import axios from "axios";
import { DOWNLOAD_SLUG_URL, DOWNLOAD_CODE_URL } from "../constants";

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;


class XmlForm extends React.Component {
  state = {
    pk: 0,
    prefix: "",
    filename: ""
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

  generateCodeXml = e => {
    e.preventDefault();
    axios.post(DOWNLOAD_CODE_URL, this.state).then((response) => {
        this.props.resetState();
        this.props.toggle();
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        const filename = this.state.filename
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
      });
  }

  generateSlugXml = e => {
    e.preventDefault();
    axios.post(DOWNLOAD_SLUG_URL, this.state).then((response) => {
        this.props.resetState();
        this.props.toggle();
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        const filename = this.state.filename
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
      });
  }

  defaultIfEmpty = value => {
    return value === "" ? "" : value;
  };

  render() {
    return (
      <Form onSubmit={this.props.type=='code' ? this.generateCodeXml : this.generateSlugXml}>
        <FormGroup>
          <Label for="code">Prefix for string resource</Label>
          <Input
            type="text"
            name="prefix"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.prefix)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="slug">File name</Label>
          <Input
            type="text"
            name="filename"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.filename)}
          />
        </FormGroup>
        <Button>Download</Button>
      </Form>
    );
  }
}

export default XmlForm;