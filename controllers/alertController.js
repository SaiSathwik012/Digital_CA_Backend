const Alert = require('../models/Alert');
const Client = require('../models/Client');

const getAlerts = async (req, res, next) => {
    try {
        const { clientId, status } = req.query;
        let query = { caId: req.user.id };

        if (clientId) {
            query.clientId = clientId;
        }

        if (status) {
            query.status = status;
        }

        const alerts = await Alert.find(query)
            .populate('clientId', 'name email')
            .sort({ dueDate: 1 });

        res.json(alerts);
    } catch (error) {
        next(error);
    }
};

const getAlert = async (req, res, next) => {
    try {
        const alert = await Alert.findOne({
            _id: req.params.id,
            caId: req.user.id
        }).populate('clientId', 'name email');

        if (!alert) {
            return res.status(404).json({ message: 'Alert not found' });
        }

        res.json(alert);
    } catch (error) {
        next(error);
    }
};

const createAlert = async (req, res, next) => {
    try {
        const { title, description, clientId, dueDate, priority } = req.body;

        const client = await Client.findOne({
            _id: clientId,
            caId: req.user.id
        });

        if (!client) {
            return res.status(404).json({ message: 'Client not found' });
        }

        const alert = await Alert.create({
            title,
            description,
            clientId,
            caId: req.user.id,
            dueDate,
            priority
        });

        res.status(201).json(alert);
    } catch (error) {
        next(error);
    }
};

const updateAlert = async (req, res, next) => {
    try {
        const { title, description, dueDate, priority, status } = req.body;

        const alert = await Alert.findOneAndUpdate(
            { _id: req.params.id, caId: req.user.id },
            { title, description, dueDate, priority, status },
            { new: true }
        ).populate('clientId', 'name email');

        if (!alert) {
            return res.status(404).json({ message: 'Alert not found' });
        }

        res.json(alert);
    } catch (error) {
        next(error);
    }
};

const deleteAlert = async (req, res, next) => {
    try {
        const alert = await Alert.findOneAndDelete({
            _id: req.params.id,
            caId: req.user.id
        });

        if (!alert) {
            return res.status(404).json({ message: 'Alert not found' });
        }

        res.json({ message: 'Alert removed' });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAlerts,
    getAlert,
    createAlert,
    updateAlert,
    deleteAlert
};