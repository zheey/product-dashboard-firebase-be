const admin =  require("firebase-admin");
const serviceAccount = require("../config/serviceAccountKey.json");
const { firebaseConfig } = require("../config/config");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: firebaseConfig.databaseURL
});
let db = admin.firestore() ;

module.exports = {
    admin,
    db
};