const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

dotenv.config();

const authRoutes = require('./routes/authRoutes');


const clientRoutes = require('./routes/clientRoutes');

const documentRoutes = require('./routes/documentRoutes');


const invoiceRoutes = require('./routes/invoiceRoutes');



const alertRoutes = require('./routes/alertRoutes');

const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));


app.use('/api/auth', authRoutes);

app.use('/api/clients', clientRoutes);

app.use('/api/documents', documentRoutes);

app.use('/api/invoices', invoiceRoutes);


app.use('/api/alerts', alertRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));