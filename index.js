const snakeContainer = document.querySelector(".snakeContainer");
let snakeHead = document.querySelector(".snakeHead");
const snakeSegments = document.getElementsByClassName("snake");
const snakeFood = document.querySelector(".snakeFood");
const canvas = document.querySelector(".canvas");
const startBtn = document.querySelector("#startBtn");
const resetBtn = document.querySelector("#resetBtn");
const newGame = document.querySelector(".newGame");
const playAgain = document.querySelector(".playAgain");
const controllerContainer = document.querySelector(".controllerContainer");
const leftController = document.querySelector("#leftController");
const upController = document.querySelector("#upController");
const rightController = document.querySelector("#rightController");
const downController = document.querySelector("#downController");

let moveLeftInterval;
let moveUpInterval;
let moveRightInterval;
let moveDownInterval;
let score = 0;

let yAxisCounter;
let xAxisCounter;

xAxisCounter = 16;
yAxisCounter = canvas.getBoundingClientRect().bottom / 2;

snakeHead.style.top = yAxisCounter;
snakeHead.style.left = xAxisCounter;

function start() {
    sessionStorage.setItem("playing", "true");
    makeSnakeFoodAppearRandomly();
    moveRight();
    document.addEventListener("keydown", event => {
        if (event.keyCode === 37) {
            if (xAxisCounter === 0) {
                return;
            }
            if (moveRightInterval) {
                return;
            }
            clearAllIntervals();
            resetIntervalValues();
            moveLeft();
        } else if (event.keyCode === 38) {
            if (yAxisCounter === 0) {
                return;
            }
            if (moveDownInterval) {
                return;
            }
            clearAllIntervals();
            resetIntervalValues();
            moveUp();
        } else if (event.keyCode === 39) {
            if (canvas.getBoundingClientRect().right === xAxisCounter + 16) {
                return;
            }
            if (moveLeftInterval) {
                return;
            }
            clearAllIntervals();
            resetIntervalValues();
            moveRight();
        } else if (event.keyCode === 40) {
            if (canvas.getBoundingClientRect().bottom === yAxisCounter + 16) {
                return;
            }
            if (moveUpInterval) {
                return;
            }
            clearAllIntervals();
            resetIntervalValues();
            moveDown();
            /* 
                                    console.log('Move Down ', moveDownInterval);
                                    console.log('Move Down ', moveDownInterval); */
        }
    });

    leftController.addEventListener("click", () => {
        if (xAxisCounter === 0) {
            return;
        }
        if (moveRightInterval) {
            return;
        }
        clearAllIntervals();
        resetIntervalValues();
        moveLeft();
    });
    upController.addEventListener("click", () => {
        if (yAxisCounter === 0) {
            return;
        }
        if (moveDownInterval) {
            return;
        }
        clearAllIntervals();
        resetIntervalValues();
        moveUp();
    });
    rightController.addEventListener("click", () => {
        if (canvas.getBoundingClientRect().right === xAxisCounter + 16) {
            return;
        }
        if (moveLeftInterval) {
            return;
        }
        clearAllIntervals();
        resetIntervalValues();
        moveRight();
    });
    downController.addEventListener("click", () => {
        if (canvas.getBoundingClientRect().bottom === yAxisCounter + 16) {
            return;
        }
        if (moveUpInterval) {
            return;
        }
        clearAllIntervals();
        resetIntervalValues();
        moveDown();
    });

    newGame.style.display = "none";
    controllerContainer.style.display = "block";
}

const moveLeft = () => {
    let snakeWidth = parseInt(snakeHead.clientWidth);
    snakeHead.style.left = parseInt(snakeHead.style.left) - parseInt(snakeWidth);
    moveLeftInterval = setInterval(moveSnakeLeft, 800);
};
const moveUp = () => {
    let snakeWidth = parseInt(snakeHead.clientWidth);
    snakeHead.style.top = parseInt(snakeHead.style.top) - parseInt(snakeWidth);
    moveUpInterval = setInterval(moveSnakeUp, 800);
};
const moveRight = () => {
    let snakeWidth = parseInt(snakeHead.clientWidth);
    // let newSnakeDistance = parseInt(snakeHead.style.left) + parseInt(snakeWidth);
    snakeHead.style.left = parseInt(snakeHead.style.left) + parseInt(snakeWidth);
    moveRightInterval = setInterval(moveSnakeRight, 800);
};
const moveDown = () => {
    let snakeWidth = parseInt(snakeHead.clientWidth);
    snakeHead.style.top = parseInt(snakeHead.style.top) + parseInt(snakeWidth);
    moveDownInterval = setInterval(moveSnakeDown, 800);
};

