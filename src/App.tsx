import { useEffect, useState } from "react";

// import Products from "./components/Products/Products";
import Header from "./components/Header/Header";
import Drawer from "./components/Drawer";
import Cart from "./components/minicart/Cart";
import { useProductsStore } from "./stores/useProductsStore";
import Products from "./components/Products/Products";

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
      <Products />
    </div>
  );
}

export default App;
