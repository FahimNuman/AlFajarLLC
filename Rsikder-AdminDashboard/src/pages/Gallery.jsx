

const Gallery = () => {
    return (
        <div className="min-h-screen bg-gray-100 p-4 flex flex-col md:flex-row gap-4">
      {/* Left Side: Upload Form */}
      <div className="w-full md:w-10/12 bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Upload Excel File
        </h2>
        <form className="flex flex-col items-center space-y-4">
          <input
            type="file"
            accept=".xlsx, .xls"
            
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button" // Changed to type="button" to prevent form submission issues
           
           
          >
         
          </button>
        </form>
       
         
      
      </div>

     
    </div>
    );
};

export default Gallery;