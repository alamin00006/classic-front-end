import React from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  const SingOutHandle = () => {
    localStorage.removeItem("token");

    navigate("/");
  };
  return (
    <div style={{ marginTop: "200px" }} className="text-center">
      <h1>Profile Page</h1>
      <div className="d-flex justify-content-center" onClick={SingOutHandle}>
        <p
          className="text-white px-3 py-2 rounded"
          style={{
            backgroundColor: "#12856b",
            cursor: "pointer",
          }}
        >
          {" "}
          Logout{" "}
        </p>
      </div>
    </div>
  );
};

export default Profile;
