import { MANAGE_CART_DATA } from "../Action/Types";

const initialState = {
    manageItem: []
  };

export default function ManageCart(state = initialState, action) {
    switch (action.type) {
      case MANAGE_CART_DATA:
        return {
          ...state,
          manageItem: action.payload,
          
        };
      default:
        return state;
    }
  }