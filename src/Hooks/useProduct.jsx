import { useQuery } from "react-query";

const useProduct = () => {
  const {
    data: products,
    isLoading,
    refetch,
  } = useQuery([], () =>
    fetch("http://localhost:5000/api/product", {
      method: "GET",
    }).then((res) => res.json())
  );

  return [products, refetch, isLoading];
};

export default useProduct;
