const PDF = require('../models/pdfModel');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 30 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        const filetypes = /pdf/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb('Error: PDFs Only!');
        }
    }
}).single('pdf');

const uploadPDF = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) return res.status(400).send(err);
        if (!req.body.title) return res.status(400).send('Title is required');
        try {
            const newPDF = new PDF({
                user: req.user.id,
                filename: req.file.filename,
                path: req.file.path,
                title: req.body.title
            });
            await newPDF.save();
            res.status(201).send('PDF uploaded');
        } catch (error) {
            res.status(400).send(error.message);
        }
    });
};

const getPDFs = async (req, res) => {
    try {
        const pdfs = await PDF.find({ user: req.user.id });
        res.json(pdfs);
    } catch (err) {
        res.status(400).send(err.message);
    }
};

const getPDFById = async (req, res) => {
    try {
        const pdf = await PDF.findById(req.params.id);
        if (!pdf) return res.status(404).send('PDF not found');
        res.json(pdf);
    } catch (err) {
        res.status(400).send(err.message);
    }
};

module.exports = {uploadPDF , getPDFs , getPDFById};