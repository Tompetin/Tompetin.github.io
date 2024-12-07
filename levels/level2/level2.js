document.addEventListener("DOMContentLoaded", () => {
    const makingTask = document.getElementById("makingTask");
    const crackingTask = document.getElementById("crackingTask");
    const showMakingTask = document.getElementById("showMakingTask");
    const showCrackingTask = document.getElementById("showCrackingTask");

    const makingTasks = [
        { id: 1, instruction: "Create a simple, easy-to-guess password (e.g., your name) with only letters and lowercase" },
        { id: 2, instruction: "Create a commonly used password. Most commonly used passwords are: 123456, 12345678, password, pass and Password" },
        { id: 3, instruction: "Create a strong password (e.g., 'P@ssw0rd123!')." },
        { id: 4, instruction: "Create a password with only lowercase letters." },
        { id: 5, instruction: "Create a password with only numbers (no letters)." },
        { id: 6, instruction: "Create a password using only the first 5 letters of the alphabet (no other characters)." },
        { id: 7, instruction: "Create a password using a year followed by a name (in lowercase)." },
        { id: 8, instruction: "Create a password that is at least 12 characters, including a mix of numbers, lowercase, uppercase, and special characters." },
        { id: 9, instruction: "Create a password with a pattern that makes it hard to guess but still easy for you to remember. It should include lower and uppercase characters, numbers and special characters." },
        { id: 10, instruction: "Create a password with a memorable phrase that combines random words, numbers, and symbols. As it is a phrase it should include a space in between the words." }
    ];

    // Render making tasks
    const makingTasksContainer = document.getElementById("makingTasksContainer");
    makingTasks.forEach(task => {
        const taskDiv = document.createElement("div");
        taskDiv.className = "mb-4";

        taskDiv.innerHTML = `
            <p>${task.instruction}</p>
            <input type="text" id="makingInput-${task.id}" class="form-control" placeholder="Enter your password">
            <button class="btn btn-primary mt-2" onclick="evaluateMakingTask(${task.id})">Submit</button>
            <p id="makingFeedback-${task.id}" class="mt-2"></p>
            <hr>
        `;

        makingTasksContainer.appendChild(taskDiv);
    });

    // Render cracking tasks
    const crackingTasksContainer = document.getElementById("crackingTasksContainer");
    crackingTasks.forEach(task => {
        const taskDiv = document.createElement("div");
        taskDiv.className = "mb-4";

        taskDiv.innerHTML = `
            <p><strong>Clue:</strong> ${task.clue}</p>
            <input type="text" id="crackingInput-${task.id}" class="form-control" placeholder="Guess the password">
            <button class="btn btn-danger mt-2" onclick="evaluateCrackingTask(${task.id})">Submit</button>
            <p id="crackingFeedback-${task.id}" class="mt-2"></p>
            <hr>
        `;

        crackingTasksContainer.appendChild(taskDiv);
    });

    // Toggle between tasks
    showMakingTask.addEventListener("click", () => {
        makingTask.classList.remove("d-none");
        crackingTask.classList.add("d-none");
    });

    showCrackingTask.addEventListener("click", () => {
        crackingTask.classList.remove("d-none");
        makingTask.classList.add("d-none");
    });
});

