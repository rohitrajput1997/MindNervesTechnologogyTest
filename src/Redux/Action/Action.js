import SessionStorage from "../../Common/SessionStorage";
import { MANAGE_CART_DATA } from "./Types";

export const manageCartItem = (value) => {
  return async (dispatch) => {
    SessionStorage.setUser(value)
    
    dispatch(manageCartAction(value));
  };
};

const manageCartAction = (payload) => {
  return {
    type: MANAGE_CART_DATA,
    payload: payload,
  };
};

export default manageCartItem;
