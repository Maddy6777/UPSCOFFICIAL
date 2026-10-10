const fs = require('fs');
const path = require('path');
const { jsPDF } = require('jspdf');

const TOTAL_PAGES = 524;
const CANDIDATES_PER_PAGE = 28;
const TOTAL_CANDIDATES = 14624;

// Press note text
const PRESS_NOTE_TEXT = {
  header: 'PRESS INFORMATION BUREAU\nGOVERNMENT OF INDIA\nPRESS NOTE',
  title: 'RESULT OF THE CIVIL SERVICES (MAINS)\nEXAMINATION, 2026',
  date: 'Dated: 11th OCTOBER, 2026',
  p1: 'On the basis of the result of the Civil Services (Mains) Examination, 2026 held on 27/04/2026, the candidates with the following Roll Numbers have qualified for Personality Test (Interview) will be held within few days.',
  p2: 'The candidature of these candidates is provisional. In accordance with the Rules of the Examination, all these candidates have to apply in the Detailed Application Form-I (DAF-I) for the Personality Test ( Interview). The dates and important instructions for filling up of the DAF-I and its submission is already announced on website.',
  p3: 'The Union Public Service Commission has a Facilitation Counter near the Examination Hall Building in its premises at Dholpur House, Shahjahan Road, New Delhi. Candidates may obtain any information/clarification regarding their result of the above mentioned Examination on all working days between 10.00 AM to 5.00 PM, in person or on Tel. No. 011-23385271, 011-23098543 or 011-23381125 from the Facilitation Counter.',
};

// Known candidates dictionary by srNo
const KNOWN_CANDIDATES = {
  1: { rollNo: '0139081', name: 'AJAY SAINI GOVINDBHAI' },
  2: { rollNo: '0138140', name: 'SAHIL SONI' },
  3: { rollNo: '0131181', name: 'PRITI GAUD RAMESH' },
  4: { rollNo: '0130182', name: 'BHATI DRISHTI' },
  5: { rollNo: '0132395', name: 'GARIMA ARORA' },
  6: { rollNo: '0139415', name: 'DEDHROTIYA AMIT KETANKUMAR' },
  7: { rollNo: '0133439', name: 'BAROT HIMANSHU' },
  8: { rollNo: '0135463', name: 'KUSHAL TANWAR' },
  9: { rollNo: '0138520', name: 'PATEL SUCHITA KEYURBHAI' },
  10: { rollNo: '0134781', name: 'MACWANA ANKUR BIPINBHAI' },
  11: { rollNo: '0128860', name: 'VIMALKIRTI V CHAKRAVARTI' },
  12: { rollNo: '0133899', name: 'JOSHI SAHIL MAHENDRAKUMAR' },
  13: { rollNo: '0139963', name: 'RAVALIYA RAHUL HASMUKHBHAI' },
  14: { rollNo: '0131114', name: 'CHAUDHARY KETANKUMAR SHIVJIBHAI' },
  15: { rollNo: '0136156', name: 'PATEL ANIKET KAMLESHBHAI' },
  16: { rollNo: '0131181', name: 'DODIYA PRASHANTKUMAR JAGDISHBHA' },
  17: { rollNo: '0137183', name: 'SHAH DHAIRYA PARAGKUMAR' },
  18: { rollNo: '0137203', name: 'BHUPESH DODA' },
  19: { rollNo: '0131340', name: 'LOKESH DEVSIBHAI GOHIL' },
  20: { rollNo: '0139387', name: 'SONAL RAMESHKUMAR' },
  21: { rollNo: '0132398', name: 'ROSHNI JHA' },
  22: { rollNo: '0137458', name: 'DHARMESH RATHOD' },
  23: { rollNo: '0133532', name: 'SANDIP UPADHYAY' },
  24: { rollNo: '0131612', name: 'VRIDHHI KUAMRI SOMNATH' },
  25: { rollNo: '0136615', name: 'ABHISHEK SISODIYA' },
  26: { rollNo: '0132649', name: 'AKSHAY JAIN' },
  27: { rollNo: '0139673', name: 'MAHESH MEENA' },
  28: { rollNo: '0133817', name: 'ADARSH KUMAR' },
  29: { rollNo: '0101980', name: 'ANKITKUMAR VANIYA' },
  30: { rollNo: '0101985', name: 'HARSHVARDHAN SHARMA' },
  31: { rollNo: '0102014', name: 'PINGILI RAMYA' },
  32: { rollNo: '0102035', name: 'MAKWANA PINANK NARSIBHAI' },
  33: { rollNo: '0102254', name: 'ANU VIVEK' },
  34: { rollNo: '0102259', name: 'JADAV KISHANKUMAR JITENDRAKUMAR' },
  35: { rollNo: '0102455', name: 'MATAM SATYA PRATEEK' },
  36: { rollNo: '0102495', name: 'UTPAL KUMAR PATEL' },
  37: { rollNo: '0102632', name: 'PATEL RONAKKUMAR NARENDRABHAI' },
  38: { rollNo: '0102711', name: 'GURNADAM PRASAD' },
  39: { rollNo: '0102745', name: 'MILANBHAI SAVANI' },
  40: { rollNo: '0102958', name: 'BAROT MAYUR KRUSHNAKANT' },
  41: { rollNo: '0102975', name: 'ANAVADIYA HARDIKKUMAR VASANTBHA' },
  42: { rollNo: '0102992', name: 'RAVAL URVISH PANKAJKUMAR' },
  43: { rollNo: '0103128', name: 'SAGAR GOEL' },
  44: { rollNo: '0103163', name: 'PREETI CHAWLA' },
  45: { rollNo: '0103203', name: 'HADIYA DIPALI BINDUBHAI' },
  46: { rollNo: '0103217', name: 'LADUMOR CHETANKUMAR JIVABHAI' },
  47: { rollNo: '0103249', name: 'VAIBHAV JINDAL' },
  48: { rollNo: '0103341', name: 'NISAR DISHANT AMRUTLAL' },
  49: { rollNo: '0103374', name: 'GOVALIYA VISHVRAJBHAI' },
  50: { rollNo: '0103438', name: 'GARG HIMANI VINODKUMAR' },
  51: { rollNo: '0103469', name: 'RATHOD VISHWAS ARUNKUMAR' },
  52: { rollNo: '0103516', name: 'CHAVDA NEEL LALITBHAI' },
  53: { rollNo: '0103577', name: 'RANA PRIYANKA PARESHKUMAR' },
  54: { rollNo: '0103627', name: 'ANJARA KRUNAL GIRISHBHAI' },
  55: { rollNo: '0103645', name: 'JOSHI PARTHKUMAR ASHOKBHAI' },
  56: { rollNo: '0103706', name: 'SONAM SINGH' },
  1249: { rollNo: '0581937', name: 'RAWAL MONTU RAJENDRAKUMAR' },
  5039: { rollNo: '1013595', name: 'DONURU ANANYA REDDY' },
  12064: { rollNo: '6312407', name: 'RUHANI' },
  12065: { rollNo: '6312512', name: 'ANIMESH PRADHAN' },
  14617: { rollNo: '8900361', name: 'AJYA KUMAR SINGH' },
  14618: { rollNo: '8900367', name: 'KETAN SHARMA' },
  14619: { rollNo: '8900411', name: 'PRATIK KUSHWAHA' },
  14620: { rollNo: '8900425', name: 'PARSHANT BHARDWAJ' },
  14621: { rollNo: '8900482', name: 'ROHIT THAKUR' },
  14622: { rollNo: '8900495', name: 'ANKIT H RAMESHKUMAR' },
  14623: { rollNo: '8900520', name: 'BHUMI THAKUR' },
  14624: { rollNo: '8900522', name: 'GAUTAM SISODIYA' },
};

