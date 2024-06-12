const express = require('express');
require('dotenv').config();
const morgan = require('morgan');
const cors = require('cors');
const winston = require('./config/winston');
const authRoutes = require('./routes/userRoutes');
const pdfRoutes = require('./routes/pdfRoutes');
const DnConnection = require('./config/DbConnection');

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('combined', { stream: winston.stream }));
app.use("/uploads", express.static("uploads"));

DnConnection();

app.use('/api/auth', authRoutes);
app.use('/api/pdf', pdfRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
