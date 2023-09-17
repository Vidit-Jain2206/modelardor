import React, { useState, createContext, memo } from "react";

export const Context = createContext();

export const AppContext = memo((props) => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [loading, setLoading] = useState(false);
  const [basket, setBasket] = useState([]);
  const [selectCategories, setSelectCategories] = useState("");
  const [login, setLogin] = useState(false);
  const [imageGallery, setImageGallery] = useState([]);

  return (
    <Context.Provider
      value={{
        loading,
        setLoading,
        basket,
        setBasket,
        mobileMenu,
        setMobileMenu,
        selectCategories,
        setSelectCategories,
        login,
        setLogin,
        imageGallery,
        setImageGallery,
      }}
    >
      {props.children}
    </Context.Provider>
  );
});
