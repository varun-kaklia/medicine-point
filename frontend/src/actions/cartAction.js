export const addToCart = (medicine, quantity) => (dispatch, getState) => {
  var cartItem = {
    medicine:medicine,
    name: medicine.name,
    _id: medicine._id,
    code: medicine.code,
    stock:medicine.stock,
    image: medicine.image,
    pointsPage: medicine.pointsPage,
    quantity: Number(quantity),
    points: medicine.points,
    pointsPrice: medicine.points * quantity,
    Rate: medicine.Rate,
    price: medicine.Rate * quantity,
  };
  
    if (cartItem.quantity < 1) {
      dispatch({ type: "DELETE_FROM_CART", payload: medicine });
    } else {
      dispatch({ type: "ADD_TO_CART", payload: cartItem });
      localStorage.setItem(
        "cartItems",
        JSON.stringify(getState().cartReducer.cartItems)
      );
    }
};

export const deleteFromCart = (medicine) => (dispatch, getState) => {
  dispatch({ type: "DELETE_FROM_CART", payload: medicine });
  const cartItems = getState().cartReducer.cartItems;
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
};

export const flushFromCart = (medicine) => (dispatch, getState) => {
  const cartItems = getState().cartReducer.cartItems;
  localStorage.removeItem("cartItems", JSON.stringify(cartItems));
};