const express = require('express');
const { uploadPDF, getPDFs } = require('../controllers/pdfController');
const { auth } = require('../middlewares/authHandler');
const router = express.Router();

router.post('/upload', auth, uploadPDF);
router.get('/', auth, getPDFs);

module.exports = router;
