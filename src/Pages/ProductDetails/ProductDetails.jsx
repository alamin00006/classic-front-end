import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ProductDetails.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

import { useQuery } from "react-query";

const ProductDetails = () => {
  const { detailsId } = useParams();

  const [user, setUser] = useState({});

  const [singleProduct, setSingleProduct] = useState({});
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [filterVariation, setFilterVariation] = useState({});
  const [isFilter, setIsFilter] = useState(false);

  const token = localStorage.getItem("token");

  // Single Product Get
  useEffect(() => {
    const url = `http://localhost:5000/api/product/${detailsId}`;
    fetch(url, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => setSingleProduct(data?.data));
  }, [detailsId]);

  // Get User
  const { isLoading, refetch } = useQuery(
    "data",
    async () => {
      const { data } = await axios.get("http://localhost:5000/api/user/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return setUser(data?.data);
    },
    {
      refetchInterval: 6000,
    }
  );

  // Variation Filter
  useEffect(() => {
    if (size && !color) {
      const filter = singleProduct?.sizeVariation?.find(
        (data) => data?.size === size
      );
      setFilterVariation(filter);
    } else if (!size && color) {
      const filter = singleProduct?.sizeVariation?.find(
        (data) => data?.color === color
      );
      setFilterVariation(filter);
    } else {
      const filter = singleProduct?.sizeVariation?.find(
        (data) => data?.size === size && data?.color === color
      );
      setFilterVariation(filter);
    }
  }, [size, singleProduct?.sizeVariation, filterVariation, color, isFilter]);

  const handleAddToCart = async (product) => {
    try {
      if (!user?.email) {
        return toast.warn("Please Login");
      }
      const data = {
        productId: product._id,
        userId: user._id,
      };
      // console.log(product);

      await axios.post("http://localhost:5000/api/cart", data);
      toast.success("Added To Cart");
    } catch (error) {
      return toast.warn(error.response.data.message);
    }
  };

  return (
    <div class="container">
      <div class="mt-2">
        <div class="container-fluid ">
          <div class="row gx-5">
            <div class="col-lg-5 col-sm-12">
              <div class="">
                <div class="tab-pane active" id="pic-1">
                  {isFilter ? (
                    filterVariation?.photos?.length > 0 ? (
                      <img
                        className="details-pic"
                        alt=""
                        src={filterVariation?.photos[0]}
                      />
                    ) : (
                      <p className="text-danger mt-5">
                        This Size & Color Product Not Availble
                      </p>
                    )
                  ) : isFilter && !filterVariation ? (
                    ""
                  ) : (
                    <img
                      className="details-pic"
                      alt=""
                      src={singleProduct?.sizeVariation?.[0]?.photos[0]}
                    />
                  )}
                </div>
              </div>
            </div>
            <div
              class="details col-lg-7 col-sm-12"
              style={{ marginTop: "80px" }}
            >
              <h3 class="product-title">{singleProduct?.productTitle}</h3>
              <div className="my-3 ">
                <div>
                  <label htmlFor="" className="me-2">
                    Size :
                  </label>
                  <select
                    name=""
                    id=""
                    style={{
                      width: "30%",
                    }}
                    onChange={(e) => {
                      setSize(e.target.value);
                      setIsFilter(true);
                    }}
                  >
                    <option selected disabled>
                      Select Size
                    </option>
                    <option>S</option>
                    <option>M</option>
                    <option>L</option>
                    <option>XL</option>
                    <option>XXL</option>
                  </select>
                </div>
                <div className="mt-2">
                  <label htmlFor="" className="me-2">
                    Color :
                  </label>
                  <select
                    name=""
                    id=""
                    style={{
                      width: "30%",
                    }}
                    onChange={(e) => {
                      setColor(e.target.value);
                      setIsFilter(true);
                    }}
                  >
                    <option selected disabled>
                      Select Color
                    </option>
                    <option>Black</option>
                    <option>Blue</option>
                    <option>Brown</option>
                    <option>Cyan</option>
                    <option>Green</option>
                    <option>Grey</option>
                    <option>Maroon</option>
                    <option>Olive</option>
                    <option>Yellow</option>
                    <option>Red</option>
                    <option>White</option>
                    <option>Orange</option>
                  </select>
                </div>
              </div>
              <div className="d-flex">
                <div className=" add-to-button">
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
      <ToastContainer className="toast-position" position="top-center" />
    </div>
  );
};

export default ProductDetails;
