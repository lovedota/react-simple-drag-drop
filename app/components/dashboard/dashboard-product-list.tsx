import './styles/dashboard-product-list.scss';

import React from 'react';
import classNames from "classnames";
import DashboardProductItem from './dashboard-product-item';
import DashboardActions from '../../actions/dashboard-actions';

interface Props extends React.Props<any> {
  products: Product[];
}

interface State {

}

class DashboardProductListComponent extends React.Component<Props, State> {
  static displayName = "DashboardProductListComponent";

	render() {
    let {products} = this.props;

    return (
      <ul className="dashboard-product-list">
        {products.map(product => {
          return <DashboardProductItem product={product} key={product.id} />
        })}
      </ul>
    );
	}
}

export default DashboardProductListComponent;
