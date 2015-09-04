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
  delta?: number;
  mouse?: number;
  isPressed?: boolean;
  lastPressed?: number;
  products?: any;
}

function range(count) {
  return Array.apply(null, Array(count)).map(function (_, i) {return i;});
}

function clamp(n, min, max) {
  return Math.max(Math.min(n, max), min);
}

const springConfig = [300, 50];
const itemsCount = 4;

function reinsert(arr, from, to) {
  const _arr = arr.slice(0);
  const val = _arr[from];
  _arr.splice(from, 1);
  _arr.splice(to, 0, val);
  return _arr;
}

//This is used for keep the old products state
let _defaultProducts: Product[] = [];

class DashboardProductListComponent extends React.Component<Props, State> {
  static displayName = "DashboardProductListComponent";
  constructor(props) {
    super(props);

    this.state = {
      delta: 0,
      mouse: 0,
      isPressed: false,
      lastPressed: 0,
      products: this.props.products
    }

    _defaultProducts = this.props.products;
  }
  componentDidMount() {
    window.addEventListener('touchmove', this.handleTouchMove);
    window.addEventListener('touchend', this.handleMouseUp);
    window.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('mouseup', this.handleMouseUp);
  }

	render() {
    let {delta, mouse, isPressed, lastPressed, products} = this.state,

    endValue = _defaultProducts.map((product, index) => {
      if (lastPressed === index && isPressed) {
        return {
          scale: {val: 1.1, config: springConfig},
          shadow: {val: 16, config: springConfig},
          y: {val: mouse, config: []},
        };
      }

      return {
        scale: {val: 1, config: springConfig},
        shadow: {val: 1, config: springConfig},
        y: {val: products.indexOf(product) * 100, config: springConfig},
        product: product
      };
    });

    console.log(products);

    return (
      <Spring endValue={endValue} className="dashboard-product-list columns">
       {items =>
         <div className="demo8">
           {items.map(({scale, shadow, y, product}, n) =>
             <div
               key={n}
               className="demo8-item"
               onMouseDown={this.handleMouseDown.bind(null, n, y.val)}
               onTouchStart={this.handleTouchStart.bind(null, n, y.val)}
               style={{
                 boxShadow: `rgba(0, 0, 0, 0.2) 0px ${shadow.val}px ${2 * shadow.val}px 0px`,
                 transform: `translate3d(0, ${y.val}px, 0) scale(${scale.val})`,
                 WebkitTransform: `translate3d(0, ${y.val}px, 0) scale(${scale.val})`,
                 zIndex: n === lastPressed ? 99 : n,
               }}>
                {product.name}
             </div>
           )}
         </div>
       }
     </Spring>
    );
	}


  private handleTouchStart = (key, pressLocation, e) => {
    this.handleMouseDown(key, pressLocation, e.touches[0]);
  }

  private handleTouchMove = (e) => {
    e.preventDefault();
    this.handleMouseMove(e.touches[0]);
  }

  private handleMouseDown = (pos, pressY, {pageY}) => {
    this.setState({
      delta: pageY - pressY,
      mouse: pressY,
      isPressed: true,
      lastPressed: pos,
    });
  }

  private handleMouseMove = ({pageY}) => {
    let {isPressed, delta, lastPressed, products} = this.state;

    if (isPressed) {
      let mouse = pageY - delta,
       toIndex = clamp(Math.round(mouse / 100), 0, itemsCount - 1);

      DashboardActions.moveProduct(lastPressed, toIndex);
      // const newProducts = reinsert(products, products.indexOf(lastPressed), row);
      // this.setState({mouse: mouse, products: newProducts});
    }
  }

  handleMouseUp = () => {
    this.setState({isPressed: false, delta: 0});
  }
}

export default DashboardProductListComponent;
