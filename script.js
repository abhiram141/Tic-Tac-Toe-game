let boxes = document.querySelectorAll(".btn");
let resetbtn = document.querySelector("#reset");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let turno = true;
let count = 0;
const winning = [
    [0, 1, 2], [0, 3, 6], [0, 4, 8], 
    [1, 4, 7], [2, 5, 8], [2, 4, 6], 
    [3, 4, 5], [6, 7, 8]
];

// Reset function to initialize the game
const reset = () => {
    turno = true;
    count = 0;
    enable(); // Enable all boxes
    msgContainer.classList.add("hide"); // Hide message container
    msg.innerText = ""; // Clear message text
    boxes.forEach(box => {
        box.innerText = ""; // Clear text content of each box
        box.disabled = false; // Enable each box
    });
    // Re-add click event listeners to each box
    boxes.forEach(box => {
        box.addEventListener("click", handleClick);
    });
};

// Function to handle clicks on boxes
const handleClick = (event) => {
    let box = event.target;
    if (turno) {
        box.innerText = "O";
    } else {
        box.innerText = "X";
    }
    turno = !turno; // Toggle turn
    box.disabled = true; // Disable the clicked box
    count++; // Increase move count
    let iswinner = winnercheck(); // Check for winner
    if (count === 9 && !iswinner) {
        gamedraw(); // Check for draw
    }
};

// Function to check if there's a winner
const winnercheck = () => {
    for (let pattern of winning) {
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;
        if (pos1 !== "" && pos1 === pos2 && pos2 === pos3) {
            showWinner(pos1); // Display winner
            return true; // Return true if there's a winner
        }
    }
    return false; // Return false if no winner
};

// Function to handle a draw
const gamedraw = () => {
    msg.innerText = "Game was a draw";
    msgContainer.classList.remove("hide"); // Show message container
    disable(); // Disable all boxes
};

// Function to disable all boxes
const disable = () => {
    boxes.forEach(box => {
        box.disabled = true; // Disable each box
        box.removeEventListener("click", handleClick); // Remove click event listener
    });
};

// Function to enable all boxes
const enable = () => {
    boxes.forEach(box => {
        box.disabled = false; // Enable each box
    });
};

// Function to show the winner
const showWinner = (winner) => {
    msg.innerText = `Congratulations, winner is ${winner}`;
    msgContainer.classList.remove("hide"); // Show message container
    disable(); // Disable all boxes
};

// Add click event listener to the reset button
resetbtn.addEventListener("click", reset);

// Initialize game by adding click event listeners to all boxes
boxes.forEach(box => {
    box.addEventListener("click", handleClick);
});
