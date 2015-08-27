/// <reference path="../../typings/tsd.d.ts"/>

import * as Immutable     from 'immutable';
import BaseStore          from './base-store';
import Dispatcher         from '../cores/dispatcher';
import DashboardConstants from '../constants/dashboard-constants';
import handle             from '../decorators/handle-decorator';

interface DashboardAction {
  type: string;
  products?: Product[];
}

let _products: Immutable.List<Product>;

class DashboardStore extends BaseStore {

  constructor() {
    super(DashboardConstants.DASHBOARD_CHANGE_EVENT);
  }

  get products() {
    return _products.toArray();
  }

  @handle(DashboardConstants.DASHBOARD_LOAD_COMPLETE)
  private convertProductsToViewModel(action: DashboardAction) {
    _products = Immutable.List<Product>().push(...action.products);

    this.emitChange();
  }
}

export default new DashboardStore();
