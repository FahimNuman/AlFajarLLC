import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { TbTrash } from "react-icons/tb";
import "react-toastify/dist/ReactToastify.css";
import { backend_url, currency } from "../App";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const List = ({ token }) => {
  const [list, setList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const itemsPerPage = 5;

  const fetchList = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${backend_url}/api/product/list`);
      if (response.data.success) {
        setList(response.data.products);
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
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  console.log("list", list);

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });

    const sortedList = [...list].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });
    setList(sortedList);
  };

  const getSortIndicator = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === "asc" ? "▲" : "▼";
    }
    return "";
  };

  const filteredList = list.filter(
    (item) =>
      item.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalItems = filteredList.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginatedList = filteredList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  console.log("paginatedList", paginatedList);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="container mx-auto py-2 px-4">
      <h3 className="text-sm font-semibold text-gray-800 mb-8">
        All Products List
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
              <th className="p-3 text-sm text-left font-semibold">Name</th>
              <th className="p-3 text-sm text-left font-semibold">Category</th>
              <th className="p-3 text-sm text-left font-semibold">
                SubCategory
              </th>
              <th className="p-3 text-sm text-left font-semibold">Price</th>
              <th className="p-3 text-sm text-left font-semibold">Colors</th>
              <th className="p-3 text-sm text-left font-semibold">SKU</th>
              <th className="p-3 text-sm text-left font-semibold">SKU ID</th>
              <th className="p-3 text-sm text-left font-semibold">Brand</th>
              <th className="p-3 text-sm text-left font-semibold">Style ID</th>
              <th className="p-3 text-sm text-left font-semibold">Popular</th>
              <th className="p-3 text-sm text-left font-semibold">Date</th>
              <th className="p-3 text-sm text-left font-semibold">Remove</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              Array.from({ length: 6 }).map((_, index) => (
                <tr key={index}>
                  {Array.from({ length: 13 }).map((_, index) => (
                    <td key={index} className="p-3">
                      <Skeleton height={30} />
                    </td>
                  ))}
                </tr>
              ))
            ) : paginatedList.length === 0 ? (
              <tr>
                <td
                  colSpan="13"
                  className="p-3 text-center text-gray-500 text-sm"
                >
                  No products available.
                </td>
              </tr>
            ) : (
              paginatedList.map((item, index) => (
                <tr
                  key={item._id}
                  className={`transition ${
                    index % 2 === 0 ? "bg-white" : "bg-rose-50"
                  } hover:bg-rose-400`}
                >
                { console.log("itemsm",item?.colors[0]?.images[0]?.image) }
                  <td className="p-3 text-sm border">
                    <img
                      src={item?.colors[0]?.images[0]?.image || "/default-image.jpg"}
                      alt={item.name}
                      className="h-12 w-12 rounded-md object-cover"
                    />
                  </td>
                  <td className="p-3 text-sm border">{item.name}</td>
                  <td className="p-3 text-sm border">{item.category}</td>
                  <td className="p-3 text-sm border">{item.subCategory}</td>
                  <td className="p-3 text-sm border">
                    {currency} {item.price}
                  </td>
                  <td className="p-2 text-xs border">
                    {item.colors.length === 0 ? (
                      <span className="text-gray-400 italic">
                        No colors available
                      </span>
                    ) : (
                      item.colors.map((color) => (
                        <div key={color._id} className="flex mb-2">
                          <div className="font-semibold">{color.name}: </div>
                          {color.sizes.length === 0 ? (
                            <span className="text-gray-400 italic">
                              No sizes available
                            </span>
                          ) : (
                            <span className="text-xs">
                              {color.sizes.map((size, index) => (
                                <span key={size._id}>
                                  {size.name} - {currency} {size.price}
                                  {index < color.sizes.length - 1 && ", "}
                                </span>
                              ))}
                            </span>
                          )}
                        </div>
                      ))
                    )}
                  </td>
                  <td className="p-3 text-sm border">{item.sku}</td>
                  <td className="p-3 text-sm border">{item.sku_id}</td>
                  <td className="p-3 text-sm border">{item.brand_name}</td>
                  <td className="p-3 text-sm border">{item.style_id}</td>
                  <td className="p-3 text-sm border">
                    {item.popular ? "Yes" : "No"}
                  </td>
                  <td className="p-3 text-sm border">
                    {new Date(item.date).toLocaleDateString()}
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

export default List;
