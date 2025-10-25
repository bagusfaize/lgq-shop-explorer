import { useMemo, useState } from "react";
import {
    useCategories,
    useInfiniteProducts,
    // useCategories 
} from "../hooks/useProducts";
import ProductCard from "../components/ProductCard";
import ProductFilter from "../components/ProductFilter";
import { FiSearch } from "react-icons/fi";

export default function ProductList() {
    const [selectedCategory, setSelectedCategory] = useState<number|null>(null);
    const [inputSearch, setInputSearch] = useState<string>("")
    const [keyword, setKeyword] = useState<string>("");

    const {
        data: categories = []
    } = useCategories();

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading
    } = useInfiniteProducts({
        title: keyword,
        categoryId: selectedCategory ?? undefined
    });

    const displayedProducts = useMemo(() => {
        return data?.pages.flat() ?? [];
    }, [data]);

    const handleSearch = (keyword: string) => setKeyword(keyword);

    const handleClearSearch = () => setKeyword("");

    return (
        <div>

            {/* Product Filter */}
            <ProductFilter
                categories={categories}
                onCategoryChange={setSelectedCategory}
                selectedCategoryId={selectedCategory}
                value={inputSearch}
                onChange={setInputSearch}
                onSearch={handleSearch}
                onClear={handleClearSearch}
            />

            {isLoading && <LoadingState />}

            {/* Product List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 my-7">
                {displayedProducts.map((p) => (
                    <ProductCard key={p.id} product={p} />
                ))}
            </div>

            {displayedProducts.length > 0 && hasNextPage && (
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

            {displayedProducts.length === 0 && !isLoading ? <EmptyStete keyword={keyword} /> : null}

        </div>
    );
}

const LoadingState = () => {
    return (
        <div className="flex items-center justify-center p-8 text-indigo-700">
            <div className="animate-spin rounded-full h-8 w-8 border-4 border-t-4 border-indigo-500 border-t-transparent mr-3" role="status">
                <span className="sr-only">Loading...</span>
            </div>
            <p className="text-lg font-medium">Loading products...</p>
        </div>
    )
}

const EmptyStete = ({
    keyword
}: { keyword: string }) => {
    return (
        <div className="flex flex-col items-center justify-center p-12 text-center border border-gray-100 rounded-lg max-w-sm mx-auto">

            <FiSearch className="text-gray-400 mb-3 text-3xl" />
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
                No Matches Found 
                {keyword &&
                    <span>{` for "${keyword}"`}</span>
                }
            </h3>
        </div>
    )
}