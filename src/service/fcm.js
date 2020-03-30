const firebaseAdmin = require('firebase-admin');
const serviceAccount = require('../config/watchful-lotus-244316-af8f646cf85f');

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
  databaseURL: 'https://watchful-lotus-244316.firebaseio.com'
});
  
module.exports = {
  publishFcm: (topic, message) => {
    const dataMessage = {
      data: {
        content: message
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

    firebaseAdmin.messaging().send(data)
      .then((response) => {
        // console.log(`Message "${dataMessage.data.content}" was sent to the topic ${dataMessage.topic}`);
        const table = {
          "Region": "*",
          "Topic": dataMessage.topic,
          "Message Id": response
      };
      console.table(table);
      })
      .catch((error) => {
        console.log('Error sending message:', error);
      });
  }
}