import { IconType } from "react-icons";
import { useSearchParams } from "react-router-dom";
import CategoryBox from "../CategoryBox";

// Definición de los iconos que esperas utilizar

import { useEffect, useState } from "react";
import { BiFoodMenu } from "react-icons/bi";
import { PiDiamondsFourFill, PiFarmThin, PiGiftLight } from "react-icons/pi";
import { GiChocolateBar } from "react-icons/gi";
import { CiCoffeeCup } from "react-icons/ci";
import { SiCoffeescript } from "react-icons/si";
import { MdOutlineFastfood } from "react-icons/md";

const Categories = ({ categories }: any) => {
  const iconMap: Record<string, IconType> = {
    PiDiamondsFourFill, 
    PiFarmThin, 
    PiGiftLight,
    BiFoodMenu,
    GiChocolateBar,
    CiCoffeeCup,
    MdOutlineFastfood,
    SiCoffeescript
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
      className={`max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4 sticky top-[66px] bg-white  z-[5] transition-all ease ${
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
