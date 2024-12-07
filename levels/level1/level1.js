const emails = [
    {
        id: 1,
        sender: "ben@b4nk.com",
        subject: "Important Notice - Account Compromised",
        content: `Dear Valued Customer,
            <br>
            We have detected suspicious activity in your account and temporarily suspended it for your safety.  
            To avoid permanent suspension, please verify your identity immediately by clicking the secure link below:  
            <br>
            <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">Verify My Account</a>  
            <br>
            Failure to act within 48 hours may result in account deactivation.  
            <br><br>
            Thank you for banking with us.  
            Sincerely,  
            Ben Clarke  
            Security Team, B4nk.com 
            `,
        isLegitimate: false,
    },
    {
        id: 2,
        sender: "it-dude@company.com",
        subject: "Invoice Request",
        content: `Hi John,  
            <br>
            As requested, we’ve attached the invoice for the recent software upgrade. Please review it and let us know if there’s anything else you need.  
            <br>
            Attachment: Invoice_Company123.pdf  
            <br><br>
            Best regards,  
            Jane Doe  
            IT Department  
            Company Inc.  
            <br>
            P.S. Remember to update your system passwords this week to maintain security compliance.`,
        isLegitimate: true,
    },
    {
        id: 3,
        sender: "mate232@gmail.com",
        subject: "Rare Loot Found!",
        content:`Hey Gamedestroyer,  
            <br>
            I just found an exclusive loot drop in Bestgame, and it’s only available for a limited time! You should claim it before it’s gone.  
            <br>
            Click the link below to secure your reward:  
            <a>https://www.suspicious-link.com</a>  
            <br>
            Let me know if you need any help. This stuff is crazy valuable!  
            <br><br>
            Cheers,  
            mate232  
            `,
        isLegitimate: false,
    },
    {
        id: 4,
        sender: "game-rewards@legitgame.com",
        subject: "You've Won Exclusive In-Game Rewards!",
        content: `
            Congratulations, player!
            <br><br>
            You have been selected as one of the lucky winners to receive exclusive rewards in <strong>LegitGame</strong>. 
            To claim your prize, please log in to your account by clicking the link below:
            <br>
            <a>https://claim-rewards-legitgame.com</a>
            <br><br>
            Hurry! The offer is valid for the next 24 hours only.
            <br><br>
            Best regards,<br>
            LegitGame Team
            `,
        isLegitimate: false,
    },
    {
        id: 5,
        sender: "no-reply@secure-login-banking.com",
        subject: "Your Account is Locked",
        content: `Dear User,
            <br>
            We have detected multiple failed login attempts to your account. As a result, it has been temporarily locked for your protection.  
            <br><br>
            To unlock your account, please confirm your identity using the link below:  
            <br>
            <a>https://secure-login-banking.com/unlock</a>  
            <br><br>
            Thank you,  
            Secure Banking Team
            `,
        isLegitimate: false,
    },
    {
        id: 6,
        sender: "info@amaz-on.support",
        subject: "Your Order #12345 Couldn't Be Delivered",
        content: `Hi,  
            <br>
            We couldn't deliver your order due to an issue with the shipping address. Please confirm your details to ensure future deliveries.  
            <br>
            Click below to update your shipping information:  
            <br>
            <a>https://amaz-on.support/update</a>  
            <br><br>
            Regards,  
            Amazon Support Team`,
        isLegitimate: false,
    },
    {
        id: 7,
        sender: "notifications@paypal.com",
        subject: "Unusual Activity Detected on Your Account",
        content: `Hello,  
            <br>
            We’ve detected unusual activity on your PayPal account. Please log in to verify recent transactions:  
            <br>
            <a>https://www.paypal.com/authenticate</a>  
            <br><br>
            If you don’t recognize this activity, we recommend changing your password immediately.  
            <br><br>
            Best regards,  
            PayPal Security Team`,
        isLegitimate: true,
    },
    {
        id: 8,
        sender: "admin@university.edu",
        subject: "Mandatory Password Update Required",
        content: `Dear Student,  
            <br>
            As part of our annual IT security audit, all students are required to update their account passwords. Please follow the secure link below to proceed:  
            <br>
            <a>https://university.edu/update-password</a>  
            <br><br>
            If you have already updated your password, no further action is needed.  
            <br><br>
            Regards,  
            University IT Services`,
        isLegitimate: true,
    },
    {
        id: 9,
        sender: "promotions@xyz-shopping.com",
        subject: "You've Won a $500 Gift Card!",
        content: `Congratulations!  
            <br>
            You’ve been selected as the winner of a $500 gift card to XYZ Shopping.  
            To claim your reward, please click the link below:  
            <br>
            <a>https://xyz-shopping.com/rewards</a>  
            <br><br>
            Offer valid until the end of the day!  
            <br><br>
            Happy Shopping,  
            XYZ Team`,
        isLegitimate: false,
    },
    {
        id: 10,
        sender: "hr@company.com",
        subject: "Employee Survey Invitation",
        content: `Dear Team Member,  
            <br>
            We value your feedback and invite you to participate in our anonymous employee satisfaction survey.  
            Please use the link below to share your thoughts:  
            <br>
            <a>https://company.com/survey</a>  
            <br><br>
            Thank you for helping us improve!  
            <br><br>
            Best regards,  
            HR Department`,
        isLegitimate: true,
    },
    {
        id: 11,
        sender: "customer-service@fbk.com",
        subject: "Important: Account Verification Needed",
        content: `Dear Customer,  
            <br>
            For security reasons, we need to verify your account. Please provide your personal details through the secure link below:  
            <br>
            <a>https://fbk.com/verify</a>  
            <br><br>
            Failure to do so will result in your account being restricted.  
            <br><br>
            Thank you,  
            FBK Customer Service`,
        isLegitimate: false,
    },
    {
        id: 12,
        sender: "security@legit-bank.com",
        subject: "Critical: Immediate Action Required",
        content: `Dear Customer,  
            <br>
            A critical security issue has been detected in our systems. Please log in to your account to review the details and secure your account:  
            <br>
            <a>https://legit-bank.com/security-alert</a>  
            <br><br>
            Thank you,  
            Legit Bank Security Team`,
        isLegitimate: true,
    },
];


