import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Nav = () => {
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/signup");
  };

  return (
    <div>
      <img
      className="logo"
        src="data:image/png;base64,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"
        alt="logo"
      />
      {auth ? (
        <ul className="nav-ul">
          <li>
            <Link to={"/"}>Products</Link>
          </li>
          <li>
            <Link to={"/add"}>Add Product</Link>
          </li>
          <li>
            <Link to={"/update"}>Update Product</Link>
          </li>

          <li>
            <Link to={"/profile"}>Profile</Link>
          </li>
          <li>
            <Link onClick={logout} to={"/signup"}>
              Logout ({JSON.parse(auth).name})
            </Link>
          </li>
          {/* <li>{auth ? <Link onClick={logout} to={"/signup"}>Logout</Link> :
         <Link to={"/SignUp"}>Sign Up</Link>}</li>
        <li> <Link to={"/login"}>Login</Link></li> */}
        </ul>
      ) : (
        <ul className="nav-ul nav-right">
          <li>
            <Link to={"/SignUp"}>Sign Up</Link>
          </li>
          <li>
            {" "}
            <Link to={"/login"}>Login</Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Nav;
