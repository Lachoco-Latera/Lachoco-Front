import { useEffect, useState } from "react";
import axios from "axios";
import Header from "./components/Header/Header";
import Drawer from "./components/Drawer";
import Cart from "./components/minicart/Cart";
import { useProductsStore } from "./stores/useProductsStore";
import ProductsGridAlt from "./components/Products/ProductsGridAlt";
import "semantic-ui-css/semantic.min.css";
import { Footer } from "./components/Footer/Footer";
import Categories from "./components/Categories/Categories";
import BottomBar from "./components/BottomBar/BottomBar";
import "./index.css"; // Añade esta línea para los estilos CSS del loading
import { useUser } from "@clerk/clerk-react";
function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true); // Estado de carga
  const { isLoaded } = useUser();

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

    const fetchData = async () => {
      await Promise.all([fetchProducts(), fetchCategories()]);
      if (isLoaded) {
        setLoading(false); // Desactivar el loading después de cargar los datos y verificar isLoaded
      }
    };
    fetchData();
  }, [isLoaded]); // Añade isLoaded como dependencia del useEffect

  const handleCartIconClick = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleCartIconClickAlt = () => {
    return isDrawerOpen === false
      ? setIsDrawerOpen(!isDrawerOpen)
      : setIsDrawerOpen(isDrawerOpen);
  };

  if (loading || !isLoaded) {
    return (
      <div className="loading-overlay">
        <div className="loading-spinner"></div>
      </div>
    );
  }

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
      <Footer />
    </div>
  );
}

export default App;
