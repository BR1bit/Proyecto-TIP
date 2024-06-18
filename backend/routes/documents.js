const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');
const Document = require('../models/Document');
const path = require('path');

// Ruta para subir documentos
router.post('/upload', (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err });
    }
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    try {
      const newDocument = new Document({
        filename: req.file.originalname,
        author: req.body.author,
        category: req.body.category,
        uploadDate: new Date(),
      });

      await newDocument.save();

      res.status(200).json({
        message: 'File uploaded and saved successfully',
        file: req.file,
      });
    } catch (error) {
      res.status(500).json({ message: 'Error saving file information to database', error });
    }
  });
});

// Ruta para listar documentos
router.get('/list', async (req, res) => {
  try {
    const documents = await Document.find();
    res.status(200).json(documents);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching documents', error });
  }
});

// Ruta para buscar documentos
router.get('/search', async (req, res) => {
  const { author, filename, category } = req.query;

  try {
    const query = {};

    if (author) {
      query.author = new RegExp(author, 'i');
    }
    if (filename) {
      query.filename = new RegExp(filename, 'i');
    }
    if (category) {
      query.category = new RegExp(category, 'i');
    }

    const documents = await Document.find(query);
    res.status(200).json(documents);
  } catch (error) {
    res.status(500).json({ message: 'Error searching documents', error });
  }
});

// Ruta para descargar documentos
router.get('/download/:id', async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);
    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }

    const filePath = path.join(__dirname, '..', 'uploads', document.filename);
    res.download(filePath);
  } catch (error) {
    res.status(500).json({ message: 'Error downloading file', error });
  }
});

module.exports = router;
