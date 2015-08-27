let DEFAULT_IMAGE_URL = 'http://cumbrianrun.co.uk/wp-content/uploads/2014/02/default-placeholder.png';

class DashboardService {
  getProducts(): Product[] {
    return [
      {
      	id: '1',
      	name: 'Product 1',
        price: 1000,
        imageUrl: DEFAULT_IMAGE_URL
      },
      {
        id: '2',
        name: 'Product 2',
        price: 2000,
        imageUrl: DEFAULT_IMAGE_URL
      },
      {
        id: '3',
        name: 'Product 3',
        price: 1500,
        imageUrl: DEFAULT_IMAGE_URL
      },
      {
        id: '4',
        name: 'Product 4',
        price: 2500,
        imageUrl: DEFAULT_IMAGE_URL
      }
    ]
  }
}

export default new DashboardService();
