import './styles/dashboard-product-item.scss';

import * as React from 'react';
import classNames from "classnames";
import DashboardActions from '../../actions/dashboard-actions';

interface Props extends React.Props<any> {
  product: Product;
}

interface State {
  isDragging: boolean
}

class DashboardProductItemComponent extends React.Component<Props, State> {
  static displayName = "DashboardProductItemComponent";

  constructor(props) {
    super(props);

    this.state = {
      isDragging: false
    }
  }

	render() {
    let isDragging = this.state.isDragging,
      product = this.props.product,
      cssClasses = classNames('dashboard-product-item', {
        'dragging': isDragging
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
          {product.name}
        </header>
      </div>
    );
	}

  private handleDragEnter = (e: React.DragEvent) => {
    let toProductId = window['toProductId'],
      fromProductId = this.props.product.id;

    if (fromProductId !== toProductId) {
      DashboardActions.moveProduct(fromProductId, toProductId);
    }
  }

  private handleDragLeave = (e: React.DragEvent) => {

  }

  private handleDragStart = (e: React.DragEvent) => {
    let productId = this.props.product.id;

    e.dataTransfer.effectAllowed='move';
    e.dataTransfer.setData('id', productId);
    window['toProductId'] = productId;
    this.setState({isDragging: true});
  }

  private handleDragEnd = (e: React.DragEvent) => {
      this.setState({isDragging: false});
  }
}

export default DashboardProductItemComponent;
