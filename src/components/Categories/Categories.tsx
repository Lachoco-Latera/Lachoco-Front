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
import { Transition } from "@headlessui/react";
import { useState, useEffect } from "react";
import CategoryBox from "../CategoryBox";
import axios from "axios";

const Categories = ({ categories }: any) => {
  const categoriesAlt = [
    {
      label: "Vanilla",
      icon: TbBeach,
      description: "Classic vanilla flavor",
    },
    {
      label: "Chocolate",
      icon: MdOutlineVilla,
      description: "Rich and creamy chocolate",
    },
    {
      label: "Maracuyá",
      icon: TbMountain,
      description: "Fresh and fruity strawberry",
    },
    {
      label: "Cereza",
      icon: GiBoatFishing,
      description: "Cool minty freshness",
    },
    {
      label: "Coriandro",
      icon: GiForestCamp,
      description: "Creamy with cookie chunks",
    },
    {
      label: "Canela",
      icon: MdSnowmobile,
      description: "Smooth butter pecan",
    },
    {
      label: "Sal Marina",
      icon: MdOutlineWbSunny,
      description: "Chocolate with marshmallows and nuts",
    },
    {
      label: "Sabajón",
      icon: GiField,
      description: "Nutty pistachio flavor",
    },
    {
      label: "Mango",
      icon: FaTreeCity,
      description: "Tropical mango delight",
    },
    {
      label: "Maní",
      icon: TbMilkshake,
      description: "Thick and creamy milkshake",
    },
    {
      label: "Café",
      icon: FaIceCream,
      description: "Topped with syrup and cherries",
    },
    {
      label: "Whisky",
      icon: GiDonut,
      description: "Sweet and sugary donut",
    },
    {
      label: "Baileys",
      icon: GiCupcake,
      description: "Delicious cupcake with frosting",
    },
    {
      label: "Nuez con coñac",
      icon: MdOutlineCookie,
      description: "Chunks of cookie dough",
    },
    {
      label: "Sabajón de feijoa",
      icon: GiPieSlice,
      description: "Classic apple pie flavor",
    },
  ];

  // const pathname = window.location.href || "";
  const [categoriess, setCategories] = useState([]);
  // const [isShowing, setIsShowing] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://lachoco.onrender.com/category"
        );
        setCategories(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCategories();
    console.log(categoriess, "Si es que hay: ", categories);
  }, []);
  const category = "default";
  // useEffect(() => {
  //   let lastScrollTop = 0;
  //   let scrolledDownEnough = false;

  //   const handleScroll = () => {
  //     const currentScrollTop =
  //       window.scrollY || document?.documentElement.scrollTop;

  //     if (currentScrollTop > lastScrollTop) {
  //       // Scrolling down
  //       if (currentScrollTop >= 75) {
  //         scrolledDownEnough = true;
  //         setIsShowing(false);
  //       }
  //     } else {
  //       // Scrolling up
  //       if (scrolledDownEnough || currentScrollTop === 0) {
  //         setIsShowing(true);
  //         scrolledDownEnough = false;
  //       }
  //     }

  //     lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop; // For Mobile or negative scrolling
  //   };

  //   window.addEventListener("scroll", handleScroll);
  // }, []);

  // const isMainPage = /^\/(es|en)?$/.test(pathname);
  // if (!isMainPage) {
  //   return null;
  // }
  return (
    <div
      className="
        max-w-[2520px]
        mx-auto
        xl:px-20 
        md:px-10
        sm:px-2
        px-4 
        sticky 
        top-14
        bg-white
        z-[5]
        drop-shadow
      "
    >
      <Transition
        show={true}
        enter="transition-opacity duration-45"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-50"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div
          className="
          pt-4
          flex 
          flex-row 
          text-center 
          items-center 
          justify-between
          overflow-x-auto
        "
        >
          {categoriesAlt.map((item) => (
            <CategoryBox
              key={item.label}
              label={item.label}
              icon={item.icon}
              selected={category === item.label}
            />
          ))}
        </div>
      </Transition>
    </div>
  );
};

export default Categories;
