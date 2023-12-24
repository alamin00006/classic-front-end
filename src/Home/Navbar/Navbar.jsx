import React, { useState } from "react";

import Container from "react-bootstrap/Container";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import { AiFillShopping, AiOutlineUser } from "react-icons/ai";

import "./Navbar.css";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";

const Navber = () => {
  const [user, setUser] = useState({});
  const [carts, setCarts] = useState([]);
  const token = localStorage.getItem("token");

  // Get User
  const { isLoading, refetch } = useQuery(
    "data",
    async () => {
      const { data } = await axios.get(
        "https://classic-server-jk7f.onrender.com/api/user/me",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return setUser(data?.data);
    },
    {
      refetchInterval: 6000,
    }
  );
  // Get Cart
  const { isLoadingOrder, refetchOrder } = useQuery([user, token], () =>
    fetch(`https://classic-server-jk7f.onrender.com/api/cart/${user?._id}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setCarts(data?.data);
      })
  );

  return (
    <nav className="container p-0 ">
      <Navbar className="searching-nav " expand="lg">
        <Container fluid className="">
          <Link to="/" className="logo-part">
            <p className="text-white text-decoration-none ">Front End</p>
          </Link>

          {/* Cart */}

          {token ? (
            <>
              <p className=" sing-Out my-cart-aria mt-2">
                <Nav.Link
                  as={Link}
                  to="/"
                  className="text-black d-flex flex-column align-items-center account-part"
                >
                  <div>
                    <AiFillShopping
                      style={{ width: "30px", height: "30px", color: "white" }}
                    />
                    <span className="text-white">{carts?.length}</span>
                  </div>
                </Nav.Link>
              </p>
            </>
          ) : (
            ""
          )}

          {/* Account */}
          {token ? (
            <>
              <p className=" sing-Out my-account-aria">
                <Nav.Link
                  as={Link}
                  to="/profile"
                  className="text-black d-flex flex-column align-items-center account-part"
                >
                  <div>
                    <AiOutlineUser
                      style={{ width: "30px", height: "30px", color: "white" }}
                    />
                  </div>
                  <div className="">
                    <span style={{ fontSize: "14px", color: "white" }}>
                      My Account
                    </span>
                  </div>
                </Nav.Link>
              </p>
            </>
          ) : (
            <p className="login-aria">
              <Nav.Link
                as={Link}
                to="/login"
                className="text-black d-flex flex-column align-items-center "
              >
                <div>
                  <AiOutlineUser
                    style={{ width: "30px", height: "30px", color: "white" }}
                  />
                </div>
                <div className="">
                  <span style={{ fontSize: "14px", color: "white" }}>
                    Sign Up/In
                  </span>
                </div>
              </Nav.Link>
            </p>
          )}
        </Container>
      </Navbar>
    </nav>
  );
};

export default Navber;
