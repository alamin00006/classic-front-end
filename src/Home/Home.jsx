import React from "react";
import Navber from "./Navbar/Navbar";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div
      className="d-flex justify-content-center justify-items-center"
      style={{ marginTop: "200px" }}
    >
      <p
        className="rounded"
        style={{
          backgroundColor: "#12856b",
          padding: "10px 20px",
          fontSize: "20px",
        }}
      >
        <Link to="/product-page" className="text-white">
          Product Page
        </Link>
      </p>
    </div>
  );
};

export default Home;
