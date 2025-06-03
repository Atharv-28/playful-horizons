const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const PDFDocument = require("pdfkit");
const fs = require("fs"); // For reading logo file
const cors = require("cors");
const app = express();

app.use(bodyParser.json());
app.use(cors());

app.post("/api/send-pdf", async (req, res) => {
  const userData = req.body;

  // Generate PDF
  const pdfDoc = new PDFDocument();
  let buffers = [];
  pdfDoc.on("data", buffers.push.bind(buffers));
  pdfDoc.on("end", async () => {
    const pdfData = Buffer.concat(buffers);

    // Send Email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "advaityayt@gmail.com",
        pass: "exge jbsy zwnj hrot", // Consider using environment variables
      },
    });

    const mailOptions = {
      from: '"Playful Horizons" <atharvtambekar@gmail.com>',
      to: userData.parentEmail,
      subject: "Enrollment Confirmation - Playful Horizons",
      text: `Dear Parent,
Thank you for enrolling your child in our Playful Horizons program. We are excited to welcome your family into our vibrant and nurturing environment.
Attached to this email, you will find the official enrollment form containing all the details you provided. Kindly ensure you keep a printed copy of this document and bring it along on the first day of the program. If you have any questions or require further assistance, feel free to reach out to us.
We look forward to an enriching journey together!`,

      attachments: [
        {
          filename: "enrollment-form.pdf",
          content: pdfData,
        },
      ],
    };

    try {
      await transporter.sendMail(mailOptions);
      res.status(200).send("Email sent successfully!");
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).send("Failed to send email.");
    }
  });

  // Add logo
  const logoPath = "./logo.png"; // Replace with actual path
  if (fs.existsSync(logoPath)) {
    pdfDoc.image(logoPath, 50, 50, { width: 100 });
  }

  // Title
  pdfDoc.moveDown(2);
  pdfDoc
    .fontSize(18)
    .text("Enrollment Form - Playful Horizons", { align: "center" });
  pdfDoc.moveDown(2);

  pdfDoc
    .fontSize(12)
    .text("Note: Must have a printout at the time of enrollment.", {
      align: "center",
    });

  pdfDoc.moveDown(2);

  // Table positioning
  const tableStartX = 90;
  const tableEndX = 500;
  const fieldColX = tableStartX + 10;
  const valueColX = 300;

  // Header
  const headerY = pdfDoc.y;
  pdfDoc.fontSize(12).font("Helvetica-Bold");
  pdfDoc.text("Field", fieldColX, headerY);
  pdfDoc.text("Value", valueColX, headerY);
  pdfDoc
    .moveTo(tableStartX, headerY + 15)
    .lineTo(tableEndX, headerY + 15)
    .stroke();
  pdfDoc.moveDown();
  pdfDoc.font("Helvetica");

  // Table data
  const formData = [
    { field: "Child's Name", value: userData.childName },
    { field: "Child's Age", value: userData.childAge },
    { field: "Child's Gender", value: userData.childGender },
    { field: "Parent 1 Name", value: userData.parent1Name },
    { field: "Parent 2 Name", value: userData.parent2Name },
    { field: "Parent 1 Contact", value: userData.parent1Contact },
    { field: "Parent 2 Contact", value: userData.parent2Contact },
    { field: "Parent's Email", value: userData.parentEmail },
    { field: "Program", value: userData.program },
    { field: "Duration", value: userData.duration },
    { field: "Start Date", value: userData.startDate },
    { field: "End Date", value: userData.endDate },
    { field: "Start Time", value: userData.startTime },
    { field: "End Time", value: userData.endTime },
    { field: "Total Fee", value: userData.fee },
  ];

  formData.forEach((row) => {
    const y = pdfDoc.y;
    pdfDoc.text(row.field, fieldColX, y);
    pdfDoc.text(row.value || "N/A", valueColX, y);
    pdfDoc
      .moveTo(tableStartX, y + 15)
      .lineTo(tableEndX, y + 15)
      .stroke();
    pdfDoc.moveDown();
  });

  // Note - centered horizontally

  pdfDoc.moveDown(2);

  // Signatures - left aligned, new lines
  pdfDoc.fontSize(12);
  pdfDoc.text("Parent's Signature: ____________________");
  pdfDoc.moveDown();
  pdfDoc.text("Authority's Signature: _________________");

  pdfDoc.end();
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
