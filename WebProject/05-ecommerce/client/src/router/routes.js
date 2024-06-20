import Home from '../pages/Home'
import Products from '../pages/Products'
import Product from '../pages/Product'

const routes = [
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/products/:id",
    element: <Products />
  },
  {
    path: "/product/:id",
    element: <Product />
  },
];

export default routes;
