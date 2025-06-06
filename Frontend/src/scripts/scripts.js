document.addEventListener("DOMContentLoaded", () => {
    const programSelection = document.getElementById("program-selection");
    const startTime = document.getElementById("start-time");
    const endTime = document.getElementById("end-time");
    const oneDayCheckbox = document.getElementById("one-day");
    const wholeSemesterCheckbox = document.getElementById("whole-semester");
    const applicableFeeDisplay = document.getElementById("applicable-fee");
    const popupBox = document.getElementById("popup-box");
    const popupMessage = document.getElementById("popup-message");
    const popupClose = document.getElementById("popup-close");
    const loader = document.getElementById("loader");

    const hourlyRate = 50; // Example hourly rate
    const semesterDays = 50; // Example number of days in a semester

    let totalFee = 0;

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
        const selectedOption = programSelection.options[programSelection.selectedIndex];
        const programFee = parseInt(selectedOption.value) || 0;
        const programName = selectedOption.getAttribute("data-name");

        let start = startTime.value ? new Date(`1970-01-01T${startTime.value}:00`) : null;
        let end = endTime.value ? new Date(`1970-01-01T${endTime.value}:00`) : null;
        let durationHours = start && end ? (end - start) / (1000 * 60 * 60) : 0;
        let timeSlotFee = durationHours * hourlyRate;

        totalFee = programFee + timeSlotFee;

        if (oneDayCheckbox.checked) {
            applicableFeeDisplay.textContent = `Applicable Fee: ₹${totalFee.toFixed(2)}`;
        } else if (wholeSemesterCheckbox.checked) {
            totalFee *= semesterDays;
            applicableFeeDisplay.textContent = `Applicable Fee: ₹${totalFee.toFixed(2)}`;
        } else {
            applicableFeeDisplay.textContent = `Applicable Fee: ₹${totalFee.toFixed(2)}`;
        }

        // Store program name for later use
        programSelection.dataset.selectedName = programName;
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

    // Close pop-up logic
    popupClose.addEventListener("click", () => {
        popupBox.style.display = "none";
    });

    document.getElementById("submit-button").addEventListener("click", async (event) => {
        event.preventDefault();

        loader.style.display = "block";

        const childAgeInput = document.getElementById("child-age");
        const childAge = parseInt(childAgeInput.value);

        // Validate age
        if (childAge > 10 || childAge < 0 || isNaN(childAge)) {
            popupMessage.textContent = "Only kids aged 0-10 can be enrolled!";
            popupBox.style.display = "block";
            loader.style.display = "none";
            return;
        }

        const userData = {
            childName: document.querySelector("input[placeholder=\"Enter child's name\"]").value,
            childAge: document.querySelector("input[placeholder=\"Enter child's age\"]").value,
            childGender: document.querySelector("select").value,
            parent1Name: document.querySelector("input[placeholder=\"Enter parent 1 name\"]").value,
            parent2Name: document.querySelector("input[placeholder=\"Enter parent 2 name\"]").value,
            parent1Contact: document.querySelector("input[placeholder=\"Enter parent 1 contact number\"]").value,
            parent2Contact: document.querySelector("input[placeholder=\"Enter parent 2 contact number\"]").value,
            parentEmail: document.querySelector("input[type=\"email\"]").value,
            program: programSelection.dataset.selectedName, // Get program name
            duration: document.getElementById("one-day").checked ? "One Day" : "Whole Semester",
            startDate: document.getElementById("start-date").value,
            endDate: document.getElementById("end-date").value,
            startTime: document.getElementById("start-time").value,
            endTime: document.getElementById("end-time").value,
            fee: `₹${totalFee}`,
        };

        try {
            const response = await fetch("https://playful-horizons.onrender.com/api/send-pdf", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                popupMessage.textContent = "PDF sent to your email successfully!";
                popupBox.style.display = "block";
            } else {
                popupMessage.textContent = "Failed to send email. Please try again.";
                popupBox.style.display = "block";
            }
        } catch (error) {
            console.error("Error:", error);
            popupMessage.textContent = "An error occurred. Please try again.";
            popupBox.style.display = "block";
        } finally {
            loader.style.display = "none";
        }
    });
});