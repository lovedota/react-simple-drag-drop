import './styles/dashboard-product-item.scss';

import React from 'react';
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
      {product} = this.props,
      cssClasses = classNames('dashboard-product-item', {
        'dragging': isDragging
      });

    return (
      <li
        style={product.styles}
        className={cssClasses}
        draggable={true}
        onDragEnter={this.handleDragEnter}
        onDragStart={this.handleDragStart}
        onDragEnd={this.handleDragEnd}
     >
        {product.name}
        <a onClick={this.handleClick}>
          <span className="glyphicon glyphicon-remove"></span>
        </a>
      </li>
    );
	}

  private handleDragEnter = (e: React.DragEvent) => {
    let toProductId = window['toProductId'],
      fromProductId = this.props.product.id;

    if (fromProductId !== toProductId) {
      DashboardActions.moveProduct(fromProductId, toProductId);
    }
  }

  private handleClick = (e: React.SyntheticEvent) => {
    e.preventDefault();
    DashboardActions.removeProduct(this.props.product.id);
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
