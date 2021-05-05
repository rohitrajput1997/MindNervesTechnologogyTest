import React from "react";
import { connect } from "react-redux";
import manageCartItem from "../Redux/Action/Action";
import items from "./item.json";


function ShoppingModal(props) {
  const storeData=props.cartData.cartItem
  let sessionStorageData = props.manageCart.manageItem;
  const [cartData, setCartData] = React.useState([]);
  React.useEffect(() => {
    setCartData(sessionStorageData);
  }, [sessionStorageData]);

  const [sessionItem, setSessionItem] = React.useState(null);
  React.useEffect(() => {
    handleCartItem();
  }, [props]);

  const handleCartItem = () => {
    let sessionData = props.manageCart.manageItem
      ? props.manageCart.manageItem
      : null;
    let data =
      sessionData !== null
        ? sessionData.reduce(function (a, b) {
            return a + b.price;
          }, 0)
        : null;
    setSessionItem(data);
  };

  const handleRemoveItem = (value) => {
    const values = [...cartData];
    values.splice(
      values.findIndex((data) => data.name === value),
      1
    );
    setCartData(values);
    props.dispatch( manageCartItem(values))
    handleCartItem();
  };

  const handleUpadateQuantity = (value) => {
    if (value[1] !== 1) {
      handleUpadateQuantityItem(value[0], value[1], value[2]);
    } else {
      handleUpadateQuantityItem(value[0], value[1], value[2]);
    }
  };

  const handleUpadateQuantityItem = (value, action) => {
    const values = [...cartData];
    if (action === 1) {
      values.find((element) => element.name === value).quantity += 1;
      values.find((element) => element.name === value).price += items.find(
        (element) => element.name === value
      ).price;
    } else {
      values.find((element) => element.name === value).quantity -= 1;
      values.find((element) => element.name === value).price -= items.find(
        (element) => element.name === value
      ).price;
    }

    setCartData(values);
    props.dispatch( manageCartItem(values))
    handleCartItem();
  };

  return (
    <>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Shopping Cart{" "}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-mdb-dismiss="modal"
                aria-label="Close"
                onClick={props.handleParentNav}
              ></button>
            </div>
            <div className="modal-body">
              <table className="show-cart table">
                {cartData !== null ? (
                  cartData.map((item, index) => (
                    <tr key={index}>
                      <td>{item.name}</td>
                      <td>
                        (
                        {
                          storeData.filter((data) => data.name === item.name)[0]
                            .price
                        }
                        )
                      </td>
                      <td>
                        <div className="input-group">
                          <button
                            size="small"
                            className="minus-item input-group-addon btn btn-danger"
                            onClick={handleUpadateQuantity.bind(this, [
                              item.name,
                              0,
                              item.price,
                            ])}
                            disabled={item.quantity===0}
                          >
                            -
                          </button>
                          <p className="mx-3 text-center align-center">
                            {item.quantity}
                          </p>
                          <button
                            className="minus-item input-group-addon btn btn-primary"
                            onClick={handleUpadateQuantity.bind(this, [
                              item.name,
                              1,
                              item.price,
                            ])}
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <div>
                        <td>
                          <button
                            className="delete-item btn btn-danger"
                            onClick={handleRemoveItem.bind(this, item.name)}
                           

                          >
                            X
                          </button>
                        </td>
                      </div>

                      <td>{parseFloat(item.price)}</td>
                    </tr>
                  ))
                ) : (
                  <h5>No Data Found</h5>
                )}
              </table>
              <div>
                Total price: $<span className="total-cart">{sessionItem}</span>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-mdb-dismiss="modal"
                onClick={props.handleParentNav}
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Order Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

 const mapStateToProps=(state)=>({
  cartData:state.cartData,
  manageCart:state.manageCart
})

export default connect(mapStateToProps)(ShoppingModal);
