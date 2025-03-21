import React from "react";
import { createContext, useContext, useState } from "react";
import { toast } from "sonner"; // Changed import to use 'sonner' directly

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);

  const addToCart = (product, quantity, selectedSize) => {
    if (!selectedSize) {
      toast.error("Please select a size", {
        position: "top-right",
        duration: 2000,
        className: "custom-toast custom-toast-error",
      });
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

    toast.success("Added To Cart", {
      position: "top-right",
      duration: 3000,
      className: "custom-toast custom-toast-success",
    });
    return true;
  };

  const removeFromCart = (productId, selectedSize) => {
    setCartItems(
      cartItems.filter((item) => !(item.id === productId && item.selectedSize === selectedSize))
    );
    toast.info("Removed From Cart", {
      position: "top-right",
      duration: 3000,
      className: "custom-toast custom-toast-info",
    });
  };

  const toggleWishlist = (product) => {
    const isInWishlist = wishlistItems.some((item) => item.id === product.id);

    if (isInWishlist) {
      setWishlistItems(wishlistItems.filter((item) => item.id !== product.id));
      toast.info("Removed From Wishlist", {
        position: "top-right",
        duration: 3000,
        className: "custom-toast custom-toast-info",
      });
    } else {
      setWishlistItems([...wishlistItems, product]);
      toast.success("Added To Wishlist!", {
        position: "top-right",
        duration: 3000,
        className: "custom-toast custom-toast-success",
      });
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

  return (
    <CartContext.Provider
      value={{
        cartItems,
        wishlistItems,
        addToCart,
        removeFromCart,
        toggleWishlist,
        getCartCount,
        isInWishlist,
        getTotalPrice,
        updateCartItemQuantity,
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