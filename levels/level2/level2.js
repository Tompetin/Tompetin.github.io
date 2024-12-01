function checkPassword() {
    const userPassword = document.getElementById('passwordInput').value.trim();
    const correctPassword = 'Charlie'; // This is a simple password to crack based on the clue

    if (userPassword === correctPassword) {
        document.getElementById('feedback').innerHTML = "<strong>Success!</strong> You cracked the password!";
    } else {
        document.getElementById('feedback').innerHTML = "<strong>Failure!</strong> Try again.";
    }
}
