import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./SignUp.css";
import axios from "axios";

const SignUp = () => {
  const [name, setName] = useState();
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
    confirmPass: "",
  });

  const [error, setError] = useState({
    emailError: "",
    passWordError: "",
  });

  //   const [token] = useToken(user)
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

  const confirmPasswordCheck = (e) => {
    if (e.target.value === userInfo.password) {
      setUserInfo({ ...userInfo, confirmPass: e.target.value });
      setError({ ...error, passWordError: "" });
    } else {
      setError({ ...error, passWordError: "dont Match" });
      setUserInfo({ ...userInfo, confirmPass: "" });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("https://classic-server-jk7f.onrender.com/api/user/signup", {
        name: name,
        email: userInfo?.email,
        password: userInfo?.password,
      })
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
        return toast.warn(error.response.data.message);
      });
  };

  return (
    <div className="bg-white">
      <div className="container">
        <div className="d-flex justify-content-center">
          <div className=" signup-part">
            <form onSubmit={handleSubmit} className="login-form">
              <div>
                <h3 className="mb-4">
                  <b className="text-black">Sign-Up </b>
                </h3>

                <label htmlFor="name">Full Name</label>
                <input
                  onChange={(e) => setName(e.target.value)}
                  className="d-block"
                  placeholder="Enter Your Name"
                  type="text"
                  name="name"
                  id="email"
                  required
                />

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
                  Password
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
                <label className="mt-2" htmlFor="password">
                  Confirm Password
                </label>
                <input
                  onChange={confirmPasswordCheck}
                  className="d-block mt-2"
                  type="password"
                  placeholder="Enter Your Password"
                  name="confirmPassword"
                  id="password"
                  required
                />
                <p></p>
                <input
                  className="text-white border-0 py-2 mt-2 fs-5"
                  style={{
                    backgroundColor: "#12856b",
                  }}
                  type="submit"
                  value="Sign-Up"
                />
                <p className="mt-3">
                  Have Account?
                  <Link className="text-danger" to="/login">
                    {" "}
                    Login
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

export default SignUp;
