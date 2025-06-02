// backend/utils/pdfGenerator.js
const { PDFDocument, StandardFonts, rgb } = require('pdf-lib');

async function generatePDF(content) {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([600, 400]);
  
  const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
  const { width, height } = page.getSize();

  page.drawText(content, {
    x: 50,
    y: height - 50,
    size: 20,
    font: timesRomanFont,
    color: rgb(0, 0, 0),
  });

  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
}

module.exports = generatePDF;
