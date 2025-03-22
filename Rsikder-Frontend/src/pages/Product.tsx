import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ShopContext } from "../context/ShopContext";
import Footer from "../components/Footer";
import RelatedProducts from "../components/RelatedProducts";
import Category from "../components/Category";
import ProductImageGallery from "../components/product/ProductImageGallery";
import ColorSelector from "../components/product/ColorSelector";
import ProductSizeTable from "../components/product/ProductSizeTable";
import ActionButtons from "../components/product/ActionButtons";
import ProductDetails from "../components/product/ProductDetails";
import { fetchAProduct } from "../components/api/product";

const Product = () => {
  const { productId } = useParams();
  const { currency = "$", addTocart } = useContext(ShopContext);

  // const [selectedColors, setSelectedColors] = useState([]);
  const [hoveredColor, setHoveredColor] = useState("");
  const [image, setImage] = useState("");
  const [selectedColors, setSelectedColors] = useState([]);
  // const [activeColors, setActiveColors] = useState({});

  const {
    data: productData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => fetchAProduct(productId),
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Error loading product!</p>
      </div>
    );
  }

 

  // console.log("selectedColors::", selectedColors);

  // Default to the first color’s first image if no image is selected
  // const selectedImage =
  //   image || productData.product.colors[0]?.images[0]?.image || "";

  // console.log("productData", productData);
  // console.log("selectedImage", selectedImage);


  let selectImg = (selectedColors.length > 0 
    ? selectedColors[selectedColors.length - 1]?.images 
    : productData?.product?.colors[0]?.images
  )


  const selectedImage = image || selectImg[0]?.image;

  let imgs = (selectedColors.length > 0 
    ? selectedColors[selectedColors.length - 1]?.images 
    : productData?.product?.colors[0]?.images
  )?.map((img) => ({ url: img.image })) || [];


  console.log("imgs", imgs);


  return (
    <>
      <Category />
      <section>
        <div className="max-padd-container mt-8 xl:mt-6">
          <div className="max-padd-container flex flex-col xl:flex-row bg-white py-16 rounded-2xl border">
            {/* Product Image Gallery */}
            <ProductImageGallery
              // images={
              //   (selectedColors.length > 0 
              //     ? selectedColors[selectedColors.length - 1]?.images 
              //     : productData?.product?.colors[0]?.images
              //   )?.map((img) => ({ url: img.image })) || []
              // }
              images={imgs}
              selectedImage={selectedImage}
              onImageSelect={setImage}
              hoveredColor={hoveredColor}
              setHoveredColor={setHoveredColor}
              setImage={setImage}
              image={image}
            />

            {/* Product Details */}
            <div className="flex-[1.5] rounded-2xl px-7">
              <ProductDetails
                product={productData.product}
                currency={currency}
              />
              <ProductSizeTable 
                product={productData.product} 
                setSelectedColors={setSelectedColors} 
                selectedColors={selectedColors} 
                setImage={setImage}
              />
              {/* <ActionButtons onAddToCart={handleActionButtonClick} /> */}
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        {productData.product.category && productData.product.subCategory && (
          <RelatedProducts
            category={productData.product.category}
            subCategory={productData.product.subCategory}
          />
        )}
        <Footer />
      </section>
    </>
  );
};

export default Product;