function closeEmail() {
    document.getElementById("emailViewer").classList.add("d-none");
    document.getElementById("emailUI").classList.remove("d-none");
}

function submitAnswer(isLegitimate) {
    const feedback = document.getElementById("feedback");

    // Get current email's legitimacy and id
    const correct = document.getElementById("emailViewer").dataset.isLegitimate === "true";
    const emailId = parseInt(document.getElementById("emailViewer").dataset.id);

    // Check if the user's answer matches the email's legitimacy
    if (isLegitimate.toString() === correct.toString()) {
        feedback.textContent = getFeedback(emailId, true);
        feedback.className = "text-success";
    } else {
        feedback.textContent = getFeedback(emailId, false);
        feedback.className = "text-danger";
    }
}

// Feedback based on email ID
function getFeedback(emailId, isCorrect) {
    switch (emailId) {
        case 1:
            return isCorrect
                ? "Correct! Email 1 is a phishing attempt. Be aware of fake banking links and wrong looking senders."
                : "Oops! Email 1 is phishing. Check the senders email and suspicious links. See also how the senders email has a 4 instead of an A.";
        case 2:
            return isCorrect
                ? "Correct! Email 2 is legitimate. It's from a trusted sender."
                : "Oops! Email 2 is legitimate. Look closely at the sender and content.";
        case 3:
            return isCorrect
                ? "Correct! Email 3 is a phishing attempt. Your friend's account may be compromised."
                : "Oops! Email 3 is phishing. Even trusted emails can contain malicious links.";
        case 4:
            return isCorrect
                ? "Correct! Email 4 is a phishing attempt. Suspicious links are a red flag."
                : "Oops! Email 4 is phishing. Double-check the link before trusting it.";
        case 5:
            return isCorrect
                ? "Correct! Email 5 is phishing. The domain and urgency are suspicious."
                : "Oops! Email 5 is phishing. Verify the sender's domain next time.";
        case 6:
            return isCorrect
                ? "Correct! Email 6 is phishing. Notice the misspelled Amazon domain."
                : "Oops! Email 6 is phishing. Check for subtle typos in sender domains.";
        case 7:
            return isCorrect
                ? "Correct! Email 7 is legitimate. PayPal uses secure domains."
                : "Oops! Email 7 is legitimate. Always verify sender authenticity.";
        case 8:
            return isCorrect
                ? "Correct! Email 8 is legitimate. Universities often require password updates."
                : "Oops! Email 8 is legitimate. Remember to check trusted sources.";
        case 9:
            return isCorrect
                ? "Correct! Email 9 is phishing. Beware of too-good-to-be-true offers."
                : "Oops! Email 9 is phishing. Avoid clicking on links in reward emails.";
        case 10:
            return isCorrect
                ? "Correct! Email 10 is legitimate. It's a genuine internal survey invitation."
                : "Oops! Email 10 is legitimate. Surveys from known organizations are safe.";
        case 11:
            return isCorrect
                ? "Correct! Email 11 is phishing. The email asks for sensitive data unnecessarily."
                : "Oops! Email 11 is phishing. Never provide personal details via email.";
        case 12:
            return isCorrect
                ? "Correct! Email 12 is legitimate. It matches the bank's communication style."
                : "Oops! Email 12 is legitimate. Legit banks provide clear and verified links.";
        default:
            return "Invalid email ID.";
    }
}

