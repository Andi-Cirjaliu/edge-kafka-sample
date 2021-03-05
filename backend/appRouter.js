const express = require('express');
const controller = require('./appController');

const router = express.Router();

router.get('/api/msg', controller.getMessages);

router.post('/api/msg', controller.sendMessage);

router.delete('/api/msg', controller.clearMessages);

module.exports = router;