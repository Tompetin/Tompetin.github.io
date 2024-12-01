function checkPassword() {
    const userPassword = document.getElementById('passwordInput').value.trim();
    const correctPassword = 'Charlie'; // This is a simple password to crack based on the clue

    if (userPassword === correctPassword) {
        document.getElementById('feedback').innerHTML = "<strong>Success!</strong> You cracked the password!";
    } else {
        document.getElementById('feedback').innerHTML = "<strong>Failure!</strong> Try again.";
    }
}

function checkStrength() {
    const password = document.getElementById('passwordStrengthInput').value.trim();
    let strength = 0;
    let feedback = [];
    
    // Check password length (should be at least 8 characters)
    if (password.length >= 8) {
        strength++;
    } else {
        feedback.push("Password should be at least 8 characters long.");
    }

    // Check if it contains numbers
    if (/[0-9]/.test(password)) {
        strength++;
    } else {
        feedback.push("Password should contain at least one number.");
    }

    // Check if it contains both uppercase and lowercase letters
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) {
        strength++;
    } else {
        feedback.push("Password should contain both uppercase and lowercase letters.");
    }

    // Check if it contains special characters
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        strength++;
    } else {
        feedback.push("Password should contain at least one special character.");
    }

    // Determine strength level based on conditions
    let strengthLevel = '';
    
    if (password.length >= 8 && strength === 4) {
        strengthLevel = 'Excellent';
    } else if (password.length >= 8 || strength >= 3) {
        strengthLevel = 'Good';
    } else if (strength >= 2) {
        strengthLevel = 'Medium';
    } else {
        strengthLevel = 'Low';
    }

    // Provide feedback based on strength level
    if (strengthLevel === 'Excellent') {
        document.getElementById('strengthFeedback').innerHTML = "Excellent password strength!";
    } else {
        document.getElementById('strengthFeedback').innerHTML = `Password strength is ${strengthLevel}.<br>Consider making it better with the following criteria:<br>${feedback.join("<br>")}`;
    }
}