function openEmail(id) {
    const email = emails.find((e) => e.id === id);

    if (!email) {
        document.getElementById("emailViewer").innerHTML = "<strong>Invalid email ID!</strong>";
        return;
    }

    document.getElementById("emailViewer").classList.remove("d-none");
    document.getElementById("emailUI").classList.add("d-none");

    document.getElementById("emailSender").textContent = email.sender;
    document.getElementById("emailSubject").textContent = email.subject;
    document.getElementById("emailContent").innerHTML = email.content;

    

    // Handle envelope icon
    const emailIcon = document.querySelector(`#email-icon-${id}`);
    if (emailIcon && !emailIcon.classList.contains("fa-envelope-open")) {
        emailIcon.classList.remove("fa-envelope");
        emailIcon.classList.add("fa-envelope-open");
    }

    // Store the current email's legitimacy and ID
    const emailViewer = document.getElementById("emailViewer");
    emailViewer.dataset.isLegitimate = email.isLegitimate;
    emailViewer.dataset.id = email.id;

    // Clear hint feedback
    const hintElement = document.getElementById("hint");
    hintElement.textContent = "";

    // Update the Next Email button's visibility
    const nextEmailButton = document.getElementById("nextEmailButton");
    if (id < emails.length) {
        nextEmailButton.classList.remove("d-none");
    } else {
        nextEmailButton.classList.add("d-none");
    }
}



function showHint() {
    const emailId = parseInt(document.getElementById("emailViewer").dataset.id);
    const hintElement = document.getElementById("hint");
    hintElement.textContent = '';
    // Provide hints based on the email ID
    switch (emailId) {
        case 1:
            hintElement.textContent = "Hint: Look closely at the URL in the link and the senders email. Is it really from your bank?";
            break;
        case 2:
            hintElement.textContent = "Hint: Consider the sender's email address and the tone of the content.";
            break;
        case 3:
            hintElement.textContent = "Hint: Check the link's URL. Is it from a trusted source?";
            break;
        case 4:
            hintElement.textContent = "Hint: Legitimate game companies often use official domains. Does this one?";
            break;
        case 5:
            hintElement.textContent = "Hint: Does the sender's email look suspicious? Are they creating urgency?";
            break;
        case 6:
            hintElement.textContent = "Hint: The domain 'amaz-on.support' looks odd. Does it match Amazon's usual format?";
            break;
        case 7:
            hintElement.textContent = "Hint: PayPal notifications typically use their secure domain. Is the sender valid?";
            break;
        case 8:
            hintElement.textContent = "Hint: Does the email come from your official university domain?";
            break;
        case 9:
            hintElement.textContent = "Hint: Is the reward too good to be true? Be cautious of unexpected gifts.";
            break;
        case 10:
            hintElement.textContent = "Hint: Employee surveys usually come from internal HR addresses. Is this consistent?";
            break;
        case 11:
            hintElement.textContent = "Hint: Does the sender ask for sensitive information without justification?";
            break;
        case 12:
            hintElement.textContent = "Hint: Is the bank's email address official, and are the links valid?";
            break;
        default:
            hintElement.textContent = "No hint available for this email.";
    }
}

function nextEmail() {
    const emailViewer = document.getElementById("emailViewer");
    const currentId = parseInt(emailViewer.dataset.id, 10);
    const hintElement = document.getElementById("hint");
    hintElement.textContent = '';

    // Move to the next email if it exists
    if (currentId < emails.length) {
        openEmail(currentId + 1);
    }
    const feedback = document.getElementById("feedback");
    feedback.textContent = ""
}
