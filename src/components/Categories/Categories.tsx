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

const Categories = () => {
  const categories = [
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
      label: "Strawberry",
      icon: TbMountain,
      description: "Fresh and fruity strawberry",
    },
    {
      label: "Mint",
      icon: GiBoatFishing,
      description: "Cool minty freshness",
    },
    {
      label: "Cookies and Cream",
      icon: GiForestCamp,
      description: "Creamy with cookie chunks",
    },
    {
      label: "Butter Pecan",
      icon: MdSnowmobile,
      description: "Smooth butter pecan",
    },
    {
      label: "Rocky Road",
      icon: MdOutlineWbSunny,
      description: "Chocolate with marshmallows and nuts",
    },
    {
      label: "Pistachio",
      icon: GiField,
      description: "Nutty pistachio flavor",
    },
    {
      label: "Mango",
      icon: FaTreeCity,
      description: "Tropical mango delight",
    },
    {
      label: "Milkshake",
      icon: TbMilkshake,
      description: "Thick and creamy milkshake",
    },
    {
      label: "Ice Cream Sundae",
      icon: FaIceCream,
      description: "Topped with syrup and cherries",
    },
    {
      label: "Donut",
      icon: GiDonut,
      description: "Sweet and sugary donut",
    },
    {
      label: "Cupcake",
      icon: GiCupcake,
      description: "Delicious cupcake with frosting",
    },
    {
      label: "Cookie Dough",
      icon: MdOutlineCookie,
      description: "Chunks of cookie dough",
    },
    {
      label: "Apple Pie",
      icon: GiPieSlice,
      description: "Classic apple pie flavor",
    },
  ];

  // const pathname = window.location.href || "";

  const [isShowing, setIsShowing] = useState(true);

  useEffect(() => {
    let lastScrollTop = 0;
    let scrolledDownEnough = false;

    const handleScroll = () => {
      const currentScrollTop =
        window.scrollY || document?.documentElement.scrollTop;

      if (currentScrollTop > lastScrollTop) {
        // Scrolling down
        if (currentScrollTop >= 75) {
          scrolledDownEnough = true;
          setIsShowing(false);
        }
      } else {
        // Scrolling up
        if (scrolledDownEnough || currentScrollTop === 0) {
          setIsShowing(true);
          scrolledDownEnough = false;
        }
      }

      lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop; // For Mobile or negative scrolling
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const category = "default";
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
      "
    >
      <Transition
        show={isShowing}
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
          items-center 
          justify-between
          overflow-x-auto
        "
        >
          {categories.map((item) => (
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
