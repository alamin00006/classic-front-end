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
      <div>
        <img
          src="https://www.aarong.com/media/catalog/product/1/2/1200000027917.jpg?optimize=high&bg-color=255,255,255&fit=bounds&height=400&width=300&canvas=300:400"
          alt=""
        />
        <p>Chocolate Torte Taaga Man Classic Fit T-Shirt</p>
        <p>Tk 1200</p>
        <button onClick={productDetails}>View Details</button>
      </div>
    </>
  );
};

export default Card;
