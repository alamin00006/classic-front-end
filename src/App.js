import logo from "./logo.svg";
import "./App.css";
import Navber from "./Home/Navbar";
import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Authentication/Login";
import SignUp from "./Pages/Authentication/SignUp";
import Footer from "./Footer/Footer";

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
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/singUp" element={<SignUp></SignUp>}></Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
