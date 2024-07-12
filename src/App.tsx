import React, { useEffect, useState } from "react";
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
import logo from "../public/images/logo.png";

function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true); // Estado de carga
  const { isLoaded, user } = useUser();
  const [isFooterVisible, setIsFooterVisible] = useState(true); // Estado para la visibilidad del Footer

  const userEmail = user?.primaryEmailAddress?.emailAddress;
  const { fetchData } = useProductsStore();
  const [userId, setUserId] = useState(null); // Estado para almacenar el ID de usuario
  const [userDetails, setUserDetails] = useState(null); // Estado para almacenar los detalles del usuario

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `https://lachocoback.vercel.app/users`
        );
        const userWithEmail = response.data.find(
          (user: any) => user.email === userEmail
        );
        if (userWithEmail) {
          setUserId(userWithEmail.id); // Almacena el ID de usuario en el estado
          setUserDetails(userWithEmail); // Almacena los detalles del usuario en el estado
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false); // Desactivar el loading después de intentar cargar los datos
      }
    };

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
      await Promise.all([fetchUserData(), fetchProducts(), fetchCategories()]);
      if (isLoaded) {
        setLoading(false); // Desactivar el loading después de cargar los datos y verificar isLoaded
      }
    };
    fetchData();
  }, [isLoaded, userEmail]); // Añade userEmail como dependencia del useEffect

  useEffect(() => {
    const handleScroll = () => {
      const footer = document.getElementById("footer");
      if (footer) {
        const footerPosition = footer.getBoundingClientRect().top;
        const viewportHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollPosition = window.scrollY + viewportHeight;

        // Mostrar el footer solo cuando se está en el fondo de la página
        setIsFooterVisible(
          scrollPosition >= documentHeight || documentHeight <= viewportHeight
        );
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Llamar a la función al cargar para ajustar el estado inicial

    return () => window.removeEventListener("scroll", handleScroll);
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
    <div className="min-h-screen ">
      {loading ? (
        <div className="flex flex-col items-center justify-center h-screen gap-8">
          <img
            src={logo}
            className="md:w-48 md:min-w-16 w-48 cursor-pointer hover:scale-105 hover:drop-shadow-sm transition-all ease duration-200"
            alt="Lachoco-Latera logo"
            onClick={() => (window.location.href = "/")}
          />
          <div className="text-xl">
            {(function () {
              setTimeout(() => {
                const loadingText = document.getElementById("loading-text");
                if (loadingText) {
                  loadingText.innerText =
                    "Esto está tardando más de lo esperado, Hacer click al logo para reintentar";
                }
              }, 7000);
              return <span id="loading-text">Buscando productos...</span>;
            })()}
          </div>
        </div>
      ) : (
        <>
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
          <div
            id="footer"
            className={`md:fixed w-full md:bottom-0 transition-opacity ${
              isFooterVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            <Footer />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
