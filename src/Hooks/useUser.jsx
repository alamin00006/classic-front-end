import axios from "axios";
import { useState } from "react";
import { useQuery } from "react-query";

const useUser = () => {
  const [user, setUser] = useState({});
  const token = localStorage.getItem("token");

  const { isLoading, refetch } = useQuery([token], () => {
    async function getUser() {
      if (!token) {
        return;
      } else {
        await axios
          .get(
            "http://localhost:5000/api/user/me",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
            {
              refetchInterval: 6000,
            }
          )
          .then((data) => setUser(data?.data?.data))
          .catch((err) => {});
      }
    }
    getUser();
  });
  return [user, refetch, isLoading];
};
export default useUser;
