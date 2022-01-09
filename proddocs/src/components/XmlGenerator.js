import React, { Component, Fragment } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import XmlForm from "./XmlForm";

class XmlGenerator extends Component {
  state = {
    modal: false
  };

  toggle = () => {
    this.setState(previous => ({
      modal: !previous.modal
    }));
  };

  render() {
    const create = this.props.create;
    const type = this.props.type;

    var title = "Xml 편집하기";
    var button = <Button onClick={this.toggle}>Edit</Button>;
    if (create) {
      title = "Error Code xml 생성하기";

      button = (
        <Button
          color="primary"
          className="float-right"
          onClick={this.toggle}
          style={{ minWidth: "200px", marginLeft: "40px" }}
        >
          {this.props.text}
        </Button>
      );
    }

    return (
      <Fragment>
        {button}
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>{title}</ModalHeader>
          <ModalBody>
            <XmlForm
              type={this.props.type}
              resetState={this.props.resetState}
              toggle={this.toggle}
              errorcode={this.props.errorcode}
            />
          </ModalBody>
        </Modal>
      </Fragment>
    );
  }
}

export default XmlGenerator;