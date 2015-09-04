import * as React           from 'react';
import logClass             from '../../decorators/log-class-decorator';
import DashboardProductList from './dashboard-product-list';
import DashboardBasket      from './dashboard-basket';
import DashboardStore       from '../../stores/dashboard-store';

interface Props {

}

interface State {
  products: Product[];
  mousePosition: any;
}

function getStateFromStores(): State {
  return {
    products: DashboardStore.products,
    mousePosition: DashboardStore.mousePosition
  };
}

@logClass
class DashboardPageComponent extends React.Component<Props, State> {
  constructor() {
      super();
      this.state = getStateFromStores();
  }

  componentWillUnmount() {
    DashboardStore.removeChangeListener(this.onChange);
  }

  componentDidMount() {
    DashboardStore.addChangeListener(this.onChange);
  }

  componentDidUpdate() {
    let {mousePosition} = this.state,
      $productList = React.findDOMNode(this.refs['productList']);


    console.log('Mouse', mousePosition.pageY);
    console.log('ProductList', $productList.scrollTop);
    if (mousePosition >= $productList.scrollTop) {
      $productList.scrollTop = mousePosition.pageY;
    }
  }

  render() {
     return (
       <div className="row">
        <div className="col-md-6">
          <DashboardProductList products={this.state.products} ref="productList"/>
        </div>
        <div className="col-md-6">
          <DashboardBasket/>
        </div>
       </div>
     );

  }

  private onChange = () => {
    this.setState(getStateFromStores());
  }
}

export default DashboardPageComponent;
