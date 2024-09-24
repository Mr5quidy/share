import { useState, useEffect } from "react";
import CartProduct from "../cart-product/CartProduct";

import "./Style.css";
import "./Shadow.css";
import "./Cart.css";

function Cart() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const selectedProducts =
      JSON.parse(localStorage.getItem("selected_products")) || [];
    setProducts(selectedProducts);
  }, []);

  const addItem = (product) => {
    const updatedProducts = products.map((item) => {
      if (item.id === product.id) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setProducts(updatedProducts);
    localStorage.setItem("selected_products", JSON.stringify(updatedProducts));
  };

  const removeItem = (product) => {
    const updatedProducts = products
      .map((item) => {
        if (item.id === product.id && item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      })
      .filter((item) => item.quantity > 0); // Remove items with 0 quantity
    setProducts(updatedProducts);
    localStorage.setItem("selected_products", JSON.stringify(updatedProducts));
  };

  const deleteItem = (product) => {
    const updatedProducts = products.filter((item) => item.id !== product.id);
    setProducts(updatedProducts);
    localStorage.setItem("selected_products", JSON.stringify(updatedProducts));
  };

  const calculateTotalPrice = () => {
    return products.reduce((total, product) => {
      return total + product.price * product.quantity;
    }, 0);
  };

  const buyMiddle = () => {
    return products.map((product, index) => (
      <CartProduct
        cart={product}
        key={index}
        removeItem={removeItem}
        addItem={addItem}
        deleteItem={deleteItem}
      />
    ));
  };

  return (
    <>
      <div className="shadow"></div>
      <div className="buy-cart">
        <div className="items-cart">
          <div className="top">
            <div className="left">Shopping cart</div>
            <div className="right"></div>
          </div>
          <div className="buy-middle">{buyMiddle()}</div>
          <div id="back-main" className="bottom">
            <span className="material-symbols-outlined">◀ </span>Back to shop
          </div>
        </div>
        <div className="summary">
          <div className="top">Summary</div>
          <div className="middle">
            <div className="items">
              <div className="summary-total-items">
                Total Items: {products.length}
              </div>
              <div className="summary-total-items-price">
                Total Price: ${calculateTotalPrice().toFixed(2)}
              </div>
            </div>
            <div className="shipping">
              Shipping
              <form>
                <select name="delivery" id="delivery-options">
                  <option value="5">Standard Delivery: $5</option>
                  <option value="10">Express Delivery: $10</option>
                  <option value="20">Super Fast Delivery: $20</option>
                </select>
              </form>
            </div>
            <div className="discount-code">
              Discount code
              <form>
                <input type="text" />
              </form>
            </div>
            <div className="bottom">
              <div className="total">
                <div className="total-price">TOTAL PRICE</div>
                <div className="total-delivery">
                  ${(calculateTotalPrice() + 5).toFixed(2)}
                </div>
              </div>
              <div className="buy-button">BUY</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;
