import React, { Component, Fragment } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import NewErrcodeForm from "./NewErrcodeForm";

class NewErrorcodeModal extends Component {
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

    var title = "Error Code 편집하기";
    var button = <Button onClick={this.toggle}>Edit</Button>;
    if (create) {
      title = "Error code 생성하기";

      button = (
        <Button
          color="primary"
          className="float-right"
          onClick={this.toggle}
          style={{ minWidth: "200px"}}
        >
          추가하기
        </Button>
      );
    }

    return (
      <Fragment>
        {button}
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>{title}</ModalHeader>

          <ModalBody>
            <NewErrcodeForm
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

export default NewErrorcodeModal;