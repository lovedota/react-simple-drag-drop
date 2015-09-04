import './styles/dashboard-product-item.scss';

import * as React       from 'react';
import classNames       from "classnames";
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
        onDragOver={this.handleDragOver}
        onDragLeave={this.handleDragLeave}
        onDragStart={this.handleDragStart}
        onDragEnd={this.handleDragEnd}
     >
        {product.name}
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

  private handleDragLeave = (e: React.DragEvent) => {

  }

  private handleDragOver = (e: any) => {
    let dragX = e.pageX,
      dragY = e.pageY;

    console.log(e.target.getBoundingClientRect());
    DashboardActions.mouseChange(dragX, dragY);
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
