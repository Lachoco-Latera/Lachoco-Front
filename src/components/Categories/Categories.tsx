import { IconType } from "react-icons";
import { useSearchParams } from "react-router-dom";
import CategoryBox from "../CategoryBox";

// Definición de los iconos que esperas utilizar
import { TbBeach, TbMountain, TbMilkshake } from "react-icons/tb";
import {
  GiBoatFishing,
  GiField,
  GiForestCamp,
  GiDonut,
  GiCupcake,
  GiPieSlice,
} from "react-icons/gi";
import {
  MdOutlineVilla,
  MdSnowmobile,
  MdOutlineWbSunny,
  MdOutlineCookie,
} from "react-icons/md";
import { FaTreeCity, FaIceCream } from "react-icons/fa6";
import { useEffect, useState } from "react";

const Categories = ({ categories }: any) => {
  const iconMap: Record<string, IconType> = {
    TbBeach,
    TbMountain,
    TbMilkshake,
    GiBoatFishing,
    GiField,
    GiForestCamp,
    GiDonut,
    GiCupcake,
    GiPieSlice,
    MdOutlineVilla,
    MdSnowmobile,
    MdOutlineWbSunny,
    MdOutlineCookie,
    FaTreeCity,
    FaIceCream,
  };

  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get("category") || "default";
  const [hasScrolled, setHasScrolled] = useState(false);

  const handleClickCategory = (category: string) => {
    const currentCategory = searchParams.get("category");
    if (currentCategory === category) {
      setSearchParams({});
    } else {
      setSearchParams({ category });
    }
  };
  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4 sticky top-[66px] bg-white z-[5] transition-all ease ${
        hasScrolled ? "drop-shadow" : ""
      }`}
    >
      <div className=" flex flex-row text-center items-center justify-between overflow-x-auto">
        {categories.map((item: any) => (
          <CategoryBox
            key={item.id}
            label={item.name}
            icon={iconMap[item.icon]} // Utiliza iconMap para obtener el icono correcto
            selected={selectedCategory === item.name} // Ajusta según sea necesario
            onSelect={() => handleClickCategory(item.name)}
          />
        ))}
      </div>
    </div>
  );
};

export default Categories;
