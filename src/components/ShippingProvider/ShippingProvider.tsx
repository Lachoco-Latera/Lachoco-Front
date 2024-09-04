import { useCartStore } from "@/stores/useCartStore";

const ShippingProvider = ({carrier, selectedCarrier, setSelectedCarrier}: Record<string, any>) => {

  const addShippingToCart = useCartStore((state) => state.addShippingPrice);

  const handle = () => {
    setSelectedCarrier(carrier.service);
    addShippingToCart(carrier.totalPrice)
  }

  return (
    <div
    className={`flex items-center gap-2 my-3 py-4 px-10 md:flex-row flex-col md:text-start text-center hover:cursor-pointer border border-gray-300 border-solid border-1 rounded-xl hover:bg-gray-900 hover:text-white hover:scale-[1.04] transition-all ease ${selectedCarrier === carrier.service ? 'bg-gray-950 text-white' : ''}`}
    onClick={() => handle()}
  >
    <h3 className=" text-base w-full">{carrier.carrier}</h3>
    <h3 className=" text-base w-3/4">{carrier.deliveryEstimate}</h3>
    <h3 className=" text-base w-2/3">{carrier.totalPrice}</h3>
    <h3 className=" text-base w-3/4">{carrier.service}</h3>
  </div>
  );
};

export default ShippingProvider;
