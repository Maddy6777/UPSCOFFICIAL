import { jsPDF } from 'jspdf';
import { PRESS_NOTE_TEXT } from '../data/mainsResultData';

export const downloadOfficialResultPdf = (filename = 'Civil_Services_Mains_Examination_2026_Result.pdf') => {
  // Direct download of the authentic, complete 524-page PDF file
  const link = document.createElement('a');
  link.href = './Civil_Services_Mains_Examination_2026_Result.pdf';
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const generateFullResultPdfBlob = (): jsPDF => {
  const TOTAL_PAGES = 524;
  const CANDIDATES_PER_PAGE = 28;
  const TOTAL_CANDIDATES = 14624;

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;

  // Page 1: Press Note
  doc.setFont('times', 'bold');
  doc.setFontSize(13);
  doc.text('PRESS INFORMATION BUREAU', pageWidth / 2, 35, { align: 'center' });
  doc.text('GOVERNMENT OF INDIA', pageWidth / 2, 42, { align: 'center' });
  doc.text('PRESS NOTE', pageWidth / 2, 49, { align: 'center' });

  doc.setFontSize(12);
  doc.text('RESULT OF THE CIVIL SERVICES (MAINS)', pageWidth / 2, 58, { align: 'center' });
  doc.text('EXAMINATION, 2026', pageWidth / 2, 64, { align: 'center' });

  const lineY = 66;
  doc.setLineWidth(0.4);
  doc.line(margin + 20, lineY, pageWidth - margin - 20, lineY);

  doc.setFont('times', 'bold');
  doc.setFontSize(11);
  doc.text('Dated: 11th OCTOBER, 2026', pageWidth - margin, 78, { align: 'right' });

  doc.setFont('times', 'normal');
  doc.setFontSize(10.5);

  const p1Lines = doc.splitTextToSize(PRESS_NOTE_TEXT.p1, pageWidth - 2 * margin);
  doc.text(p1Lines, margin, 92, { align: 'justify', maxWidth: pageWidth - 2 * margin });

  const p2Lines = doc.splitTextToSize(PRESS_NOTE_TEXT.p2, pageWidth - 2 * margin);
  doc.text(p2Lines, margin, 115, { align: 'justify', maxWidth: pageWidth - 2 * margin });

  const p3Lines = doc.splitTextToSize(PRESS_NOTE_TEXT.p3, pageWidth - 2 * margin);
  doc.text(p3Lines, margin, 142, { align: 'justify', maxWidth: pageWidth - 2 * margin });

  doc.setFont('times', 'bold');
  doc.text('*********', pageWidth / 2, 190, { align: 'center' });

  doc.setFontSize(9);
  doc.setFont('times', 'italic');
  doc.text('Union Public Service Commission, Dholpur House, Shahjahan Road, New Delhi - 110069', pageWidth / 2, 280, { align: 'center' });

  // Pages 2 to 524
  for (let p = 2; p <= TOTAL_PAGES; p++) {
    doc.addPage();

    doc.setFont('times', 'bold');
    doc.setFontSize(11);
    doc.text('CIVIL SERVICES (MAINS) EXAMINATION, 2026', pageWidth / 2, 20, { align: 'center' });
    doc.setFontSize(9.5);
    doc.text('NAME WISE ROLL ORDR LIST OF WRITTEN QUALIFIED CANDIDATES', pageWidth / 2, 26, { align: 'center' });

    const tableTop = 35;
    doc.setLineWidth(0.3);
    doc.line(margin, tableTop - 3, pageWidth - margin, tableTop - 3);

    doc.setFont('times', 'bold');
    doc.setFontSize(9);
    doc.text('SR. NO.', margin + 2, tableTop + 2);
    doc.text('ROLL NO.', margin + 35, tableTop + 2);
    doc.text('NAME', margin + 80, tableTop + 2);

    doc.line(margin, tableTop + 5, pageWidth - margin, tableTop + 5);

    const startSr = (p - 2) * CANDIDATES_PER_PAGE + 1;
    const endSr = Math.min(startSr + CANDIDATES_PER_PAGE - 1, TOTAL_CANDIDATES);

    let rowY = tableTop + 12;
    doc.setFont('times', 'normal');
    doc.setFontSize(8.5);

    for (let sr = startSr; sr <= endSr; sr++) {
      const rollNo = (1000000 + ((sr * 137) % 8999999)).toString().padStart(7, '0');
      doc.text(sr.toString(), margin + 2, rowY);
      doc.text(rollNo, margin + 35, rowY);
      doc.text(`QUALIFIED CANDIDATE #${sr}`, margin + 80, rowY);
      rowY += 7.5;
    }

    doc.setFontSize(8);
    doc.text(`Page ${p} of ${TOTAL_PAGES}`, pageWidth / 2, 287, { align: 'center' });
  }

  return doc;
};
