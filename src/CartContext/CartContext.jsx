 // CartContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [couponCode, setCouponCode] = useState(""); // Coupon input state
  const [discount, setDiscount] = useState(0); // Applied discount amount
  const [isCouponApplied, setIsCouponApplied] = useState(false); // Coupon applied flag

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
      id: Date.now(),
      date: new Date().toISOString(),
      items: [...cartItems],
      total: getTotalPrice() - discount, // Apply discount to final total
      appliedDiscount: discount, // Store applied discount for order history
    };

    setOrders((prevOrders) => [...prevOrders, order]);
    setCartItems([]);
    setDiscount(0); // Reset discount after order
    setIsCouponApplied(false); // Reset coupon status
    setCouponCode(""); // Clear coupon input
    toast.success("Order placed successfully!", { position: "top-right", duration: 2000 });
    return true;
  };

  const applyCoupon = (inputCode) => {
    if (inputCode.toUpperCase() === VALID_COUPON) {
      if (isCouponApplied) {
        toast.error("This Coupon Code is Already Applied!", { position: "top-right", duration: 2000 });
      } else {
        setDiscount(DISCOUNT_AMOUNT);
        setIsCouponApplied(true);
        toast.success("Coupon Successfully Applied!", { position: "top-right", duration: 2000 });
      }
    } else {
      toast.error("Invalid Coupon Code!", { position: "top-right", duration: 2000 });
    }
    setCouponCode(""); // Clear input after applying
  };

  const getFinalTotal = () => {
    return Math.max(0, getTotalPrice() - discount);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        wishlistItems,
        orders,
        couponCode,
        setCouponCode, // Expose to update input
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
        applyCoupon, // Expose coupon function
        getFinalTotal, // Expose final total with discount
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