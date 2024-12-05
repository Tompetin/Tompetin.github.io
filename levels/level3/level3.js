let funds = 1000;
let serverHealth = 100;
let points = 0;
let selectedDefense = null;
let gameInterval;
let grid = [];
let maliciousIPs = [];
let normalIPs = [];
let gameRunning = false;
let frozenIPs = [];
const rows = 10;
const cols = 8;
const totalCells = rows * cols;
const winPoints = 1000; // Points to win the game

document.addEventListener("DOMContentLoaded", () => {
    const gridContainer = document.querySelector(".grid-container");
    gridContainer.style.gridTemplateRows = `repeat(${rows}, 1fr)`;

    for (let i = 0; i < totalCells; i++) {
        const cell = document.createElement("div");
        cell.className = "grid-item";
        cell.dataset.index = i;

        cell.addEventListener("click", () => {
            placeDefense(i);
        });

        grid.push({ type: "empty", element: cell });
        gridContainer.appendChild(cell);
    }

    document.getElementById("startButton").addEventListener("click", startGame);
    document.getElementById("restartButton").style.display = "block"; // Ensure visibility
    document.getElementById("restartButton").addEventListener("click", restartGame);
});

function startGame() {
    if (gameRunning) return;
    gameRunning = true;

    // Hide the start button and the game explanation section after the game starts
    document.getElementById("startButton").style.display = "none";
    document.getElementById("gameExplanation").style.display = "none";

    spawnTraffic();
    gameInterval = setInterval(moveTraffic, 1500);
}

function spawnTraffic() {
    maliciousIPs = Array.from({ length: 4 }, () => Math.floor(Math.random() * cols));
    normalIPs = Array.from({ length: 3 }, () => Math.floor(Math.random() * cols));
    maliciousIPs.forEach(index => grid[index].type = "malicious");
    normalIPs.forEach(index => grid[index].type = "normal");
    renderGrid();
}

function moveTraffic() {
    let newMaliciousIPs = [];
    let newNormalIPs = [];

    // Freeze all malicious IPs if an analyzer is placed
    if (grid.some(cell => cell.type === "analyzer")) {
        frozenIPs = maliciousIPs.slice();  // Copy malicious IPs to frozenIPs array
        maliciousIPs = []  // Stop moving malicious IPs
    }

    maliciousIPs.forEach((index, i) => {
        const nextIndex = index + cols;

        clearLabel(index);

        if (nextIndex < totalCells) {
            if (grid[nextIndex].type === "firewall") {
                grid[index].type = "empty";
                grid[nextIndex].type = "empty";
                funds += 50;
                points += 50;
            } else if (grid[nextIndex].type === "rateLimiter") {
                grid[nextIndex].useCount -= 1;
                if (grid[nextIndex].useCount <= 0) {
                    grid[nextIndex].type = "empty";
                }
                setLabel(index, `Bad-${i + 1}`);
                newMaliciousIPs.push(index);
            } else {
                grid[index].type = "empty";
                grid[nextIndex].type = "malicious";
                setLabel(nextIndex, `Bad-${i + 1}`);
                newMaliciousIPs.push(nextIndex);
            }
        } else {
            // If a malicious IP reaches the end, subtract health and remove it from the grid
            serverHealth -= 10;
            grid[index].type = "empty";  // Clear it from the grid
        }
    });

    normalIPs.forEach((index, i) => {
        const nextIndex = index + cols;

        clearLabel(index);

        if (nextIndex < totalCells) {
            if (grid[nextIndex].type === "firewall") {
                // Skip firewalls
                newNormalIPs.push(index);
            } else {
                grid[index].type = "empty";
                grid[nextIndex].type = "normal";
                newNormalIPs.push(nextIndex);
            }
        } else {
            grid[index].type = "empty";
            funds += 20;
            points += 20;
        }
    });

    maliciousIPs = newMaliciousIPs;
    normalIPs = newNormalIPs;

    renderGrid();
    updateStats();
    checkGameOver();

    if (maliciousIPs.length === 0 && normalIPs.length === 0) {
        spawnTraffic();
    }
}

function clearLabel(index) {
    const cell = grid[index].element;
    if (cell) cell.innerHTML = "";
}

function setLabel(index, labelText) {
    const cell = grid[index].element;
    if (cell) {
        // Combine labels for clumped IPs
        const currentLabel = cell.innerHTML ? cell.innerHTML : "";
        if (currentLabel.includes("Bad") || currentLabel.includes("Multiple Bad")) {
            cell.innerHTML = `<span class="ip-label">Multiple Bad</span>`;
        } else {
            cell.innerHTML = `<span class="ip-label">${labelText}</span>`;
        }
    }
}

function placeDefense(index) {
    if (!selectedDefense || funds < getDefenseCost(selectedDefense) || grid[index].type !== "empty") return;

    funds -= getDefenseCost(selectedDefense);
    grid[index].type = selectedDefense;
    if (selectedDefense === "rateLimiter") grid[index].useCount = 2;
    renderGrid();
    updateStats();
}

function getDefenseCost(defense) {
    switch (defense) {
        case "firewall": return 100;
        case "rateLimiter": return 20;
        case "analyzer": return 70; // Updated cost for Traffic Analyzer
        default: return 0;
    }
}

function selectDefense(defense) {
    selectedDefense = defense;
}

function renderGrid() {
    grid.forEach(cell => {
        const element = cell.element;
        element.className = "grid-item";

        if (cell.type === "malicious") element.classList.add("malicious");
        if (cell.type === "normal") element.classList.add("normal");
        if (cell.type === "firewall") element.classList.add("firewall");
        if (cell.type === "rateLimiter") element.classList.add("rate-limiter");
        if (cell.type === "analyzer") element.classList.add("analyzer");
    });
}

function updateStats() {
    document.getElementById("funds").textContent = funds;
    document.getElementById("serverHealth").textContent = serverHealth;
    document.getElementById("points").textContent = points;
}

function checkGameOver() {
    if (serverHealth <= 0) {
        clearInterval(gameInterval);
        alert("Game Over! The server has been overwhelmed.");
    } else if (points >= winPoints) {
        clearInterval(gameInterval);
        alert("You won! Congratulations!");
    }
}

function restartGame() {
    location.reload();
}
