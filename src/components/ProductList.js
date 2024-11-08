import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { fetchProducts } from "../api/api";
import { useSelector } from "react-redux";
import { selectSearch } from "../redux/searchSlice";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const searchData = useSelector((state) => state.search.search);
  const searchData = useSelector(selectSearch)
  console.log('====search',searchData)

  useEffect(() => {
    fetchProducts()
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load products");
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  // .filter((ele) => {
  //   if (searchData.length === 0) {
  //     return ele;
  //   } else {
  //     return ele.name
  //       .toLowerCase()
  //       .includes(searchData.toLowerCase());
  //   }
  // })
  return (
    <>
      <div className="container">
        <h1>All Products</h1>
        <div className="row">
          {products
          .filter((product)=>{
              if(searchData.length === 0){
                return product;
              }else{
                return product.title
                .toLowerCase()
                .includes(searchData.toLowerCase())
              }
          })
          .map((product) => (
            <div className="col-md-4" key={product.id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductList;