const crackingTasks = [
    // Easy
    { id: 1, clue: "Your friend told you their favorite game's password is Puppy123 so you could help them log in while they are not home. Now you are trying to log into their email, what could the password be?", password: "Puppy123" },
    { id: 2, clue: "Your friend uses their birthday as their password. Their birthday is January 1st, 2000.", password: "01012000" },
    { id: 3, clue: "This user loves football, and their password is their favorite team: Manchester United.", password: "ManUtd" },
    { id: 4, clue: "Many people choose the simplest password possible. Guess this 4-digit one. Hint: it only uses the same number", password: "0000" },
    { id: 5, clue: "This user is a fan of the Star Wars series. Their password is the first name of the famous villain.", password: "Vader" },

    // Medium
    { id: 6, clue: "This user loves their pet cat Whiskers who is 3 years old.", password: "Whiskers3" },
    { id: 7, clue: "A tech-savvy user created a password based on a keyboard pattern starting with 'q' and ending at 'y'.", password: "qwerty" },
    { id: 8, clue: "This user combines their first name (Alice) and their birth year (1989) for their password.", password: "Alice1989" },
    { id: 9, clue: "The user's password is inspired by their favorite coffee order:'Latte with 1 milk, '", password: "Latte123!" },

    // Hard
    { id: 10, clue: "This password is a combination of the first three letters from each word of the user's favorite book ('Harry Potter') and their lucky number (7).", password: "HarPot7" },
    { id: 11, clue: "A cybersecurity-conscious user has created a password that meets common strength criteria: it is 12 characters long, includes uppercase and lowercase letters, a special character, and numbers. Here's a hint: it starts with 'Secure', something from an email address and a number that is made from this calculation: 20*101 + 100 - 96.", password: "Secure@2024" },
    { id: 12, clue: "This user is very creative and used a leetspeak-style password. They replaced letters with numbers for the word 'password'.", password: "p4ssw0rd" },

    // Hidden in words
    { id: 13, clue: "The password is hidden in the phrase: 'An Apple a day keeps the doctor away.' The first letter of each word spells out something important. What is it?", password: "AAadktda" },
    { id: 14, clue: "This person was born in 1980, and they always reverse the year for fun. What could their password be?", password: "0891" },
    { id: 15, clue: "This user is a hockey enthusiast from Finland. They watch the world championships every year. They say the first win is the most important.", password: "1995" }
];

// Evaluate Making Task
function evaluateMakingTask(taskId) {
    const input = document.getElementById(`makingInput-${taskId}`).value.trim();
    const feedback = document.getElementById(`makingFeedback-${taskId}`);
    let message = "";

    if (taskId === 1 && /^[a-z]+$/.test(input) && input.length <= 8) {
        message = "Correct! This is a simple and easy-to-guess password.";
    } else if (taskId === 2 && (input === "123456" || input === "12345678" || input === "password" || input === "Password" || input === "pass" || input === "admin")) {
        message = "Correct! This is a commonly used password.";
    } else if (taskId === 3 && input.length >= 8 && /[A-Z]/.test(input) && /[!@#$%^&*]/.test(input)) {
        message = "Correct! This is a strong password.";
    } else if (taskId === 4 && /^[a-z]+$/.test(input)) {
        message = "Correct! This password contains only lowercase letters.";
    } else if (taskId === 5 && /^[0-9]+$/.test(input)) {
        message = "Correct! This password contains only numbers.";
    } else if (taskId === 6 && /^[a-e]+$/.test(input)) {
        message = "Correct! This password contains only the first five letters of the alphabet.";
    } else if (taskId === 7 && /^[0-9]+[a-z]+$/.test(input)) {
        message = "Correct! This password contains a year followed by a name (in lowercase).";
    } else if (taskId === 8 && input.length >= 12 && /[a-z]/.test(input) && /[A-Z]/.test(input) && /\d/.test(input) && /[!@#$%^&*]/.test(input)) {
        message = "Correct! This is a strong password that is long and a mix of characters.";
    } else if (taskId === 9 && /[A-Za-z0-9]/.test(input) && /[!@#$%^&*()_+]/.test(input)) {
        message = "Correct! This password uses a pattern that's hard to guess but easy to remember.";
    } else if (taskId === 10 && /\d/.test(input) && /[a-zA-Z]/.test(input) && /[!@#$%^&*]/.test(input)) {
        message = "Correct! This is a memorable phrase with random words, numbers, and symbols.";
    } else {
        message = "Try again. Follow the task's instructions closely.";
    }

    feedback.textContent = message;
}


// Evaluate Cracking Task
function evaluateCrackingTask(taskId) {
    const input = document.getElementById(`crackingInput-${taskId}`).value.trim();
    const feedback = document.getElementById(`crackingFeedback-${taskId}`);
    const crackingTask = crackingTasks.find(task => task.id === taskId);

    if (input === crackingTask.password) {
        feedback.innerHTML = "<strong>Success!</strong> You cracked the password!";
    } else {
        feedback.innerHTML = "<strong>Failure!</strong> Try again.";
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

    if (password.length >= 12) {
        strength++;
    } else  if (password.length >= 8) {
        feedback.push("Password should be at least 8, but a great password has at least 12 characters.");
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
    if (password.length >= 12 && strength === 5) {
        strengthLevel = 'Excellent';
    } else if (password.length >= 8 && strength === 4) {
        strengthLevel = 'Very Good';
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
