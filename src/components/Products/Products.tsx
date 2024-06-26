// import React from 'react'
import { useEffect, useState } from "react";

import Header from "../../components/Header/Header";
import BottomBar from "../../components/BottomBar/BottomBar";
import axios from "axios";
import Drawer from "../Drawer";
import Cart from "../minicart/Cart";
import { useParams } from "react-router-dom";

const Products = () => {
  const { id } = useParams();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [info, setInfo] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://lachoco.onrender.com/products/f759b7e3-93c2-4354-abce-d4a2cc647267"
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

  console.log(info, id);
  return (
    <>
      <Header onCartIconClick={handleCartIconClick} />
      <div className="block md:hidden">
        <BottomBar onCartIconClick={handleCartIconClickAlt} />
      </div>
      <Drawer isOpen={isDrawerOpen} onCartIconClick={handleCartIconClick}>
        <Cart similar={info} />
      </Drawer>
      <div className=" my-8 flex flex-col justify-center items-center">
        Acá estáa tus productos principales
      </div>
    </>
  );
};

export default Products;
