import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios from "axios";

const Login = () => {
  const token = localStorage.getItem("token");
  // console.log(user)
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    emailError: "",
    passWordError: "",
  });

  const navigate = useNavigate();

  const emailCheck = (e) => {
    const emailRegex = /\S+@\S+\.\S+/;
    const validEmail = emailRegex.test(e.target.value);
    if (validEmail) {
      setUserInfo({ ...userInfo, email: e.target.value });
      setError({ ...error, emailError: "" });
    } else {
      setError({ ...error, emailError: "Invalid Email" });
      setUserInfo({ ...userInfo, email: "" });
    }
  };

  const passwordCheck = (e) => {
    const passwordRegex = /.{6,}/;
    const validPassWord = passwordRegex.test(e.target.value);
    if (validPassWord) {
      setUserInfo({ ...userInfo, password: e.target.value });
      setError({ ...error, passWordError: "" });
    } else {
      setError({ ...error, passWordError: "Invalid Password" });
      setUserInfo({ ...userInfo, password: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await axios.post(
        "https://classic-server-jk7f.onrender.com/api/user/login",
        { email: userInfo?.email, password: userInfo?.password }
      );
      localStorage.setItem("token", data.data?.data?.token);
      navigate("/");
    } catch (error) {
      return toast.warn(error.response.data.message);
    }
  };

  return (
    <div className="bg-white">
      <div className="container">
        <div className="d-flex justify-content-center">
          <div className="signup-part">
            <form onSubmit={handleSubmit} className="login-form">
              <div>
                <h3 className="mb-4">
                  <b className="text-black">Login </b>
                </h3>

                <label className="mt-2" htmlFor="email">
                  Email
                </label>
                <input
                  onChange={emailCheck}
                  className="d-block"
                  placeholder="Enter Your Email"
                  type="email"
                  name="email"
                  id="email"
                  required
                />
                {error?.emailError && (
                  <p className="text-danger">{error.emailError}</p>
                )}

                <label className="mt-2" htmlFor="password">
                  Pssword
                </label>
                <input
                  onChange={passwordCheck}
                  className="d-block mt-2"
                  type="password"
                  placeholder="Enter Your Password"
                  name="password"
                  id="password"
                  required
                />
                {error?.passWordError && (
                  <p className="text-danger">{error.passWordError}</p>
                )}

                <input
                  className=" text-white border-0 py-2 mt-2 fs-5"
                  style={{
                    backgroundColor: "#12856b",
                  }}
                  type="submit"
                  value="Login"
                />
                <p className="mt-3">
                  No Account ?
                  <Link className="text-danger" to="/singUp">
                    {" "}
                    Create Account
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer className="toast-position" position="top-center" />
    </div>
  );
};

export default Login;
