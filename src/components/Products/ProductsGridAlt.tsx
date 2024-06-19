import { useState } from "react";
import { products as rawProducts } from "../../mocks/data";
import { FaStar } from "react-icons/fa";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

interface ProductProps {
  name: string;
  img: string[];
  price: string | number;
  ratings: string | number;
  description: string;
  advice: string;
}

const ProductsGridAlt = () => {
  const [modalProduct, setModalProduct] = useState<ProductProps | null>(null);
  const [showModal, setShowModal] = useState(false);

  const products: ProductProps[] = rawProducts.map((product) => ({
    ...product,
    img: [...product.img],
  }));

  const handleImageClick = (product: ProductProps) => {
    setModalProduct(product);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalProduct(null);
  };

  return (
    <div>
      <div className="products-grid">
        {products.map((product, index) => (
          <div key={index} className="product-card">
            <div className="product-card-main flex flex-col" key={index}>
              <Carousel
                axis="horizontal"
                showArrows={true}
                showThumbs={false}
                showIndicators={true}
                showStatus={false}
                infiniteLoop
                swipeable={true}
                emulateTouch
                onClickItem={() => handleImageClick(product)}
              >
                {product.img.map((image, i) => (
                  <div key={i} className="rounded-xl">
                    <img
                      alt={`Product image ${i + 1}`}
                      src={image}
                      className="h-48 object-cover rounded-xl outline-none"
                    />
                  </div>
                ))}
              </Carousel>
              <div className="flex pt-4">
                <div className="flex flex-col text-left">
                  <h2 className="product-name pr-2">{product?.name}</h2>
                  <h6 className="product-description">
                    {product?.description}
                  </h6>
                  <p className="product-price text-black-800 font-semibold">
                    $ {product?.price}
                  </p>
                </div>
                <div className="flex flex-row">
                  <FaStar size={18} />
                  <p className="pl-1 text-sm"> {product?.ratings}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
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
              showArrows={false}
              showThumbs={false}
              showIndicators={false}
              showStatus={true}
              infiniteLoop
              swipeable={true}
              emulateTouch
              useKeyboardArrows={true}
            >
              {modalProduct?.img.map((image, i) => (
                <div key={i}>
                  <img
                    alt={`Modal product image ${i + 1}`}
                    src={image}
                    className="object-cover rounded-lg"
                  />
                </div>
              ))}
            </Carousel>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsGridAlt;
