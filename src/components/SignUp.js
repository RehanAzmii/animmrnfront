import React, { useEffect, useState } from "react";
import { DATACONSTANT } from "./constant/constant";

import { useNavigate } from "react-router-dom";

const SignUp = () => {
  let navigate = useNavigate();
  const [formdata, setFormdata] = useState({
    name: "",
    email: "",
    password: "",
  });
  // console.log(formdata);

  useEffect(() => {
    let auth = localStorage.getItem("user");
    if (auth) {
      navigate("/login");
    }
  }, []);

  const register = async () => {
    let result = await fetch(DATACONSTANT.REGISTERURL, {
      method: "post",
      body: JSON.stringify({
        name: formdata.name,
        email: formdata.email,
        password: formdata.password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    console.log(result);
    if (result.token) {
      localStorage.setItem("user", JSON.stringify(result.result));
      localStorage.setItem("token", JSON.stringify(result.token));
      navigate("/login");
    }

    // try {
    //   axios
    //     .post(DATACONSTANT?.REGISTERURL, {
    //       name: formdata?.name,
    //       email: formdata?.email,
    //       password: formdata?.password,
    //     })
    //     .then((response) => {
    //       setFormdata(response.formdata);
    //       // console.log(response);
    //       if (response?.status === 200) {
    //         localStorage.setItem("user", JSON.stringify(formdata.result));
    //         localStorage.setItem("token", JSON.stringify(formdata.token));
    //         navigate("/");
    //       }
    //     });
    // } catch (error) {
    //   console.log(error);
    // }
  };
  const inputHandler = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };

  return (
    <div className="register">
      <h1>RegisterS</h1>
      <input
        className="inputBox"
        type="text"
        name="name"
        placeholder="Enter Name"
        onChange={inputHandler}
        // value={formdata.name}
        required
      />
      <input
        className="inputBox"
        type="email"
        name="email"
        placeholder="Enter Email"
        onChange={inputHandler}
        // value={formdata.email}
      />
      <input
        className="inputBox"
        type="password"
        name="password"
        placeholder="Enter password"
        onChange={inputHandler}
        // value={formdata.password}
      />
      <button className="appbutton" type="button" onClick={register}>
        SignUp
      </button>
    </div>
  );
};

export default SignUp;
