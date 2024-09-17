import { useTranslation } from "react-i18next";
import { FaStar } from "react-icons/fa";
import { Carousel } from "react-responsive-carousel";
import { useNavigate } from "react-router-dom";

export default function ItemGiftCard({ 
  products,
  info,
  handleMouseEnter, 
  handleMouseLeave,
  handleImageClick,
  hoveredOrderId,
  handleCopyOrderId,
}: any) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const redirectToGiftCards = () => {
    navigate(`/gift-cards`);
  }
  return (
          <>
            {products.map((product: any, index: any) => (
              <div
                key={index}
                className="product-card hover:shadow-xl transition-all ease duration-300"
                onMouseEnter={() => handleMouseEnter(product.orderId)} // Manejar hover
                onMouseLeave={handleMouseLeave} // Limpiar hover
              >
                  <div className="mt-4">
                  </div>
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
                    {product.img?.map((image: any, i: any) => (
                      <div key={i} className="relative rounded-xl">
                        <img src={image} alt="Gift Card Image" className="min-w-48 min-h-48 object-cover rounded-xl outline-none" />
                      </div>
                    ))}
                  </Carousel>
                  <div className="flex flex-col pt-4">
                    <div
                      className="flex flex-row"
                      onClick={() => redirectToGiftCards()}
                    >
                      <div className="flex flex-col text-left hover:scale-105">
                        <h2 className="product-name pr-2">Gift Card</h2>
                        <h6 className="product-description">
                          No description available
                        </h6>
                      </div>
                      <div className="flex flex-row">
                        <FaStar size={16} className="pt-1" />
                        <p className="pl-1 text-sm"> 5.0</p>
                      </div>
                    </div>
                    <div>
                      <div className="product-price text-black-800 font-regular relative transition-all ease">
                        <span className="duration-0 flex flex-row justify-between items-center py-2 ">
                          $ {product.discount}
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
                                        {t("status")}: {order.status}
                                      </span>
                                      <span className="flex">
                                        {t("purchased")}: {order.date}
                                      </span>
                                      <span className="flex">
                                        {t("quantity")}:
                                        {
                                          order.orderDetail.orderDetailGiftCards
                                            .length
                                        }
                                      </span>
                                      <span className="flex">
                                        Total: {Number(order.orderDetail.price).toLocaleString()}
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
          </>
  )
}
