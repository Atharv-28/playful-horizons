  document.addEventListener("DOMContentLoaded", () => {
    const programSelection = document.getElementById("program-selection");
    const startTime = document.getElementById("start-time");
    const endTime = document.getElementById("end-time");
    const oneDayCheckbox = document.getElementById("one-day");
    const wholeSemesterCheckbox = document.getElementById("whole-semester");
    const applicableFeeDisplay = document.getElementById("applicable-fee");

    const hourlyRate = 50; // Example hourly rate
    const semesterDays = 50; // Example number of days in a semester
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
      console.log(`Program Fee: ₹${programFee}, Time Slot Fee: $${timeSlotFee.toFixed(2)}, Total Fee: $${totalFee.toFixed(2)}`);
      
    }

    console.log(programSelection, startTime, endTime, oneDayCheckbox, wholeSemesterCheckbox, applicableFeeDisplay);
    
    programSelection.addEventListener("change", calculateFee);
    startTime.addEventListener("change", calculateFee);
    endTime.addEventListener("change", calculateFee);
    oneDayCheckbox.addEventListener("change", () => {
      wholeSemesterCheckbox.checked = false;
      calculateFee();
    });
    wholeSemesterCheckbox.addEventListener("change", () => {
      oneDayCheckbox.checked = false;
      calculateFee();
    });
  });