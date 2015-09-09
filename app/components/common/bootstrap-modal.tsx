import $ from 'jquery';
import React from 'react';
import 'bootstrap-sass';

interface Props extends React.Props<any> {
  onConfirm: Function;
  onCancel?: Function;
  confirm: string;
  cancel: string;
  title: string;
  disabled?: boolean;
}

class BootstrapModal extends React.Component<Props, {}> {
  $modal: JQuery;

  componentDidMount() {
    this.$modal = $(React.findDOMNode(this));
    // When the component is added, turn it into a modal
    this.$modal.modal({show: false});
  }

  close() {
    this.$modal.modal('hide');
  }

  open() {
    this.$modal.modal('show');
  }

  render(): JSX.Element {
    let confirmButton = null,
     cancelButton = null,
     modalStyles = {
        display: 'none'
     }

    if (this.props.confirm) {
      confirmButton = (
        <button
          disabled={this.props.disabled}
          onClick={this._handleConfirm}
          className="btn btn-primary"
        >
          {this.props.confirm}
        </button>
      );
    }

    if (this.props.cancel) {
      cancelButton = (
        <button
          onClick={this._handleCancel}
          className="btn btn-default"
        >
          {this.props.cancel}
        </button>
      );
    }

    return (
      <div className="modal" style={modalStyles}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="close"
                onClick={this._handleCancel}>
                &times;
              </button>
              <h3>{this.props.title}</h3>
            </div>
            <div className="modal-body">
              {this.props.children}
            </div>
            <div className="modal-footer">
              {cancelButton}
              {confirmButton}
            </div>
          </div>
        </div>
      </div>
    );
  }

  _handleCancel = () => {
    this.close();
    if (this.props.onCancel) {
      this.props.onCancel();
    }
  }

  _handleConfirm = () => {
    this.close();
    if (this.props.onConfirm) {
      this.props.onConfirm();
    }
  }
}

export default BootstrapModal;
