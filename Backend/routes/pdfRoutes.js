const express = require('express');
const { uploadPDF, getPDFs , getPDFById} = require('../controllers/pdfController');
const auth  = require('../middlewares/authHandler');
const router = express.Router();

router.use(auth);

router.post('/upload', uploadPDF);
router.get('/', getPDFs);
router.get('/:id', getPDFById)

module.exports = router;
