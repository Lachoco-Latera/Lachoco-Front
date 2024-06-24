import { useEffect, useState } from "react";
import axios from "axios";

// import Products from "./components/Products/Products";
import Header from "./components/Header/Header";
import Drawer from "./components/Drawer";
import Cart from "./components/minicart/Cart";
import { useProductsStore } from "./stores/useProductsStore";
import Products from "./components/Products/Products";
import "semantic-ui-css/semantic.min.css";
import { Login } from "./components/Login/Login";
import { Register } from "./components/Register/Register";
import { UserConfig } from "./components/UserConfig/UserConfig";
import { Footer } from "./components/Footer/Footer";
import Categories from "./components/Categories/Categories";

function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const { fetchData } = useProductsStore();

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://lachoco.onrender.com/products"
        );
        setProducts(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchProducts();
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://lachoco.onrender.com/category"
        );
        setCategories(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchCategories();
  }, []);
  console.log(products, categories);

  const handleCartIconClick = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <div>
      <Header onCartIconClick={handleCartIconClick} />
      <Drawer isOpen={isDrawerOpen} onCartIconClick={handleCartIconClick}>
        <Cart similar={products} />
      </Drawer>
      <Categories categories={categories} />
      <Products products={products} />
      <Login />
      <Register />
      <UserConfig />
      <Footer />
    </div>
  );
}

export default App;
