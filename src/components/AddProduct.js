import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DATACONSTANT } from "./constant/constant";

const AddProduct = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "",
    company: "",
  });
  const [error, setError] = useState(false);
  const { name, price, category, company } = product;

  const addProduct = async () => {
    if (!name || !price || !category || !company) {
      setError(true);
      return false;
    }
    const userId = JSON.parse(localStorage.getItem("user"))._id;
    let result = await fetch(DATACONSTANT?.ADDPRODUCT_ULR, {
      method: "post",
      body: JSON.stringify({
        name: product.name,
        price: product.price,
        category: product.category,
        company: product.company,
        userId: userId,
      }),
      headers: { "Content-Type": "application/json" },
    });
    result = await result.json();
    console.log(result);
    if (result) {
      navigate("/");
    }
  };

  const inputHandler = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="product">
        <h1 style={{ marginLeft: "20Px" }}>Add Product</h1>
        <input
          type="text"
          placeholder="Enter Product Name"
          className="inputBox"
          name="name"
          onChange={inputHandler}
        />
        {error && !name && (
          <span className="invalid-input">Enter Valid Name</span>
        )}
        <input
          type="text"
          placeholder="Enter Product price"
          className="inputBox"
          name="price"
          onChange={inputHandler}
        />
        {error && !price && (
          <span className="invalid-input">Enter Valid Price</span>
        )}
        <input
          type="text"
          placeholder="Enter Product Catgory"
          className="inputBox"
          name="category"
          onChange={inputHandler}
        />
        {error && !category && (
          <span className="invalid-input">Enter Valid Catgory</span>
        )}
        <input
          type="text"
          placeholder="Enter Product Company"
          className="inputBox"
          name="company"
          onChange={inputHandler}
        />
        {error && !company && (
          <span className="invalid-input">Enter Valid Company</span>
        )}
        <button onClick={addProduct} className="appbutton">
          Add Product
        </button>
      </div>
    </>
  );
};

export default AddProduct;
