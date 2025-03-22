import { Route, Routes } from "react-router-dom";
import Header from "./component/Header";
import Sidebar from "./component/Sidebar";
import List from "./pages/List";
import Orders from "./pages/Orders";
import Login from "./component/Login";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Color from "./pages/Color";
import Size from "./pages/Size";
import Admin from "./pages/Admin";
import Category from "./pages/Category";
import Dashboard from "./pages/Dashboard";
import UploadExcel from "./pages/UploadExcel";
import PaymentSetting from "./component/PaymentSetting";
import StripeSetting from "./component/PaymentMethod/stripe/StripeSetting";
import AddProduct from "./pages/Add";

import AuthorizeNetSetting from "./component/PaymentMethod/authorizeNet/AuthorizeNetSetting";
import COD from "./component/PaymentMethod/cashOnDelivery/COD";
import Gallery from "./pages/Gallery";


export const backend_url = import.meta.env.VITE_BACKEND_URL;
export const currency = "$";

function App() {
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : ""
  );

  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  return (
    <main>
      <ToastContainer />
      {token === "" ? (
        <Login setToken={setToken} />
      ) : (
        <>
        
          <div className=" text-[#404040] container mx-auto">
            <Header />
          </div>

          {/* Sidebar and Main Content */}
          <div className="mx-auto max-w-[1680px] flex flex-col sm:flex-row mt-10 sm:mt-1 bg-zinc-100 backdrop-blur-xl border rounded-lg">
            <Sidebar token={token} setToken={setToken} />
            <Routes>
           
              <Route path="/add" element={<AddProduct token={token} />} />
             
              
              <Route path="/list" element={<List token={token} />} />
              <Route path="/orders" element={<Orders token={token} />} />
              <Route path="/colors" element={<Color token={token} />} />
              <Route path="/sizes" element={<Size token={token} />} />
              <Route path="/category" element={<Category token={token} />} />
              <Route path="/users" element={<Admin token={token} />} />
              <Route path="/orders" element={<Admin token={token} />} />
              <Route path="/dashboard" element={<Dashboard token={token} />} />
              <Route path="/uploadExcel" element={<UploadExcel token={token} />} />
              <Route path="/gallery" element={<Gallery token={token} />} />
              <Route path="/paymentmethod" element={<PaymentSetting token={token} />} />
              <Route path="/stripesetting" element={<StripeSetting token={token} />} />
              <Route path="/authorizenetsetting" element={<AuthorizeNetSetting token={token} />} />
              <Route path="/cod" element={<COD token={token} />} />
             
              
              
            </Routes>
          </div>
        </>
      )}
    </main>
  );
}

export default App;
