import { jsPDF } from 'jspdf';
import { PRESS_NOTE_TEXT } from '../data/mainsResultData';

const TOTAL_PAGES = 524;
const CANDIDATES_PER_PAGE = 28;
const TOTAL_CANDIDATES = 14624;

// Sample of real names and roll numbers
const FIRST_NAMES = [
  'ABHISHEK', 'ADITYA', 'AKASH', 'AMIT', 'ANAND', 'ANKIT', 'ANURAG', 'ASHISH', 'AYUSH', 'DEEPAK',
  'DIVYANSHU', 'GAURAV', 'HARSH', 'HIMANSHU', 'MANISH', 'MAYANK', 'MOHIT', 'NEERAJ', 'NIKHIL', 'NITIN',
  'PANKAJ', 'PRATEEK', 'PRAVEEN', 'PRIYA', 'RAHUL', 'RAJAT', 'ROHIT', 'SAHIL', 'SANDEEP', 'SAURABH',
  'SHIVAM', 'SHUBHAM', 'SUMIT', 'UTKARSH', 'VAIBHAV', 'VIKAS', 'VISHAL', 'VIVEK', 'YASH', 'POOJA',
  'NEHA', 'RITU', 'SWATI', 'ANANYA', 'SHREYA', 'SNEHA', 'MONIKA', 'PRIYANKA', 'GARIMA', 'ARTI'
];

const LAST_NAMES = [
  'SHARMA', 'VERMA', 'SINGH', 'KUMAR', 'GUPTA', 'MEENA', 'PATEL', 'YADAV', 'MISHRA', 'PANDEY',
  'TIWARI', 'TRIPATHI', 'JAIN', 'CHOUDHARY', 'AGRAWAL', 'THAKUR', 'DUBEY', 'SHUKLA', 'SRIVASTAVA', 'JOSHI',
  'SAINI', 'BHARDWAJ', 'KUSHWAHA', 'RAWAT', 'MAURYA', 'DESHMUKH', 'GARG', 'CHAUHAN', 'RAJPUT', 'PAL'
];

const CENTRES = [
  '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15',
  '16', '17', '18', '19', '20', '21', '22', '24', '26', '34', '35', '36', '37', '38', '39',
  '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54',
  '56', '57', '58', '59', '60', '61', '62', '63', '64', '65', '66', '67', '68', '69', '70',
  '71', '72', '73', '74', '75', '76', '77', '78', '79', '80', '81', '82', '83', '84', '85',
  '86', '87', '88', '89'
];

export function getCandidateRecord(srNo: number): { rollNo: string; name: string } {
  const centreIdx = Math.floor((srNo - 1) / 185) % CENTRES.length;
  const centre = CENTRES[centreIdx];
  const numInCentre = (10000 + ((srNo * 37) % 89999)).toString().padStart(5, '0');
  const rollNo = centre + numInCentre;

  const fIdx = (srNo * 13) % FIRST_NAMES.length;
  const lIdx = (srNo * 29) % LAST_NAMES.length;
  const name = `${FIRST_NAMES[fIdx]} ${LAST_NAMES[lIdx]}`;

  return { rollNo, name };
}

export const generateFullResultPdfBlob = (): jsPDF => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;

  // Page 1: Official Press Note
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
      const c = getCandidateRecord(sr);
      doc.text(sr.toString(), margin + 2, rowY);
      doc.text(c.rollNo, margin + 35, rowY);
      doc.text(c.name, margin + 80, rowY);
      rowY += 7.5;
    }

    doc.setFontSize(8);
    doc.text(`Page ${p} of ${TOTAL_PAGES}`, pageWidth / 2, 287, { align: 'center' });
  }

  return doc;
};

export const downloadOfficialResultPdf = async (filename = 'Civil_Services_Mains_Examination_2026_Result.pdf') => {
  // Try direct static fetch first (4.84 MB pre-generated 524-page PDF)
  try {
    const res = await fetch('./Civil_Services_Mains_Examination_2026_Result.pdf');
    if (res.ok) {
      const blob = await res.blob();
      // Ensure it is a valid multi-page PDF (> 100KB)
      if (blob.size > 100000) {
        const blobUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        window.URL.revokeObjectURL(blobUrl);
        document.body.removeChild(link);
        return;
      }
    }
  } catch (err) {
    console.warn('Could not fetch static pre-built PDF, generating full 524-page PDF in-memory...', err);
  }

  // Fallback: Generate the full 524 pages in-memory using jsPDF!
  const doc = generateFullResultPdfBlob();
  doc.save(filename);
};
