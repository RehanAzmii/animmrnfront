import React, { useEffect, useState } from "react";
import { DATACONSTANT } from "./constant/constant";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    getProduct();
  }, []);
  const getProduct = async () => {
    let result = await fetch(DATACONSTANT.PRODUCTLIST_URL, {
      headers: {
        authorization: JSON.parse(localStorage.getItem("token")),
      },
    });
    result = await result.json();
    setData(result);
  };
  // delete api
  const deleteProduct = async (id) => {
    let result = await fetch(`/product/${id}`, {
      method: "Delete",
      headers: {
        authorization: JSON.parse(localStorage.getItem("token")),
      },
    });
    result = await result.json();
    if (result) {
      alert("record is delete");
    }
  };
  // search api
  const searchHandler = async (e) => {
    let key = e.target.value;
    if (key) {
      let result = await fetch(`/search/${key}`, {
        headers: {
          authorization: JSON.parse(localStorage.getItem("token")),
        },
      });
      result = await result.json();
      console.log(result);
      setData(result);
      if (result) {
        setData(result);
      }
    } else {
      getProduct();
    }
  };
  return (
    <div className="product-list">
      <h1>ProductList</h1>
      <input
        type="text"
        placeholder="Search Product"
        className="search-product-box"
        onChange={searchHandler}
      />
      <ul>
        <li>S. No</li>
        <li>Name</li>
        <li>Price</li>
        <li>Category</li>
        <li>Company</li>
        <li>Opreation</li>
      </ul>
      {data.length > 0 ? (
        data.map((item, index) => (
          <ul key={item._id}>
            <li>{index + 1}</li>
            <li>{item.name}</li>
            <li>{item.price}</li>
            <li>{item.category}</li>
            <li>{item.company}</li>
            <li>
              <button onClick={() => deleteProduct(item._id)}>Delete</button>
              <Link to={`/update/${item._id}`}>Update</Link>
            </li>
          </ul>
        ))
      ) : (
        <h1> no result found</h1>
      )}
    </div>
  );
};

export default ProductList;
