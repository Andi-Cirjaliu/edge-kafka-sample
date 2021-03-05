const kafka = require('kafka-node');

const KAFKA_HOST = process.env.KAFKA_HOST || undefined;
const KAFKA_TOPIC = process.env.KAFKA_TOPIC;
console.log('Kafka host: ', KAFKA_HOST);
console.log('Kafka topics: ', KAFKA_TOPIC); 

let refreshMetadata = false;

const client = new kafka.KafkaClient({kafkaHost : KAFKA_HOST});

// producer
const producer = new kafka.Producer(client);

// conmsumer
let payloads = [{topic: KAFKA_TOPIC}];
const consumer = new kafka.Consumer(client, payloads, {autoCommit: true});
console.log('Kafka consumer payloads: ', payloads);

let messages = [];

producer.on('ready', () => {
    console.log('Kafka is ready to send and receive messages...');
});

producer.on('error', (err) => {
    console.log('An error occured in Kafka client: ', err);
});

consumer.on('message', (message) => {
    console.log('A new message was received: ');
    console.log(message);

    const newMsg = {value: message.value, position: message.offset, date: new Date()};

    messages = [...messages, newMsg];
    console.log('Current messages:');
    console.log(messages);
});

const sendMessage = (msg) => {
  console.log("sending message <", msg, ">");

  const payloads = [{ topic: "my_topic", messages: msg }];

  //refresh metadata
  if (!refreshMetadata) {
    console.log("Refresh metadata...");
    client.refreshMetadata((topics = [KAFKA_TOPIC]), (error) => {
      if (error) {
        return console.log("Refresh metadata failed with error: ", error);
      }

      console.log("Refresh metadata successful.");
      refreshMetadata = true;

      producer.send(payloads, (error, data) => {
        if (error) {
          return console.log(
            "An error occured when sending message <",
            msg,
            ">. error: ",
            error
          );
        }

        console.log("Send message <", msg, "> result:", data);
      });
    });
  } else {
    producer.send(payloads, (error, data) => {
      if (error) {
        return console.log(
          "An error occured when sending message <",
          msg,
          ">. error: ",
          error
        );
      }

      console.log("Send message <", msg, "> result:", data);
    });
  }
}

const getMessages = () => {
    console.log('Getting messages...');
    console.log(messages);

    return messages;
}

const clearMessages = () => {
    console.log('Clear messages...');
    messages = [];

    return messages;
}

module.exports = {
    sendMessage,
    getMessages,
    clearMessages
}





