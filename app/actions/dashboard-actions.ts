import Dispatcher from "../cores/dispatcher";
import DashboardConstants from "../constants/dashboard-constants";
import DashboardService from "../services/dashboard-services";

class DashboardActions {
  async getProducts() {
    let products = await DashboardService.getProducts();

    Dispatcher.dispatch({
      type: DashboardConstants.DASHBOARD_LOAD_COMPLETE,
      products: products
    });
  }

  moveProduct(fromProductId: string, toProductId: string) {
    Dispatcher.dispatch({
      type: DashboardConstants.DASHBOARD_MOVE_PRODUCT,
      fromProductId,
      toProductId
    });
  }

  removeProduct(productId) {
    Dispatcher.dispatch({
      type: DashboardConstants.DASHBOARD_REMOVE_PRODUCT,
      productId
    });
  }

  addProduct() {
    Dispatcher.dispatch({
      type: DashboardConstants.DASHBOARD_ADD_PRODUCT
    });
  }

  shuffleProducts() {
    Dispatcher.dispatch({
      type: DashboardConstants.DASHBOARD_SHUFFLE_PRODUCTS
    });
  }
}

export default new DashboardActions();
