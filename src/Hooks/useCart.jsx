import { useQuery } from "react-query";
import useUser from "./useUser";
import { useState } from "react";

const useCart = () => {
  const [user] = useUser();
  const token = localStorage.getItem("token");
  const [carts, setCarts] = useState([]);
  const { refetch, isLoading } = useQuery([user, token], () =>
    fetch(`http://localhost:5000/api/cart/${user?._id}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setCarts(data?.data);
      })
  );

  return [carts, refetch, isLoading];
};

export default useCart;
