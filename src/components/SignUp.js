import React, { useEffect, useState } from "react";
import { DATACONSTANT } from "./constant/constant";

import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  let navigate = useNavigate();
  const [formdata, setFormdata] = useState();
  // console.log(formdata);

  useEffect(() => {
    let auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  }, []);

  const register = async () => {
    try {
      axios
        .post(DATACONSTANT?.REGISTERURL, {
          name: formdata?.name,
          email: formdata?.email,
          password: formdata?.password,
        })
        .then((response) => {
          setFormdata(response.formdata);
          // console.log(response);
          if (response?.status === 200) {
            localStorage.setItem("user", JSON.stringify(formdata));
            navigate("/");
          }
        });
    } catch (error) {
      console.log(error);
    }
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
