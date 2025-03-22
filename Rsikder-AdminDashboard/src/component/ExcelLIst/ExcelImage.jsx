import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { TbTrash } from "react-icons/tb";
import "react-toastify/dist/ReactToastify.css";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { backend_url, currency } from "../../App";

const ExcelImage = ({ token }) => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const itemsPerPage = 5;

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${backend_url}/api/product/list`, {
        headers: { token },
      });
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const removeProduct = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to remove this product?"
    );
    if (!confirmed) return;

    try {
      const response = await axios.post(
        `${backend_url}/api/product/remove`,
        { id },
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        await fetchProducts();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });

    const sortedProducts = [...products].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });
    setProducts(sortedProducts);
  };

  const getSortIndicator = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === "asc" ? "▲" : "▼";
    }
    return "";
  };

  const filteredProducts = products.filter(
    (item) =>
      item.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalItems = filteredProducts.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto py-2 px-4">
      <h3 className="text-sm font-semibold text-gray-800 mb-8">
        Product Image List
      </h3>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by name or category"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 w-full max-w-md shadow focus:outline-none focus:ring-2 focus:ring-rose-500 text-sm"
        />
      </div>

      {/* Data Table */}
      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gradient-to-r from-cyan-900 text-white">
              <th className="p-3 text-sm text-left font-semibold">Image</th>
              <th className="p-3 text-sm text-left font-semibold">Image ID</th>
              <th
                className="p-3 text-sm text-left font-semibold cursor-pointer"
                onClick={() => handleSort("name")}
              >
                Name {getSortIndicator("name")}
              </th>
              <th
                className="p-3 text-sm text-left font-semibold cursor-pointer"
                onClick={() => handleSort("category")}
              >
                Category {getSortIndicator("category")}
              </th>
              <th
                className="p-3 text-sm text-left font-semibold cursor-pointer"
                onClick={() => handleSort("price")}
              >
                Price {getSortIndicator("price")}
              </th>
              <th className="p-3 text-sm text-left font-semibold">Remove</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              Array.from({ length: 6 }).map((_, index) => (
                <tr key={index}>
                  {Array.from({ length: 6 }).map((_, index) => (
                    <td key={index} className="p-3">
                      <Skeleton height={30} />
                    </td>
                  ))}
                </tr>
              ))
            ) : paginatedProducts.length === 0 ? (
              <tr>
                <td
                  colSpan="6"
                  className="p-3 text-center text-gray-500 text-sm"
                >
                  No products available.
                </td>
              </tr>
            ) : (
              paginatedProducts.map((item) => (
                <tr
                  key={item._id}
                  className={`transition ${
                    item._id % 2 === 0 ? "bg-white" : "bg-rose-50"
                  } hover:bg-rose-400`}
                >
                  <td className="p-3 text-sm border">
                    <img
                      src={
                        item?.colors[0]?.images[0]?.image ||
                        "/default-image.jpg"
                      }
                      alt={item.name}
                      className="h-12 w-12 rounded-md object-cover"
                    />
                  </td>
                  <td className="p-3 text-sm border">
                    {item?.colors[0]?.images[0]?._id || "N/A"}
                  </td>
                  <td className="p-3 text-sm border">{item.name}</td>
                  <td className="p-3 text-sm border">{item.category}</td>
                  <td className="p-3 text-sm border">
                    {currency} {item.price}
                  </td>
                  <td className="p-3 text-sm">
                    <button
                      onClick={() => removeProduct(item._id)}
                      className="text-rose-600 hover:text-rose-900 focus:outline-none"
                    >
                      <TbTrash size={18} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-center">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`mx-1 px-4 py-2 text-sm border rounded-md ${
              currentPage === index + 1
                ? "bg-gradient-to-r from-cyan-900 text-white"
                : "bg-white text-rose-600 border-rose-300 hover:bg-rose-100"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ExcelImage;