import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [isCouponApplied, setIsCouponApplied] = useState(false);

  // Coupon constants
  const VALID_COUPON = "SAVE700";
  const DISCOUNT_AMOUNT = 700;

  // Load orders from localStorage on mount
  useEffect(() => {
    const storedOrders = localStorage.getItem("orders");
    if (storedOrders) {
      setOrders(JSON.parse(storedOrders));
    }
  }, []);

  // Save orders to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  const addToCart = (product, quantity, selectedSize) => {
    if (!selectedSize) {
      toast.error("Please select a size", { position: "top-right", duration: 2000 });
      return false;
    }
    const existingItemIndex = cartItems.findIndex(
      (item) => item.id === product.id && item.selectedSize === selectedSize
    );
    if (existingItemIndex !== -1) {
      const updatedItems = [...cartItems];
      updatedItems[existingItemIndex].quantity += quantity;
      setCartItems(updatedItems);
    } else {
      setCartItems([...cartItems, { ...product, quantity, selectedSize }]);
    }
    toast.success("Added To Cart", { position: "top-right", duration: 2000 });
    return true;
  };

  const removeFromCart = (productId, selectedSize) => {
    setCartItems(
      cartItems.filter((item) => !(item.id === productId && item.selectedSize === selectedSize))
    );
    toast.info("Removed From Cart", { position: "top-right", duration: 2000 });
  };

  const toggleWishlist = (product) => {
    const isInWishlist = wishlistItems.some((item) => item.id === product.id);
    if (isInWishlist) {
      setWishlistItems(wishlistItems.filter((item) => item.id !== product.id));
      toast.info("Removed From Wishlist", { position: "top-right", duration: 2000 });
    } else {
      setWishlistItems([...wishlistItems, product]);
      toast.success("Added To Wishlist!", { position: "top-right", duration: 2000 });
    }
  };

  const getCartCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const isInWishlist = (productId) => {
    return wishlistItems.some((item) => item.id === productId);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const updateCartItemQuantity = (productId, newQuantity, selectedSize) => {
    if (newQuantity < 1) {
      removeFromCart(productId, selectedSize);
      return;
    }
    setCartItems(
      cartItems.map((item) =>
        item.id === productId && item.selectedSize === selectedSize
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const completeOrder = () => {
    if (cartItems.length === 0) {
      toast.error("Cart is empty", { position: "top-right", duration: 2000 });
      return false;
    }

    const order = {
      id: Date.now().toString(), // Convert to string to match input type
      date: new Date().toISOString(),
      items: [...cartItems],
      total: getTotalPrice() - discount,
      appliedDiscount: discount,
      tracking: {
        status: "Confirmed Order", // Match the tracking stage label
        trackingId: `TRK${Date.now()}`,
        updatedAt: new Date().toISOString(),
        carrier: "Standard Shipping", // Add default carrier
      },
    };

    setOrders((prevOrders) => [...prevOrders, order]);
    setCartItems([]);
    setDiscount(0);
    setIsCouponApplied(false);
    setCouponCode("");
    toast.success("Order placed successfully!", { position: "top-right", duration: 2000 });
    return true;
  };

  const applyCoupon = (inputCode) => {
    if (inputCode.toUpperCase() === VALID_COUPON) {
      if (isCouponApplied) {
        toast.error("This Coupon Code is Already Applied!", {
          position: "top-right",
          duration: 2000,
        });
      } else {
        setDiscount(DISCOUNT_AMOUNT);
        setIsCouponApplied(true);
        toast.success("Coupon Successfully Applied!", {
          position: "top-right",
          duration: 2000,
        });
      }
    } else {
      toast.error("Invalid Coupon Code!", { position: "top-right", duration: 2000 });
    }
    setCouponCode("");
  };

  const getFinalTotal = () => {
    return Math.max(0, getTotalPrice() - discount);
  };

  const updateOrderTracking = (orderId, newStatus, trackingDetails = {}) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId.toString()
          ? {
              ...order,
              tracking: {
                ...order.tracking,
                status: newStatus,
                updatedAt: new Date().toISOString(),
                ...trackingDetails,
              },
            }
          : order
      )
    );
    toast.info(`Order #${orderId} status updated to "${newStatus}"`, {
      position: "top-right",
      duration: 2000,
    });
  };

  const getOrderTracking = (orderId) => {
    const order = orders.find((o) => o.id === orderId.toString()); // Ensure string comparison
     return order ? order.tracking : null;
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        wishlistItems,
        orders,
        couponCode,
        setCouponCode,
        discount,
        isCouponApplied,
        addToCart,
        removeFromCart,
        toggleWishlist,
        getCartCount,
        isInWishlist,
        getTotalPrice,
        updateCartItemQuantity,
        completeOrder,
        applyCoupon,
        getFinalTotal,
        updateOrderTracking,
        getOrderTracking,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};