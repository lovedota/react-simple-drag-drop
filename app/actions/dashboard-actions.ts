import Dispatcher         from '../cores/dispatcher';
import DashboardConstants from '../constants/dashboard-constants';
import DashboardService   from '../services/dashboard-services';
import DashboardStore     from '../stores/dashboard-store';

class DashboardActions {
  getProducts() {
    Dispatcher.dispatch({
      type: DashboardConstants.DASHBOARD_LOAD_COMPLETE,
      products: DashboardService.getProducts()
    });
  }

  moveProduct(fromIndex: number, toIndex: number) {
    Dispatcher.dispatch({
      type: DashboardConstants.DASHBOARD_DRAG_ENTER,
      fromIndex,
      toIndex
    });
  }

  startDragging(productId) {
    Dispatcher.dispatch({
      type: DashboardConstants.DASHBOARD_DRAG_START,
      productId
    });
  }
}

export default new DashboardActions();
