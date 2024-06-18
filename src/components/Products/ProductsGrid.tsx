import { products } from "../../mocks/data";
import ImagesCarousel from "./ImagesCarousel";
const ProductsGrid = () => {
  const cl = console.log;
  cl(products);
  return (
    <div className="products-grid">
      {products.map((product, index) => (
        <div className="product-card" key={index}>
          <ImagesCarousel images={product.img} />
          {/* <img
            src={product.img}
            alt={product.name}
            className="product-image h-10"
          /> */}
          <h2 className="product-name">{product.name}</h2>
          <p className="product-price">${product.price} COP</p>
          <p className="product-ratings">Ratings: {product.ratings}</p>
          <p className="product-description">{product.description}</p>
          <p className="product-advice">{product.advice}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductsGrid;
