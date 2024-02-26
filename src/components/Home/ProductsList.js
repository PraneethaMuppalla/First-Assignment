import React from "react";

import classes from "./ProductsList.module.css";

const ProductsList = (props) => {
  return (
    <div className={classes.products}>
      <ul>
        {props.products.map((product) => (
          <li key={product.id}>
            <span>
              {product.productName} {product.price}
            </span>
            <button
              className={classes.button}
              onClick={() => {
                props.onDelete(product.id);
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductsList;
