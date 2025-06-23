# Playful Horizons Daycare 

## Overview

Playful Horizons Daycare is a web-based platform designed to streamline the enrollment process for parents and daycare administrators. The system allows parents to fill out enrollment forms, calculate fees, and receive a confirmation PDF via email, all through a user-friendly interface.

---

## Features

- **Online Enrollment:** Parents can submit all required details through a web form.
- **Automatic Fee Calculation:** The system calculates the total fee based on selected program and duration.
- **PDF Generation:** Enrollment details are compiled into a professionally formatted PDF.
- **Email Confirmation:** The generated PDF is sent to the parent’s email as confirmation.
- **Admin Notification:** Daycare authorities receive all necessary information for record-keeping.
- **Responsive Design:** The frontend is accessible on desktop and mobile devices.

---

## System Architecture

- **Frontend:** HTML, CSS, JavaScript (located in `/Frontend`)
- **Backend:** Node.js, Express, PDFKit, Nodemailer (located in `/Backend`)
- **PDF Generation:** Uses PDFKit to create enrollment forms.
- **Email Delivery:** Uses Nodemailer with Gmail SMTP for sending emails.

---

## Installation & Setup

### Prerequisites

- Node.js (v14 or higher recommended)
- npm (Node Package Manager)

### Backend Setup

1. Navigate to the `Backend` directory:
    ```bash
    cd Backend
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Set up environment variables for email credentials (recommended for security):
    - Create a `.env` file and add:
      ```
      EMAIL_USER=your-email@gmail.com
      EMAIL_PASS=your-app-password
      ```
    - Update `index.js` to use `process.env.EMAIL_USER` and `process.env.EMAIL_PASS`.

4. Start the backend server:
    ```bash
    node index.js
    ```
    The server will run on `http://localhost:3000`.

### Frontend Setup

1. Open `Frontend/index.html` or `Frontend/src/pages/book.html` in your browser.
2. Ensure the backend server is running for API requests.

---

## Usage

1. Visit the enrollment page.
2. Fill in the required details (child, parent, program, dates, etc.).
3. The fee will be calculated automatically.
4. Submit the form.
5. Check your email for the confirmation PDF.

---

## File Structure

```
playful-horizons/
│
├── Backend/
│   ├── index.js
│   └── ... (other backend files)
│
├── Frontend/
│   ├── index.html
│   └── src/
│       ├── pages/
│       │   └── book.html
│       └── scripts/
│           └── scripts.js
│
└── README.md
```

---

## Security Note

- **Do not** hardcode sensitive credentials in your codebase. Use environment variables for email credentials.
- Ensure your SMTP credentials are kept secure.

---

## License

This project is for educational and demonstration purposes.

---

## Contact

For questions or support, contact:  
**Email:** info@playfulHorizon.com  
**Phone:** +91 123 456 7890

---