import React, { Component } from "react";
import { Table } from "reactstrap";
import NewErrorcodeModal from "./NewErrorcodeModal";

import ConfirmRemovalModal from "./ConfirmRemovalModal";

class ErrorcodeList extends Component {
  render() {
    const errorcodes = this.props.errorcodes;
    return (
      <Table dark>
        <thead>
          <tr>
            <th>Error Code</th>
            <th>Slug</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {!errorcodes || errorcodes.length <= 0 ? (
            <tr>
              <td colSpan="6" align="center">
                <b>Oops, no error code registered yet</b>
              </td>
            </tr>
          ) : (
            errorcodes.map(errorcode => (
              <tr key={errorcode.pk}>
                <td>{errorcode.code}</td>
                <td>{errorcode.slug}</td>
                <td align="center">
                  <NewErrorcodeModal
                    create={false}
                    errorcode={errorcode}
                    resetState={this.props.resetState}
                  />
                  &nbsp;&nbsp;
                  <ConfirmRemovalModal
                    pk={errorcode.pk}
                    resetState={this.props.resetState}
                  />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    );
  }
}

export default ErrorcodeList;