const resetIntervalValues = () => {
    moveLeftInterval = undefined;
    moveUpInterval = undefined;
    moveRightInterval = undefined;
    moveDownInterval = undefined;
};

const moveSnakeRight = () => {
    xAxisCounter++;
    const newSegment = document.createElement("div");
    snakeHead.classList.remove("snakeHead");
    newSegment.classList.add("snake", "snakeHead");
    newSegment.style.top = parseInt(snakeSegments[0].style.top);
    newSegment.style.left = parseInt(snakeSegments[0].style.left) + 16;
    snakeSegments[0].parentNode.prepend(newSegment);
    snakeSegments[0].parentNode.removeChild(
        snakeSegments[snakeSegments.length - 1]
    );
    /* let snakeWidth = parseInt(snakeHead.clientWidth);
        let newSnakeDistance = parseInt(snakeHead.style.left) + parseInt(snakeWidth);
        snakeHead.style.left = newSnakeDistance
        document.addEventListener('keydown', (event) => {
            if (event.keycode === 40) {
                return null;
            }
        }) */
    hasSnakeEaten();
    /* moveSnakeBodyRight(); */
    if (
        parseInt(newSegment.style.left) + 16 >=
        canvas.getBoundingClientRect().right
    ) {
        console.log("Game Over");
        gameOver();
    }
};
const moveSnakeLeft = () => {
    /* let snakeWidth = parseInt(snakeHead.clientWidth);
        let snakeDistancePerMove = snakeWidth;
        let newSnakeDistance = parseInt(snakeHead.style.left) - parseInt(snakeWidth);
        snakeHead.style.left = newSnakeDistance; */
    const newSegment = document.createElement("div");
    snakeHead.classList.remove("snakeHead");
    newSegment.classList.add("snake", "snakeHead");
    newSegment.style.top = parseInt(snakeSegments[0].style.top);
    newSegment.style.left = parseInt(snakeSegments[0].style.left) - 16;
    snakeSegments[0].parentNode.prepend(newSegment);
    snakeSegments[0].parentNode.removeChild(
        snakeSegments[snakeSegments.length - 1]
    );
    hasSnakeEaten();

    /* moveSnakeBodyLeft(); */
    if (parseInt(newSegment.style.left) === canvas.getBoundingClientRect().left) {
        console.log("Game Over");
        gameOver();
    }
};
const moveSnakeUp = () => {
    /* let snakeWidth = parseInt(snakeHead.clientWidth);
        let snakeDistancePerMove = snakeWidth;
        let newSnakeDistance = parseInt(snakeHead.style.top) - parseInt(snakeWidth);
        snakeHead.style.top = newSnakeDistance; */
    const newSegment = document.createElement("div");
    snakeHead.classList.remove("snakeHead");
    newSegment.classList.add("snake", "snakeHead");
    newSegment.style.left = parseInt(snakeSegments[0].style.left);
    newSegment.style.top = parseInt(snakeSegments[0].style.top) - 16;
    snakeSegments[0].parentNode.prepend(newSegment);
    snakeSegments[0].parentNode.removeChild(
        snakeSegments[snakeSegments.length - 1]
    );
    hasSnakeEaten();
    /* moveSnakeBodyUp(); */
    if (parseInt(newSegment.style.top) === canvas.getBoundingClientRect().top) {
        console.log("Game Over");
        gameOver();
    }
};
const moveSnakeDown = () => {
    /* let snakeWidth = parseInt(snakeHead.clientWidth);
        let newSnakeDistance = parseInt(snakeHead.style.top) + parseInt(snakeWidth);
        snakeHead.style.top = newSnakeDistance; */

    const newSegment = document.createElement("div");
    snakeHead.classList.remove("snakeHead");
    newSegment.classList.add("snake", "snakeHead");
    newSegment.style.left = parseInt(snakeSegments[0].style.left);
    newSegment.style.top = parseInt(snakeSegments[0].style.top) + 16;
    snakeSegments[0].parentNode.prepend(newSegment);
    snakeSegments[0].parentNode.removeChild(
        snakeSegments[snakeSegments.length - 1]
    );
    hasSnakeEaten();
    /* moveSnakeBodyDown(); */
    if (
        parseInt(snakeSegments[0].style.top) + 16 ===
        canvas.getBoundingClientRect().bottom
    ) {
        console.log("Game Over");
        gameOver();
    }
};

