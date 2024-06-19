let boxes = document.querySelectorAll(".btn");
let resetbtn = document.querySelector("#reset");
let msgContainer = document.querySelector(".msg-container");
let msgshow = document.querySelector(".hide");

let turno = true;
let count = 0;
const winning = [ [0,1,2], [0,3,6], [0,4,8], [1,4,7], [2,5,8], [2,4,6], [3,4,5], [6,7,8]];

const reset = () => {
    turno = true;
    count = 0;
    enable();
    msgContainer.classList.add("hide");
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turno){
            box.innerText = "0";
            turno = false;
        } else{
            box.innerText = "X";
            turno = true;
}
box.disabled = true;
count++;
let iswinner = winnercheck();
if(count === 9 && !iswinner){
    gamedraw();
}

    });
});

const gamedra = () => {
    msg.innerText=`Game was a draw`;
    msgContainer.classList.remove("hide");
    disable();
};



const enable = () => {
   for (let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
};

const disable = () => {
    for(let box of boxes){
        box.disabled = true;
    }
};

const showWinner = (winner) => {
    msg.innerText =`Congratulations , winner is ${winner}`;
    msgContainer.classList.add("hide");
    disable();
}


const winnercheck = () => {
    for(let pattern of winning){
     let pos1 = boxes[winning[0]].innerText;
     let pos2 = boxes[winning[1]].innerText;
     let pos3 = boxes[winning[2]].innerText;
     if(pos1 != "" && pos2 != "" && pos3 != ""){
        if(pos1 === pos2 && pos2 === pos3 && pos1 === pos3){
          showWinner(pos1);
          return true;
            
        }
     }
    }
}
  resetbtn.addEventListener("click", reset);  
