import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProductById } from "../api/products";

export default function ProductDetail() {
  const { id } = useParams(); // read ":id" from route
  const navigate = useNavigate();

  const {
    data: product,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(Number(id)),
    enabled: !!id,
  });

  console.log('clg product', product);

  if (isLoading) {
    return <div className="text-center py-10 text-gray-600">Loading product...</div>;
  }

  if (isError || !product) {
    return (
      <div className="text-center py-10 text-red-500">
        Failed to load product details.
        <div>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const image = product.images?.[0] ?? product.image ?? "";

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-5">
      <div className="flex items-center justify-center bg-white rounded shadow p-6">
        <img
          src={image}
          alt={product.title}
          className="max-h-[400px] object-contain"
        />
      </div>

      <div className="flex flex-col justify-between">
        <div>
          <span className="inline-flex text-sm font-medium text-indigo-600 uppercase tracking-wider bg-indigo-50 px-3 py-1 rounded-full">
            {product.category.name}
          </span>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl capitalize">
            {product.title}
          </h1>
          <p className="mt-4 text-3xl font-bold text-gray-900">
            <span className="text-indigo-600">
              ${product.price}
            </span>
          </p>
        </div>
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Details
          </h3>
          <p className="text-sm text-gray-500">
            Product ID: <span className="font-mono">
              {product.id}
            </span>
          </p>
          <p className="text-sm text-gray-500">
            Product Description: <span className="font-mono">
              {product.description}
            </span>
          </p>
        </div>

        <button
          type="button"
          // todo
          // onClick={handleAddToCart}
          className="mt-8 w-full lg:w-3/4 bg-indigo-600 border border-transparent rounded-lg py-3 flex items-center justify-center text-lg font-semibold text-white hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50 transition-all duration-200 shadow-xl shadow-indigo-200"
        >
          Add to Cart
        </button>

      </div>
    </div>
  );
}
