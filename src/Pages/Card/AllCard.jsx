import React from "react";
import Card from "./Card";
import useProduct from "../../Hooks/useProduct";

const AllCard = () => {
  const [products] = useProduct();

  return (
    <div className="container">
      <div className="row">
        {products?.data?.map((data) => (
          <div className="col-lg-4" key={data._id}>
            <Card data={data} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllCard;
