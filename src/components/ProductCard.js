import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
} from "../redux/cartSlice";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  // Get cart items from Redux
  const cartItems = useSelector((state) => state.cart.items);
  const cartItem = cartItems.find((item) => item.id === product.id);

  // Handle adding product to the cart
  const handleAddToCart = () => {
    dispatch(addToCart(product)); // Add product to cart
  };

  // Handle incrementing quantity
  const handleIncrement = () => {
    dispatch(incrementQuantity(product.id)); // Increment quantity based on product ID
  };

  // Handle decrementing quantity
  const handleDecrement = () => {
    dispatch(decrementQuantity(product.id)); // Decrement quantity based on product ID
  };

  // Handle removing product from the cart
  const handleRemoveFromCart = () => {
    dispatch(removeFromCart(product.id)); // Remove product based on product ID
  };

  return (
    <>
      <div className="card mb-4 shadow-sm">
        <Link to={`/product/${product.id}`}>
          {" "}
          <img
            src={product.image}
            className="card-img-top"
            alt={product.title}
          />{" "}
        </Link>
        <div className="card-body">
          <h5 className="card-title">{product.title.substring(0, 40)}</h5>
          <div className="card-price">
            <p className="card-text">Rs.{product.price}</p>

            {/* Check if product is in the cart */}
            {!cartItem ? (
              <button
                className="btn btn-primary button-size"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
            ) : (
              <div>
                {/* Quantity control */}
                <div className="d-flex justify-content-between align-items-right">
                  <div className="d-flex">
                    <button
                      className="btn btn-sm btn-info"
                      onClick={handleIncrement}
                    >
                      +
                    </button>
                    <span className="mx-2">{cartItem.quantity}</span>
                    <button
                      className="btn btn-sm btn-warning"
                      onClick={handleDecrement}
                    >
                      -
                    </button>
                  </div>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={handleRemoveFromCart}
                  >
                    Remove
                  </button>
                </div>
              </div>
            )}
          </div>

          <Link
            to={`/product/${product.id}`}
            className="btn btn-secondary btn-sm w-100 mt-2"
          >
            View Details
          </Link>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
