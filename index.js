const allBtn = document.querySelectorAll(".box");
const turnStatus = document.getElementById("status");
const restartGame = document.getElementById("restart");
const mainDiv = document.querySelector(".container");

let f = false;
const win = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let pathx = [];
let pathy = [];
let initialTurn = "X";

const check = (ar, player) => {
  // console.log("check for " + ar);
  for (let e of win) {
    let cnt = 0;
    for (let i of e) {
      for (let k of ar) {
        if (k == i) {
          cnt++;
        }
      }
    }
    if (cnt == 3) {
      turnStatus.innerHTML = `Player ${player} wins`;
      f = true;
      mainDiv.style.display = "none";
    }
    if (pathx.length + pathy.length == 9) {
      turnStatus.innerHTML = "Match draw";
      f = true;
      mainDiv.style.display = "none";
    }
  }
};

const getCellIndexFromClick = (event) => {
  let cell = event.target,
    nodes = cell.parentNode.childNodes;
  // console.log(nodes);
  let ind = 0;
  for (let i = 1; i < nodes.length; i += 2) {
    if (nodes[i] === cell) {
      return ind;
    }
    ind++;
  }
};

allBtn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    btn.innerHTML = initialTurn;

    let ind = getCellIndexFromClick(e);
    if (initialTurn == "X") {
      pathx.push(ind);
      initialTurn = "0";
    } else {
      pathy.push(ind);
      initialTurn = "X";
    }

    check(pathx, "X");
    check(pathy, "0");
    if (f == false) turnStatus.innerHTML = `Player ${initialTurn} turn`;
  });
});

restartGame.addEventListener("click", () => {
  initialTurn = "X";
  pathx = [];
  pathy = [];

  allBtn.forEach((btn) => {
    btn.innerHTML = "";
    f = false;
    turnStatus.innerHTML = `Player ${initialTurn} turn`;
    mainDiv.style.display = "grid";
  });
});
