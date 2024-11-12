import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProductById } from "../api/api";
import { useDispatch, useSelector } from "react-redux";
import { ShimmerContentBlock } from "react-shimmer-effects";
import {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
} from "../redux/cartSlice";

const ProductDetail = () => {
  const { id } = useParams(); // Get the product id from the URL
  const [product, setProduct] = useState({});
  console.log("====>IDDD",id)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);
  // console.log("===item",item)
  console.log("====ID",id)
  const cartItem = cartItems.find((item) => item.id === product.id);

  useEffect(() => {
    fetchProductById(id)
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load product details");
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart(product));
    }
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

  if (loading) return <div>
    <ShimmerContentBlock
        title
        text
        cta
        thumbnailWidth={370}
        thumbnailHeight={370}
      />
  </div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container my-4">
      {product && (
        <div className="row">
          <div className="col-md-6">
            <img
              src={product.image}
              alt={product.title}
              className="img-fluid"
            />
          </div>
          <div className="col-md-6">
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <p>
              <strong>Price:</strong> ${product.price}
            </p>
            {/* <button className="btn btn-primary" onClick={handleAddToCart}>
              Add to Cart
            </button> */}
            {!cartItem ? (
              <button
                className="btn btn-primary w-100"
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
        </div>
      )}
    </div>
  );
};

export default ProductDetail;