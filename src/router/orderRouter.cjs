const express = require("express");
const router = express.Router();

const {createOrder, getOrders, deleteOrder} = require("../controller/orderController.cjs");

router.post('/addorder', createOrder);
router.get('/readorder', getOrders);
router.delete('/deleteorder', deleteOrder);



module.exports = router;