import './styles/dashboard-basket.scss';

import * as React from 'react';
import classNames from "classnames";

interface Props extends React.Props<any> {

}

interface State {
  left: number;
}

class DashboardBasketComponent extends React.Component<Props, State> {
  static displayName = "DashboardBasketComponent";

  constructor(props) {
      super(props);
          
      this.state = {
        left: 0
      }
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
    console.log(e.dataTransfer.getData('id'));
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
