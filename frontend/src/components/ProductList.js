import React, { useState, useContext, useEffect } from "react";
import { CartContext } from "./CartContext";
import { Link, json,useNavigate } from "react-router-dom";
import Modal from "react-modal";
const ProductList = () => {
  const { cart, addToCart, clearCart } = useContext(CartContext);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const auth = localStorage.getItem("token");
  const navigate = useNavigate();
  useEffect(() => {
    getProductDetails();
  }, []);
  let getProductDetails
try {
  // const getProductDetails = async () => {
  getProductDetails = async () => {
     let result = await fetch("http://localhost:3000/api/products", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: JSON.parse(auth),
      },
    });
  result = await result.json();
  setProducts(result);
};
} catch (error) {
 return error
}
  const categories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  const handleBuyNow = (product) => {
    clearCart();
    addToCart(product);
    setIsModalOpen(true);
  };
  const totalCartPrice = cart.reduce(
    (total, product) => total + JSON.parse(product.price),
    0
  );

  return (
    <div>
      <h1>Product List</h1>
      <div className="category-filter">
        {categories.map((category) => (
          <button
            key={category}
            className={selectedCategory === category ? "active" : ""}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="product-list">
        {filteredProducts.map((product) => (
          <div key={product.id} className="product-item">
            <img
              style={{
                textDecoration: "none",
                border: "none",
                outline: "none",
              }}
              src={product.imageUrl}
              alt={product.name}
              className="product-image"
            />
            <h2>{product.name}</h2>
            <p>Price: ${product.price}</p>
            <p>Category: {product.category}</p>
            <button
              className="add-to-cart-btn"
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>
            <button
              className="buy-now-btn"
              onClick={() => handleBuyNow(product)}
            >
              Buy Now
            </button>
          </div>
        ))}
      </div>
      <button
        className="view-cart"
        style={{
          position: "fixed",
          bottom: "10%",
          right: "1%",
          background: "#fb641b",
          boxShadow: "0 1px 2px 0 rgba(0, 0, 0, .2)",
          color: "#fff",
          padding: "1% 2%",
          borderRadius: "20%",
          float: "right",
        }}
        onClick={() => setIsModalOpen(true)}
      >
        View Cart
      </button>
      <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
        <h2 className="cart-list cart">Cart</h2>
        {cart.length === 0 ? (
          <p className="cart-list">Your cart is empty</p>
        ) : (
          <div>
            {cart.map((product) => (
              <div key={product.id}>
                <p>
                  {product.name} - ${product.price}
                </p>
              </div>
            ))}
            <p>Total: ${totalCartPrice}</p>
            <Link to="/checkout">
              <button onClick={() => setIsModalOpen(false)}>
                Go to Checkout
              </button>
            </Link>
          </div>
        )}
        <button className="cart-list" onClick={() => setIsModalOpen(false)}>
          Close
        </button>
      </Modal>
    </div>
  );
};

export default ProductList;
