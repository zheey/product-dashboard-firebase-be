const { admin } = require("../config/firebase");
const { sendErrorResponse } = require("../helpers/utility");

const authenticateUser = (req, res, next) => {
    const token = req.header("Authorization").split(" ")[1];
    if (token) {
        admin.auth().verifyIdToken(token)
          .then(() => {
            next()
          }).catch((error) => {
            sendErrorResponse(res, {}, 'Unauthorized', 401);
          });
      } else {
        sendErrorResponse(res, {}, 'Unauthorized', 401);
      }
};

module.exports = {
    authenticateUser
};