import * as Immutable     from 'immutable';
import BaseStore          from './base-store';
import ProductStore       from './product-store';
import Dispatcher         from '../cores/dispatcher';
import DashboardConstants from '../constants/dashboard-constants';
import handle             from '../decorators/handle-decorator';

interface DashboardAction {
  type: string;
  products?: Product[];
  productId?: string;
  fromProductId?: string;
  toProductId?: string;
}

const
  ITEM_WIDTH = 200,
  LIST_WIDTH = 600;


class DashboardStore extends BaseStore {
  private _products:  Immutable.IndexedIterable<Product> = Immutable.List<Product>();

  constructor() {
    super(DashboardConstants.DASHBOARD_CHANGE_EVENT);
  }

  get products() {
    return this._products.toArray();
  }

  @handle(DashboardConstants.DASHBOARD_LOAD_COMPLETE)
  private convertProductsToViewModel(action: DashboardAction) {
    this.waitFor([ProductStore.dispatchToken]);
    console.log('Handle action "DashboardConstants.DASHBOARD_LOAD_COMPLETE" from DashboardStore');
    this._products = Immutable.List<Product>(action.products.map((product: Product, index: number) => {
      product.order = index;
      product.styles = {};
      return product;
    }));

    this.createListStyles();

    this.emitChange();
  }

  @handle(DashboardConstants.DASHBOARD_MOVE_PRODUCT)
  private changeProductsPosition(action: DashboardAction) {
    let fromProduct = this._products.find(p => p.id === action.fromProductId),
      toProduct = this._products.find(p => p.id === action.toProductId),
      fromProductOrder = fromProduct.order,
      fromProductStyles = fromProduct.styles;

    fromProduct.order = toProduct.order;
    fromProduct.styles = toProduct.styles;

    toProduct.order = fromProductOrder;
    toProduct.styles = fromProductStyles;

    this.emitChange();
  }

  @handle(DashboardConstants.DASHBOARD_REMOVE_PRODUCT)
  private removeProduct(action: DashboardAction) {
    let removedProduct = this._products.find(p => p.id === action.productId);

    //1. Remove product
    this._products = this._products.splice(this._products.indexOf(removedProduct), 1);

    //2. Refresh the order
    this._products.forEach(p => {
      if (p.order >= removedProduct.order) {
        p.order = p.order - 1;
      }
    });

    //3. Make move animation
    this.createListStyles();

    this.emitChange();
  }
  
  @handle(DashboardConstants.DASHBOARD_ADD_PRODUCT)
  private addProduct(action: DashboardAction) {
    let newProduct: Product = {
      id: Math.random().toString(),
      name: `Product ${this._products.size + 1}`,
      price: Math.floor(Math.random() * (1000 - 10)) + 10,
      order: this._products.size
    };

    //1. Add product
    this._products = this._products.push(newProduct);

    //2. Make move animation
    this.createListStyles();

    this.emitChange();
  }

  @handle(DashboardConstants.DASHBOARD_SHUFFLE_PRODUCTS)
  private shuffleProducts() {
    var array = this._products,
      currentIndex = array.size,
      temporaryValue,
      randomIndex,
      randomItem,
      currentItem;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      currentItem = array.find(p => p.order === currentIndex);
      randomItem = array.find(p => p.order === randomIndex);
      // And swap it with the current element.
      temporaryValue = currentItem.order;
      currentItem.order = randomIndex;
      randomItem.order = temporaryValue;
    }

    //3. Make move animation
    this.createListStyles();

    this.emitChange();
  }

  private createListStyles() {
    let totalProducts = this._products.size,
      cols = Math.floor(LIST_WIDTH / ITEM_WIDTH),
      rows = Math.ceil(totalProducts / cols),
      index = 0,
      product;

    for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
        for (let colIndex = 0; colIndex < cols; colIndex++) {
            let x = (colIndex * 100) + "%",
              y = (rowIndex * 100) + "%",
              transforms = {
                'WebkitTransform': `translate3d(${x}, ${y}, 0)`,
                'transform': `translate3d(${x}, ${y}, 0)`
              };

            if (index <= this._products.size - 1) {
              product = this._products.find(p => p.order === index);
              product.styles = transforms;
            }

            ++index;
        }
    }
  }
}

export default new DashboardStore();
