// Connect Admin SDK
const firebaseAdmin = require("firebase-admin");

const serviceAccount = require("../config/watchful-lotus-244316-af8f646cf85f.json");

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
  databaseURL: "https://watchful-lotus-244316.firebaseio.com"
});
  
function publishToTopic(topic, message) {
  console.log("We are sending: " + message);

  const dataMessage = {
    data: {
      greeting: message
    },
    topic: topic
  };
  
  const notificationMessage = {
    notification: {
      title: 'Greeting',
      body: message
    },
    topic: topic
  };
  
  const data = dataMessage;
  
  // Send a message to devices subscribed to the provided topic.
  firebaseAdmin.messaging().send(data)
    .then((response) => {
      // Response is a message ID string.
      console.log('Successfully sent message:', response);
    })
    .catch((error) => {
      console.log('Error sending message:', error);
    });
}

module.exports = publishToTopic