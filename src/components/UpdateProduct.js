import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProduct = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    price: "",
    category: "",
    company: "",
  });

  // console.log(data);
  const params = useParams();
  useEffect(() => {
    getProductDetail();
  }, []);
  // get method for single filling
  const getProductDetail = async () => {
    // console.log(params);
    let result = await fetch(`/product/${params?.id}`);
    result = await result.json();
    setData(result);
    console.log(data);
  };
  const updateProduct = async () => {
    let result = await fetch(`/product/${params.id}`, {
      method: "put",
      body: JSON.stringify({
        name: data.name,
        price: data.price,
        category: data.category,
        company: data.company,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    navigate("/");
    console.log(result);
  };

  const inputHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="product">
        <h1 style={{ marginLeft: "20Px" }}>Update Product</h1>
        <input
          type="text"
          placeholder="Enter Product Name"
          className="inputBox"
          name="name"
          onChange={inputHandler}
          value={data.name}
        />
        <input
          type="text"
          placeholder="Enter Product price"
          className="inputBox"
          name="price"
          onChange={inputHandler}
          value={data.price}
        />
        <input
          type="text"
          placeholder="Enter Product Catgory"
          className="inputBox"
          name="category"
          onChange={inputHandler}
          value={data.category}
        />
        <input
          type="text"
          placeholder="Enter Product Company"
          className="inputBox"
          name="company"
          onChange={inputHandler}
          value={data.company}
        />
        <button onClick={updateProduct} className="appbutton">
          Update Product
        </button>
      </div>
    </>
  );
};

export default UpdateProduct;
