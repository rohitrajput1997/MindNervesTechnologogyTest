/** @format */

var storage = window.sessionStorage;

const SessionStorage = () => {
  return {
    setUser(obj) {
      storage.setItem("cart", JSON.stringify(obj));
    },
    getUser() {
      return JSON.parse(storage.getItem("cart"));
    },
    removeUser() {
      storage.removeItem("cart");
    },
  };
};

export default SessionStorage();
