import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/userSlice";
import { FaShoppingCart } from "react-icons/fa";
import { searchFunc , selectSearch } from "../redux/searchSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const cartItems = useSelector((state) => state.cart.items);
  const search = useSelector(selectSearch);
 

  const getTotalProductCount = () => {
    return cartItems.length; // Length of the array represents the number of unique products
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const onClickSearch = (e) => {
    dispatch(searchFunc(e.target.value))
  }

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
            onChange={onClickSearch}
            required
          />
          {/* <button
            className="btn btn-outline-success my-2 my-sm-0"
            type="submit"
            onClick={onClickSearch}
          >
            Search
          </button> */}
        </form>
        <div className="collapse navbar-collapse nav-items">
          <ul className="navbar-nav ml-auto">
            {!user ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    {/* <button>Login</button> */}
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
