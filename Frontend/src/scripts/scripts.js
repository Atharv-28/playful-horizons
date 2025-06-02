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
});