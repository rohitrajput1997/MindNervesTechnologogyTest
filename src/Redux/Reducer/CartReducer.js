import {GET_CART_DATA} from "../Action/Types"

import item from "../../Views/item.json"

const initialState = {
    cartItem: item
  };
  
  export default function CartReducer(state = initialState, action) {
    switch (action.type) {
      case GET_CART_DATA:
        return {
          ...state,
          cartItem: action.payload,
        };
      default:
        return state;
    }
  }
 