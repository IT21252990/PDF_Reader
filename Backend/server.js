const express = require('express');
require('dotenv').config();
// const morgan = require('morgan');
// const winston = require('./config/winston');
// const authRoutes = require('./routes/auth');
// const pdfRoutes = require('./routes/pdf');
const DnConnection = require('./config/DbConnection');

const app = express();

app.use(express.json());
// app.use(morgan('combined', { stream: winston.stream }));

DnConnection();

// app.use('/api/auth', authRoutes);
// app.use('/api/pdf', pdfRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
