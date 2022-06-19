let initialState = [];

// load cart items from local storage
let cartItems = localStorage.getItem("cart");
if (cartItems) {
  initialState = JSON.parse(cartItems);
} else {
  initialState = [];
}

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return action.payload;

    default:
      return state;
  }
};
