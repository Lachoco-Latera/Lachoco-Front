import CartItem from "./CartItem";

import { useCartStore } from "../../stores/useCartStore";

import useFromStore from "../../hooks/useFromStore";

function Cart() {
  const cart = useFromStore(useCartStore, (state) => state.cart);

  let total = 0;
  if (cart) {
	//Con esto prohibo que vaya menor a 0, por más forzado que sea
    total = cart.reduce((acc, product) => {
      const quantity = Math.max(product.quantity as number, 0);
      return acc + product.price * quantity;
    }, 0);
  }

  return (
    <section>
      <h3 className="text-2xl font-bold mb-4">Shopping Cart</h3>
      <ul>
        {cart?.map((product) => (
          <CartItem key={product.id} product={product} />
        ))}
      </ul>
      <div className="flex justify-between items-center mt-4">
        <span className="text-lg font-bold">Total:</span>
        <span className="text-xl font-bold">${total.toFixed(2)}</span>
      </div>
      <div className="flex rounded-xl p-2 mt-2 shadow justify-center hover:bg-amber-100 hover:scale-105 transition-all ease">
        <button>Proceder al págo?</button>
      </div>
    </section>
  );
}

export default Cart;
