import './styles/dashboard-product-item.scss';

import * as React from 'react';
import classNames from "classnames";

interface Props extends React.Props<any> {
  product: Product;
}

interface State {

}

class DashboardProductItemComponent extends React.Component<Props, State> {
  static displayName = "DashboardProductItemComponent";

	render() {
    let product = this.props.product;

    return (
      <div
        className="dashboard-product-item"
        draggable={true}
        onDragStart={this.handleDragStart}
        onDragEnd={this.handleDragEnd}
     >
        <header>
          {product.name}
        </header>
      </div>
    );
	}

  private handleDragStart(e) {
    e.target.style.opacity = '0.4';
    e.dataTransfer.setData("id", this.props.product);
  }

  private handleDragEnd(e) {
   e.target.style.opacity = '1';
  }
}

export default DashboardProductItemComponent;
