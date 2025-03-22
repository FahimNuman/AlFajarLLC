const ActionButtons = ({ onAddToCart }) => (
  <div className="flex items-center gap-x-4 mt-5">
    <button
      type="submit"
      onClick={onAddToCart && onAddToCart}
      className="text-white px-10 py-3 font-medium bg-green-500 rounded-xl hover:bg-green-700"
    >
      Add To Cart
    </button>
    <button className="text-gray-800 px-10 py-3 font-medium bg-gray-200 rounded-xl hover:bg-gray-300">
      Wishlist
    </button>
  </div>
);

export default ActionButtons;