const moveSnakeBodyRight = () => {
    if (snakeSegments.length > 1) {
        for (let i = 1; i <= snakeSegments.length; i++) {
            new Promise(resolve => {
                snakeSegments[i].style.left =
                    parseInt(snakeSegments[i - 1].style.left) - 16;
                if (snakeSegments[i].style.left === snakeSegments[i - 1].style.left) {
                    resolve();
                }
            });
        }
    }
};
const moveSnakeBodyLeft = () => {
    if (snakeSegments.length > 1) {
        for (let i = 1; i <= snakeSegments.length; i++) {
            new Promise(resolve => {
                snakeSegments[i].style.left =
                    parseInt(snakeSegments[i - 1].style.left) + 16;
                if (snakeSegments[i].style.left === snakeSegments[i - 1].style.left) {
                    return resolve;
                }
            });
        }
    }
};
const moveSnakeBodyUp = () => {
    if (snakeSegments.length > 1) {
        for (let i = 1; i <= snakeSegments.length; i++) {
            new Promise(resolve => {
                snakeSegments[i].style.top =
                    parseInt(snakeSegments[i - 1].style.top) + 16;
                if (snakeSegments[i].style.left === snakeSegments[i - 1].style.left) {
                    return resolve;
                }
            });
        }
    }
};
const moveSnakeBodyDown = () => {
    if (snakeSegments.length > 1) {
        for (let i = 1; i <= snakeSegments.length; i++) {
            new Promise(resolve => {
                snakeSegments[i].style.top =
                    parseInt(snakeSegments[i - 1].style.top) - 16;
                if (snakeSegments[i].style.left === snakeSegments[i - 1].style.left) {
                    return resolve;
                }
            });
        }
    }
};

startBtn.addEventListener("click", start);
resetBtn.addEventListener("click", () => {
    location.reload();
    start();
});

const gameOver = () => {
    if ("vibrate" in navigator) {
        window.navigator.vibrate(800);
    }
    clearAllIntervals();
    document.addEventListener("keydown", event => {
        event.preventDefault();
        event.stopPropagation();
        if (event.keyCode === 37) {
            clearInterval(moveLeftInterval);
            return;
        } else if (event.keyCode === 38) {
            clearInterval(moveUpInterval);
            return;
        } else if (event.keyCode === 39) {
            clearInterval(moveRightInterval);
            return;
        } else if (event.keyCode === 40) {
            clearInterval(moveDownInterval);
            return;
        }
    });

    leftController.addEventListener("click", () => {
        clearInterval(moveLeftInterval);
        return;
    });
    upController.addEventListener("click", () => {
        clearInterval(moveUpInterval);
        return;
    });
    rightController.addEventListener("click", () => {
        clearInterval(moveRightInterval);
        return;
    });
    downController.addEventListener("click", () => {
        clearInterval(moveDownInterval);
        return;
    });

    controllerContainer.style.display = "none";
    playAgain.style.display = "block";
    setHighScore();
};

window.addEventListener("load", () => {
    showHighScore();
    if (sessionStorage.getItem("playing")) {
        start();
    }
    document.addEventListener("keydown", e => {
        if (e.keyCode === 13) {
            start();
        }
    });
});

const makeSnakeFoodAppearRandomly = () => {
    snakeFood.style.visibility = "visible";
    snakeFood.style.top = Math.ceil(
        Math.random() * canvas.getBoundingClientRect().bottom - 16
    );
    snakeFood.style.left = Math.ceil(
        Math.random() * canvas.getBoundingClientRect().right - 16
    );
};

