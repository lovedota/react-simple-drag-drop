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
  fromIndex?: number;
  toIndex?: number;
}

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
    this._products = Immutable.List<Product>(action.products);

    this.emitChange();
  }

  @handle(DashboardConstants.DASHBOARD_DRAG_ENTER)
  private changeProductsPosition(action: DashboardAction) {
    let fromProduct = this._products.get(action.fromIndex);

    this._products = this._products.splice(action.fromIndex, 1);
    this._products = this._products.splice(action.toIndex, 0, fromProduct);

    this.emitChange();
  }
}

export default new DashboardStore();
