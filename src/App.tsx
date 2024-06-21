import { useEffect, useState } from "react";

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

  const { fetchData } = useProductsStore();

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleCartIconClick = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  return (
    <div>
      <Header onCartIconClick={handleCartIconClick} />

      <Drawer isOpen={isDrawerOpen} onCartIconClick={handleCartIconClick}>
        <Cart />
      </Drawer>
      <Categories />
      <Products />
      <Login/>
      <Register/>
      <UserConfig/>
      <Footer/>
    </div>
  );
}

export default App;
