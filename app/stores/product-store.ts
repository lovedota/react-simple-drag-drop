import * as Immutable     from 'immutable';
import BaseStore          from './base-store';
import Dispatcher         from '../cores/dispatcher';
import DashboardConstants from '../constants/dashboard-constants';
import handle             from '../decorators/handle-decorator';

interface ProductAction {
  type: string;
}

class ProductStore extends BaseStore {
  constructor() {
    super(DashboardConstants.DASHBOARD_CHANGE_EVENT);
  }

  @handle(DashboardConstants.DASHBOARD_LOAD_COMPLETE)
  private convertProductsToViewModel(action: ProductAction) {
    console.log('Handle action "DashboardConstants.DASHBOARD_LOAD_COMPLETE" from ProductStore');
    this.emitChange();
  }
}

export default new ProductStore();
