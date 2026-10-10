import { jsPDF } from 'jspdf';
import { PRESS_NOTE_TEXT, MAINS_QUALIFIED_CANDIDATES } from '../data/mainsResultData';

export const downloadOfficialResultPdf = (filename = 'Civil_Services_Mains_Examination_2026_Result.pdf') => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;

  // --- PAGE 1: PRESS NOTE ---
  doc.setFont('times', 'bold');
  doc.setFontSize(13);
  doc.text('PRESS INFORMATION BUREAU', pageWidth / 2, 35, { align: 'center' });
  doc.text('GOVERNMENT OF INDIA', pageWidth / 2, 42, { align: 'center' });
  doc.text('PRESS NOTE', pageWidth / 2, 49, { align: 'center' });

  doc.setFontSize(12);
  doc.text('RESULT OF THE CIVIL SERVICES (MAINS)', pageWidth / 2, 58, { align: 'center' });
  doc.text('EXAMINATION, 2026', pageWidth / 2, 64, { align: 'center' });

  // Draw underline below title
  const lineY = 66;
  doc.setLineWidth(0.4);
  doc.line(margin + 20, lineY, pageWidth - margin - 20, lineY);

  // Date
  doc.setFont('times', 'bold');
  doc.setFontSize(11);
  doc.text('Dated: 11th OCTOBER, 2026', pageWidth - margin, 78, { align: 'right' });

  // Body Paragraphs
  doc.setFont('times', 'normal');
  doc.setFontSize(10.5);

  const p1Lines = doc.splitTextToSize(PRESS_NOTE_TEXT.p1, pageWidth - 2 * margin);
  doc.text(p1Lines, margin, 92, { align: 'justify', maxWidth: pageWidth - 2 * margin });

  const p2Lines = doc.splitTextToSize(PRESS_NOTE_TEXT.p2, pageWidth - 2 * margin);
  doc.text(p2Lines, margin, 115, { align: 'justify', maxWidth: pageWidth - 2 * margin });

  const p3Lines = doc.splitTextToSize(PRESS_NOTE_TEXT.p3, pageWidth - 2 * margin);
  doc.text(p3Lines, margin, 142, { align: 'justify', maxWidth: pageWidth - 2 * margin });

  // Center stars
  doc.setFont('times', 'bold');
  doc.text('*********', pageWidth / 2, 190, { align: 'center' });

  // Footer on page 1
  doc.setFontSize(9);
  doc.setFont('times', 'italic');
  doc.text('Union Public Service Commission, Dholpur House, Shahjahan Road, New Delhi - 110069', pageWidth / 2, 280, { align: 'center' });

  // --- PAGES 2+: NAME WISE ROLL ORDR LIST ---
  const candidatesPerPage = 28;
  const totalPages = Math.ceil(MAINS_QUALIFIED_CANDIDATES.length / candidatesPerPage);

  for (let page = 0; page < totalPages; page++) {
    doc.addPage();

    // Page header
    doc.setFont('times', 'bold');
    doc.setFontSize(11);
    doc.text('CIVIL SERVICES (MAINS) EXAMINATION, 2026', pageWidth / 2, 22, { align: 'center' });
    doc.setFontSize(10);
    doc.text('NAME WISE ROLL ORDR LIST OF WRITTEN QUALIFIED CANDIDATES', pageWidth / 2, 28, { align: 'center' });

    // Table Header
    const tableTop = 38;
    doc.setLineWidth(0.3);
    doc.line(margin, tableTop - 3, pageWidth - margin, tableTop - 3);

    doc.setFont('times', 'bold');
    doc.setFontSize(9.5);
    doc.text('SR. NO.', margin + 2, tableTop + 2);
    doc.text('ROLL NO.', margin + 35, tableTop + 2);
    doc.text('NAME', margin + 80, tableTop + 2);

    doc.line(margin, tableTop + 5, pageWidth - margin, tableTop + 5);

    // Rows
    const startIdx = page * candidatesPerPage;
    const endIdx = Math.min(startIdx + candidatesPerPage, MAINS_QUALIFIED_CANDIDATES.length);

    let rowY = tableTop + 12;
    doc.setFont('times', 'normal');
    doc.setFontSize(9);

    for (let i = startIdx; i < endIdx; i++) {
      const c = MAINS_QUALIFIED_CANDIDATES[i];
      doc.text(c.srNo.toString(), margin + 2, rowY);
      doc.text(c.rollNo, margin + 35, rowY);
      doc.text(c.name, margin + 80, rowY);
      rowY += 7.5;
    }

    // Page number bottom
    doc.setFontSize(8.5);
    doc.text(`Page ${page + 2} of ${totalPages + 1}`, pageWidth / 2, 285, { align: 'center' });
  }

  doc.save(filename);
};
