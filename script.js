let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset");
let newGamebtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true; //payer x ,player o

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];


// X ya O select karna
const win = false;
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    console.log("box clicked");
    if (turnO) {
      box.innerText = "O";
      turnO = false;
    } else {
      box.innerText = "X";
      turnO = true;
    }
    box.disabled = true;

    checkWinner();
   
  });

});

//game jitne k baad box ko disable karna
const disabledBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

//after reset btn click boxes ko enable krna
const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = " ";
  }
};

//winner show karna
const showWinner = (winner) => {
  console.log(winner);
  msg.innerText = `Congratulations, Winner is ${winner} `;
  msgContainer.classList.remove("hidden");
  disabledBoxes();
};

const showDraw = () => {
  msg.innerText = "It's a Draw!";
  msgContainer.classList.remove("hidden");
  disabledBoxes();
};

//winner check karna
const checkWinner = () => {
  for (pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        console.log('winner', pos1Val)
        win = true;
        showWinner(pos1Val);
      }
    }
  }
  if (Array.from(boxes).every(box => box.innerText !== "")) {
    showDraw();
  }
};

//game ko reset karna
const resetGame = () => {
  turnO = true;
  enableBoxes();
  msgContainer.classList.add("hidden");
};


newGamebtn.addEventListener("click", resetGame);
resetbtn.addEventListener("click", resetGame);
