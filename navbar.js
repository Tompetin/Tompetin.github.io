// navbar.js
document.addEventListener("DOMContentLoaded", () => {
    const navbarContainer = document.getElementById("navbar-container");
    if (navbarContainer) {
        fetch("/navbar.html")
            .then(response => response.text())
            .then(html => {
                navbarContainer.innerHTML = html;
            })
            .catch(err => console.error("Error loading navbar:", err));
    }
});
