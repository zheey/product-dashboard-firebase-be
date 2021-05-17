const {
    handleError
  } = require("../helpers/utility");
  const { db } = require("../config/firebase");
  
  const createOrderDAO = async (data) => {
    try {
      const docRef = await db.collection("orders").add(data);
      let response = {};
      const doc = await docRef.get();
      if (doc.exists) {
        response = doc.data();
      }
      return {success: true, data: response}
    } catch (error) {
      return handleError(error);
    }
  };
  
  const updateOrderDAO = async (orderId, data) => {
    try {
      const order = await db.collection("orders").doc(orderId);
      await order.update(data);
      const response = await db.collection("orders").doc(orderId).get();
      return {success: true, data: response.data()}
    } catch (error) {
        return handleError(error);
    }
  };

  module.exports = {
    createOrderDAO,
    updateOrderDAO
  };
  