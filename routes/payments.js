var express = require('express');
var router = express.Router();

const paymentsModal = require('../modals/payments.modal')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
