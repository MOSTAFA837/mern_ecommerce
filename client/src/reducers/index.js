import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { searchReducer } from "./searchReducer";
import { cartReducer } from "./cartReducer";
import { drawerReducer } from "./drawerReducer";
import { menuDrawerReducer } from "./menuDrawerReducer";
import { couponReducer } from "./couponReducer";
import { CashODReducer } from "./CashODReducer";

const rootReducer = combineReducers({
  user: userReducer,
  search: searchReducer,
  cart: cartReducer,
  drawer: drawerReducer,
  menuDrawer: menuDrawerReducer,
  coupon: couponReducer,
  COD: CashODReducer,
});

export default rootReducer;
