const express = require('express');
const router = express.Router();
const alertController = require('../controllers/alertController');
const { protect, caRole } = require('../middlewares/auth');

router.use(protect, caRole);

router.route('/')
    .get(alertController.getAlerts)
    .post(alertController.createAlert);

router.route('/:id')
    .get(alertController.getAlert)
    .put(alertController.updateAlert)
    .delete(alertController.deleteAlert);

module.exports = router;