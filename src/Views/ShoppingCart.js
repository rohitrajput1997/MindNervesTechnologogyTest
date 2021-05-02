/** @format */

import React from "react";
import item from "./item.json";
import ShoppingNavbar from "./ShoppingNavbar";

function ShoppingCart() {
  const [sessionData,setSessionData]=React.useState([])
  const handleAddItem = (value) => {
    let data = sessionStorage.getItem("cart");
    let sessionDataArray = JSON.parse(data);

    if (data === null) {
      sessionStorage.setItem("cart", JSON.stringify([value]));
      setSessionData(value)
    } else {
      let condtion = sessionDataArray.find(
        (element) => element.name === value.name
      );

      if (condtion === undefined) {
        let appendArr = [...sessionDataArray, value];
        sessionStorage.setItem("cart", JSON.stringify(appendArr));
        setSessionData(appendArr)
      } else {
        sessionDataArray.find(
          (element) => element.name === value.name
        ).quantity += value.quantity;
        sessionDataArray.find((element) => element.name === value.name).price +=
          value.price;

        let appendArr = [...sessionDataArray];
        sessionStorage.setItem("cart", JSON.stringify(appendArr));
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
          {item.length !== 0 ? (
            item.map((item, index) => {
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

export default ShoppingCart;