const makeSnakeLonger = () => {
    const snakeBody = document.createElement("div");
    snakeBody.classList.add("snakeBody", "snake");
    console.log(snakeSegments);

    if (moveLeftInterval) {
        snakeBody.style.left =
            parseInt(snakeSegments[snakeSegments.length - 1].style.left) +
            16; /*  xAxisCounter - 16 */
        snakeBody.style.top =
            snakeSegments[
                snakeSegments.length - 1
            ].style.top; /*  xAxisCounter - 16 */
        snakeSegments[snakeSegments.length - 1].parentNode.appendChild(snakeBody);
    } else if (moveUpInterval) {
        snakeBody.style.left =
            snakeSegments[
                snakeSegments.length - 1
            ].style.left; /*  xAxisCounter - 16 */
        snakeBody.style.top =
            parseInt(snakeSegments[snakeSegments.length - 1].style.top) +
            16; /*  xAxisCounter - 16 */
        snakeSegments[snakeSegments.length - 1].parentNode.appendChild(snakeBody);
    } else if (moveRightInterval) {
        snakeBody.style.left =
            parseInt(snakeSegments[snakeSegments.length - 1].style.left) -
            16; /*  xAxisCounter - 16 */
        snakeBody.style.top =
            snakeSegments[
                snakeSegments.length - 1
            ].style.top; /*  xAxisCounter - 16 */
        snakeSegments[snakeSegments.length - 1].parentNode.appendChild(snakeBody);
    } else if (moveDownInterval) {
        snakeBody.style.left =
            snakeSegments[
                snakeSegments.length - 1
            ].style.left; /*  xAxisCounter - 16 */
        snakeBody.style.top =
            parseInt(snakeSegments[snakeSegments.length - 1].style.top) -
            16; /*  xAxisCounter - 16 */
        snakeSegments[snakeSegments.length - 1].parentNode.appendChild(snakeBody);
    }
};

