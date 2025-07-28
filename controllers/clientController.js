const Client = require('../models/Client');

const getClients = async (req, res, next) => {
    try {
        const clients = await Client.find({ caId: req.user.id });
        res.json(clients);
    } catch (error) {
        next(error);
    }
};

const getClient = async (req, res, next) => {
    try {
        const client = await Client.findOne({
            _id: req.params.id,
            caId: req.user.id
        });

        if (!client) {
            return res.status(404).json({ message: 'Client not found' });
        }

        res.json(client);
    } catch (error) {
        next(error);
    }
};

const createClient = async (req, res, next) => {
    try {
        const { name, email, phone, address, taxId } = req.body;

        const client = await Client.create({
            name,
            email,
            phone,
            address,
            taxId,
            caId: req.user.id
        });

        res.status(201).json(client);
    } catch (error) {
        next(error);
    }
};

const updateClient = async (req, res, next) => {
    try {
        const { name, email, phone, address, taxId } = req.body;

        const client = await Client.findOneAndUpdate(
            { _id: req.params.id, caId: req.user.id },
            { name, email, phone, address, taxId },
            { new: true }
        );

        if (!client) {
            return res.status(404).json({ message: 'Client not found' });
        }

        res.json(client);
    } catch (error) {
        next(error);
    }
};

const deleteClient = async (req, res, next) => {
    try {
        const client = await Client.findOneAndDelete({
            _id: req.params.id,
            caId: req.user.id
        });

        if (!client) {
            return res.status(404).json({ message: 'Client not found' });
        }

        res.json({ message: 'Client removed' });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getClients,
    getClient,
    createClient,
    updateClient,
    deleteClient
};