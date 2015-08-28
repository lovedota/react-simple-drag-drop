import './styles/dashboard-product-item.scss';

import * as React from 'react';
import classNames from "classnames";

interface Props extends React.Props<any> {
  product: Product;
}

interface State {
  isDragging: boolean;
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
        'placeholder': isDragging
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

  private handleDragEnter(e) {
    //e.target.style.border = "3px dotted red";
  }

  private handleDragLeave(e) {
    //e.target.style.border = "2px dashed #0087F7";
  }

  private handleDragStart = (e) => {
    this.setState({isDragging: true});
    //e.target.style.opacity = '0.4';
    e.dataTransfer.setData("product", this.props.product);
  }

  private handleDragEnd = (e) => {
    this.setState({isDragging: false});
    //e.target.style.opacity = '1';
  }
}

export default DashboardProductItemComponent;
