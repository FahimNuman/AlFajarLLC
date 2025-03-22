import { useState } from "react";
import { BiLogOut } from "react-icons/bi";
import { FaListAlt } from "react-icons/fa";
import { FaSquarePlus, FaPalette } from "react-icons/fa6";
import { MdFactCheck } from "react-icons/md";
import { NavLink } from "react-router-dom";

const Sidebar = ({ token, setToken }) => {
  const [isItemsDropdownOpen, setIsItemsDropdownOpen] = useState(false);
  const [isCatalogDropdownOpen, setIsCatalogDropdownOpen] = useState(false);
  const [isBulkUploadDropdownOpen, setIsBulkUploadDropdownOpen] = useState(false); // New state for Bulk Upload dropdown

  // Function to toggle Items dropdown and close Catalog dropdown if open
  const toggleItemsDropdown = () => {
    setIsItemsDropdownOpen((prev) => !prev);
    if (isCatalogDropdownOpen) {
      setIsCatalogDropdownOpen(false); // Close Catalog dropdown when Items is toggled
    }
  };

  // Function to toggle Catalog dropdown and close Items dropdown if open
  const toggleCatalogDropdown = () => {
    setIsCatalogDropdownOpen((prev) => !prev);
    if (isItemsDropdownOpen) {
      setIsItemsDropdownOpen(false); // Close Items dropdown when Catalog is toggled
    }
  };

  // Function to toggle Bulk Upload dropdown and close other dropdowns if open
  const toggleBulkUploadDropdown = () => {
    setIsBulkUploadDropdownOpen((prev) => !prev);
    if (isItemsDropdownOpen) {
      setIsItemsDropdownOpen(false); // Close Items dropdown if Bulk Upload is toggled
    }
    if (isCatalogDropdownOpen) {
      setIsCatalogDropdownOpen(false); // Close Catalog dropdown if Bulk Upload is toggled
    }
  };

  return (
    <div className="flex flex-col sm:w-1/5 sm:min-h-screen bg-cyan-900 rounded-xl shadow-md p-4 sm:pr-6 mb-4 border sm:mt-0.5 ml-0.5">
      {/* Dashboard */}
      <NavLink
        to="/dashboard"
        className={({ isActive }) =>
          isActive
            ? "flex items-center gap-2 p-3 font-medium text-white bg-blue-500 rounded-lg shadow-sm hover:bg-blue-600 border"
            : "flex items-center gap-2 p-3 font-medium text-white hover:text-gray-900 hover:bg-gray-100 rounded-lg border"
        }
      >
        <MdFactCheck className="text-xl" />
        <span>Dashboard</span>
      </NavLink>

      {/* Navigation Links */}
      <div className="flex flex-col gap-y-6 pt-6">
        {/* Dropdown for Add Items and List Items */}
        <div>
          <button
            onClick={toggleItemsDropdown}
            className="flex items-center gap-2 p-3 font-medium text-white hover:text-gray-900 hover:bg-gray-100 rounded-lg w-full text-left border"
          >
            <FaSquarePlus className="text-xl" />
            <span>Items</span>
          </button>
          {isItemsDropdownOpen && (
            <div className="ml-6 border border-gray-200 border-y-4 p-3 ">
              <NavLink
                to="/add"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center gap-2 p-3 font-medium text-white bg-blue-500 rounded-lg shadow-sm hover:bg-blue-600 border"
                    : "flex items-center gap-2 p-3 font-medium text-white hover:text-gray-900 hover:bg-gray-100 rounded-lg border"
                }
              >
                <FaSquarePlus className="text-xl" />
                <span>Add Items</span>
              </NavLink>

              <NavLink
                to="/list"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center gap-2 p-3 font-medium text-white bg-blue-500 rounded-lg shadow-sm hover:bg-blue-600 border"
                    : "flex items-center gap-2 p-3 font-medium text-white hover:text-gray-900 hover:bg-gray-100 rounded-lg border"
                }
              >
                <FaListAlt className="text-xl" />
                <span>Your Listings</span>
              </NavLink>
            </div>
          )}
        </div>

        {/* Dropdown for Variants */}
        <div>
          <button
            onClick={toggleCatalogDropdown}
            className="flex items-center gap-2 p-3 font-medium text-white hover:text-gray-900 hover:bg-gray-100 rounded-lg w-full text-left border"
          >
            <FaPalette className="text-xl" />
            <span>Variants</span>
          </button>
          {isCatalogDropdownOpen && (
            <div className="ml-6 border border-gray-200 border-y-4 p-3">
              <NavLink
                to="/colors"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center gap-2 p-3 font-medium text-white bg-blue-500 rounded-lg shadow-sm hover:bg-blue-600 border"
                    : "flex items-center gap-2 p-3 font-medium text-white hover:text-gray-900 hover:bg-gray-100 rounded-lg border"
                }
              >
                <FaPalette className="text-xl" />
                <span>Colors</span>
              </NavLink>

              <NavLink
                to="/sizes"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center gap-2 p-3 font-medium text-white bg-blue-500 rounded-lg shadow-sm hover:bg-blue-600 border"
                    : "flex items-center gap-2 p-3 font-medium text-white hover:text-gray-900 hover:bg-gray-100 rounded-lg border"
                }
              >
                <FaListAlt className="text-xl" />
                <span>Sizes</span>
              </NavLink>

              {/* Category */}
              <NavLink
                to="/category"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center gap-2 p-3 font-medium text-white bg-blue-500 rounded-lg shadow-sm hover:bg-blue-600 border"
                    : "flex items-center gap-2 p-3 font-medium text-white hover:text-gray-900 hover:bg-gray-100 rounded-lg border"
                }
              >
                <MdFactCheck className="text-xl" />
                <span>Category</span>
              </NavLink>
            </div>
          )}
        </div>

        {/* Bulk Upload Dropdown */}
        <div>
          <button
            onClick={toggleBulkUploadDropdown}
            className="flex items-center gap-2 p-3 font-medium text-white hover:text-gray-900 hover:bg-gray-100 rounded-lg w-full text-left border"
          >
            <FaSquarePlus className="text-xl" />
            <span>Bulk Upload</span>
          </button>
          {isBulkUploadDropdownOpen && (
            <div className="ml-6 border border-gray-200 border-y-4 p-3">
              <NavLink
                to="/uploadExcel"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center gap-2 p-3 font-medium text-white bg-blue-500 rounded-lg shadow-sm hover:bg-blue-600 border"
                    : "flex items-center gap-2 p-3 font-medium text-white hover:text-gray-900 hover:bg-gray-100 rounded-lg border"
                }
              >
                <MdFactCheck className="text-xl" />
                <span>Excel Upload</span>
              </NavLink>

              <NavLink
                to="/gallery"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center gap-2 p-3 font-medium text-white bg-blue-500 rounded-lg shadow-sm hover:bg-blue-600 border"
                    : "flex items-center gap-2 p-3 font-medium text-white hover:text-gray-900 hover:bg-gray-100 rounded-lg border"
                }
              >
                <MdFactCheck className="text-xl" />
                <span>Gallery</span>
              </NavLink>
            </div>
          )}
        </div>

        {/* Orders */}
        <NavLink
          to="/orders"
          className={({ isActive }) =>
            isActive
              ? "flex items-center gap-2 p-3 font-medium text-white bg-blue-500 rounded-lg shadow-sm hover:bg-blue-600 border"
              : "flex items-center gap-2 p-3 font-medium text-white hover:text-gray-900 hover:bg-gray-100 rounded-lg border"
          }
        >
          <MdFactCheck className="text-xl" />
          <span>Orders</span>
        </NavLink>

        {/* Users */}
        <NavLink
          to="/users"
          className={({ isActive }) =>
            isActive
              ? "flex items-center gap-2 p-3 font-medium text-white bg-blue-500 rounded-lg shadow-sm hover:bg-blue-600 border"
              : "flex items-center gap-2 p-3 font-medium text-white hover:text-gray-900 hover:bg-gray-100 rounded-lg border"
          }
        >
          <MdFactCheck className="text-xl" />
          <span>Users</span>
        </NavLink>

        {/* Media */}
        <NavLink
          to="/media"
          className={({ isActive }) =>
            isActive
              ? "flex items-center gap-2 p-3 font-medium text-white bg-blue-500 rounded-lg shadow-sm hover:bg-blue-600 border"
              : "flex items-center gap-2 p-3 font-medium text-white hover:text-gray-900 hover:bg-gray-100 rounded-lg border"
          }
        >
          <MdFactCheck className="text-xl" />
          <span>Media</span>
        </NavLink>

        {/* Payment Method Setting */}
        <NavLink
          to="/paymentmethod"
          className={({ isActive }) =>
            isActive
              ? "flex items-center gap-2 p-3 font-medium text-white bg-blue-500 rounded-lg shadow-sm hover:bg-blue-600 border"
              : "flex items-center gap-2 p-3 font-medium text-white hover:text-gray-900 hover:bg-gray-100 rounded-lg border"
          }
        >
          <MdFactCheck className="text-xl" />
          <span>Payment Method Setting</span>
        </NavLink>

        {/* Inventory */}
        <NavLink
          to="/inventory"
          className={({ isActive }) =>
            isActive
              ? "flex items-center gap-2 p-3 font-medium text-white bg-blue-500 rounded-lg shadow-sm hover:bg-blue-600 border"
              : "flex items-center gap-2 p-3 font-medium text-white hover:text-gray-900 hover:bg-gray-100 rounded-lg border"
          }
        >
          <MdFactCheck className="text-xl" />
          <span>Inventory</span>
        </NavLink>
      </div>

      {/* Logout Button */}
      <div className="mt-auto pt-2">
        {token && (
          <button
            onClick={() => setToken("")}
            className="flex items-center gap-2 p-3 font-medium text-white hover:text-red-600 hover:bg-gray-100 rounded-lg"
          >
            <BiLogOut className="text-xl" />
            <span>Logout</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
