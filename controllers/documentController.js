const Document = require('../models/Document');
const Client = require('../models/Client');
const upload = require('../utils/upload');

const uploadDocument = async (req, res, next) => {
    try {
        const { clientId, description, category } = req.body;

        if (!req.file) {
            return res.status(400).json({ message: 'Please upload a file' });
        }

        const client = await Client.findOne({
            _id: clientId,
            caId: req.user.id
        });

        if (!client) {
            return res.status(404).json({ message: 'Client not found' });
        }

        const document = await Document.create({
            filename: req.file.filename,
            originalname: req.file.originalname,
            path: req.file.path,
            size: req.file.size,
            mimetype: req.file.mimetype,
            clientId,
            caId: req.user.id,
            description,
            category
        });

        res.status(201).json(document);
    } catch (error) {
        next(error);
    }
};

const getDocuments = async (req, res, next) => {
    try {
        const { clientId } = req.query;
        let query = { caId: req.user.id };

        if (clientId) {
            query.clientId = clientId;
        }

        const documents = await Document.find(query).populate('clientId', 'name email');
        res.json(documents);
    } catch (error) {
        next(error);
    }
};

const getDocument = async (req, res, next) => {
    try {
        const document = await Document.findOne({
            _id: req.params.id,
            caId: req.user.id
        }).populate('clientId', 'name email');

        if (!document) {
            return res.status(404).json({ message: 'Document not found' });
        }

        res.json(document);
    } catch (error) {
        next(error);
    }
};

const updateDocument = async (req, res, next) => {
    try {
        const { description, category } = req.body;

        const document = await Document.findOneAndUpdate(
            { _id: req.params.id, caId: req.user.id },
            { description, category },
            { new: true }
        ).populate('clientId', 'name email');

        if (!document) {
            return res.status(404).json({ message: 'Document not found' });
        }

        res.json(document);
    } catch (error) {
        next(error);
    }
};

const deleteDocument = async (req, res, next) => {
    try {
        const document = await Document.findOneAndDelete({
            _id: req.params.id,
            caId: req.user.id
        });

        if (!document) {
            return res.status(404).json({ message: 'Document not found' });
        }

        res.json({ message: 'Document removed' });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    uploadDocument,
    getDocuments,
    getDocument,
    updateDocument,
    deleteDocument
};