import { useContext, useEffect, useState } from "react";
import Title from "../components/Title";
import { ShopContext } from "../context/ShopContext";
import Item from "../components/Item";
import ShowSearch from "../components/ShowSearch";
import axios from "axios"; // Import axios for API requests
import AxiosClient from "../utils/axiosConfig";

const ITEMS_PER_PAGE = 14;

const Collection = () => {
  const { search, showSearch } = useContext(ShopContext);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relevant");
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]); // Store fetched products
  const [loading, setLoading] = useState(false); // Loading state

  const toggleFilter = (value, setState) => {
    setState((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await AxiosClient.get("/api/product/list"); // API endpoint for fetching products
      setProducts(response.data.products); // Assuming the API returns an array of products
      console.log("Products fetched:", response);

      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...products];

    if (search && showSearch) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (category.length) {
      filtered = filtered.filter((product) =>
        category.includes(product.category)
      );
    }
    if (subCategory.length) {
      filtered = filtered.filter((product) =>
        subCategory.includes(product.subCategory)
      );
    }
    return filtered;
  };

  const applySorting = (productList) => {
    const sortedList = [...productList];
    switch (sortType) {
      case "low":
        return sortedList.sort((a, b) => a.price - b.price);
      case "high":
        return sortedList.sort((a, b) => b.price - a.price);
      default:
        return sortedList;
    }
  };

  useEffect(() => {
    fetchProducts(); // Fetch products when the component mounts
  }, []);

  useEffect(() => {
    const filtered = applyFilters();
    const sorted = applySorting(filtered);
    setFilteredProducts(sorted);
    setCurrentPage(1); // Reset to the first page when filters or sorting change
  }, [category, subCategory, sortType, products, search, showSearch]);

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <section className="max-padd-container">
      <div className="flex flex-col sm:flex-row gap-8 mt-8 xl:mt-6">
        {/* Filter section */}
        <div className="min-w-60 bg-white p-4 rounded-2xl">
          <ShowSearch />
          {/* Category Filter */}
          <div className="bg-primary ring-1 ring-slate-900/5 pl-5 py-3 mt-6 rounded-xl">
            <h5 className="h5 mb-4">Categories</h5>
            <div>
              {[
                "T-Shirt",
                "Hoody",
                "Kids Blank Hoody",
                "Sweatshirt",
                "Kids Blank T-Shirt",
              ].map((cat) => (
                <label key={cat} className="flex gap-2 medium-14 text-gray-30">
                  <input
                    onChange={(e) => toggleFilter(e.target.value, setCategory)}
                    type="checkbox"
                    value={cat}
                    className="w-3"
                  />
                  {cat}
                </label>
              ))}
            </div>
          </div>

          {/* SubCategory Filter */}
          <div className="bg-primary ring-1 ring-slate-900/5 pl-5 py-3 mt-6 rounded-xl">
            <h5 className="h5 mb-4">Sub Categories</h5>
            <div>
              {[
                "Blank-TShirt",
                "TShirt-CityColourLogo",
                "TShirt-LivertyLogo",
              ].map((subCat) => (
                <label key={subCat} className="block">
                  <input
                    onChange={(e) =>
                      toggleFilter(e.target.value, setSubCategory)
                    }
                    type="checkbox"
                    value={subCat}
                    className="w-3"
                  />
                  {subCat}
                </label>
              ))}
            </div>
          </div>

          {/* Sorting */}
          <div className="bg-primary ring-1 ring-slate-900/5 pl-5 py-3 mt-6 rounded-xl">
            <select
              className="medium-14 h-8 w-full border border-slate-900/5 bg-primary text-gray-30 rounded-lg px-2 outline-none mt-6"
              onChange={(e) => setSortType(e.target.value)}
            >
              <option value="relevant" className="font-medium text-sm">
                Sort by: Relevant
              </option>
              <option value="low" className="font-medium text-sm">
                Sort by: Low Price
              </option>
              <option value="high" className="font-medium text-sm">
                Sort by: High Price
              </option>
            </select>
          </div>
        </div>

        {/* Product Display Section */}
        <div className="bg-white p-4 rounded-2xl flex-1">
          <Title title="Our Collection" />

          {loading ? (
            <p>Loading products...</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 xl:grid-cols-3 gap-y-6">
              {paginatedProducts.length > 0 ? (
                paginatedProducts.map((product) => (
                  <Item product={product} key={product._id || product.id} />
                ))
              ) : (
                <p className="capitalize">
                  No products found for the selected filters
                </p>
              )}
            </div>
          )}

          {/* Pagination */}
          <div className="flex justify-center mt-6">
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (pageNumber) => (
                <button
                  key={pageNumber}
                  onClick={() => handlePageChange(pageNumber)}
                  className={`px-4 py-2 mx-1 rounded-lg ${
                    currentPage === pageNumber
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {pageNumber}
                </button>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Collection;
