// // import React from "react";
// import { products } from "../../mocks/data";
// import ImagesCarousel from "./ImagesCarousel";
// import { IoIosStar } from "react-icons/io";
// import { CiHeart } from "react-icons/ci";

// const StarRating = ({ rating }: any) => {
//   const stars = Array(5).fill(0);

//   return (
//     <div className=" flex flex-row justify-center items-center">
//       {stars.map((_, index) => (
//         <IoIosStar
//           key={index}
//           color={index < rating ? "#c1a805" : "white"}
//           size={20}
//         />
//       ))}
//     </div>
//   );
// };
// const ProductsGrid = () => {
//   return (
//     <div className="products-grid">
//       {products?.map((product, index) => (
//         <div key={index} className="product-card">
//           <div className="product-card-main" key={index}>
//             {/* <div className=" flex justify-end py-2">
//             <button >
//               <FaShoppingCart color={"green"} />
//             </button>
//           </div> */}
//             <i className="flex justify-end">
//               <CiHeart
//                 size={24}
//                 color={"rgb(248 113 113)"}
//                 className=" mb-2 cursor-pointer hover:scale-110 ease-in-out duration-300"
//               ></CiHeart>
//             </i>
//             <ImagesCarousel images={product?.img} />
//             <h2 className="product-name">{product?.name}</h2>
//             <p className="product-price">${product?.price} COP</p>
//             <i className="product-ratings">
//               <StarRating rating={product?.ratings} />
//             </i>
//             <p className="product-description">{product?.description}</p>
//             <p className="product-advice">
//               {product?.advice &&
//                 product.advice.split(" ").slice(0, 15).join(" ")}
//             </p>
//           </div>
//           <div className=" bg-red-400 rounded-b-md p-2 cursor-pointer">
//             {/*To do: Escalado para cuando pasas el mouse en la card, así no queda corto el boton de añadir carrito */}
//             <p className=" text-white font-bold">Añadir al carrito</p>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ProductsGrid;
