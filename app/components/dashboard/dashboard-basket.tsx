import './styles/dashboard-basket.scss';

import * as React from 'react';
import classNames from "classnames";

interface Props extends React.Props<any> {

}

interface State {

}

class DashboardBasketComponent extends React.Component<Props, State> {
  static displayName = "DashboardBasketComponent";

	render() {
    return (
      <div className="dashboard-basket"
         onDrop={this.handleDrop}
         onDragEnter={this.handleDragEnter}
         onDragLeave={this.handleDragLeave}
         onDragOver={this.handleDragOver}
      >
        <div>dropzone</div>
      </div>
    );
	}

  private handleDrop = (e) => {
  	var id = e.dataTransfer.getData('product');

  }

  private handleDragEnter(e) {
    e.target.style.border = "3px dotted red";
  }

  private handleDragLeave(e) {
    e.target.style.border = "2px dashed #0087F7";
  }

  private handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.
  }
}

export default DashboardBasketComponent;
