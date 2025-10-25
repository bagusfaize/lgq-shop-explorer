import { Link } from "react-router-dom";
import type { Product } from "../types/types";

export default function ProductCard({ product }: { product: Product }) {
    const image = product.images?.[0] ?? product.image ?? "";

    return (
        <Link 
            to={`/product/${product.id}`}
            className="bg-white rounded-xl shadow hover:shadow-lg transition-shadow overflow-hidden flex flex-col group"
        >
            <div className="relative aspect-square overflow-hidden p-4 bg-gray-50 flex items-center justify-center">
                <img
                    src={image}
                    alt={product.title}
                    className="max-h-full object-contain"
                />
            </div>

            <div className="p-5 flex flex-col grow">
                <h3 className="text-lg font-semibold text-gray-800 line-clamp-2 mb-2 capitalize">
                    {product.title}
                </h3>

                <div className="mt-auto flex items-center justify-between pt-3 border-t border-gray-100">
                    <span className="text-xl font-bold">
                        ${product.price}
                    </span>

                    <button
                        className="text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg px-4 py-2 shadow-md transition-colors duration-200"
                    >
                        View Product
                    </button>
                </div>
            </div>
        </Link>
    );
}
