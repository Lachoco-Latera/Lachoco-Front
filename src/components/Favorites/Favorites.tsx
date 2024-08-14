import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import BottomBar from "../../components/BottomBar/BottomBar";
import axios from "axios";
import Drawer from "../Drawer";
import Cart from "../minicart/Cart";
import { MdFavoriteBorder } from "react-icons/md";

const Favorites = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [info, setInfo] = useState<any>(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get(
          `https://lachocoback.vercel.app/products`
        );
        setInfo(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    //                    `https://lachocoback.vercel.app/users/favorite/${userId}`

    fetchFavorites();
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
      <Header onCartIconClick={handleCartIconClick} products={info} />
      <div className="block md:hidden">
        <BottomBar onCartIconClick={handleCartIconClickAlt} />
      </div>
      <Drawer isOpen={isDrawerOpen} onCartIconClick={handleCartIconClick}>
        <Cart similar={info} />
      </Drawer>
      <div className="my-8 flex flex-col justify-center items-center">
        {info ? (
          <p className="flex flex-row gap-2 justify-center items-center">
            <MdFavoriteBorder size={28} />
            Lista de favoritos!
          </p>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </>
  );
};

export default Favorites;
