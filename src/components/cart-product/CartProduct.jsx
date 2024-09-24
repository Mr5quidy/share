function CartProduct({ cart, removeItem, addItem, deleteItem }) {
  return (
    <>
      <div className="row-items">
        <div className="item">
          <img src={cart.image} alt={cart.title} />
          <div className="item-about">
            {/* Display both product title and name */}
            <div className="name">
              <strong>{cart.title}</strong> <br /> {/* Product title */}
              {cart.brand} {/* Product brand */}
            </div>
          </div>
        </div>
        <div className="item-quantity">
          <span
            onClick={() => removeItem(cart)}
            className="material-symbols-outlined item-remove"
          >
            remove
          </span>
          <div className="item-selected-quantity">{cart.quantity}</div>
          <span
            onClick={() => addItem(cart)}
            className="material-symbols-outlined item-add"
          >
            add
          </span>
        </div>
        <div className="item-price-remove">
          <div className="item-price">${cart.price}</div>
          <div onClick={() => deleteItem(cart)} className="item-delete">
            x
          </div>
        </div>
      </div>
    </>
  );
}

export default CartProduct;
