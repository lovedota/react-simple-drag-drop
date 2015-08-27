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

  toogleDashboardItem(warehouseId: string) {
    Dispatcher.dispatch({
      type: DashboardConstants.DASHBOARD_ITEM_TOGGLE,
      warehouseId
    });
  }

  toogleDashboardProduct(warehouseId: string, productId: string, checked: boolean) {
    Dispatcher.dispatch({
      type: DashboardConstants.DASHBOARD_PRODUCT_TOGGLE,
      warehouseId,
      productId,
      checked
    });
  }

  saveSelectedNextDashboard(nextDashboardId) {
    Dispatcher.dispatch({
      type: DashboardConstants.DASHBOARD_NEXT_DASHBOARD_CHANGE,
      nextDashboardId
    });
  }

  moveSelectedProductsToDashboard() {
    let TIMEOUT_ANIMATION = 500;

    Dispatcher.dispatch({
      type: DashboardConstants.DASHBOARD_EXPAND_NEXT_DASHBOARD
    });

    Dispatcher.dispatch({
      type: DashboardConstants.DASHBOARD_REMOVE_SELECTED_PRODUCTS_CURRENT_DASHBOARD
    });

    setTimeout(() => {
      Dispatcher.dispatch({
        type: DashboardConstants.DASHBOARD_MOVE_SELECTED_PRODUCT_TO_DASHBOARD
      });
    }, TIMEOUT_ANIMATION);
  }
}

export default new DashboardActions();
