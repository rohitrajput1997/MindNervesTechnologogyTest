/** @format */

import React, { Fragment } from "react";
import { Provider } from "react-redux";
import store from "./store";

import ShoppingCart from "./Views/ShoppingCart";

function App() {

  return <Provider store={store}><ShoppingCart /></Provider>;
}

export default App;
