const Invoice = require('../models/Invoice');
const Client = require('../models/Client');

const generateInvoiceNumber = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const random = Math.floor(1000 + Math.random() * 9000);
    return `INV-${year}${month}${day}-${random}`;
};

const getInvoices = async (req, res, next) => {
    try {
        const { clientId, status } = req.query;
        let query = { caId: req.user.id };

        if (clientId) {
            query.clientId = clientId;
        }

        if (status) {
            query.status = status;
        }

        const invoices = await Invoice.find(query).populate('clientId', 'name email');
        res.json(invoices);
    } catch (error) {
        next(error);
    }
};

const getInvoice = async (req, res, next) => {
    try {
        const invoice = await Invoice.findOne({
            _id: req.params.id,
            caId: req.user.id
        }).populate('clientId', 'name email');

        if (!invoice) {
            return res.status(404).json({ message: 'Invoice not found' });
        }

        res.json(invoice);
    } catch (error) {
        next(error);
    }
};

const createInvoice = async (req, res, next) => {
    try {
        const { clientId, date, dueDate, items, tax, notes } = req.body;

        const client = await Client.findOne({
            _id: clientId,
            caId: req.user.id
        });

        if (!client) {
            return res.status(404).json({ message: 'Client not found' });
        }

        const subtotal = items.reduce((sum, item) => sum + item.amount, 0);
        const total = subtotal + (subtotal * (tax / 100));

        const invoice = await Invoice.create({
            invoiceNumber: generateInvoiceNumber(),
            clientId,
            caId: req.user.id,
            date,
            dueDate,
            items,
            subtotal,
            tax,
            total,
            notes,
            status: 'draft'
        });

        res.status(201).json(invoice);
    } catch (error) {
        next(error);
    }
};

const updateInvoice = async (req, res, next) => {
    try {
        const { date, dueDate, items, tax, status, notes } = req.body;

        const invoice = await Invoice.findOne({
            _id: req.params.id,
            caId: req.user.id
        });

        if (!invoice) {
            return res.status(404).json({ message: 'Invoice not found' });
        }

        const subtotal = items.reduce((sum, item) => sum + item.amount, 0);
        const total = subtotal + (subtotal * (tax / 100));

        invoice.date = date;
        invoice.dueDate = dueDate;
        invoice.items = items;
        invoice.subtotal = subtotal;
        invoice.tax = tax;
        invoice.total = total;
        invoice.status = status;
        invoice.notes = notes;

        await invoice.save();

        res.json(invoice);
    } catch (error) {
        next(error);
    }
};

const deleteInvoice = async (req, res, next) => {
    try {
        const invoice = await Invoice.findOneAndDelete({
            _id: req.params.id,
            caId: req.user.id
        });

        if (!invoice) {
            return res.status(404).json({ message: 'Invoice not found' });
        }

        res.json({ message: 'Invoice removed' });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getInvoices,
    getInvoice,
    createInvoice,
    updateInvoice,
    deleteInvoice
};