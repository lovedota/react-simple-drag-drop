let DEFAULT_IMAGE_URL = 'http://cumbrianrun.co.uk/wp-content/uploads/2014/02/default-placeholder.png';

class DashboardService {
  getProducts(): Product[] {
    let products: Product[] = [];

    for (let i = 0; i < 100; i++) {
      products.push({
      	id: i.toString(),
      	name: `Product ${i + 1}`,
        price: Math.floor(Math.random() * (1000 - 10)) + 10,
        imageUrl: DEFAULT_IMAGE_URL
      });
    }
    return products;
  }
}

export default new DashboardService();
