import './styles/dashboard-basket.scss';

import * as React from 'react';
import classNames from "classnames";
import DashboardActions from '../../actions/dashboard-actions';

interface Props extends React.Props<any> {

}

interface State {

}

class DashboardBasketComponent extends React.Component<Props, State> {
  static displayName = "DashboardBasketComponent";

  constructor(props) {
    super(props);
  }

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
  	let id = e.dataTransfer.getData('id');
    DashboardActions.removeProduct(id);
  }

  private handleDragEnter(e) {
    e.target.style.border = "3px dotted red";
  }

  private handleDragLeave(e) {
    e.target.style.border = "2px dashed #0087F7";
  }

  private handleDragOver(e) {
    e.preventDefault();
    e.target.style.border = "2px dashed #0087F7";
    e.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.
  }
}

export default DashboardBasketComponent;
