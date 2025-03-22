import { useState } from 'react';

const Category = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Sample data for carousel items
  const items = [
    { name: "T-Shirt", image: 'https://rsikder.netlify.app/assets/product_7-m8E1rdsZ.png' },
    { name: "Hoody", image: 'http://localhost:5173/src/assets/product_50.png' },
    { name: "Kids Blank Hoody", image: 'http://localhost:5173/src/assets/product_69.png' },
    { name: "Sweatshirt", image: 'https://s3-eu-west-1.amazonaws.com/images.linnlive.com/4026ef0cc7c4844b9d335306aa30fe5c/d8860e88-c3b8-4e4f-a5a4-3869bfbe7a56.jpg' },
    { name: "Kids Blank T-Shirt", image: 'https://th.bing.com/th/id/OIP.OrXmIIexZEoJXkBUGLTctQHaHa?rs=1&pid=ImgDetMain' },
    { name: "T-Shirt", image: 'https://rsikder.netlify.app/assets/product_7-m8E1rdsZ.png' },
    { name: "Hoody", image: 'http://localhost:5173/src/assets/product_50.png' },
    { name: "Kids Blank Hoody", image: 'http://localhost:5173/src/assets/product_69.png' },
    { name: "Sweatshirt", image: 'https://s3-eu-west-1.amazonaws.com/images.linnlive.com/4026ef0cc7c4844b9d335306aa30fe5c/d8860e88-c3b8-4e4f-a5a4-3869bfbe7a56.jpg' },
  ];

  // Navigate to next item
  // const goNext = () => {
  //   setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  // };

  // // Navigate to previous item
  // const goPrev = () => {
  //   setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
  // };

  return (
    <div className="relative max-padd-container mt-8 xl:mt-6">
      <div className="flex items-center overflow-hidden relative">
        {/* <button
          onClick={goPrev}
          className="absolute left-0 p-2 bg-white rounded-full shadow-md hover:bg-gray-200 transition"
        >
          &#60;
        </button> */}

        <div className="flex space-x-6 justify-center w-full">
          {items.map((item, index) => (
            <div
              key={index}
              className={`flex flex-col items-center justify-center ${
                index === currentIndex ? 'scale-100' : 'scale-90 opacity-70'
              } transition-all duration-500`}
            >
              <div className="flex-none w-32 h-32 border rounded-full flex items-center justify-center">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-full"
                />
              </div>
              <p className="text-center text-sm mt-4">{item.name}</p>
            </div>
          ))}
        </div>

        {/* <button
          onClick={goNext}
          className="absolute right-0 p-2 bg-white rounded-full shadow-md hover:bg-gray-200 transition"
        >
          &#62;
        </button> */}
      </div>
    </div>
  );
};

export default Category;
