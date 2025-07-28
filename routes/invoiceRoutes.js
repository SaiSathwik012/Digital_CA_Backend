const express = require('express');
const router = express.Router();
const invoiceController = require('../controllers/invoiceController');
const { protect, caRole } = require('../middlewares/auth');

router.use(protect, caRole);

router.route('/')
    .get(invoiceController.getInvoices)
    .post(invoiceController.createInvoice);

router.route('/:id')
    .get(invoiceController.getInvoice)
    .put(invoiceController.updateInvoice)
    .delete(invoiceController.deleteInvoice);

module.exports = router;