const {
  sendErrorResponse,
  sendSuccessResponse
} = require("../helpers/utility");
const { db } = require("../config/firebase");

const createOrder = async (req, res) => {
  try {
    const orderData = {
      title: req.body.title,
      bookingDate: req.body.bookingDate,
      customer: req.body.customer,
      address: req.body.address
    };
    const docRef = await db.collection("orders").add(orderData);
    let data = {};
    const doc = await docRef.get();
    if (doc.exists) {
      data = doc.data();
    }
    return sendSuccessResponse(res, data, "Order Added Successfully");
  } catch (error) {
    return sendErrorResponse(res, {}, "Unable to create order");
  }
};

const updateOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    let updateData = {};
    if (req.body.title) {
      updateData.title = req.body.title;
    }
    if (req.body.bookingDate) {
      updateData.bookingDate = req.body.bookingDate;
    }
    const order = db.collection("orders").doc(orderId);
    let data = {};
    await order.update(updateData);
    return sendSuccessResponse(res, data, "Order Updated Successfully");
  } catch (error) {
    return sendErrorResponse(res, {}, "Unable to update order");
  }
};
module.exports = {
  createOrder,
  updateOrder
};
