import { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import { Product } from "@/types.d";
import Checkout from "../../../components/Checkout/Checkout";
import { FaShareSquare } from "react-icons/fa";
import { toast } from "sonner";
import { HiHeart } from "react-icons/hi";
import { SlHeart } from "react-icons/sl";
import { LuPackageOpen } from "react-icons/lu";
import { GrDeliver } from "react-icons/gr";
import { FaBookOpen } from "react-icons/fa";
import MapComponent from "../../MapComponent";
import FlavorModal from "../../FlavorModal";
import { useCartStore } from "../../../stores/useCartStore";
import { useTranslation } from "react-i18next";

interface ProductsDetailProps {
  info: any;
  onCheckIconClick: () => void;
}
const ProductsDetail: React.FC<ProductsDetailProps> = ({
  info,
  onCheckIconClick,
}) => {
  const { cart, confirmedFlavors } = useCartStore();
  const [modalProduct, setModalProduct] = useState<Product | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [productInfo, setProductInfo] = useState<any>(null);
  const [heartColor, setHeartColor] = useState("transparent");
  const [showFlavorModal, setShowFlavorModal] = useState(false);
  const altLabel = ["Solo Online", "Nuevo", "Importado"];
  const {t} = useTranslation();
  const handleImageClick = (product: Product) => {
    setModalProduct(product);
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
    setModalProduct(null);
  };

  const openFlavorModal = () => {
    info?.category?.name === "bombones"
      ? setShowFlavorModal(true)
      : setShowFlavorModal(false);
  };

  const closeFlavorModal = () => {
    setShowFlavorModal(false);
  };
  useEffect(() => {
    if (info) {
      setProductInfo(info);
    }
  }, [info]);

  if (!productInfo) {
    return <div>{t("Loading")}</div>;
  }
  const handleHeartClick = () => {
    setHeartColor((prevColor) => {
      if (prevColor === "transparent") {
        toast.success(t("Fav_add2"));
        return "red";
      } else {
        toast.error(t("Fav_remove"));
        return "transparent";
      }
    });
  };
  const maxFlavors =
    info.presentacion *
    cart.reduce((acc, item: any) => {
      if (item.id === info.id) {
        return acc + item.quantity;
      }
      return acc;
    }, 0);

  const actualSelectionLength = confirmedFlavors[info.id]?.length || 0;

  return (
    <div className="flex flex-col md:px-48 px-12 md:py-10 ">
      <div className="flex flex-col md:flex-row items-center md:justify-between">
        <h2 className="font-semibold md:text-3xl ">{productInfo?.name}</h2>
        <div className="flex items-center gap-2 ease transition-all">
          <a
            className="flex flex-row cursor-pointer items-center hover:scale-110 hover:px-2 gap-2 transition-all ease"
            href="whatsapp://send?text=Mirá la nueva página de lachoco-latera: https://lachoco-latera.com"
            data-action="share/whatsapp/share"
          >
            <FaShareSquare size={16} />
            {t("share")}{" "}
          </a>
          <div
            className="relative group flex cursor-pointer items-center gap-2 hover:scale-110 hover:px-2 transition-all ease"
            onClick={handleHeartClick}
          >
            <HiHeart
              id="firstHeart"
              size={24}
              className={`cursor-pointer group-hover:scale-[1.25] ease-in-out duration-300 drop-shadow absolute scale-[1.18] ${
                heartColor === "red" ? "text-red-500" : "opacity-30"
              }`}
            />
            <SlHeart
              id="secondHeart"
              size={24}
              color="white"
              className="cursor-pointer group-hover:scale-[1.1] ease-in-out duration-300 drop-shadow z-[8]"
            />
            {t("Fav_add")}
          </div>
        </div>
      </div>
      <Carousel
        axis="horizontal"
        showArrows={true}
        showThumbs={false}
        showIndicators={false}
        showStatus={false}
        infiniteLoop
        swipeable={true}
        emulateTouch
        onClickItem={() => handleImageClick(productInfo)}
      >
        {productInfo.images?.map((image: any, index: number) => (
          <div key={index} className="relative rounded-xl ">
            <img
              alt={`Product image ${index + 1}`}
              src={image?.img || ""}
              className="max-w-80 max-h-80 object-cover rounded-xl outline-none"
            />
          </div>
        ))}
      </Carousel>
      <div className="flex md:flex-row flex-col items-center md:items-start justify-between">
        <div className="flex flex-col md:pr-10">
          <ul className="flex gap-2 ">
            {altLabel.map((label: any, index: number) => (
              <li
                key={index}
                className="relativ bg-rose-500 font-bold text-white rounded-3xl shadow-xl p-2 hover:scale-105 cursor-pointer transition-all ease"
              >
                {label}
              </li>
            ))}
          </ul>
          <h2 className="self-start max-w-2xl pt-12 md:font-semibold">
            <p className="flex gap-2 text-3xl">
              <LuPackageOpen />
              {t("Products_presentation")}
            </p>
            <p className=""> {productInfo?.description}</p>
          </h2>
          <h2 className="self-start max-w-2xl pt-12 md:font-semibold">
            <p className="flex gap-2 text-3xl">
              <FaBookOpen />
              {t("Products_description")}
            </p>
            <p className=""> {productInfo?.description}</p>
          </h2>
          <h2 className="self-start max-w-2xl pt-12 pb-12 md:font-semibold">
            <p className="flex gap-2 text-3xl">
              <GrDeliver />
              {t("Products_shipping")}
            </p>
            <p className=""> {productInfo?.description}</p>
          </h2>
          <div className="z-0">
            <MapComponent />
          </div>
        </div>
        <div
          className={`flex mb-20 ${
            productInfo?.category?.name === "bombones"
              ? "hover:cursor-pointer"
              : ""
          }`}
        >
          <Checkout
            id={productInfo?.id}
            price={productInfo?.price}
            currency={productInfo?.currency}
            flavors={productInfo?.flavors}
            productName={productInfo?.name}
            productCategory={productInfo?.category.name}
            flavorQuantity={maxFlavors}
            confirmedFlavors={actualSelectionLength}
            product={info}
            openModal={
              info?.category?.name === "bombones" ? openFlavorModal : null
            }
            openCartModal={onCheckIconClick}
          />
        </div>
      </div>
      {showModal && (
        <div
          className="modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-40"
          onClick={closeModal}
        >
          <div
            className="modal-content p-4 rounded-lg relative md:w-1/2 z-50 flex justify-center items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Carousel
              axis="horizontal"
              showArrows={true}
              showThumbs={false}
              showIndicators={false}
              showStatus={false}
              infiniteLoop
              swipeable={true}
              emulateTouch
              useKeyboardArrows={true}
            >
              {modalProduct?.images?.map((image, i) => {
                return (
                  <div key={i}>
                    <img
                      alt={`Modal product image ${i + 1}`}
                      src={image?.img || ""}
                      className="object-cover rounded-lg"
                    />
                  </div>
                );
              })}
            </Carousel>
          </div>
        </div>
      )}
      {/* Aquí se cierra FlavorModal si showFlavorModal es true */}
      {showFlavorModal && (
        <FlavorModal product={productInfo} closeModal={closeFlavorModal} />
      )}
    </div>
  );
};

export default ProductsDetail;
