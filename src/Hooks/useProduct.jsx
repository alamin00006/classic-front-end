import { useQuery } from "react-query";

const useProduct = () => {
  const {
    data: products,
    isLoading,
    refetch,
  } = useQuery([], () =>
    fetch("https://classic-server-jk7f.onrender.com/api/product", {
      method: "GET",
    }).then((res) => res.json())
  );

  return [products, refetch, isLoading];
};

export default useProduct;
