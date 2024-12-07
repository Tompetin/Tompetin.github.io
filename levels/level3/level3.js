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
const winPoints = 1000;
let difficulty = "Medium";
let gameMode = "Standard";
let spawnRate = 1500; // Default spawn rate for Medium

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

    document.getElementById("startButton").addEventListener("click", () => {
        chooseDifficulty();
        chooseGameMode();
    });

    document.getElementById("restartButton").addEventListener("click", restartGame);
});

function updateStats() {
    document.getElementById("funds").textContent = funds;
    document.getElementById("serverHealth").textContent = serverHealth;
    document.getElementById("points").textContent = points;
}

function chooseDifficulty() {
    // Read the selected difficulty from the dropdown
    const difficultySelect = document.getElementById("difficultySelect");
    difficulty = difficultySelect.value;

    // Set spawn rate based on difficulty
    switch (difficulty) {
        case "Medium":
            spawnRate = 800;
            break;
        case "Hard":
            spawnRate = 100;
            break;
        default: // Default to "Medium"
            spawnRate = 1500;
    }

    console.log(`Difficulty selected: ${difficulty}, Spawn Rate: ${spawnRate}`); // Debugging line
    startGame();
}


function chooseGameMode() {
    // Read the selected game mode from the dropdown
    const gameModeSelect = document.getElementById("gameModeSelect");
    gameMode = gameModeSelect.value;
    
    console.log(`Game Mode selected: ${gameMode}`); // Debugging line
}

function startGame() {
    if (gameRunning) return;
    gameRunning = true;

    // Ensure difficulty and game mode are selected
    chooseDifficulty();
    chooseGameMode();

    console.log(`Starting game in ${gameMode} mode with ${difficulty} difficulty.`); // Debugging line

    // Set spawn rate based on difficulty
    switch (difficulty) {
        case "Easy":
            spawnRate = 1500;
            break;
        case "Hard":
            spawnRate = 650;
            break;
        default:
            spawnRate = 1000;
    }

    // Hide the setup and start the game
    document.getElementById("gameSetup").style.display = "none";
    document.getElementById("startButton").style.display = "none";
    document.getElementById("gameExplanation").style.display = "none";
    document.getElementById("hide").style.display = '';
    document.getElementById("hide2").style.display = '';

    spawnTraffic();
    gameInterval = setInterval(moveTraffic, spawnRate);
}


function spawnTraffic() {
    const maliciousCount = difficulty === "Easy" ? 2 : difficulty === "Hard" ? 6 : 4;
    const normalCount = difficulty === "Easy" ? 4 : difficulty === "Hard" ? 2 : 3;

    maliciousIPs = Array.from({ length: maliciousCount }, () => Math.floor(Math.random() * cols));
    normalIPs = Array.from({ length: normalCount }, () => Math.floor(Math.random() * cols));

    maliciousIPs.forEach(index => grid[index].type = "malicious");
    normalIPs.forEach(index => grid[index].type = "normal");
    renderGrid();
}

function moveTraffic() {
    let newMaliciousIPs = [];
    let newNormalIPs = [];

    if (grid.some(cell => cell.type === "analyzer")) {
        frozenIPs = maliciousIPs.slice();
        maliciousIPs = [];
    }

    maliciousIPs.forEach((index) => {
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
                setLabel(index, `Bad`);
                newMaliciousIPs.push(index);
            } else {
                grid[index].type = "empty";
                grid[nextIndex].type = "malicious";
                setLabel(nextIndex, `Bad`);
                newMaliciousIPs.push(nextIndex);
            }
        } else {
            serverHealth -= 10;
            grid[index].type = "empty";
        }
    });

    normalIPs.forEach((index) => {
        const nextIndex = index + cols;

        clearLabel(index);

        if (nextIndex < totalCells) {
            if (grid[nextIndex].type !== "malicious") {
                grid[index].type = "empty";
                grid[nextIndex].type = "normal";
                newNormalIPs.push(nextIndex);
            } else {
                newNormalIPs.push(index);
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
        case "firewall":
            return gameMode === "Infinite" ? 60 : 100;
        case "rateLimiter":
            return 20;
        case "analyzer":
            return 70;
        default:
            return 0;
    }
}

function selectDefense(defense) {
    selectedDefense = defense;
}

function checkGameOver() {
    if (serverHealth <= 0) {
        clearInterval(gameInterval);
        alert("Game Over! The server has been overwhelmed.");
    }

    // Skip the win condition based on points in Infinite mode
    if (gameMode === "Standard" && points >= winPoints) {
        clearInterval(gameInterval);
        alert("You won! Congratulations!");
    }
}


function restartGame() {
    location.reload();
}