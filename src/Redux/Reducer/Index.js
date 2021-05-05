/** @format */

import { combineReducers } from "redux";
import CartReducer from "./CartReducer";
import ManageCart from "./ManageCartReducer";

export default combineReducers({
  cartData: CartReducer,
  manageCart:ManageCart
});
