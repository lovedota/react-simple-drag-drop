/// <reference path="../../typings/tsd.d.ts"/>

import * as Immutable     from 'immutable';
import BaseStore          from './base-store';
import Dispatcher         from '../cores/dispatcher';
import DashboardConstants from '../constants/dashboard-constants';
import handle             from '../decorators/handle-decorator';

interface DashboardAction {
  type: string;
  products?: Product[];
  productId?: string;
  fromProductId?: string;
  toProductId?: string;
  pageX?: number;
  pageY?: number;
}

const
  ITEM_WIDTH = 200,
  LIST_WIDTH = 600;


class DashboardStore extends BaseStore {
  private _products:  Immutable.IndexedIterable<Product> = Immutable.List<Product>();
  private _mousePosition: any;

  constructor() {
    super(DashboardConstants.DASHBOARD_CHANGE_EVENT);
  }

  get products() {
    return this._products.toArray();
  }

  get mousePosition() {
    return this._mousePosition;
  }

  @handle(DashboardConstants.DASHBOARD_LOAD_COMPLETE)
  private convertProductsToViewModel(action: DashboardAction) {
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
    let productIndex = this._products.findIndex(p => p.id === action.productId),
      orderProducts,
      product;

    //1. Remove product
    this._products = this._products.splice(productIndex, 1);

    //2. Refresh the order
    orderProducts =  this._products.sortBy(p => p.order);

    for (let i = productIndex; i < orderProducts.size; i++) {
      product = orderProducts.get(i);
      product.order = product.order - 1;
    }

    this._products = orderProducts;

    //3. Make move animation
    this.createListStyles();

    this.emitChange();
  }

  @handle(DashboardConstants.DASHBOARD_MOUSE_CHANGE)
  private mousePositionChange(action: DashboardAction) {
    this._mousePosition = {
      pageX: action.pageX,
      pageY: action.pageY
    }

    this.emitChange();
  }

  private createListStyles() {
    let totalProducts = this._products.size,
      cols = Math.floor(LIST_WIDTH / ITEM_WIDTH),
      rows = Math.round(totalProducts / cols),
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
