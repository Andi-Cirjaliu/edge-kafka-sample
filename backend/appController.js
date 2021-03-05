const kafka = require('./kafka');

const sendMessage = (req, res, next) => {
    const msg = req.body.message || 'Test message';
    console.log('Send message: ', msg);

    if ( msg ) {
        kafka.sendMessage(msg);
    }

    return res.send('Message was successfully sent.');
}

const getMessages = (req, res, next) => {
    const messages = kafka.getMessages();
    return res.json( messages );
}

const clearMessages = (req, res, next) => {
    const messages = kafka.clearMessages();
    return res.json( messages );
}

module.exports = {
    sendMessage,
    getMessages,
    clearMessages
}