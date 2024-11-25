function checkAnswer(emailId, isLegitimate) {
    let feedbackText1 = document.getElementById("feedback-text1");
    let feedbackText2 = document.getElementById("feedback-text2");
    let feedbackText3 = document.getElementById("feedback-text3");
    let feedbackText4 = document.getElementById("feedback-text4");
    // Logic for determining the correct answer
    if (emailId === 1) {
        if (emailId === 1 && !isLegitimate) {
            feedbackText1.textContent = "Correct! Email 1 is a phishing attempt. Be aware of links to bank sites as they can be faked.";
            feedbackText1.className = "text-success";
        } else {
            feedbackText1.textContent = "Oops! That answer is incorrect. Take a closer look at the link and if you should click it and the senders email address is sketchy. Try again. ";
            feedbackText1.className = "text-danger";
        } 
    } else if (emailId === 2) {
        if (emailId === 2 && isLegitimate) {
            feedbackText2.textContent = "Correct! Email 2 is legitimate.";
            feedbackText2.className = "text-success";
        } else {
            feedbackText2.textContent = "Oops! That answer is incorrect. The email is coming from the actual company, as seen from senders email address. Try again.";
            feedbackText2.className = "text-danger";
        }  
    } else if (emailId === 3) {
        if (emailId === 3 && !isLegitimate) {
            feedbackText3.textContent = "Correct! Email 3 is a phishing attempt. Your friends email account and maybe even other accounts have been hacked and they are sending spam mail to get more victims, be aware.";
            feedbackText3.className = "text-success";
        } else {
            feedbackText3.textContent = "Oops! That answer is incorrect. Even tho the email is coming from your friends email, but are you sure you should click on that link? Try again.";
            feedbackText3.className = "text-danger";
        }  
    } else if (emailId === 4) {
        if (emailId === 4 && !isLegitimate) {
            feedbackText4.textContent = "Correct! Email 4 is a phishing attempt...";
            feedbackText4.className = "text-success";
        } else {
            feedbackText4.textContent = "Oops! That answer is incorrect. The email . Try again.";
            feedbackText4.className = "text-danger";
        }  
    }
    
    
}
