import React, { useEffect, useState } from "react";
import SellersForm from "./SellersForm";
import Products from "./Products";

function Home() {
  const [productsList, setProductsList] = useState([]);

  const addProductHandler = (newProduct) => {
    const newProductsList = [
      ...productsList,
      { ...newProduct, id: Math.round(Math.random() * 1000) },
    ];
    localStorage.setItem("products", JSON.stringify(newProductsList));
    setProductsList(newProductsList);
  };

  const deleteProductHandler = (id) => {
    const filteredProducts = productsList.filter((each) => each.id !== id);
    localStorage.setItem("products", JSON.stringify(filteredProducts));
    setProductsList(filteredProducts);
  };

  useEffect(() => {
    const list = localStorage.getItem("products");
    if (list) {
      setProductsList(JSON.parse(list));
    }
  }, []);

  return (
    <>
      <SellersForm onAddProduct={addProductHandler} />

      <Products productsList={productsList} onDelete={deleteProductHandler} />
    </>
  );
}

export default Home;
