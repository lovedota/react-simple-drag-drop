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
}

function createListStyles(products: Product[], rows, cols) {
    var rules = [],
        index = 0;
       
    for (var rowIndex = 0; rowIndex < rows; rowIndex++) {
        for (var colIndex = 0; colIndex < cols; colIndex++) {
            var x = (colIndex * 100) + "%",
                y = (rowIndex * 100) + "%",
                transforms = {
                  'WebkitTransform': `translate3d(${x}, ${y}, 0)`,
                  'transform': `translate3d(${x}, ${y}, 0)`
                };

            products[rowIndex * colIndex]['styles'] = transforms;
        }
    }

    return Immutable.List<Product>(products);
}

class DashboardStore extends BaseStore {
  private _products:  Immutable.IndexedIterable<Product>;

  constructor() {
    super(DashboardConstants.DASHBOARD_CHANGE_EVENT);
  }

  get products() {
    return this._products.toArray();
  }

  @handle(DashboardConstants.DASHBOARD_LOAD_COMPLETE)
  private convertProductsToViewModel(action: DashboardAction) {
    this._products = Immutable.List<Product>(action.products);

    this.emitChange();
  }

  @handle(DashboardConstants.DASHBOARD_DRAG_ENTER)
  private changeProductsPosition(action: DashboardAction) {
    let fromProduct = this._products.find(p => p.id === action.fromProductId),
      fromProductIndex = this._products.indexOf(fromProduct),
      toProductIndex =  this._products.findIndex(p => p.id === action.toProductId);

    this._products = this._products.splice(fromProductIndex, 1);
    this._products = this._products.splice(toProductIndex, 0, fromProduct);

    this.emitChange();
  }
}

export default new DashboardStore();
