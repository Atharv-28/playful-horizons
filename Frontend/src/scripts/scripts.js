document.addEventListener("DOMContentLoaded", () => {
    const programSelection = document.getElementById("program-selection");
    const startTime = document.getElementById("start-time");
    const endTime = document.getElementById("end-time");
    const oneDayCheckbox = document.getElementById("one-day");
    const wholeSemesterCheckbox = document.getElementById("whole-semester");
    const applicableFeeDisplay = document.getElementById("applicable-fee");

    const hourlyRate = 50; // Example hourly rate
    const semesterDays = 50; // Example number of days in a semester

    // Autofill start and end date/time for semester
    function autofillSemesterDetails() {
        const semesterStartDate = "2025-06-15"; // Example start date
        const semesterEndDate = "2025-11-30"; // Example end date
        const semesterStartTime = "09:00"; // Example start time
        const semesterEndTime = "15:00"; // Example end time

        document.getElementById("start-date").value = semesterStartDate;
        document.getElementById("end-date").value = semesterEndDate;
        startTime.value = semesterStartTime;
        endTime.value = semesterEndTime;
    }

    function calculateFee() {
        let programFee = parseInt(programSelection.value) || 0;
        let start = startTime.value ? new Date(`1970-01-01T${startTime.value}:00`) : null;
        let end = endTime.value ? new Date(`1970-01-01T${endTime.value}:00`) : null;
        let durationHours = start && end ? (end - start) / (1000 * 60 * 60) : 0;
        let timeSlotFee = durationHours * hourlyRate;

        let totalFee = programFee + timeSlotFee;

        if (oneDayCheckbox.checked) {
            applicableFeeDisplay.textContent = `Applicable Fee: ₹${totalFee.toFixed(2)}`;
        } else if (wholeSemesterCheckbox.checked) {
            totalFee *= semesterDays;
            applicableFeeDisplay.textContent = `Applicable Fee: ₹${totalFee.toFixed(2)}`;
        } else {
            applicableFeeDisplay.textContent = `Applicable Fee: ₹${totalFee.toFixed(2)}`;
        }        
    }

    // Ensure only one checkbox is selectable
    oneDayCheckbox.addEventListener("change", () => {
        if (oneDayCheckbox.checked) {
            wholeSemesterCheckbox.checked = false;
        }
        calculateFee();
    });

    wholeSemesterCheckbox.addEventListener("change", () => {
        if (wholeSemesterCheckbox.checked) {
            oneDayCheckbox.checked = false;
            autofillSemesterDetails(); // Autofill details for semester
        }
        calculateFee();
    });

    programSelection.addEventListener("change", calculateFee);
    startTime.addEventListener("change", calculateFee);
    endTime.addEventListener("change", calculateFee);

    document.getElementById("submit-button").addEventListener("click", async (event) => {
        event.preventDefault();
        const userData = {
            childName: document.querySelector("input[placeholder=\"Enter child's name\"]").value,
            childAge: document.querySelector("input[placeholder=\"Enter child's age\"]").value,
            childGender: document.querySelector("select").value,
            parent1Name: document.querySelector("input[placeholder=\"Enter parent 1 name\"]").value,
            parent2Name: document.querySelector("input[placeholder=\"Enter parent 2 name\"]").value,
            parent1Contact: document.querySelector("input[placeholder=\"Enter parent 1 contact number\"]").value,
            parent2Contact: document.querySelector("input[placeholder=\"Enter parent 2 contact number\"]").value,
            parentEmail: document.querySelector("input[type=\"email\"]").value,
            program: document.getElementById("program-selection").value,
            duration: document.getElementById("one-day").checked ? "One Day" : "Whole Semester",
            startDate: document.getElementById("start-date").value,
            endDate: document.getElementById("end-date").value,
            startTime: document.getElementById("start-time").value,
            endTime: document.getElementById("end-time").value,
        };
        try {
            /*const response = await fetch("https://your-backend-url/api/send-pdf", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                alert("PDF generated and sent to your email successfully!");
            } else {
                alert("Failed to send email. Please try again.");
            }
                */
               console.log("User Data:", userData);
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred. Please try again.");
        }
    });
});