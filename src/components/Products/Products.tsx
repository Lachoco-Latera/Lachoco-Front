//@ts-nocheck
// import React from 'react'
import ProductsGridAlt from "./ProductsGridAlt";
import SearchExampleStandard from "../Searchbar/Searchbar";

const Products = () => {
  return (
    <div className=" my-8 flex flex-col justify-center items-center">
      <SearchExampleStandard />
      <ProductsGridAlt />
    </div>
  );
};

export default Products;
