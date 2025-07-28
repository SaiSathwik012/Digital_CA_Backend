const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');
const { protect, caRole } = require('../middlewares/auth');

router.use(protect, caRole);

router.route('/')
    .get(clientController.getClients)
    .post(clientController.createClient);

router.route('/:id')
    .get(clientController.getClient)
    .put(clientController.updateClient)
    .delete(clientController.deleteClient);

module.exports = router;