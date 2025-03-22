import React, { useState } from "react";

const SizeSelector = ({ selectedColors, sizes, colors, register, colorImages, setColorImages }) => {
  
  // const handleImageUpload = (event, colorId) => {
  //   const files = event.target.files;
  //   const imageArray = Array.from(files).map((file) => URL.createObjectURL(file));

  //   setColorImages((prevImages) => ({
  //     ...prevImages,
  //     [colorId]: [...(prevImages[colorId] || []), ...imageArray], // Append images to respective color
  //   }));
  // };

  // const handleImageUpload = async (event, colorId) => {
  //   const files = event.target.files;
  //   const base64Images = await Promise.all(
  //     Array.from(files).map((file) => convertFileToBase64(file))
  //   );
  
  //   setColorImages((prevImages) => ({
  //     ...prevImages,
  //     [colorId]: [...(prevImages[colorId] || []), ...base64Images], // Store Base64 images
  //   }));
  // };
  
  // Convert file to Base64
  // const convertFileToBase64 = (file) => {
  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     reader.onload = () => resolve(reader.result);
  //     reader.onerror = (error) => reject(error);
  //   });
  // };


  const handleImageUpload = (event, colorId) => {
    const files = event.target.files;
  
    setColorImages((prevImages) => ({
      ...prevImages,
      [colorId]: [...(prevImages[colorId] || []), ...files], // Store File objects
    }));
  };
  

  const removeImage = (colorId, index) => {
    setColorImages((prevImages) => ({
      ...prevImages,
      [colorId]: prevImages[colorId].filter((_, i) => i !== index),
    }));
  };
  return (
    <>
      {selectedColors?.map((colorId) => (
        <div key={colorId} className="mt-4">
          <h5 className="font-medium">
            Sizes for {colors?.find((c) => c._id === colorId)?.name}
          </h5>
          <div className="max-w-full gap-3 flex flex-nowrap ">
            {sizes?.map((size) => (
              <div>
                <div key={size._id} className="flex flex-col gap-1">
                  <label
                    key={size._id}
                    className="flex items-center gap-2 text-sm"
                  >
                    <input
                      type="checkbox"
                      value={size._id}
                      {...register(`sizes_${colorId}`)}
                      className="w-4 h-4"
                    />
                    {size.name}
                  </label>
                  <input
                    type="number"
                    placeholder="Price"
                    {...register(`price_${colorId}_${size._id}`)}
                    className="px-2 py-1 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 text-sm w-full"
                  />
                </div>
              </div>
              
            ))}
          </div>

          <div>
            <h5 className="font-medium">
              Images for {colors?.find((c) => c._id === colorId)?.name}
            </h5>

            <label
              className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-200 inline-block mt-2"
            >
              Select Images
              <input
                type="file"
                multiple
                onChange={(e) => handleImageUpload(e, colorId)}
                className="hidden"
              />
            </label>

              {/* Show uploaded images */}

              <div className="showImage" style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                {colorImages[colorId]?.map((image, index) => {
                  const imageUrl = typeof image === "string" ? image : URL.createObjectURL(image); // Convert File to URL

                  return (
                    <div key={index} style={{ position: "relative", display: "inline-block" }}>
                      <img src={imageUrl} alt={`Upload Preview ${index}`} width="100" height="100" />
                      <button
                        onClick={() => removeImage(colorId, index)}
                        style={{
                          position: "absolute",
                          top: 0,
                          right: 0,
                          background: "red",
                          color: "white",
                          border: "none",
                          cursor: "pointer",
                          borderRadius: "50%",
                          width: "20px",
                          height: "20px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "14px",
                        }}
                      >
                        ❌
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* <div className="showImage" style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                {colorImages[colorId]?.map((image, index) => (
                  <div key={index} style={{ position: "relative", display: "inline-block" }}>
                    <img src={image} alt={`Upload Preview ${index}`} width="100" height="100" />
                    <button
                      onClick={() => removeImage(colorId, index)}
                      style={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        background: "red",
                        color: "white",
                        border: "none",
                        cursor: "pointer",
                        borderRadius: "50%",
                        width: "20px",
                        height: "20px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "14px",
                        color: "white",
                      }}
                    >
                      ❌
                    </button>
                  </div>
                ))}
              </div> */}
          </div>
        </div>
      ))}
    </>
  );
};

export default SizeSelector;
