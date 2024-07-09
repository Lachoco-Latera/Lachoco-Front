import { useEffect, useState } from "react";
import axios from "axios";
import Header from "./components/Header/Header";
import Drawer from "./components/Drawer";
import Cart from "./components/minicart/Cart";
import { useProductsStore } from "./stores/useProductsStore";
import ProductsGridAlt from "./components/Products/ProductsGridAlt";
import "semantic-ui-css/semantic.min.css";
// import { Login } from "./components/Login/Login";
// import { Register } from "./components/Register/Register";
// import { UserConfig } from "./components/UserConfig/UserConfig";
import { Footer } from "./components/Footer/Footer";
import Categories from "./components/Categories/Categories";
import BottomBar from "./components/BottomBar/BottomBar";
import { Admin } from "./components/Admin/Admin";
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
          "https://lachocoback.vercel.app/products"
        );
        setProducts(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://lachocoback.vercel.app/category"
        );
        setCategories(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProducts();
    fetchCategories();
  }, []);

  const handleCartIconClick = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  const handleCartIconClickAlt = () => {
    return isDrawerOpen === false
      ? setIsDrawerOpen(!isDrawerOpen)
      : setIsDrawerOpen(isDrawerOpen);
  };
  return (
    <div>
      <Header onCartIconClick={handleCartIconClick} products={products} />
      <div className="block md:hidden">
        <BottomBar onCartIconClick={handleCartIconClick} />
      </div>
      <Categories categories={categories} />
      <Drawer isOpen={isDrawerOpen} onCartIconClick={handleCartIconClick}>
        <Cart similar={products} />
      </Drawer>
      <ProductsGridAlt
        products={products}
        onCartIconClick={handleCartIconClickAlt}
      />
      <Admin/>
      <Footer />
    </div>
  );
}

export default App;
