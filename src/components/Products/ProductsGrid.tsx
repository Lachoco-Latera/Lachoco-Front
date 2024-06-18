// import React from "react";
import { products } from "../../mocks/data";
import ImagesCarousel from "./ImagesCarousel";
import { FaStar } from "react-icons/fa";

const StarRating = ({ rating }: any) => {
  const stars = Array(5).fill(0);

  return (
    <div className=" flex flex-row justify-center items-center">
      {stars.map((_, index) => (
        <FaStar
          key={index}
          color={index < rating ? "#c1a805" : "white"}
          size={24}
        />
      ))}
    </div>
  );
};
const ProductsGrid = () => {
  const cl = console.log;
  cl(products);

  return (
    <div className="products-grid">
      {products?.map((product, index) => (
        <div className="product-card">
          <div className="product-card-main" key={index}>
            {/* <div className=" flex justify-end py-2">
            <button >
              <FaShoppingCart color={"green"} />
            </button>
          </div> */}

            <ImagesCarousel images={product?.img} />
            <h2 className="product-name">{product?.name}</h2>
            <p className="product-price">${product?.price} COP</p>
            <div className="product-ratings">
              <StarRating rating={product?.ratings} />
            </div>
            <p className="product-description">{product?.description}</p>
            <p className="product-advice">
              {product?.advice &&
                product.advice.split(" ").slice(0, 15).join(" ")}
            </p>
          </div>
          <div className=" bg-red-400 rounded-b-md p-2 cursor-pointer">
            {/*To do: Escalado para cuando pasas el mouse en la card, así no queda corto el boton de añadir carrito */}
            <p className=" text-white font-bold">Añadir al carrito</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductsGrid;
