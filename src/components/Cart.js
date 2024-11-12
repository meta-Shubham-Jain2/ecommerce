import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
  clearCart,
} from "../redux/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  // Calculate total price
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="container my-4">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <ul className="list-group">
            {cartItems.map((item) => (
              <li key={item.id} className="list-group-item">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <img
                      src={item.image}
                      alt={item.title}
                      className="item-img"
                    />
                  </div>
                  <div className="item-title-price">
                    <h5>{item.title}</h5>
                    <p>Price: ${item.price}</p>
                  </div>
                  <div>
                    {/* Increment/Decrement Buttons */}
                    <button
                      className="btn btn-sm btn-info"
                      onClick={() => dispatch(incrementQuantity(item.id))}
                    >
                      +
                    </button>
                    <span className="mx-2">{item.quantity}</span>
                    <button
                      className="btn btn-sm btn-warning"
                      onClick={() => dispatch(decrementQuantity(item.id))}
                    >
                      -
                    </button>
                    <button
                      className="btn btn-sm btn-danger ml-2"
                      onClick={() => dispatch(removeFromCart(item.id))}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-3">
            <strong>Total Price: ${totalPrice.toFixed(2)}</strong>
          </div>
          <button
            className="btn btn-danger mt-3"
            onClick={() => dispatch(clearCart())}
          >
            Clear Cart
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
