const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const PDFDocument = require("pdfkit");

const app = express();
app.use(bodyParser.json());

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
                pass: "exge jbsy zwnj hrot",
            },
        });

        const mailOptions = {
            from: "atharvtambekar@gmail.com",
            to: userData.parentEmail,
            subject: "Enrollment Confirmation - Playful Horizons",
            text: "Please find the attached enrollment form.",
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

    // Add title
    pdfDoc.fontSize(18).text("Enrollment Form - Playful Horizons", { align: "center" });
    pdfDoc.moveDown();

    // Add table headers
    pdfDoc.fontSize(12).text("Field", 100, pdfDoc.y, { continued: true });
    pdfDoc.text("Value", 300);
    pdfDoc.moveDown();

    // Add table rows
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
    ];

    formData.forEach((row) => {
        pdfDoc.text(row.field, 100, pdfDoc.y, { continued: true });
        pdfDoc.text(row.value || "N/A", 300);
        pdfDoc.moveDown();
    });

    pdfDoc.end();
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});