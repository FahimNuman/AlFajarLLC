import { BsFire } from "react-icons/bs";
import { Link } from "react-router-dom";
import Footer from "./Footer";

const Hero = () => {
  return (
    <section className="max-padd-container max-xl:mt-8 mb-16">
      <div className="max-padd-container bg-hero bg-cover bg-center bg-no-repeat h-[736px] w-full rounded-tr-3xl mt-6 relative overflow-hidden">
        <div className="relative max-w-[777px] top-48 animate-fadeInUp delay-200">
          <h5 className="flex items-center gap-x-2  text-red-500 medium-18 animate-bounce">
          Alfajor LLC <BsFire />
          </h5>
          <h1 className="h1 capitalize max-w-[611px] animate-slideInLeft delay-300">
            Elevate Your Look With Every Click Shop Today
          </h1>
          <p className="pl-2 max-w-lg mt-6 mb-8 border-l-4 border-l-secondary animate-fadeIn delay-500">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
            nec libero eu eros cursus dapibus.
          </p>

          <div className="flex gap-2 sm:gap-6 mt-14 animate-fadeIn delay-700">
            <Link
              to="/collection"
              className="btn-dark max-sm:!p-3 transition duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              Latest Product
            </Link>
            <Link
              to="/collection"
              className="btn-secondary max-sm:!p-3 transition duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              Popular Product
            </Link>
          </div>
        </div>
      </div>
    </section>
    
  );
};

export default Hero;
