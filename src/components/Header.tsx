import { Link } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import { RiShoppingBag2Fill } from "react-icons/ri";

export default function Header() {
// todo get cart from store 
  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
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
            <span className="absolute top-0 right-0 bg-red-600 text-white rounded-full h-4 w-4 flex items-center justify-center text-xs font-medium">
              {0}
            </span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
