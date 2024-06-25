import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { HiHeart } from "react-icons/hi";
import { IconContext } from "react-icons";
import { SlHeart } from "react-icons/sl";
import { toast } from "sonner";
import { useCartStore } from "../../stores/useCartStore";
import { Product } from "@/types.d";

interface Props {
  products: Product[];
}

const ProductsGridAlt = ({ products }: Props) => {
  const [modalProduct, setModalProduct] = useState<Product | null>(null);
  const [showModal, setShowModal] = useState(false);
  const addToCart = useCartStore((state) => state.addToCart);

  const handleImageClick = (product: Product) => {
    setModalProduct(product);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalProduct(null);
  };

  const handleFavoriteClick = (event: React.MouseEvent, product: Product) => {
    event.stopPropagation();
    // Lógica para manejar el favorito del producto
    console.log(`Producto favorito: ${product.description}`);
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
                {product.images.map((image, i) => (
                  <div key={i} className="relative rounded-xl">
                    <i
                      className="absolute top-2 right-2 drop-shadow"
                      onClick={(e) => handleFavoriteClick(e, product)}
                    >
                      <IconContext.Provider value={{}}>
                        <div
                          className="relative group"
                          onClick={() => toast.success("Añadido a favoritos ")}
                        >
                          <HiHeart
                            id="firstHeart"
                            size={24}
                            className="cursor-pointer group-hover:scale-[1.55] ease-in-out duration-300 drop-shadow absolute scale-[1.21] opacity-30 transparent"
                          />
                          <SlHeart
                            id="secondHeart"
                            size={24}
                            color="white"
                            className="cursor-pointer group-hover:scale-[1.3] ease-in-out duration-300 drop-shadow z-30"
                          />
                        </div>
                      </IconContext.Provider>
                    </i>

                    <img
                      alt={`Product image ${i + 1}`}
                      src={image?.img || ""}
                      className=" min-w-48 min-h-48 object-cover rounded-xl outline-none"
                    />
                  </div>
                ))}
              </Carousel>
              <div className="flex pt-4">
                <div className="flex flex-col text-left">
                  <h2 className="product-name pr-2">{product.name}</h2>
                  <h2 className="product-name pr-2">{product.label}</h2>
                  <h6 className="product-description">{product.description}</h6>
                  <p
                    className="product-price text-black-800 
                    font-regular hover:scale-110 hover:shadow
                    hover:bg-gray-800 hover:text-white 
                    hover:px-2 rounded-xl transition-all ease"
                    onClick={() => (
                      addToCart(product),
                      toast("✔ Añadido al carrito", {
                        action: {
                          label: "Carrito",
                          onClick: () => console.log("Producto añadido"),
                        },
                      })
                    )}
                  >
                    $ {product.price}
                  </p>
                </div>
                <div className="flex flex-row">
                  <FaStar size={16} className="pt-1" />
                  <p className="pl-1 text-sm"> 5.0</p>
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
    </div>
  );
};

export default ProductsGridAlt;
