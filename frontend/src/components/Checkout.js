import React, { useContext, useState } from "react";
import { CartContext } from "./CartContext";
import PlaceOrder from "./PlaceOrder";

const Checkout = () => {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);
  const [placeOrder, setPlaceOrder] = useState(false);
  const totalCartPrice = cart.reduce(
    (total, product) => total + JSON.parse(product.price),
    0
  );
  const cardUi = cart.map((product) => (
    <div key={product.id} className="checkout-item">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="checkout-image"
      />
      <div>
        <p>{product.name}</p>
        <p>Price: ${product.price}</p>
        <button className="remove-btn" onClick={() => removeFromCart(product.id)}>Remove</button>
      </div>
    </div>
  ));
  return (
    <div>
      <h1>Checkout</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          {cardUi}
          <p>Total: ${totalCartPrice}</p>
          <button className="cart-btn" onClick={clearCart}>Clear Cart</button>
          <button className="place-btn" onClick={setPlaceOrder}> Place Order</button>
        </div>
      )}
      {placeOrder && (
        <PlaceOrder cardUi={cardUi} setPlaceOrder={setPlaceOrder} />
      )}
    </div>
  );
};

export default Checkout;
