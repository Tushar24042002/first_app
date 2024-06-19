
// AppContext.js
import React, { createContext, useState, useContext } from 'react';

const ContextFunction = createContext();

export const Context = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [wishlistData, setWishlistData] = useState([]);
  const [productCategory,setProductCategory] = useState([]);
  const [productSubCategory, setProductSubCategory] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userDetails , setUserDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  return (
    <ContextFunction.Provider value={{ cart, setCart, wishlistData, setWishlistData , productCategory, setProductCategory, productSubCategory, setProductSubCategory, isMenuOpen, setIsMenuOpen , userDetails, setUserDetails, isLoading, setIsLoading }}>
      {children}
    </ContextFunction.Provider>
  );
};

export const useAppContext = () => useContext(ContextFunction);
