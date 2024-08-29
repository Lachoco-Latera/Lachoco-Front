import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import BottomBar from "../../components/BottomBar/BottomBar";
import axios from "axios";
import Drawer from "../Drawer";
import Cart from "../minicart/Cart";
import { useParams } from "react-router-dom";
import ProductsDetail from "./productsDetail/ProductsDetail";
import { VITE_BASE_URL } from "@/config/envs";
import { Footer } from "../Footer/Footer";
import { useTranslation } from "react-i18next";

const Products = () => {
  const { id } = useParams();
  const {t} = useTranslation()
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [info, setInfo] = useState<any>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${VITE_BASE_URL}/products/${id}`
        );
        setInfo(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProducts();
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
    <>
      {" "}
      <div className="hidden md:block">
        <Header onCartIconClick={handleCartIconClick} products={info} />{" "}
      </div>
      <div className="block md:hidden">
        <BottomBar onCartIconClick={handleCartIconClickAlt} />
      </div>
      <Drawer isOpen={isDrawerOpen} onCartIconClick={handleCartIconClick}>
        <Cart similar={info} />
      </Drawer>
      <div className="my-0 md:my-8 flex flex-col justify-center items-center">
        {info ? (
          <>
          <ProductsDetail info={info} onCheckIconClick={handleCartIconClick} />
          <div className="w-full relative bottom-0">
          <Footer/>
          </div>
          </>
        ) 
        : (
          <div className="flex flex-col">
            <p className="text-2xl font-semibold text-center">{t("Loading")}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Products;
