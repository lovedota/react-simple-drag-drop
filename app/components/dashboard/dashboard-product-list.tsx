import './styles/dashboard-product-list.scss';

import * as React from 'react';
import classNames from "classnames";
import DashboardProductItem from './dashboard-product-item';
import DashboardActions from '../../actions/dashboard-actions';
import {Spring} from 'react-motion';

interface Props extends React.Props<any> {
  products: Product[];
}

interface State {
  delta: number;
  mouse: number;
  isPressed: boolean;
  lastPressed: number;
}

function range(count) {
  return Array.apply(null, Array(count)).map(function (_, i) {return i;});
}

function clamp(n, min, max) {
  return Math.max(Math.min(n, max), min);
}

const springConfig = [300, 50];
const itemsCount = 4;

class DashboardProductListComponent extends React.Component<Props, State> {
  static displayName = "DashboardProductListComponent";
  constructor(props) {
    super(props);

    this.state = {
      delta: 0,
      mouse: 0,
      isPressed: false,
      lastPressed: 0
    }
  }
  componentDidMount() {
    window.addEventListener('touchmove', this.handleTouchMove);
    window.addEventListener('touchend', this.handleMouseUp);
    window.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('mouseup', this.handleMouseUp);
  }

	render() {
    //https://raw.githubusercontent.com/chenglou/react-motion/master/demos/demo8/Demo.jsx
    let rows = [],
      endValue = range(itemsCount).map(i => {
        if (lastPressed === i && isPressed) {
          return {
            scale: {val: 1.1, config: springConfig},
            shadow: {val: 16, config: springConfig},
            y: {val: mouse, config: []},
          };
        }
        return {
          scale: {val: 1, config: springConfig},
          shadow: {val: 1, config: springConfig},
          y: {val: order.indexOf(i) * 100, config: springConfig},
        };
      });

    this.props.products.forEach(product => {
      rows.push(<DashboardProductItem product={product} key={product.id}/>);
    });

    return (
      <div className="dashboard-product-list columns">
        {rows}
      </div>
    );
	}


  private handleTouchStart(key, pressLocation, e) {
    this.handleMouseDown(key, pressLocation, e.touches[0]);
  }

  private handleTouchMove(e) {
    e.preventDefault();
    this.handleMouseMove(e.touches[0]);
  }

  private handleMouseDown(pos, pressY, {pageY}) {
    this.setState({
      delta: pageY - pressY,
      mouse: pressY,
      isPressed: true,
      lastPressed: pos,
    });
  }

  private handleMouseMove({pageY}) {
    const {isPressed, delta, order, lastPressed} = this.state;
    if (isPressed) {
      const mouse = pageY - delta;
      const row = clamp(Math.round(mouse / 100), 0, itemsCount - 1);
      const newOrder = reinsert(order, order.indexOf(lastPressed), row);
      this.setState({mouse: mouse, order: newOrder});
    }
  }

  handleMouseUp() {
    this.setState({isPressed: false, delta: 0});
  }
}

export default DashboardProductListComponent;
