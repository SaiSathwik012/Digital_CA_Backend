const express = require('express');
const router = express.Router();
const documentController = require('../controllers/documentController');
const upload = require('../utils/upload');
const { protect, caRole } = require('../middlewares/auth');

router.use(protect, caRole);

router.route('/')
    .get(documentController.getDocuments)
    .post(upload.single('file'), documentController.uploadDocument);

router.route('/:id')
    .get(documentController.getDocument)
    .put(documentController.updateDocument)
    .delete(documentController.deleteDocument);

module.exports = router;