import React, { useState, useReducer, useEffect, useRef } from "react";

import Card from "../UI/Card/Card";
import classes from "./SellersForm.module.css";
import Button from "../UI/Button/Button";

const productNameReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isvalid: action.val.length > 3 };
  }
  if (action.type === "RESTORE_INPUT") {
    return { value: "", isvalid: null };
  }
  return { value: "", isvalid: false };
};

const priceReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isvalid: +action.val > 0 };
  }
  if (action.type === "RESTORE_INPUT") {
    return { value: "", isvalid: null };
  }
  return { value: "", isvalid: false };
};

const SellersForm = (props) => {
  const [formIsValid, setFormIsValid] = useState(false);
  const [productNameState, dispatchProductName] = useReducer(
    productNameReducer,
    {
      value: "",
      isvalid: null,
    }
  );
  const [priceState, dispatchPrice] = useReducer(priceReducer, {
    value: "",
    isvalid: null,
  });
  const [category, setCategory] = useState("");

  const productNameRef = useRef();
  const priceRef = useRef();
  const categoryRef = useRef();

  const productNamehandler = (event) => {
    dispatchProductName({
      type: "USER_INPUT",
      val: event.target.value,
    });
  };

  const priceChangeHandler = (event) => {
    dispatchPrice({
      type: "USER_INPUT",
      val: event.target.value,
    });
  };

  const categoryChangeHandler = (e) => {
    setCategory(e.target.value);
  };
  const submitHandler = (event) => {
    event.preventDefault();
    if (formIsValid) {
      const newProduct = {
        productName: productNameState.value,
        price: priceState.value,
        category,
      };

      props.onAddProduct(newProduct);
      dispatchProductName({
        type: "RESTORE_INPUT",
      });
      dispatchPrice({
        type: "RESTORE_INPUT",
      });
      setCategory("");
    } else if (!productNameState.isvalid) {
      productNameRef.current.focus();
    } else if (!priceState.isvalid) {
      priceRef.current.focus();
    } else {
      categoryRef.current.focus();
    }
  };
  useEffect(() => {
    setFormIsValid(
      productNameState.isvalid && priceState.isvalid && category.trim() !== ""
    );
  }, [productNameState.isvalid, priceState.isvalid, category]);

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            productNameState.isvalid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="pName">Product Name</label>
          <input
            ref={productNameRef}
            type="text"
            id="pName"
            value={productNameState.value}
            onChange={productNamehandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            priceState.isvalid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="price">Price</label>
          <input
            ref={priceRef}
            type="number"
            id="price"
            value={priceState.value}
            onChange={priceChangeHandler}
          />
        </div>
        <div className={`${classes.control}`}>
          <label htmlFor="price">Category</label>
          <select
            value={category}
            onChange={categoryChangeHandler}
            ref={categoryRef}
          >
            <option value="">Please choose one option</option>
            <option value="Electronics">Electronics</option>
            <option value="Clothes">Clothes</option>
            <option value="Food">Food</option>
            <option value="Others">Others</option>
          </select>
        </div>
        <div className={classes.actions}>
          <Button type="submit">Add Product</Button>
        </div>
      </form>
    </Card>
  );
};

export default SellersForm;
