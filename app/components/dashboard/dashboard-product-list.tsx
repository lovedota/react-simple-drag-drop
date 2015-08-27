import './styles/dashboard-product-list.scss';

import * as React from 'react';
import classNames from "classnames";
import DashboardProductItem from './dashboard-product-item';

interface Props extends React.Props<any> {
  products: Product[];
}

interface State {

}

class DashboardProductListComponent extends React.Component<Props, State> {
  static displayName = "DashboardProductListComponent";

	render() {
    let rows = [];

    this.props.products.forEach(product => {
      rows.push(<DashboardProductItem product={product} key={product.id}/>);
    });

    return (
      <div className="dashboard-product-list columns">
        {rows}
      </div>
    );
	}
}

export default DashboardProductListComponent;
