import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DATACONSTANT } from "./constant/constant";

const Login = () => {
  const [data, setData] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  }, []);
  const login = async () => {
    let result = await fetch(DATACONSTANT.LOGIN_URL, {
      method: "post",
      body: JSON?.stringify({
        email: data?.email,
        password: data?.password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    console.log(result);
    if (result.name) {
      localStorage.setItem("user", JSON.stringify(result));
      navigate("/");
    } else {
      alert("please inter correct detail");
    }
  };
  //   console.log(data);
  const inputHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div className="login">
        <h1 style={{ marginLeft: "20Px" }}>Login Page</h1>
        <input
          className="inputBox"
          type="email"
          placeholder="Enter email"
          onChange={inputHandler}
          name="email"
          //   value={data.email}
        />
        <input
          className="inputBox"
          type="password"
          placeholder="Enter password"
          onChange={inputHandler}
          name="password"
          //   value={data.password}
        />
        <button className="appbutton" type="button" onClick={login}>
          Login
        </button>
      </div>
    </>
  );
};
export default Login;
