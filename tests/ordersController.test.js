const chai = require("chai");
const expect = chai.expect;
const faker = require("faker");
const { createOrderDAO, updateOrderDAO } = require("../dao/ordersDAO");

describe("Orders", function() {
  const stubValue = {
    uid: faker.random.uuid(),
    address: {
        city: "Berlin",
        country: "Germany",
        street: "Wriezener Str. 12",
        zip: "13055"
    },
    bookingDate: 1554284950000,
    customer: {
        email: "emad.alam@construyo.de",
        name: "Emad Alam",
        phone: "015252098067"
    },
    title   : "Test Order 1",
  };

  const updateValue = {
    bookingDate: 1664284950001,
    title : "Test Order 2 update",
  };
  let createResponse = {};
   describe("createOrder", function() {
    it("should create order", async function() {
      createResponse = await createOrderDAO(stubValue);
      const order = createResponse.data;
      expect(order.uid).to.equal(stubValue.uid);
      expect(order.title).to.equal(stubValue.title);
      expect(order.address).to.eql(stubValue.address);
      expect(order.bookingDate).to.equal(stubValue.bookingDate);
      expect(order.customer).to.eql(stubValue.customer);
    });
  });
  describe("updateOrder", function() {
    it("should update order", async function() {
      const orderId = "g7FdoIZl6QGPd9HHLPoL";
      const response = await updateOrderDAO(orderId, updateValue);
      const order = response.data;
      expect(order.title).to.equal(updateValue.title);
      expect(order.bookingDate).to.equal(updateValue.bookingDate);
    });
  });
});