const hasSnakeEaten = () => {
    console.log(
        Math.ceil(snakeFood.getBoundingClientRect().left) ===
        parseInt(snakeSegments[0].style.left)
    );
    console.log(
        Math.ceil(snakeFood.getBoundingClientRect().left) ==
        parseInt(snakeSegments[0].style.left)
    );
    //console.log(parseInt(snakeSegments[0].style.left) + 16, parseInt(snakeSegments[0].style.top), parseInt(snakeSegments[0].style.top) + 16, parseInt(snakeSegments[0].style.left))
    console.log(
        "Snake top",
        parseInt(snakeSegments[0].style.top),
        "Food top",
        Math.ceil(snakeFood.getBoundingClientRect().top)
    );
    console.log(
        "Snake bottom",
        parseInt(snakeSegments[0].style.top) + 16,
        "Food bottom",
        Math.ceil(snakeFood.getBoundingClientRect().bottom)
    );
    console.log(
        "Snake left",
        parseInt(snakeSegments[0].style.left),
        "Food left",
        Math.ceil(snakeFood.getBoundingClientRect().left)
    );
    console.log(
        "Snake right",
        parseInt(snakeSegments[0].style.left) + 16,
        "Food right",
        Math.ceil(snakeFood.getBoundingClientRect().right)
    );
    if (
        (Math.ceil(snakeFood.getBoundingClientRect().left) <
            parseInt(snakeSegments[0].style.left) + 16 &&
            parseInt(snakeSegments[0].style.left) + 16 <
            Math.ceil(snakeFood.getBoundingClientRect().right) &&
            Math.ceil(snakeFood.getBoundingClientRect().top) <
            parseInt(snakeSegments[0].style.top) + 16 &&
            parseInt(snakeSegments[0].style.top) + 16 <
            Math.ceil(snakeFood.getBoundingClientRect().bottom)) ||
        (Math.ceil(snakeFood.getBoundingClientRect().left) <
            parseInt(snakeSegments[0].style.left) + 16 &&
            parseInt(snakeSegments[0].style.left) + 16 <
            Math.ceil(snakeFood.getBoundingClientRect().right) &&
            Math.ceil(snakeFood.getBoundingClientRect().top) >
            parseInt(snakeSegments[0].style.top) &&
            snakeSegments[0].style.top >
            Math.ceil(snakeFood.getBoundingClientRect().bottom)) ||
        (Math.ceil(snakeFood.getBoundingClientRect().left) <
            parseInt(snakeSegments[0].style.left) + 16 &&
            parseInt(snakeSegments[0].style.left) + 16 <
            Math.ceil(snakeFood.getBoundingClientRect().right) &&
            Math.ceil(snakeFood.getBoundingClientRect().top) >
            parseInt(snakeSegments[0].style.top) &&
            parseInt(snakeSegments[0].style.top) + 16 >
            Math.ceil(snakeFood.getBoundingClientRect().top)) ||
        (Math.ceil(snakeFood.getBoundingClientRect().right) >
            parseInt(snakeSegments[0].style.left) &&
            parseInt(snakeSegments[0].style.left) + 16 >
            Math.ceil(snakeFood.getBoundingClientRect().right) &&
            Math.ceil(snakeFood.getBoundingClientRect().bottom) <
            parseInt(snakeSegments[0].style.top) + 16 &&
            snakeSegments[0].style.top <
            Math.ceil(snakeFood.getBoundingClientRect().bottom)) ||
        (Math.ceil(snakeFood.getBoundingClientRect().left) >
            parseInt(snakeSegments[0].style.left) &&
            parseInt(snakeSegments[0].style.left) + 16 >
            Math.ceil(snakeFood.getBoundingClientRect().left) &&
            Math.ceil(snakeFood.getBoundingClientRect().bottom) <
            parseInt(snakeSegments[0].style.top) + 16 &&
            snakeSegments[0].style.top <
            Math.ceil(snakeFood.getBoundingClientRect().bottom)) ||
        (Math.ceil(snakeFood.getBoundingClientRect().left) <
            parseInt(snakeSegments[0].style.left) + 16 &&
            parseInt(snakeSegments[0].style.left) + 16 <
            Math.ceil(snakeFood.getBoundingClientRect().right) &&
            Math.ceil(snakeFood.getBoundingClientRect().top) <
            parseInt(snakeSegments[0].style.top) &&
            snakeSegments[0].style.top <
            Math.ceil(snakeFood.getBoundingClientRect().bottom)) ||
        (Math.ceil(snakeFood.getBoundingClientRect().right) >
            parseInt(snakeSegments[0].style.left) &&
            snakeSegments[0].style.left >
            Math.ceil(snakeFood.getBoundingClientRect().left) &&
            Math.ceil(snakeFood.getBoundingClientRect().top) <
            parseInt(snakeSegments[0].style.top) + 16 &&
            parseInt(snakeSegments[0].style.top) + 16 <
            Math.ceil(snakeFood.getBoundingClientRect().bottom)) ||
        /* ||
                ((Math.ceil(snakeFood.getBoundingClientRect().right) > snakeHead.style.left) && (snakeHead.style.left > Math.ceil(snakeFood.getBoundingClientRect().left)) && ((Math.ceil(snakeFood.getBoundingClientRect().bottom) < parseInt(snakeSegments[0].style.top) + 16) && (snakeHead.style.bottom > Math.ceil(snakeFood.getBoundingClientRect().top)))) */
        (Math.ceil(snakeFood.getBoundingClientRect().right) <
            parseInt(snakeSegments[0].style.left) + 16 &&
            snakeSegments[0].style.left <
            Math.ceil(snakeFood.getBoundingClientRect().left) &&
            Math.ceil(snakeFood.getBoundingClientRect().top) <
            parseInt(snakeSegments[0].style.top) + 16 &&
            parseInt(snakeSegments[0].style.top) + 16 <
            Math.ceil(snakeFood.getBoundingClientRect().top)) ||
        (Math.ceil(snakeFood.getBoundingClientRect().top) >
            parseInt(snakeSegments[0].style.top) &&
            parseInt(snakeSegments[0].style.top) + 16 >
            Math.ceil(snakeFood.getBoundingClientRect().bottom) &&
            Math.ceil(snakeFood.getBoundingClientRect().left) >
            parseInt(snakeSegments[0].style.left) &&
            parseInt(snakeSegments[0].style.left) + 16 >
            Math.ceil(snakeFood.getBoundingClientRect().left)) ||
        (Math.ceil(snakeFood.getBoundingClientRect().top) >
            parseInt(snakeSegments[0].style.top) &&
            parseInt(snakeSegments[0].style.top) + 16 >
            Math.ceil(snakeFood.getBoundingClientRect().top) &&
            Math.ceil(snakeFood.getBoundingClientRect().left) >
            parseInt(snakeSegments[0].style.left) &&
            parseInt(snakeSegments[0].style.left) + 16 >
            Math.ceil(snakeFood.getBoundingClientRect().left)) ||
        (Math.ceil(snakeFood.getBoundingClientRect().top) >
            parseInt(snakeSegments[0].style.top) &&
            parseInt(snakeSegments[0].style.top) + 16 >
            Math.ceil(snakeFood.getBoundingClientRect().top) &&
            Math.ceil(snakeFood.getBoundingClientRect().right) >
            parseInt(snakeSegments[0].style.left) &&
            parseInt(snakeSegments[0].style.left) + 16 >
            Math.ceil(snakeFood.getBoundingClientRect().right)) ||
        (Math.ceil(snakeFood.getBoundingClientRect().top) <
            parseInt(snakeSegments[0].style.top) &&
            parseInt(snakeSegments[0].style.top) + 16 <
            Math.ceil(snakeFood.getBoundingClientRect().bottom) &&
            Math.ceil(snakeFood.getBoundingClientRect().left) <
            parseInt(snakeSegments[0].style.left) &&
            parseInt(snakeSegments[0].style.left) + 16 >
            Math.ceil(snakeFood.getBoundingClientRect().left)) ||
        (Math.ceil(snakeFood.getBoundingClientRect().bottom) >
            parseInt(snakeSegments[0].style.top) &&
            parseInt(snakeSegments[0].style.top) + 16 >
            Math.ceil(snakeFood.getBoundingClientRect().bottom) &&
            Math.ceil(snakeFood.getBoundingClientRect().right) >
            parseInt(snakeSegments[0].style.left) &&
            parseInt(snakeSegments[0].style.left) + 16 >
            Math.ceil(snakeFood.getBoundingClientRect().right)) ||
        (Math.ceil(snakeFood.getBoundingClientRect().top) >
            parseInt(snakeSegments[0].style.top) &&
            parseInt(snakeSegments[0].style.top) + 16 ===
            Math.ceil(snakeFood.getBoundingClientRect().bottom) &&
            Math.ceil(snakeFood.getBoundingClientRect().left) >
            parseInt(snakeSegments[0].style.left) &&
            parseInt(snakeSegments[0].style.left) + 16 >
            Math.ceil(snakeFood.getBoundingClientRect().left)) ||
        (Math.ceil(snakeFood.getBoundingClientRect().top) >
            parseInt(snakeSegments[0].style.top) &&
            parseInt(snakeSegments[0].style.top) + 16 <
            Math.ceil(snakeFood.getBoundingClientRect().bottom) &&
            Math.ceil(snakeFood.getBoundingClientRect().left) ===
            parseInt(snakeSegments[0].style.left) &&
            parseInt(snakeSegments[0].style.left) + 16 >
            Math.ceil(snakeFood.getBoundingClientRect().left)) //||
        // ((Math.ceil(snakeFood.getBoundingClientRect().top) < parseInt(snakeSegments[0].style.top)) && (parseInt(snakeSegments[0].style.top) + 16 > Math.ceil(snakeFood.getBoundingClientRect().bottom) && (Math.ceil(snakeFood.getBoundingClientRect().left) > parseInt(snakeSegments[0].style.left)) && (parseInt(snakeSegments[0].style.left) + 16 > Math.ceil(snakeFood.getBoundingClientRect().left)))) ||
        // ((Math.ceil(snakeFood.getBoundingClientRect().top) < parseInt(snakeSegments[0].style.top)) && (parseInt(snakeSegments[0].style.top) + 16 > Math.ceil(snakeFood.getBoundingClientRect().bottom) && (Math.ceil(snakeFood.getBoundingClientRect().left) > parseInt(snakeSegments[0].style.left)) && (parseInt(snakeSegments[0].style.left) + 16 > Math.ceil(snakeFood.getBoundingClientRect().left))))
        /* ||
                        (((Math.ceil(snakeFood.getBoundingClientRect().bottom) > snakeHead.getBoundingClientRect().bottom) && (snakeHead.getBoundingClientRect().bottom < Math.ceil(snakeFood.getBoundingClientRect().top))) && ((Math.ceil(snakeFood.getBoundingClientRect().right) > snakeHead.getBoundingClientRect().left) && (snakeHead.getBoundingClientRect().right < Math.ceil(snakeFood.getBoundingClientRect().left)))) || */
    ) {
        makeSnakeFoodAppearRandomly();
        makeSnakeLonger();
        score++;
        document.getElementById("score").innerHTML = score;
    }
};

const clearAllIntervals = () => {
    clearInterval(moveLeftInterval);
    clearInterval(moveRightInterval);
    clearInterval(moveDownInterval);
    clearInterval(moveUpInterval);
};

const setHighScore = () => {
    const gameScore = +document.getElementById("score").innerHTML;
    if (sessionStorage.getItem("highScore")) {
        const currentHighScore = +sessionStorage.getItem("highScore");
        if (gameScore > currentHighScore) {
            sessionStorage.removeItem("highScore");
            sessionStorage.setItem("highScore", gameScore);
        }
    } else {
        sessionStorage.setItem("highScore", gameScore);
    }
};

const showHighScore = () => {
    if (sessionStorage.getItem("highScore")) {
        const highScore = +sessionStorage.getItem("highScore");
        document.getElementById("highScore").innerHTML = highScore;
    } else {
        document.getElementById("highScore").innerHTML = 0;
    }
};