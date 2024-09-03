const ShippingProvider = ({carrier}) => {

  const addShippingToCart = () => {
    window.localStorage.setItem("shippingPrice", JSON.stringify(carrier.totalPrice));
  };

  return (
    <div
    className="flex items-center gap-2 m-1 p-1 md:flex-row flex-col md:text-start text-center hover:cursor-pointer border border-black border-solid border-1 rounded"
    onClick={addShippingToCart}
  >
    <h3 className=" text-base w-full">{carrier.carrier}</h3>
    <h3 className=" text-base w-3/4">{carrier.deliveryEstimate}</h3>
    <h3 className=" text-base w-2/3">{carrier.totalPrice}</h3>
    <h3 className=" text-base w-3/4">{carrier.service}</h3>
  </div>
  );
};

export default ShippingProvider;
