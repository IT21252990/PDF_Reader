const express = require('express');
const { uploadPDF, getPDFs , getPDFById , deletePDF} = require('../controllers/pdfController');
const auth  = require('../middlewares/authHandler');
const router = express.Router();

router.use(auth);

router.post('/upload', uploadPDF);
router.get('/', getPDFs);
router.get('/:id', getPDFById);
router.delete('/:id', deletePDF);

module.exports = router;
