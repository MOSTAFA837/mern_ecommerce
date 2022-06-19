export const menuDrawerReducer = (state = false, action) => {
  switch (action.type) {
    case "SET_MENU_VISIBLE":
      return action.payload;

    default:
      return state;
  }
};
