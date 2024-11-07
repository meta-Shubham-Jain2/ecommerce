import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/userSlice";
import { FaShoppingCart } from "react-icons/fa";

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const cartItems = useSelector((state) => state.cart.items);
  const [search, setSearch] = useState("");

  //   // Get total quantity of items in the cart
  //   const getCartItemCount = () => {
  //     return cartItems.reduce((total, item) => total + item.quantity, 0);
  //   };

  const getTotalProductCount = () => {
    return cartItems.length; // Length of the array represents the number of unique products
  };
  console.log("----", cartItems);
  console.log("----local", localStorage.getItem("user"));

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">
          E-Commerce
        </Link>
        <form className="form-inline my-2 my-lg-0 search-bar">
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            id="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            required
          />
          <button
            className="btn btn-outline-success my-2 my-sm-0"
            type="submit"
          >
            Search
          </button>
        </form>
        <div className="collapse navbar-collapse nav-items">
          <ul className="navbar-nav ml-auto">
            {!user ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Register
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <span className="nav-link">Hello, {user.username}</span>
                </li>
                <li className="nav-item">
                  <button
                    className="btn btn-link nav-link"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
            <li className="nav-item">
              <Link className="nav-link" to="/cart">
                <FaShoppingCart /> ({getTotalProductCount()})
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
