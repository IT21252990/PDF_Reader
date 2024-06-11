const express = require('express');
const { uploadPDF, getPDFs } = require('../controllers/pdfController');
const auth  = require('../middlewares/authHandler');
const router = express.Router();

router.use(auth);

router.post('/upload', uploadPDF);
router.get('/', getPDFs);

module.exports = router;
