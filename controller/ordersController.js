const {
  sendErrorResponse,
  sendSuccessResponse
} = require("../helpers/utility");
const {
    createOrderDAO,
    updateOrderDAO
  } = require("../dao/ordersDAO");

const createOrder = async (req, res) => {
  try {
    const orderData = {
      title: req.body.title,
      bookingDate: req.body.bookingDate,
      customer: req.body.customer,
      address: req.body.address,
      uid: req.body.uid
    };
    const response = await createOrderDAO(orderData);
    if(!response.success) {
        return sendErrorResponse(res, {}, response, 500);
    }
    return sendSuccessResponse(res, response.data, "Order Added Successfully");
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
    const response = await updateOrderDAO(orderId, updateData);
    if(!response.success) {
        return sendErrorResponse(res, {}, response.error, 500);
    }
    return sendSuccessResponse(res, response.data, "Order Updated Successfully");
  } catch (error) {
    return sendErrorResponse(res, {}, "Unable to update order");
  }
};
module.exports = {
  createOrder,
  updateOrder
};
