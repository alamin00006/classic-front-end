import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./ProductDetails.css";

const ProductDetails = () => {
  const { detailsId } = useParams();
  const [singleProduct, setSingleProduct] = useState({});
  console.log(singleProduct);
  const handleAddToCart = (product) => {};

  useEffect(() => {
    const url = `http://localhost:5000/api/product/${detailsId}`;
    fetch(url, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => setSingleProduct(data?.data));
  }, [detailsId]);

  return (
    <div class="container">
      <div class="details-page">
        <div class="container-fluid details-side">
          <div class="row ">
            <div class="col-lg-4 details-side-1">
              <div class="">
                <div class="tab-pane active" id="pic-1">
                  <img
                    className="details-pic"
                    alt=""
                    src={singleProduct?.image}
                  />
                </div>
              </div>
            </div>
            <div class="details col-lg-5 details-side-2">
              <h3 class="product-title">{singleProduct?.productTitle}</h3>

              <div className="d-flex"></div>
              <div className="d-flex">
                <div className="d-flex align-items-center add-to-button">
                  <div>
                    <button
                      onClick={() => handleAddToCart(singleProduct)}
                      class="add-to-cart add-To-Cart btn btn-default text-white"
                      type="button"
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
