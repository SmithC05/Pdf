// backend/routes/pdfRoutes.js
const express = require('express');
const router = express.Router();
const generatePDF = require('../utils/pdfGenerator');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/generate', authMiddleware, async (req, res) => {
  try {
    const { content } = req.body;
    if (!content) return res.status(400).json({ message: 'Content is required' });

    const pdfBytes = await generatePDF(content);

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename=generated.pdf',
      'Content-Length': pdfBytes.length,
    });

    res.send(Buffer.from(pdfBytes));
  } catch (error) {
    res.status(500).json({ message: 'PDF generation failed', error: error.message });
  }
});

module.exports = router;
