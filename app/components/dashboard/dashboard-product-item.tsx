import './styles/dashboard-product-item.scss';

import * as React from 'react';
import classNames from "classnames";

interface Props extends React.Props<any> {
  product: Product;
}

interface State {
  isDragEnter: boolean;
  tempName?: string;
}

class DashboardProductItemComponent extends React.Component<Props, State> {
  static displayName = "DashboardProductItemComponent";

  constructor(props) {
    super(props);

    this.state = {
      isDragEnter: false,
      tempName: ''
    }
  }

	render() {
    let isDragEnter = this.state.isDragEnter,
      tempName = this.state.tempName,
      product = this.props.product,
      cssClasses = classNames('dashboard-product-item', {
        'placeholder': isDragEnter
      });

    return (
      <div
        className={cssClasses}
        draggable={true}
        onDragEnter={this.handleDragEnter}
        onDragLeave={this.handleDragLeave}
        onDragStart={this.handleDragStart}
        onDragEnd={this.handleDragEnd}
     >
        <header>
          {tempName || product.name}
        </header>
      </div>
    );
	}

  private handleDragEnter = (e: React.DragEvent) => {
    let dragData = e.dataTransfer.getData('name');
    this.setState({isDragEnter: true, tempName: dragData});
  }

  private handleDragLeave = (e: React.DragEvent) => {
    this.setState({isDragEnter: false, tempName: ''});
  }

  private handleDragStart = (e: React.DragEvent) => {
    let name = this.props.product.name;
    e.dataTransfer.setData("name", name);
  }

  private handleDragEnd = (e: React.DragEvent) => {
  }
}

export default DashboardProductItemComponent;
