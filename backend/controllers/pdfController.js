const generatePDF = require('../utils/pdfGenerator');

exports.downloadPDF = async (req, res) => {
  try {
    const content = req.body.content || '📝 Default content in your PDF!';
    const pdfBytes = await generatePDF(content);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=generated.pdf');
    res.send(Buffer.from(pdfBytes));
  } catch (err) {
    console.error('❌ Error generating PDF:', err);
    res.status(500).json({ message: 'Failed to generate PDF' });
  }
};
