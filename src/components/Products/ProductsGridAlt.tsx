// import React from "react";
import { products } from "../../mocks/data";
import ImagesCarousel from "./ImagesCarousel";
import { FaStar } from "react-icons/fa";
// import { CiHeart } from "react-icons/ci";

// const StarRating = ({ rating }: any) => {
//   const stars = Array(5).fill(0);

//   return (
//     <div className=" flex flex-row justify-center items-center">
//       {stars.map((_, index) => (
//         <FaStar
//           key={index}
//           color={index < rating ? "#c1a805" : "white"}
//           size={24}
//         />
//       ))}
//     </div>
//   );
// };
const ProductsGridAlt = () => {
  const cl = console.log;
  cl(products);
  return (
    <div className="products-grid">
      {products?.map((product, index) => (
        <div key={index} className="product-card">
          <div className="product-card-main flex flex-col" key={index}>
            {/* <div className=" flex justify-end py-2">
            <button >
              <FaShoppingCart color={"green"} />
            </button>
          </div> */}{" "}
            <h2 className="product-name px-0 pt-4">{product?.name}</h2>
            <h6 className="product-description">{product?.description}</h6>
            {/* <i className="flex justify-end">
              <CiHeart
                size={24}
                color={"rgb(248 113 113)"}
                className=" mb-2 cursor-pointer hover:scale-110 ease-in-out duration-300"
              ></CiHeart>
            </i> */}
            <ImagesCarousel
              images={product?.img}
              className={"boxShadow-custom"}
            />
            <p className="product-price text-gray-600 py-4">
              $ {product?.price}
            </p>
            {/* <i className="product-ratings">
              <StarRating rating={product?.ratings} />
            </i> */}
            {/* <p className="product-advice">
              {product?.advice &&
                product.advice.split(" ").slice(0, 15).join(" ")}
            </p> */}
            <div className="horizontal-line"></div>
            <div className=" border-red-400 border-2 rounded-3xl py-2 mt-8 mb-8 cursor-pointer w-2/3 self-center">
              {/*To do: Escalado para cuando pasas el mouse en la card, así no queda corto el boton de añadir carrito */}
              <p className=" text-red-400 font-thin">Añadir al carrito</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductsGridAlt;
