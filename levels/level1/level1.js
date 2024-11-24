function checkAnswer(emailId, isLegitimate) {
    let feedbackText = document.getElementById("feedback-text");
    // Logic for determining the correct answer
    if (emailId === 1 && !isLegitimate) {
        feedbackText.textContent = "Correct! Email 1 is a phishing attempt.";
        feedbackText.className = "text-success";
    } else if (emailId === 2 && isLegitimate) {
        feedbackText.textContent = "Correct! Email 2 is legitimate.";
        feedbackText.className = "text-success";
    } else {
        feedbackText.textContent = "Oops! That answer is incorrect. Try again.";
        feedbackText.className = "text-danger";
    }
}
