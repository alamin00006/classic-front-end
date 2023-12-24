import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Authentication/Login";
import SignUp from "./Pages/Authentication/SignUp";
import Footer from "./Footer/Footer";
import Home from "./Home/Home";
import ProductDetails from "./Pages/ProductDetails/ProductDetails";
import Navber from "./Home/Navbar/Navbar";
import AllCard from "./Pages/Card/AllCard";
import Profile from "./Pages/Profile/Profile";

function App() {
  return (
    <div>
      <div
        style={{
          backgroundColor: "#12856b",
        }}
      >
        <Navber />
      </div>

      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/singUp" element={<SignUp></SignUp>}></Route>
        <Route path="/profile" element={<Profile></Profile>}></Route>
        <Route path="/product-page" element={<AllCard></AllCard>}></Route>
        <Route
          path="/productDetails/:detailsId"
          element={<ProductDetails></ProductDetails>}
        ></Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
