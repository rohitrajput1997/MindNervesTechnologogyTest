import React from "react";
import { connect } from "react-redux";
import SessionStorage from "../Common/SessionStorage";
import manageCartItem from "../Redux/Action/Action";
import ShoppingModal from "./ShoppingModal";
function ShoppingCart(props) {
 
  const [sessionItem, setSessionItem] = React.useState(null);
  React.useEffect(() => {
    handleCartItem();
  }, [props]);

  const handleCartItem = () => {
 
    let sessionData = props.manageCart.manageItem.length!==0
      ? props.manageCart.manageItem
      : null;
    let data =
      sessionData !== null
        ? sessionData.reduce(function (a, b) {
            return a + b.quantity;
          }, 0)
        : null;
    setSessionItem(data);
  };
  const handleRemoveItem = () => {

    props.dispatch(manageCartItem([]))
    SessionStorage.removeUser()
    handleCartItem();
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <div className="row">
            <div className="col">
              <button
                type="button"
                className="btn btn-primary"
                data-mdb-toggle="modal"
                data-mdb-target="#exampleModal"
              >
                Cart (<span className="total-count">{sessionItem}</span>)
              </button>
              <button
                className="clear-cart btn btn-danger"
                onClick={handleRemoveItem}
              >
                Clear Cart
              </button>
              <ShoppingModal handleParentNav={handleCartItem} />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
const mapStateToProps=(state)=>({
 
  manageCart:state.manageCart
})

export default connect(mapStateToProps)(ShoppingCart);
