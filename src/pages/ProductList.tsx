import { useMemo } from "react";
import {
    useInfiniteProducts,
    // useCategories 
} from "../hooks/useProducts";
import ProductCard from "../components/ProductCard";

export default function ProductList() {
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useInfiniteProducts();
    //   const { data: categories } = useCategories();
    //   console.log('clg categories', categories);

    const products = useMemo(() => {
        return data?.pages.flat() ?? [];
    }, [data]);

    console.log('clg products', products);

    if (isLoading) return <div>Loading products...</div>;

    return (
        <div>
            {/* Product List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {products.map((p) => (
                    <ProductCard key={p.id} product={p} />
                ))}
            </div>

            {hasNextPage && (
                <div className="mt-8 text-center">
                    <button
                        onClick={() => fetchNextPage()}
                        disabled={isFetchingNextPage}
                        className="bg-indigo-600 text-white px-4 py-2 rounded-lg disabled:opacity-50"
                    >
                        {isFetchingNextPage ? "Loading..." : "Load More"}
                    </button>
                </div>
            )}
        </div>
    );
}
