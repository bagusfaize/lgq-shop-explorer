import { Link } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import { RiShoppingBag2Fill } from "react-icons/ri";
import { useCartStore } from "../store/cartStore";

export default function Header() {
  // todo get cart from store 
  const cartQuantity = useCartStore((state) => state.totalItems());
  const displayedQuantity = cartQuantity < 10 ? cartQuantity : "9+";

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-10 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center space-x-2 text-2xl font-light text-gray-900 tracking-tight"
        >
          <div className="relative w-10 h-10 overflow-hidden bg-indigo-500 rounded-lg shadow-lg flex items-center justify-center">
            <RiShoppingBag2Fill
              className="absolute -bottom-3 -right-2 h-12 w-12 text-white transform rotate-12"
            />
          </div>
          <span className="font-semibold text-xl">Shop Explorer</span>
        </Link>

        <nav className="flex items-center">
          <Link
            to="/cart"
            className="relative p-2 text-gray-500 hover:text-indigo-600 transition-colors duration-150"
          >
            <FiShoppingCart className="h-6 w-6" />
            {cartQuantity !== 0 &&
              <span className="absolute top-0 right-0 bg-red-600 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs font-medium">
                {displayedQuantity}
              </span>
            }
          </Link>
        </nav>

      </div>
    </header>
  );
}
