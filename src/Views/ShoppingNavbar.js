import React from "react";
import ShoppingModal from "./ShoppingModal";
function ShoppingCart(props) {
  const [sessionItem, setSessionItem] = React.useState(null);
  React.useEffect(() => {
    handleCartItem();
  }, [props]);

  const handleCartItem = () => {
    let sessionData = sessionStorage.getItem("cart")
      ? JSON.parse(sessionStorage.getItem("cart"))
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
    sessionStorage.removeItem("cart");
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
export default ShoppingCart;
