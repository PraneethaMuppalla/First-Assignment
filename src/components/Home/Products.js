import React from "react";
import ProductsList from "./ProductsList";
import Card from "../UI/Card/Card";
import classes from "./ProductsList.module.css";

function Products(props) {
  const { productsList, onDelete } = props;
  const electronicProducts = productsList.filter(
    (eachProduct) => eachProduct.category === "Electronics"
  );
  const clothes = productsList.filter(
    (eachProduct) => eachProduct.category === "Clothes"
  );
  const foodItems = productsList.filter(
    (eachProduct) => eachProduct.category === "Food"
  );
  const others = productsList.filter(
    (eachProduct) => eachProduct.category === "Others"
  );
  return (
    <Card className={classes["products-list"]}>
      <h3>Electronic Products</h3>
      <ProductsList products={electronicProducts} onDelete={onDelete} />
      <h3>Food</h3>
      <ProductsList products={foodItems} onDelete={onDelete} />
      <h3>Clothes</h3>
      <ProductsList products={clothes} onDelete={onDelete} />
      <h3>Others</h3>
      <ProductsList products={others} onDelete={onDelete} />
    </Card>
  );
}

export default Products;
