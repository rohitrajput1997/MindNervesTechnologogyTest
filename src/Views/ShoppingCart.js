/** @format */

import React from "react";
import { connect } from "react-redux";
import SessionStorage from "../Common/SessionStorage";
import manageCartItem from "../Redux/Action/Action"

import ShoppingNavbar from "./ShoppingNavbar";

function ShoppingCart(props) {
 const cartData=props.cartData.cartItem
 const manageCart=props.manageCart.manageItem
  const [sessionData,setSessionData]=React.useState([])
  React.useEffect(()=>{
    let data=SessionStorage.getUser()
   if(data!==null){
    props.dispatch( manageCartItem(data))
    setSessionData(data)
   }
  },[])

  const handleAddItem = (value) => {
    let sessionDataArray = manageCart;
    if (manageCart.length === 0) {
     props.dispatch( manageCartItem([value]))
      setSessionData(value)

    } else {
      let condtion = sessionDataArray.find(
        (element) => element.name === value.name
      );

      if (condtion === undefined) {
        let appendArr = [...sessionDataArray, value];
        props.dispatch( manageCartItem(appendArr))
        setSessionData(appendArr)
      } else {
        sessionDataArray.find(
          (element) => element.name === value.name
        ).quantity += value.quantity;
        sessionDataArray.find((element) => element.name === value.name).price +=
          value.price;
        let appendArr = [...sessionDataArray];
        props.dispatch( manageCartItem(appendArr))
        setSessionData(appendArr)
      }
    }
  };
 

  return (
    <>
      <ShoppingNavbar data={sessionData}  />
      <br />
      <br />

      <div className="container">
        <div className="row">
          {cartData.length !== 0 ? (

            cartData.map((item, index) => {
              return (
                <div className="col" key={index}>
                  <div className="card shadow">
                    <img
                      className="card-img-top"
                      src={item.image}
                      alt={item.image}
                    />
                    <div className="card-body">
                      <h4 className="card-title">{item.name}</h4>
                      <p className="card-text">${item.price}</p>
                      <button
                        className="add-to-cart btn btn-primary"
                        onClick={handleAddItem.bind(this, item)}
                      >
                        Add To cart
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <h2>No Data Found</h2>
          )}
        </div>
      </div>
    </>
  );
}

const mapStateToProps=(state)=>({
  cartData:state.cartData,
  manageCart:state.manageCart
})

export default connect(mapStateToProps)(ShoppingCart);
