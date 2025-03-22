import { TbArrowBackUp, TbTruckDelivery } from "react-icons/tb";
import { RiSecurePaymentLine, RiTShirtLine } from "react-icons/ri";
import { FaChild, FaUserAlt } from "react-icons/fa";
import { GiClothes } from "react-icons/gi";
import Title from "./Title";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Features = () => {
  const navigate = useNavigate();
  const handleNavigation = () => {
    navigate("/collection");
  };
  return (
    <section className="max-padd-container max-xl:mt-8 mb-10">
      <Title title={"Category"} titleStyles={"text-center "} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
        {/* Kid's T-Shirt */}
        <Link
          to="/collection"
          className="p-6 rounded-3xl bg-white shadow-lg transition-transform transform hover:scale-105"
        >
          <div className="flex justify-center mb-4">
            <RiTShirtLine className="text-5xl text-blue-500" />
          </div>
          <h4 className="text-xl font-semibold text-center capitalize mb-2">
            Kid's T-Shirt
          </h4>
          <p className="text-gray-600 text-center leading-relaxed">
            Comfortable and stylish T-shirts specially designed for kids.
          </p>
        </Link>

        {/* Kid's Hoodies */}
        <div
          onClick={handleNavigation}
          className="p-6 rounded-3xl bg-white shadow-lg transition-transform transform hover:scale-105 cursor-pointer"
        >
          <div className="flex justify-center mb-4">
            <RiTShirtLine className="text-5xl text-green-500" />
          </div>
          <h4 className="text-xl font-semibold text-center capitalize mb-2">
            Kid's Hoodies
          </h4>
          <p className="text-gray-600 text-center leading-relaxed">
            Trendy hoodies that keep kids warm and stylish.
          </p>
        </div>

        {/* Adult T-Shirt */}
        <div
          onClick={handleNavigation}
          className="p-6 rounded-3xl bg-white shadow-lg transition-transform transform hover:scale-105 cursor-pointer"
        >
          <div className="flex justify-center mb-4">
            <RiTShirtLine className="text-5xl text-orange-500" />
          </div>
          <h4 className="text-xl font-semibold text-center capitalize mb-2">
            Adult T-Shirt
          </h4>
          <p className="text-gray-600 text-center leading-relaxed">
            High-quality T-shirts for adults, combining comfort and fashion.
          </p>
        </div>

        {/* Adult Sweatshirt */}
        <div
          onClick={handleNavigation}
          className="p-6 rounded-3xl bg-white shadow-lg transition-transform transform hover:scale-105 cursor-pointer"
        >
          <div className="flex justify-center mb-4">
            <RiTShirtLine className="text-5xl text-purple-500" />
          </div>
          <h4 className="text-xl font-semibold text-center capitalize mb-2">
            Adult Sweatshirt
          </h4>
          <p className="text-gray-600 text-center leading-relaxed">
            Stay cozy with our premium adult sweatshirts.
          </p>
        </div>

        {/* Adult Hoodies */}
        <div
          onClick={handleNavigation}
          className="p-6 rounded-3xl bg-white shadow-lg transition-transform transform hover:scale-105 cursor-pointer"
        >
          <div className="flex justify-center mb-4">
            <RiTShirtLine className="text-5xl text-red-500" />
          </div>
          <h4 className="text-xl font-semibold text-center capitalize mb-2">
            Adult Hoodies
          </h4>
          <p className="text-gray-600 text-center leading-relaxed">
            Stylish hoodies for adults, perfect for any casual outing.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Features;
