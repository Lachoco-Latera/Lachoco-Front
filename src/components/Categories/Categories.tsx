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

  const [, setSearchParams] = useSearchParams();

  const handleClickCategory = (category: string) => {
    setSearchParams({ category });
  };

  return (
    <div className="max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4 sticky top-14 bg-white z-[5] drop-shadow">
      <div className="pt-4 flex flex-row text-center items-center justify-between overflow-x-auto">
        {categories.map((item: any) => (
          <CategoryBox
            key={item.id}
            label={item.name}
            icon={iconMap[item.icon]} // Utiliza iconMap para obtener el icono correcto
            selected={true} // Ajusta según sea necesario
            onSelect={() => handleClickCategory(item.name)}
          />
        ))}
      </div>
    </div>
  );
};

export default Categories;
