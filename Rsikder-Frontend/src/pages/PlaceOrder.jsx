import { useContext, useEffect, useState } from "react";
import { FaCreditCard, FaMoneyBillWave, FaCcVisa } from "react-icons/fa";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import CartTotal from "../components/CartTotal";
import { ShopContext } from "../context/ShopContext";
import Footer from "../components/Footer";
import { useLocation } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { orderApis } from "../components/api/order";
import { toast } from "react-toastify";
import { useUser } from "../services/userService";
import { createPaymentIntent } from "../service/cart";
import { createAuthorizenetTransaction } from "../service/authorizenet";
import AuthorizeNetForm from "../components/payment/AuthorizeNetForm";

const PlaceOrder = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { navigate } = useContext(ShopContext);
  const [method, setMethod] = useState("stripe");
  const location = useLocation();
  const [selectedItems, setSelectedItems] = useState([]);
  const [orderDetails, setOrderDetails] = useState();
  const { userId } = useUser();
  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });
  const [loading, setLoading] = useState(false);
  const [authorizeNetLoading, setAuthorizeNetLoading] = useState(false);
  const [paymentError, setPaymentError] = useState("");

  const { mutate: fetchOrderDetails } = useMutation({
    mutationFn: (payload) => orderApis.getOrderDetails(payload),
    onSuccess: (response) => {
      if (response?.success) {
        setOrderDetails(response?.orderDetails);
      } else {
        toast.error("Failed to get order details!");
      }
    },
  });

  const { mutate: createOrderMutation, isLoading: isPlaceOrderLoading } =
    useMutation({
      mutationFn: (payload) => orderApis.placeOrder(payload),
      onSuccess: (response) => {
        if (response?.success) {
          toast.success("Successfully placed the order.");
          navigate("/orders");
        } else {
          toast.error("Failed to place the order!");
        }
      },
    });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [id]: value,
    }));
  };

  const handlePlaceOrder = async () => {
    // Clear any previous payment errors
    setPaymentError("");
    
    const isAddressIncomplete = Object.values(address).some(
      (value) => !value.trim()
    );

    if (isAddressIncomplete) {
      toast.error(
        "Please fill out all address fields before placing the order."
      );
      return;
    }

    if (method === "stripe") {
      handleStripePayment();
    } else if (method === "authorizenet") {
      // Authorize.Net payment is handled by the form's onSubmit
      // The form will call handleAuthorizeNetPayment
    } else {
      const payload = {
        userId,
        cartIds: selectedItems,
        address,
        paymentDetails: {
          method: "COD",
        },
      };

      await createOrderMutation(payload);
    }
  };

  const handleAuthorizeNetPayment = async (cardData) => {
    setAuthorizeNetLoading(true);
    setPaymentError("");
  
    try {
      if (!userId) {
        throw new Error("User not authenticated. Please log in.");
      }

      const nameParts = address.street.split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';
  
      const response = await createAuthorizenetTransaction({
        amount: orderDetails?.total || 0,
        cardData: {
          cardNumber: cardData.cardNumber.replace(/\s/g, ""),
          expirationDate: cardData.expirationDate,
          cardCode: cardData.cardCode
        },
        billingInfo: {
          firstName,
          lastName,
          address: address.street,
          city: address.city,
          state: address.state,
          zip: address.zip,
          country: address.country
        },
        userId: userId // Add userId to the payload
      });
  
      if (response && response.success) {
        toast.success("Payment successful!");
        const payload = {
          userId,
          cartIds: selectedItems,
          address,
          paymentDetails: {
            method: "AuthorizeNet",
            transactionId: response.transactionId,
          },
        };
        await createOrderMutation(payload);
      } else {
        const errorMessage = response?.message || 'Transaction declined';
        setPaymentError(`Payment error. Please try again. ${errorMessage}`);
        toast.error(`Payment failed: ${errorMessage}`);
      }
    } catch (error) {
      console.error("Error during Authorize.net payment:", error);
      setPaymentError("Payment error. Please try again.");
      toast.error("Payment error. Please try again.");
    } finally {
      setAuthorizeNetLoading(false);
    }
  };

  const handleStripePayment = async () => {
    setLoading(true);
    setPaymentError("");
    
    if (!stripe || !elements) {
      toast.error("Stripe is not initialized!");
      setPaymentError("Stripe is not initialized!");
      setLoading(false);
      return;
    }
  
    try {
      // Create a payment intent on the backend
      const { clientSecret } = await createPaymentIntent({
        amount: orderDetails?.total || 0,
      });
      console.log("Client Secret:", clientSecret);
  
      // Confirm the payment
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        }
      );
  
      console.log("Payment Intent:", paymentIntent);
      console.log("Payment Error:", error);
  
      if (error) {
        console.error("Payment error:", error);
        setPaymentError(`Payment failed: ${error.message}`);
        toast.error(`Payment failed: ${error.message}`);
      } else if (paymentIntent.status === "succeeded") {
        toast.success("Payment successful!");
        // Place the order after successful payment
        const payload = {
          userId,
          cartIds: selectedItems,
          address,
          paymentDetails: {
            method: "Stripe",
            paymentIntentId: paymentIntent.id,
          },
        };
        await createOrderMutation(payload);
      }
    } catch (error) {
      console.error("Error during payment:", error);
      setPaymentError("Payment error. Please try again.");
      toast.error("Payment error. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    if (selectedItems.length && userId) {
      fetchOrderDetails({
        userId,
        cartIds: selectedItems,
      });
    }
  }, [selectedItems, userId]);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const items = queryParams.get("selectedItems");

    if (items) {
      const decodedItems = JSON.parse(decodeURIComponent(items));
      setSelectedItems(decodedItems);
    }
  }, [location.search]);

  return (
    <section className="max-padd-container bg-white-50 py-10">
      <div className="max-padd-container mt-8 xl:mt-6 mx-auto px-4 mb-10">
        {paymentError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4 flex items-center" role="alert">
            <span className="flex-grow">{paymentError}</span>
            <button 
              className="ml-4" 
              onClick={() => setPaymentError("")}
              aria-label="Close"
            >
              <span className="text-xl">×</span>
            </button>
          </div>
        )}
        <div className="bg-white rounded-lg shadow-lg p-10 grid grid-cols-1 xl:grid-cols-2 gap-10">
          {/* Delivery Information */}
          <div>
            <h3 className="text-4xl font-semibold mb-6 text-gray-800">
              Delivery Information
            </h3>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { id: "street", label: "Street", placeholder: "Street" },
                { id: "city", label: "City", placeholder: "City" },
                { id: "state", label: "State", placeholder: "State" },
                { id: "zip", label: "Zip Code", placeholder: "Zip Code" },
                { id: "country", label: "Country", placeholder: "Country" },
              ].map((field) => (
                <div key={field.id} className="flex flex-col">
                  <label
                    htmlFor={field.id}
                    className="text-sm font-medium text-gray-600 mb-1"
                  >
                    {field.label}
                  </label>
                  <input
                    type="text"
                    id={field.id}
                    value={address[field.id]}
                    onChange={handleInputChange}
                    placeholder={field.placeholder}
                    required
                    className="ring-1 ring-gray-300 p-3 rounded-lg focus:ring-blue-500 transition-shadow shadow-sm"
                  />
                </div>
              ))}
            </form>
          </div>

          {/* Cart Total & Payment */}
          <div className="flex flex-col justify-between">
            <CartTotal subTotal={orderDetails?.total} />
            <div className="mt-6">
              <h3 className="text-xl font-bold mb-4 text-gray-800">
                Payment Method
              </h3>
              <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <button
                  onClick={() => setMethod("stripe")}
                  className={`flex-1 flex items-center justify-center gap-3 px-6 py-4 rounded-lg text-lg font-medium ${
                    method === "stripe"
                      ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg transform scale-105"
                      : "bg-white border-2 border-gray-200 text-gray-700 hover:border-blue-400 hover:bg-blue-50"
                  } transition-all duration-300`}
                >
                  <FaCreditCard className="text-xl" />
                  Stripe
                </button>
                <button
                  onClick={() => setMethod("authorizenet")}
                  className={`flex-1 flex items-center justify-center gap-3 px-6 py-4 rounded-lg text-lg font-medium ${
                    method === "authorizenet"
                      ? "bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg transform scale-105"
                      : "bg-white border-2 border-gray-200 text-gray-700 hover:border-purple-400 hover:bg-purple-50"
                  } transition-all duration-300`}
                >
                  <FaCcVisa className="text-xl" />
                  Authorize.Net
                </button>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setMethod("cod")}
                  className={`flex-1 flex items-center justify-center gap-3 px-6 py-4 rounded-lg text-lg font-medium ${
                    method === "cod"
                      ? "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg transform scale-105"
                      : "bg-white border-2 border-gray-200 text-gray-700 hover:border-green-400 hover:bg-green-50"
                  } transition-all duration-300`}
                >
                  <FaMoneyBillWave className="text-xl" />
                  Cash On Delivery
                </button>
              </div>
              
              {method === "stripe" && (
                <div className="mt-4">
                  <CardElement className="p-3 border rounded-lg shadow-sm" />
                </div>
              )}
              
              {method === "authorizenet" && (
                <AuthorizeNetForm 
                  onSubmit={handleAuthorizeNetPayment} 
                  loading={authorizeNetLoading} 
                />
              )}
            </div>
            <div className="mt-6">
              <button
                onClick={handlePlaceOrder}
                disabled={isPlaceOrderLoading || loading || authorizeNetLoading}
                className="w-full bg-gradient-to-r from-rose-500 to-red-600 text-white py-3 rounded-lg shadow-lg hover:from-rose-600 hover:to-red-700 transition-all duration-300 font-medium"
              >
                {loading || authorizeNetLoading
                  ? "Processing Payment..."
                  : isPlaceOrderLoading
                  ? "Placing Order..."
                  : "Place Order"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default PlaceOrder;