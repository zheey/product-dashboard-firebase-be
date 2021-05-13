const admin =  require("firebase-admin");
const serviceAccount = require("./config/serviceAccountKey.json");
const { sendErrorResponse } = require("../helpers/utility");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://construyo-coding-challenge.firebaseio.com"
});


const authenticateUser = (req, res) => {
    const token = req.headers.token;
    if (token) {
        admin.auth().verifyIdToken(token)
          .then(() => {
            next()
          }).catch(() => {
            sendErrorResponse(res, {}, 'Unauthorized', 401);
          });
      } else {
        sendErrorResponse(res, {}, 'Unauthorized', 401);
      }
};

module.exports = {
    authenticateUser
};