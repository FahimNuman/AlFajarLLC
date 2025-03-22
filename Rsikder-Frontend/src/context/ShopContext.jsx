import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Create context
export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
    const currency = "S";
    const delivery_charges = 10;
    const backendURL = import.meta.env.VITE_BACKEND_URL;
    const navigate = useNavigate();

    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const [token ,setToken] = useState('')

    const addTocart = async (itemId, color) => {
        if (!color) {
            toast.error("Please select a color before adding to cart");
            return;
        }
        let cartData = structuredClone(cartItems);
        if (cartData[itemId]) {
            cartData[itemId][color] = (cartData[itemId][color] || 0) + 1;
        } else {
            cartData[itemId] = { [color]: 1 };
        }
        setCartItems(cartData);
    };

    const getCartCount = () => {
        return Object.values(cartItems).reduce(
            (count, colors) =>
                count +
                Object.values(colors).reduce((subCount, qty) => subCount + qty, 0),
            0
        );
    };

    const updateQuantity = (itemId, color, quantity) => {
        const cartData = structuredClone(cartItems);
        if (cartData[itemId] && cartData[itemId][color] !== undefined) {
            cartData[itemId][color] = quantity;
            setCartItems(cartData);
        }
    };

    const getCartAmount = () => {
        return Object.entries(cartItems).reduce((total, [itemId, colors]) => {
            const item = products.find((product) => product._id === itemId);
            if (item) {
                total += Object.entries(colors).reduce(
                    (subTotal, [color, qty]) => subTotal + qty * item.price,
                    0
                );
            }
            return total;
        }, 0);
    };

    const getProductsData = async () => {
        try {
            const response = await axios.get(`${backendURL}/api/product/list`);
            if (response.data.success) {
                setProducts(response.data.products);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    };

    useEffect(() => {
        if(!token && localStorage.getItem('token')){
            setToken(localStorage.getItem('token'))
        }
        getProductsData();
    }, []);

    const contextValue = {
        products,
        currency,
        delivery_charges,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        addTocart,
        getCartCount,
        cartItems,
        updateQuantity,
        getCartAmount,
        navigate,
        backendURL,
        token,
        setToken
    };

    return <ShopContext.Provider value={contextValue}>{children}</ShopContext.Provider>;
};

// Ensure default export is used for the provider
export default ShopContextProvider;
