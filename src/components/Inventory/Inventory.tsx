import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import BottomBar from "../../components/BottomBar/BottomBar";
import axios from "axios";
import Drawer from "../Drawer";
import Cart from "../minicart/Cart";
import { useUser } from "@clerk/clerk-react";
import { Carousel } from "react-responsive-carousel";
import { useNavigate } from "react-router-dom";
import { IconContext } from "react-icons";
import { toast } from "sonner";
import { HiHeart } from "react-icons/hi";
import { SlHeart } from "react-icons/sl";
import { FaStar } from "react-icons/fa";
// import { useCartStore } from "../../stores/useCartStore";
// import { MdAddShoppingCart } from "react-icons/md";

const Inventory = ({ onCartIconClick }: any) => {
  onCartIconClick;
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [info, setInfo] = useState<any>(null);
  const [products, setProducts] = useState<any>([]);
  const [modalProduct, setModalProduct] = useState<any | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [hoveredOrderId, setHoveredOrderId] = useState<string | null>(null);
  const { user, isSignedIn, isLoaded } = useUser();
  // const addToCart = useCartStore((state) => state.addToCart);
  const [userId, setUserId] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  userDetails;
  userId;
  const navigate = useNavigate();

  const userEmail = user?.primaryEmailAddress?.emailAddress;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `https://lachocoback.vercel.app/users`
        );
        const userWithEmail = response.data.find(
          (user: any) => user.email === userEmail
        );
        if (userWithEmail) {
          setUserId(userWithEmail.id);
          setUserDetails(userWithEmail);
        }
      } catch (err) {
        console.error(err);
      }
    };
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `https://lachocoback.vercel.app/orders`
        );
        const filteredOrders = response.data.filter(
          (order: any) => order.user.email === userEmail
        );
        setInfo(filteredOrders);

        // Extract products from the filtered orders
        const allProducts = filteredOrders.flatMap((order: any) =>
          order.orderDetail.orderDetailProducts.map((product: any) => ({
            ...product.product,
            quantity: product.cantidad,
            pickedFlavors: product.pickedFlavors,
            orderId: order.id,
          }))
        );

        setProducts(allProducts);
      } catch (err) {
        console.error(err);
      }
    };

    if (isSignedIn && userEmail) {
      fetchUserData();
      fetchOrders();
    }
  }, [isSignedIn, userEmail]);

  const handleCartIconClick = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const redirectToProductDetail = (productId: string) => {
    navigate(`/products/${productId}`);
  };

  const handleImageClick = (product: any) => {
    setModalProduct(product);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalProduct(null);
  };

  const handleFavoriteClick = (event: React.MouseEvent, product: any) => {
    event.stopPropagation();
    // Lógica para manejar el favorito del producto
    console.log(`Producto favorito: ${product.description}`);
  };

  const handleMouseEnter = (orderId: string) => {
    setHoveredOrderId(orderId);
  };

  const handleMouseLeave = () => {
    setHoveredOrderId(null);
  };
  const handleCopyOrderId = (orderId: string) => {
    if (orderId) {
      navigator.clipboard.writeText(orderId).then(() => {
        toast.success("Copiado al portapapeles!");
      });
    }
  };
  const loading = () => (
    <div className="flex justify-center items-center h-96 text-xl text-gray-600">
      Loading...
    </div>
  );
  console.log(info);
  return (
    <>
      <Header onCartIconClick={handleCartIconClick} products={info} />
      <div className="block md:hidden">
        <BottomBar onCartIconClick={handleCartIconClick} />
      </div>
      <Drawer isOpen={isDrawerOpen} onCartIconClick={handleCartIconClick}>
        <Cart similar={info} />
      </Drawer>
      {!isLoaded ? (
        loading()
      ) : info && info.length > 0 ? (
        <div>
          <div className="products-grid">
            {products.map((product: any, index: any) => (
              <div
                key={index}
                className="product-card hover:shadow-xl transition-all ease duration-300"
                onMouseEnter={() => handleMouseEnter(product.orderId)} // Manejar hover
                onMouseLeave={handleMouseLeave} // Limpiar hover
              >
                <div className="product-card-main flex flex-col">
                  <Carousel
                    axis="horizontal"
                    showArrows={true}
                    showThumbs={false}
                    showIndicators={false}
                    showStatus={false}
                    infiniteLoop
                    swipeable={true}
                    emulateTouch
                    onClickItem={() => handleImageClick(product)}
                  >
                    {product.images?.map((image: any, i: any) => (
                      <div key={i} className="relative rounded-xl">
                        <p className="absolute top-2 left-2 p-1 px-2 product-description rounded-2xl border-1 shadow">
                          {product.label === "SoloOnline"
                            ? "Solo Online"
                            : product.label}
                        </p>

                        <i
                          className="absolute top-2 right-2 drop-shadow"
                          onClick={(e) => handleFavoriteClick(e, product)}
                        >
                          <IconContext.Provider value={{}}>
                            <div
                              className="relative group"
                              onClick={() =>
                                toast.success("Añadido a favoritos ")
                              }
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
                          className="min-w-48 min-h-48 object-cover rounded-xl outline-none"
                        />
                      </div>
                    ))}
                  </Carousel>
                  <div className="flex flex-col pt-4">
                    <div
                      className="flex flex-row"
                      onClick={() => redirectToProductDetail(product.id)}
                    >
                      <div className="flex flex-col text-left hover:scale-105">
                        <h2 className="product-name pr-2">{product.name}</h2>
                        <h6 className="product-description">
                          {product.description}
                        </h6>
                      </div>
                      <div className="flex flex-row">
                        <FaStar size={16} className="pt-1" />
                        <p className="pl-1 text-sm"> 5.0</p>
                      </div>
                    </div>
                    <div>
                      <div className="product-price text-black-800 font-regular relative transition-all ease">
                        <span
                          className="duration-0 flex flex-row justify-between items-center py-2 "
                          // onClick={() => (
                          //   addToCart(product),
                          //   toast("✔ Añadido al carrito", {
                          //     action: {
                          //       label: "Carrito",
                          //       onClick: () => onCartIconClick(),
                          //     },
                          //   })
                          // )}
                        >
                          $ {product.price}
                          {/* <div
                            className="
                      rounded-2xl 
                      hover:shadow p-[0.33em] hover:scale-110
                      hover:bg-pink-800 hover:text-white 
                      transition-colors ease duration-100"
                          >
                            <MdAddShoppingCart />
                          </div> */}
                        </span>
                        {product.orderId === hoveredOrderId && (
                          <div
                            className="order-id-indicator flex flex-col 
    justify-center items-center drop-shadow 
    text-black-400 font-bold text-lg py-1 
    px-2 rounded-md -top-6 left-0 right-0
    mx-auto text-center z-10 transition-all ease"
                            onClick={() =>
                              handleCopyOrderId(hoveredOrderId || "")
                            }
                          >
                            <span className="flex transition-all ease">
                              #
                              {products
                                .filter(
                                  (p: any) => p.orderId === hoveredOrderId
                                )
                                .indexOf(product) + 1}
                            </span>
                            <span className="flex">Id: {hoveredOrderId}</span>
                            {info && hoveredOrderId && (
                              <>
                                {info
                                  .filter(
                                    (order: any) => order.id === hoveredOrderId
                                  )
                                  .map((order: any) => (
                                    <div key={order.id}>
                                      <span className="flex">
                                        Status: {order.status}
                                      </span>
                                      <span className="flex">
                                        Date: {order.date}
                                      </span>
                                      <span className="flex">
                                        Quantity:{" "}
                                        {
                                          order.orderDetail.orderDetailProducts
                                            .length
                                        }
                                      </span>
                                      <span className="flex">
                                        Total: {order.orderDetail.price}
                                      </span>
                                    </div>
                                  ))}
                              </>
                            )}
                          </div>
                        )}
                      </div>
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
                  {modalProduct?.images?.map((image: any, i: any) => {
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
      ) : (
        <div className="flex justify-center items-center h-96 text-xl text-gray-600">
          {info && info.length === 0
            ? "Parece que aún no has ordenado nada, de todas formas, ¡Muchas Gracias!"
            : "Loading..."}
        </div>
      )}
    </>
  );
};

export default Inventory;