// Candidate name pools for realistic names
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

// UPSC exam centres list
const CENTRES = [
  '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15',
  '16', '17', '18', '19', '20', '21', '22', '24', '26', '34', '35', '36', '37', '38', '39',
  '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54',
  '56', '57', '58', '59', '60', '61', '62', '63', '64', '65', '66', '67', '68', '69', '70',
  '71', '72', '73', '74', '75', '76', '77', '78', '79', '80', '81', '82', '83', '84', '85',
  '86', '87', '88', '89'
];

function getCandidate(srNo) {
  if (KNOWN_CANDIDATES[srNo]) {
    return KNOWN_CANDIDATES[srNo];
  }

  // Generate consistent pseudo-random record from srNo
  const centreIdx = Math.floor((srNo - 1) / 185) % CENTRES.length;
  const centre = CENTRES[centreIdx];
  const numInCentre = (10000 + ((srNo * 37) % 89999)).toString().padStart(5, '0');
  const rollNo = centre + numInCentre;

  const fIdx = (srNo * 13) % FIRST_NAMES.length;
  const lIdx = (srNo * 29) % LAST_NAMES.length;
  const name = `${FIRST_NAMES[fIdx]} ${LAST_NAMES[lIdx]}`;

  return { rollNo, name };
}

console.log('Generating 524-page PDF document...');
console.time('generate-pdf');

const doc = new jsPDF({
  orientation: 'portrait',
  unit: 'mm',
  format: 'a4',
});

const pageWidth = doc.internal.pageSize.getWidth();
const margin = 20;

// === PAGE 1: PRESS NOTE ===
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

// === PAGES 2 TO 524 ===
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
    const c = getCandidate(sr);
    doc.text(sr.toString(), margin + 2, rowY);
    doc.text(c.rollNo, margin + 35, rowY);
    doc.text(c.name, margin + 80, rowY);
    rowY += 7.5;
  }

  doc.setFontSize(8);
  doc.text(`Page ${p} of ${TOTAL_PAGES}`, pageWidth / 2, 287, { align: 'center' });
}

console.timeEnd('generate-pdf');
console.log('Total pages generated:', doc.getNumberOfPages());

const publicDir = path.resolve(__dirname, '../public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

const outputPath = path.join(publicDir, 'Civil_Services_Mains_Examination_2026_Result.pdf');
const pdfBytes = doc.output('arraybuffer');
fs.writeFileSync(outputPath, Buffer.from(pdfBytes));

const stats = fs.statSync(outputPath);
console.log(`Saved PDF to ${outputPath} (${(stats.size / (1024 * 1024)).toFixed(2)} MB)`);
