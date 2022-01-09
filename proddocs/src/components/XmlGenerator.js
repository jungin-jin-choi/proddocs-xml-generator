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

    var title = "Xml 편집하기";
    var button = <Button onClick={this.toggle}>Edit</Button>;
    if (create) {
      title = "Xml 생성하기";

      button = (
        <Button
          color="primary"
          className="float-right"
          onClick={this.toggle}
          style={{ minWidth: "200px" }}
        >
          XML 생성하기
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