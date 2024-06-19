import { FiShoppingCart } from "react-icons/fi";

import { useCartStore } from "../../stores/useCartStore";

import useFromStore from "../../hooks/useFromStore";

interface Props {
  onCartIconClick: () => void;
}

export default function Header({ onCartIconClick }: Props) {
  const cart = useFromStore(useCartStore, (state) => state.cart);

  return (
    <header className=" bg-amber-100 text-gray-700 py-4 flex items-center justify-between h-14 sticky top-0 z-10">
      <nav className="container mx-auto md:w-10/12 px-4 flex justify-between">
        <span className="text-lg font-semibold">Lachoco Latera</span>
        <div className="relative">
          <button
            type="button"
            title="Mini Cart"
            className="text-gray-800 text-xl flex items-center hover:scale-110 transition-all ease"
            onClick={onCartIconClick}
          >
            <FiShoppingCart />
            <div className="text-white rounded-full bg-gray-700 w-5 h-5 text-sm -ml-1">
              {cart?.length}
            </div>
          </button>
        </div>
      </nav>
    </header>
  );
}
