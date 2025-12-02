/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// For cost control, you can set the maximum number of containers that can be
// running at the same time. This helps mitigate the impact of unexpected
// traffic spikes by instead downgrading performance. This limit is a
// per-function limit. You can override the limit for each function using the
// `maxInstances` option in the function's options, e.g.
// `onRequest({ maxInstances: 5 }, (req, res) => { ... })`.
// NOTE: setGlobalOptions does not apply to functions using the v1 API. V1
// functions should each use functions.runWith({ maxInstances: 10 }) instead.
// In the v1 API, each function can only serve one request per container, so
// this will be the maximum concurrent request count.


// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// 1. IMPORT REQUIRED LIBRARIES
const functions = require("firebase-functions"); // <-- Added
const admin = require("firebase-admin"); // <-- Added

const {setGlobalOptions} = require("firebase-functions");
const {onRequest} = require("firebase-functions/https");
const logger = require("firebase-functions/logger");

// 2. INITIALIZE FIREBASE ADMIN SDK <-- Added
admin.initializeApp();

// For cost control...
setGlobalOptions({ maxInstances: 10 });

// exports.helloWorld... (omitted for brevity)

// 3. YOUR CORRECTED FUNCTION DEFINITION
exports.onUserCreate = functions.auth.user().onCreate(async (user) => {
  // Get the Firestore instance
  const db = admin.firestore();

  logger.info(`Creating Firestore document for new user: ${user.uid}`, {
    email: user.email,
  });

  // Create the user document
  await db.collection("users").doc(user.uid).set({
    uid: user.uid,
    name: user.displayName || "",
    email: user.email,
    role: "customer",
    fcmTokens: [],
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  });

  logger.info("User document created successfully.");
});