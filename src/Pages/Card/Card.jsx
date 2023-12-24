import React from "react";

import { Link, useNavigate } from "react-router-dom";

import "./Card.css";

const Card = ({ data }) => {
  const navigate = useNavigate();

  const productDetails = () => {
    navigate(`/productDetails/${data._id}`);
  };

  return (
    <>
      <div className="border mt-3">
        <div className="p-3">
          <img
            onClick={productDetails}
            src={data?.sizeVariation?.[0]?.photos[0]}
            alt=""
            style={{ height: "400px", cursor: "pointer" }}
          />
          <p>Chocolate Torte Taaga Man Classic Fit T-Shirt</p>
          <p>Tk 1200</p>
          <button
            onClick={productDetails}
            className="text-white px-3"
            style={{
              backgroundColor: "#12856b",
              border: "none",
            }}
          >
            View Details
          </button>
        </div>
      </div>
    </>
  );
};

export default Card;
