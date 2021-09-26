/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/board.ts":
/*!**********************!*\
  !*** ./src/board.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const util_1 = __webpack_require__(/*! ./util */ "./src/util.ts");
class Board {
    constructor(size) {
        this.board = new Array(size);
    }
    //Make an array of arrays with the given size to represent the game board...
    // Example-[   
    //             [  ,  ,  ,  , ],
    //             [  ,  ,  ,  , ],
    //             [  ,  ,  ,  , ],
    //             [  ,  ,  ,  , ]
    //         ];
    generateBoard() {
        for (let i = 0; i < this.board.length; i++) {
            this.board[i] = new Array(this.board.length);
            //Initially mark all of the spaces in the board as "Empty";
            for (let j = 0; j < this.board.length; j++) {
                this.board[i][j] = util_1.CellType.EMPTY;
            }
        }
        //Finally return the generated board...
        return this.board;
    }
}
exports["default"] = Board;


/***/ }),

/***/ "./src/food.ts":
/*!*********************!*\
  !*** ./src/food.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const util_1 = __webpack_require__(/*! ./util */ "./src/util.ts");
class Food {
    constructor(board) {
        this.board = board;
    }
    //Randomly generate food anywhere within the bounds of the game board...
    generateFood() {
        let row = Math.abs(Math.round(Math.random() * this.board.length - 2));
        let col = Math.abs(Math.round(Math.random() * this.board.length - 2));
        // If generated food is on the snake, run the function again...
        if (this.board[row][col] === util_1.CellType.SNAKE) {
            this.generateFood();
        }
        this.board[row][col] = util_1.CellType.FOOD;
    }
}
exports["default"] = Food;


/***/ }),

/***/ "./src/game.ts":
/*!*********************!*\
  !*** ./src/game.ts ***!
  \*********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getScore = exports.getDirection = exports.getIsplaying = exports.setDirection = exports.drawGame = void 0;
const food_1 = __importDefault(__webpack_require__(/*! ./food */ "./src/food.ts"));
const util_1 = __webpack_require__(/*! ./util */ "./src/util.ts");
let isPlaying = true;
let direction = util_1.Direction.UP;
let score = 0;
function drawGame(board, snake) {
    let canvas = document.getElementById("canvas");
    let context = canvas.getContext("2d");
    let size = board.length;
    let canvasSize = size * 10;
    let head = 0;
    let tail = snake.length - 1;
    context === null || context === void 0 ? void 0 : context.clearRect(0, 0, canvasSize, canvasSize);
    for (let i = tail; i >= 0; i--) {
        //Handle head...
        if (i === head) {
            //Move coordinate of snake head in the current direction...
            if (direction === util_1.Direction.RIGHT) {
                snake[head] = { x: snake[head].x + 1, y: snake[head].y };
            }
            else if (direction === util_1.Direction.LEFT) {
                snake[head] = { x: snake[head].x - 1, y: snake[head].y };
            }
            else if (direction === util_1.Direction.UP) {
                snake[head] = { x: snake[head].x, y: snake[head].y - 1 };
            }
            else if (direction === util_1.Direction.DOWN) {
                snake[head] = { x: snake[head].x, y: snake[head].y + 1 };
            }
            //Check if head collided with boundary...
            if (snake[head].x < 0 ||
                snake[head].x >= size ||
                snake[head].y < 0 ||
                snake[head].y >= size) {
                gameOver();
                return;
            }
            //Check if snake hit itself...
            if (board[snake[head].x][snake[head].y] === util_1.CellType.SNAKE) {
                gameOver();
                return;
            }
            //Check if snake ate food...
            if (board[snake[head].x][snake[head].y] === util_1.CellType.FOOD) {
                score = score + 10;
                new food_1.default(board).generateFood();
                snake.push({ x: snake[tail].x, y: snake[tail].y });
                board[snake[tail].x][snake[tail].y] = util_1.CellType.SNAKE;
            }
            board[snake[head].x][snake[head].y] = util_1.CellType.SNAKE;
        }
        else {
            //Handle tail...
            if (i === tail) {
                board[snake[i].x][snake[i].y] = util_1.CellType.EMPTY;
            }
            // Shift the coordinates of the tail to take the one preceding it...
            snake[i] = { x: snake[i - 1].x, y: snake[i - 1].y };
            board[snake[i].x][snake[i].y] = util_1.CellType.SNAKE;
        }
        //Paint each cell of the grid according to the cell-type...
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board.length; j++) {
                if (board[i][j] === util_1.CellType.FOOD) {
                    context.fillStyle = 'green';
                    context.fillRect(i * 10, j * 10, 10, 10);
                }
                if (board[i][j] === util_1.CellType.SNAKE) {
                    context.fillStyle = 'red';
                    context.fillRect(i * 10, j * 10, 10, 10);
                }
                if (board[i][j] === util_1.CellType.EMPTY) {
                    context.fillStyle = 'white';
                    context.fillRect(i * 10, j * 10, 10, 10);
                }
            }
        }
    }
    function gameOver() {
        isPlaying = false;
        context === null || context === void 0 ? void 0 : context.clearRect(0, 0, canvasSize, canvasSize);
    }
}
exports.drawGame = drawGame;
function setDirection(dir) {
    direction = dir;
}
exports.setDirection = setDirection;
function getIsplaying() {
    return isPlaying;
}
exports.getIsplaying = getIsplaying;
function getDirection() {
    return direction;
}
exports.getDirection = getDirection;
function getScore() {
    return score;
}
exports.getScore = getScore;


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const food_1 = __importDefault(__webpack_require__(/*! ./food */ "./src/food.ts"));
const snake_1 = __importDefault(__webpack_require__(/*! ./snake */ "./src/snake.ts"));
const board_1 = __importDefault(__webpack_require__(/*! ./board */ "./src/board.ts"));
const util_1 = __webpack_require__(/*! ./util */ "./src/util.ts");
const game_1 = __webpack_require__(/*! ./game */ "./src/game.ts");
const slider = document.getElementById("slider");
const speedSlider = document.getElementById("speed-slider");
const canvas = document.getElementById("canvas");
const scoreBoard = document.getElementById("score");
const button = document.getElementById("start-button");
const border = document.getElementById("border");
const sizeText = document.getElementById("text-size");
const speedText = document.getElementById("text-speed");
let score;
let speed = 500;
let size = 30;
let board;
let snake;
let isPlaying = true;
let direction;
canvas.style.display = "none";
scoreBoard.style.display = "none";
slider.oninput = function () {
    //@ts-ignore
    size = Number(this.value);
    sizeText.innerText = `Size: ${size}`;
    border.style.width = `${size * 10}px`;
    border.style.height = `${size * 10}px`;
};
speedSlider.oninput = function () {
    //@ts-ignore
    speed = Number(500 - this.value * 10);
    //@ts-ignore
    speedText.innerText = `Speed: ${this.value}`;
};
button.addEventListener("click", function () {
    startGame();
});
function requestFullScreen(element) {
    let requestMethod = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullScreen;
    if (requestMethod) {
        requestMethod.call(element);
    }
    else if (typeof window.ActiveXObject !== "undefined") {
        var wscript = new ActiveXObject("WScript.Shell");
        if (wscript !== null) {
            wscript.SendKeys("{F11}");
        }
    }
}
function startGame() {
    requestFullScreen(document.body.parentElement);
    canvas.style.display = "block";
    scoreBoard.style.display = "block";
    button.style.display = "none";
    sizeText.style.display = "none";
    slider.style.display = "none";
    border.style.display = "none";
    speedText.style.display = "none";
    speedSlider.style.display = "none";
    canvas.width = size * 10;
    canvas.height = size * 10;
    board = new board_1.default(size).generateBoard();
    snake = new snake_1.default(board).generateSnake();
    new food_1.default(board).generateFood();
    let handle = setInterval(function () {
        (0, game_1.drawGame)(board, snake);
        isPlaying = (0, game_1.getIsplaying)();
        direction = (0, game_1.getDirection)();
        score = (0, game_1.getScore)();
        scoreBoard.innerText = `Score: ${score}`;
        if (!isPlaying) {
            clearInterval(handle);
            setTimeout(function () {
                if (confirm("GameOver! Wanna go again?")) {
                    window.location.reload();
                }
            }, 300);
        }
    }, speed);
    //Set direction according to input from player...
    window.addEventListener('keydown', function (event) {
        event.preventDefault();
        if (event.key === "ArrowLeft" && direction !== util_1.Direction.RIGHT) {
            (0, game_1.setDirection)(util_1.Direction.LEFT);
        }
        else if (event.key === "ArrowRight" && direction !== util_1.Direction.LEFT) {
            (0, game_1.setDirection)(util_1.Direction.RIGHT);
        }
        else if (event.key === "ArrowUp" && direction !== util_1.Direction.DOWN) {
            (0, game_1.setDirection)(util_1.Direction.UP);
        }
        else if (event.key === "ArrowDown" && direction !== util_1.Direction.UP) {
            (0, game_1.setDirection)(util_1.Direction.DOWN);
        }
    });
    //Input from mobile devices...
    document.addEventListener('touchstart', handleTouchStart, false);
    document.addEventListener('touchmove', handleTouchMove, false);
    let xDown = null;
    let yDown = null;
    function getTouches(evt) {
        return evt.touches;
    }
    function handleTouchStart(evt) {
        const firstTouch = getTouches(evt)[0];
        xDown = firstTouch.clientX;
        yDown = firstTouch.clientY;
    }
    ;
    function handleTouchMove(evt) {
        if (!xDown || !yDown) {
            return;
        }
        let xUp = evt.touches[0].clientX;
        let yUp = evt.touches[0].clientY;
        let xDiff = xDown - xUp;
        let yDiff = yDown - yUp;
        if (Math.abs(xDiff) > Math.abs(yDiff)) {
            if (xDiff > 0 && direction !== util_1.Direction.RIGHT) {
                (0, game_1.setDirection)(util_1.Direction.LEFT);
            }
            else if (direction !== util_1.Direction.LEFT) {
                (0, game_1.setDirection)(util_1.Direction.RIGHT);
            }
        }
        else {
            if (yDiff > 0 && direction !== util_1.Direction.DOWN) {
                (0, game_1.setDirection)(util_1.Direction.UP);
            }
            else if (direction !== util_1.Direction.UP) {
                (0, game_1.setDirection)(util_1.Direction.DOWN);
            }
        }
        xDown = null;
        yDown = null;
    }
}


/***/ }),

/***/ "./src/snake.ts":
/*!**********************!*\
  !*** ./src/snake.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const util_1 = __webpack_require__(/*! ./util */ "./src/util.ts");
class Snake {
    constructor(board) {
        this.snakeSize = 3;
        this.board = board;
    }
    //Generate snake in the middle of the game board...
    generateSnake() {
        let snake = new Array(this.snakeSize);
        let row = Number(Math.round(this.board.length / 2));
        let col = Number(Math.round(this.board.length / 2));
        // Snake object is an array which holds the x and y coordinate of its current location.
        for (let i = 0; i < this.snakeSize; i++) {
            snake[i] = { x: row - i, y: col };
            this.board[row - i][col] = util_1.CellType.SNAKE;
        }
        return snake;
    }
}
exports["default"] = Snake;


/***/ }),

/***/ "./src/util.ts":
/*!*********************!*\
  !*** ./src/util.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Direction = exports.CellType = void 0;
var CellType;
(function (CellType) {
    CellType[CellType["FOOD"] = 0] = "FOOD";
    CellType[CellType["SNAKE"] = 1] = "SNAKE";
    CellType[CellType["EMPTY"] = 2] = "EMPTY";
})(CellType = exports.CellType || (exports.CellType = {}));
var Direction;
(function (Direction) {
    Direction[Direction["RIGHT"] = 0] = "RIGHT";
    Direction[Direction["LEFT"] = 1] = "LEFT";
    Direction[Direction["UP"] = 2] = "UP";
    Direction[Direction["DOWN"] = 3] = "DOWN";
})(Direction = exports.Direction || (exports.Direction = {}));


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/main.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtVQUNBOzs7O1VFdEJBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZmlsbW9yYS8uL3NyYy9ib2FyZC50cyIsIndlYnBhY2s6Ly9maWxtb3JhLy4vc3JjL2Zvb2QudHMiLCJ3ZWJwYWNrOi8vZmlsbW9yYS8uL3NyYy9nYW1lLnRzIiwid2VicGFjazovL2ZpbG1vcmEvLi9zcmMvbWFpbi50cyIsIndlYnBhY2s6Ly9maWxtb3JhLy4vc3JjL3NuYWtlLnRzIiwid2VicGFjazovL2ZpbG1vcmEvLi9zcmMvdXRpbC50cyIsIndlYnBhY2s6Ly9maWxtb3JhL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2ZpbG1vcmEvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9maWxtb3JhL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9maWxtb3JhL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5jb25zdCB1dGlsXzEgPSByZXF1aXJlKFwiLi91dGlsXCIpO1xyXG5jbGFzcyBCb2FyZCB7XHJcbiAgICBjb25zdHJ1Y3RvcihzaXplKSB7XHJcbiAgICAgICAgdGhpcy5ib2FyZCA9IG5ldyBBcnJheShzaXplKTtcclxuICAgIH1cclxuICAgIC8vTWFrZSBhbiBhcnJheSBvZiBhcnJheXMgd2l0aCB0aGUgZ2l2ZW4gc2l6ZSB0byByZXByZXNlbnQgdGhlIGdhbWUgYm9hcmQuLi5cclxuICAgIC8vIEV4YW1wbGUtWyAgIFxyXG4gICAgLy8gICAgICAgICAgICAgWyAgLCAgLCAgLCAgLCBdLFxyXG4gICAgLy8gICAgICAgICAgICAgWyAgLCAgLCAgLCAgLCBdLFxyXG4gICAgLy8gICAgICAgICAgICAgWyAgLCAgLCAgLCAgLCBdLFxyXG4gICAgLy8gICAgICAgICAgICAgWyAgLCAgLCAgLCAgLCBdXHJcbiAgICAvLyAgICAgICAgIF07XHJcbiAgICBnZW5lcmF0ZUJvYXJkKCkge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5ib2FyZC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLmJvYXJkW2ldID0gbmV3IEFycmF5KHRoaXMuYm9hcmQubGVuZ3RoKTtcclxuICAgICAgICAgICAgLy9Jbml0aWFsbHkgbWFyayBhbGwgb2YgdGhlIHNwYWNlcyBpbiB0aGUgYm9hcmQgYXMgXCJFbXB0eVwiO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMuYm9hcmQubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYm9hcmRbaV1bal0gPSB1dGlsXzEuQ2VsbFR5cGUuRU1QVFk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy9GaW5hbGx5IHJldHVybiB0aGUgZ2VuZXJhdGVkIGJvYXJkLi4uXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYm9hcmQ7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5kZWZhdWx0ID0gQm9hcmQ7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmNvbnN0IHV0aWxfMSA9IHJlcXVpcmUoXCIuL3V0aWxcIik7XHJcbmNsYXNzIEZvb2Qge1xyXG4gICAgY29uc3RydWN0b3IoYm9hcmQpIHtcclxuICAgICAgICB0aGlzLmJvYXJkID0gYm9hcmQ7XHJcbiAgICB9XHJcbiAgICAvL1JhbmRvbWx5IGdlbmVyYXRlIGZvb2QgYW55d2hlcmUgd2l0aGluIHRoZSBib3VuZHMgb2YgdGhlIGdhbWUgYm9hcmQuLi5cclxuICAgIGdlbmVyYXRlRm9vZCgpIHtcclxuICAgICAgICBsZXQgcm93ID0gTWF0aC5hYnMoTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogdGhpcy5ib2FyZC5sZW5ndGggLSAyKSk7XHJcbiAgICAgICAgbGV0IGNvbCA9IE1hdGguYWJzKE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqIHRoaXMuYm9hcmQubGVuZ3RoIC0gMikpO1xyXG4gICAgICAgIC8vIElmIGdlbmVyYXRlZCBmb29kIGlzIG9uIHRoZSBzbmFrZSwgcnVuIHRoZSBmdW5jdGlvbiBhZ2Fpbi4uLlxyXG4gICAgICAgIGlmICh0aGlzLmJvYXJkW3Jvd11bY29sXSA9PT0gdXRpbF8xLkNlbGxUeXBlLlNOQUtFKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2VuZXJhdGVGb29kKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuYm9hcmRbcm93XVtjb2xdID0gdXRpbF8xLkNlbGxUeXBlLkZPT0Q7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5kZWZhdWx0ID0gRm9vZDtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xyXG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XHJcbn07XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5nZXRTY29yZSA9IGV4cG9ydHMuZ2V0RGlyZWN0aW9uID0gZXhwb3J0cy5nZXRJc3BsYXlpbmcgPSBleHBvcnRzLnNldERpcmVjdGlvbiA9IGV4cG9ydHMuZHJhd0dhbWUgPSB2b2lkIDA7XHJcbmNvbnN0IGZvb2RfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9mb29kXCIpKTtcclxuY29uc3QgdXRpbF8xID0gcmVxdWlyZShcIi4vdXRpbFwiKTtcclxubGV0IGlzUGxheWluZyA9IHRydWU7XHJcbmxldCBkaXJlY3Rpb24gPSB1dGlsXzEuRGlyZWN0aW9uLlVQO1xyXG5sZXQgc2NvcmUgPSAwO1xyXG5mdW5jdGlvbiBkcmF3R2FtZShib2FyZCwgc25ha2UpIHtcclxuICAgIGxldCBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNhbnZhc1wiKTtcclxuICAgIGxldCBjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcclxuICAgIGxldCBzaXplID0gYm9hcmQubGVuZ3RoO1xyXG4gICAgbGV0IGNhbnZhc1NpemUgPSBzaXplICogMTA7XHJcbiAgICBsZXQgaGVhZCA9IDA7XHJcbiAgICBsZXQgdGFpbCA9IHNuYWtlLmxlbmd0aCAtIDE7XHJcbiAgICBjb250ZXh0ID09PSBudWxsIHx8IGNvbnRleHQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGNvbnRleHQuY2xlYXJSZWN0KDAsIDAsIGNhbnZhc1NpemUsIGNhbnZhc1NpemUpO1xyXG4gICAgZm9yIChsZXQgaSA9IHRhaWw7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgICAgLy9IYW5kbGUgaGVhZC4uLlxyXG4gICAgICAgIGlmIChpID09PSBoZWFkKSB7XHJcbiAgICAgICAgICAgIC8vTW92ZSBjb29yZGluYXRlIG9mIHNuYWtlIGhlYWQgaW4gdGhlIGN1cnJlbnQgZGlyZWN0aW9uLi4uXHJcbiAgICAgICAgICAgIGlmIChkaXJlY3Rpb24gPT09IHV0aWxfMS5EaXJlY3Rpb24uUklHSFQpIHtcclxuICAgICAgICAgICAgICAgIHNuYWtlW2hlYWRdID0geyB4OiBzbmFrZVtoZWFkXS54ICsgMSwgeTogc25ha2VbaGVhZF0ueSB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGRpcmVjdGlvbiA9PT0gdXRpbF8xLkRpcmVjdGlvbi5MRUZUKSB7XHJcbiAgICAgICAgICAgICAgICBzbmFrZVtoZWFkXSA9IHsgeDogc25ha2VbaGVhZF0ueCAtIDEsIHk6IHNuYWtlW2hlYWRdLnkgfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChkaXJlY3Rpb24gPT09IHV0aWxfMS5EaXJlY3Rpb24uVVApIHtcclxuICAgICAgICAgICAgICAgIHNuYWtlW2hlYWRdID0geyB4OiBzbmFrZVtoZWFkXS54LCB5OiBzbmFrZVtoZWFkXS55IC0gMSB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGRpcmVjdGlvbiA9PT0gdXRpbF8xLkRpcmVjdGlvbi5ET1dOKSB7XHJcbiAgICAgICAgICAgICAgICBzbmFrZVtoZWFkXSA9IHsgeDogc25ha2VbaGVhZF0ueCwgeTogc25ha2VbaGVhZF0ueSArIDEgfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvL0NoZWNrIGlmIGhlYWQgY29sbGlkZWQgd2l0aCBib3VuZGFyeS4uLlxyXG4gICAgICAgICAgICBpZiAoc25ha2VbaGVhZF0ueCA8IDAgfHxcclxuICAgICAgICAgICAgICAgIHNuYWtlW2hlYWRdLnggPj0gc2l6ZSB8fFxyXG4gICAgICAgICAgICAgICAgc25ha2VbaGVhZF0ueSA8IDAgfHxcclxuICAgICAgICAgICAgICAgIHNuYWtlW2hlYWRdLnkgPj0gc2l6ZSkge1xyXG4gICAgICAgICAgICAgICAgZ2FtZU92ZXIoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvL0NoZWNrIGlmIHNuYWtlIGhpdCBpdHNlbGYuLi5cclxuICAgICAgICAgICAgaWYgKGJvYXJkW3NuYWtlW2hlYWRdLnhdW3NuYWtlW2hlYWRdLnldID09PSB1dGlsXzEuQ2VsbFR5cGUuU05BS0UpIHtcclxuICAgICAgICAgICAgICAgIGdhbWVPdmVyKCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy9DaGVjayBpZiBzbmFrZSBhdGUgZm9vZC4uLlxyXG4gICAgICAgICAgICBpZiAoYm9hcmRbc25ha2VbaGVhZF0ueF1bc25ha2VbaGVhZF0ueV0gPT09IHV0aWxfMS5DZWxsVHlwZS5GT09EKSB7XHJcbiAgICAgICAgICAgICAgICBzY29yZSA9IHNjb3JlICsgMTA7XHJcbiAgICAgICAgICAgICAgICBuZXcgZm9vZF8xLmRlZmF1bHQoYm9hcmQpLmdlbmVyYXRlRm9vZCgpO1xyXG4gICAgICAgICAgICAgICAgc25ha2UucHVzaCh7IHg6IHNuYWtlW3RhaWxdLngsIHk6IHNuYWtlW3RhaWxdLnkgfSk7XHJcbiAgICAgICAgICAgICAgICBib2FyZFtzbmFrZVt0YWlsXS54XVtzbmFrZVt0YWlsXS55XSA9IHV0aWxfMS5DZWxsVHlwZS5TTkFLRTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBib2FyZFtzbmFrZVtoZWFkXS54XVtzbmFrZVtoZWFkXS55XSA9IHV0aWxfMS5DZWxsVHlwZS5TTkFLRTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIC8vSGFuZGxlIHRhaWwuLi5cclxuICAgICAgICAgICAgaWYgKGkgPT09IHRhaWwpIHtcclxuICAgICAgICAgICAgICAgIGJvYXJkW3NuYWtlW2ldLnhdW3NuYWtlW2ldLnldID0gdXRpbF8xLkNlbGxUeXBlLkVNUFRZO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIFNoaWZ0IHRoZSBjb29yZGluYXRlcyBvZiB0aGUgdGFpbCB0byB0YWtlIHRoZSBvbmUgcHJlY2VkaW5nIGl0Li4uXHJcbiAgICAgICAgICAgIHNuYWtlW2ldID0geyB4OiBzbmFrZVtpIC0gMV0ueCwgeTogc25ha2VbaSAtIDFdLnkgfTtcclxuICAgICAgICAgICAgYm9hcmRbc25ha2VbaV0ueF1bc25ha2VbaV0ueV0gPSB1dGlsXzEuQ2VsbFR5cGUuU05BS0U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vUGFpbnQgZWFjaCBjZWxsIG9mIHRoZSBncmlkIGFjY29yZGluZyB0byB0aGUgY2VsbC10eXBlLi4uXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBib2FyZC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGJvYXJkLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoYm9hcmRbaV1bal0gPT09IHV0aWxfMS5DZWxsVHlwZS5GT09EKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dC5maWxsU3R5bGUgPSAnZ3JlZW4nO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQuZmlsbFJlY3QoaSAqIDEwLCBqICogMTAsIDEwLCAxMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoYm9hcmRbaV1bal0gPT09IHV0aWxfMS5DZWxsVHlwZS5TTkFLRSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQuZmlsbFN0eWxlID0gJ3JlZCc7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dC5maWxsUmVjdChpICogMTAsIGogKiAxMCwgMTAsIDEwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChib2FyZFtpXVtqXSA9PT0gdXRpbF8xLkNlbGxUeXBlLkVNUFRZKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dC5maWxsU3R5bGUgPSAnd2hpdGUnO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQuZmlsbFJlY3QoaSAqIDEwLCBqICogMTAsIDEwLCAxMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBnYW1lT3ZlcigpIHtcclxuICAgICAgICBpc1BsYXlpbmcgPSBmYWxzZTtcclxuICAgICAgICBjb250ZXh0ID09PSBudWxsIHx8IGNvbnRleHQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGNvbnRleHQuY2xlYXJSZWN0KDAsIDAsIGNhbnZhc1NpemUsIGNhbnZhc1NpemUpO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuZHJhd0dhbWUgPSBkcmF3R2FtZTtcclxuZnVuY3Rpb24gc2V0RGlyZWN0aW9uKGRpcikge1xyXG4gICAgZGlyZWN0aW9uID0gZGlyO1xyXG59XHJcbmV4cG9ydHMuc2V0RGlyZWN0aW9uID0gc2V0RGlyZWN0aW9uO1xyXG5mdW5jdGlvbiBnZXRJc3BsYXlpbmcoKSB7XHJcbiAgICByZXR1cm4gaXNQbGF5aW5nO1xyXG59XHJcbmV4cG9ydHMuZ2V0SXNwbGF5aW5nID0gZ2V0SXNwbGF5aW5nO1xyXG5mdW5jdGlvbiBnZXREaXJlY3Rpb24oKSB7XHJcbiAgICByZXR1cm4gZGlyZWN0aW9uO1xyXG59XHJcbmV4cG9ydHMuZ2V0RGlyZWN0aW9uID0gZ2V0RGlyZWN0aW9uO1xyXG5mdW5jdGlvbiBnZXRTY29yZSgpIHtcclxuICAgIHJldHVybiBzY29yZTtcclxufVxyXG5leHBvcnRzLmdldFNjb3JlID0gZ2V0U2NvcmU7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcclxuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xyXG59O1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmNvbnN0IGZvb2RfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9mb29kXCIpKTtcclxuY29uc3Qgc25ha2VfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9zbmFrZVwiKSk7XHJcbmNvbnN0IGJvYXJkXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vYm9hcmRcIikpO1xyXG5jb25zdCB1dGlsXzEgPSByZXF1aXJlKFwiLi91dGlsXCIpO1xyXG5jb25zdCBnYW1lXzEgPSByZXF1aXJlKFwiLi9nYW1lXCIpO1xyXG5jb25zdCBzbGlkZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNsaWRlclwiKTtcclxuY29uc3Qgc3BlZWRTbGlkZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNwZWVkLXNsaWRlclwiKTtcclxuY29uc3QgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjYW52YXNcIik7XHJcbmNvbnN0IHNjb3JlQm9hcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNjb3JlXCIpO1xyXG5jb25zdCBidXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN0YXJ0LWJ1dHRvblwiKTtcclxuY29uc3QgYm9yZGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJib3JkZXJcIik7XHJcbmNvbnN0IHNpemVUZXh0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0ZXh0LXNpemVcIik7XHJcbmNvbnN0IHNwZWVkVGV4dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGV4dC1zcGVlZFwiKTtcclxubGV0IHNjb3JlO1xyXG5sZXQgc3BlZWQgPSA1MDA7XHJcbmxldCBzaXplID0gMzA7XHJcbmxldCBib2FyZDtcclxubGV0IHNuYWtlO1xyXG5sZXQgaXNQbGF5aW5nID0gdHJ1ZTtcclxubGV0IGRpcmVjdGlvbjtcclxuY2FudmFzLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuc2NvcmVCb2FyZC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbnNsaWRlci5vbmlucHV0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgLy9AdHMtaWdub3JlXHJcbiAgICBzaXplID0gTnVtYmVyKHRoaXMudmFsdWUpO1xyXG4gICAgc2l6ZVRleHQuaW5uZXJUZXh0ID0gYFNpemU6ICR7c2l6ZX1gO1xyXG4gICAgYm9yZGVyLnN0eWxlLndpZHRoID0gYCR7c2l6ZSAqIDEwfXB4YDtcclxuICAgIGJvcmRlci5zdHlsZS5oZWlnaHQgPSBgJHtzaXplICogMTB9cHhgO1xyXG59O1xyXG5zcGVlZFNsaWRlci5vbmlucHV0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgLy9AdHMtaWdub3JlXHJcbiAgICBzcGVlZCA9IE51bWJlcig1MDAgLSB0aGlzLnZhbHVlICogMTApO1xyXG4gICAgLy9AdHMtaWdub3JlXHJcbiAgICBzcGVlZFRleHQuaW5uZXJUZXh0ID0gYFNwZWVkOiAke3RoaXMudmFsdWV9YDtcclxufTtcclxuYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICBzdGFydEdhbWUoKTtcclxufSk7XHJcbmZ1bmN0aW9uIHJlcXVlc3RGdWxsU2NyZWVuKGVsZW1lbnQpIHtcclxuICAgIGxldCByZXF1ZXN0TWV0aG9kID0gZWxlbWVudC5yZXF1ZXN0RnVsbFNjcmVlbiB8fCBlbGVtZW50LndlYmtpdFJlcXVlc3RGdWxsU2NyZWVuIHx8IGVsZW1lbnQubW96UmVxdWVzdEZ1bGxTY3JlZW4gfHwgZWxlbWVudC5tc1JlcXVlc3RGdWxsU2NyZWVuO1xyXG4gICAgaWYgKHJlcXVlc3RNZXRob2QpIHtcclxuICAgICAgICByZXF1ZXN0TWV0aG9kLmNhbGwoZWxlbWVudCk7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmICh0eXBlb2Ygd2luZG93LkFjdGl2ZVhPYmplY3QgIT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICB2YXIgd3NjcmlwdCA9IG5ldyBBY3RpdmVYT2JqZWN0KFwiV1NjcmlwdC5TaGVsbFwiKTtcclxuICAgICAgICBpZiAod3NjcmlwdCAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICB3c2NyaXB0LlNlbmRLZXlzKFwie0YxMX1cIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIHN0YXJ0R2FtZSgpIHtcclxuICAgIHJlcXVlc3RGdWxsU2NyZWVuKGRvY3VtZW50LmJvZHkucGFyZW50RWxlbWVudCk7XHJcbiAgICBjYW52YXMuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcclxuICAgIHNjb3JlQm9hcmQuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcclxuICAgIGJ1dHRvbi5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICBzaXplVGV4dC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICBzbGlkZXIuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgYm9yZGVyLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgIHNwZWVkVGV4dC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICBzcGVlZFNsaWRlci5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICBjYW52YXMud2lkdGggPSBzaXplICogMTA7XHJcbiAgICBjYW52YXMuaGVpZ2h0ID0gc2l6ZSAqIDEwO1xyXG4gICAgYm9hcmQgPSBuZXcgYm9hcmRfMS5kZWZhdWx0KHNpemUpLmdlbmVyYXRlQm9hcmQoKTtcclxuICAgIHNuYWtlID0gbmV3IHNuYWtlXzEuZGVmYXVsdChib2FyZCkuZ2VuZXJhdGVTbmFrZSgpO1xyXG4gICAgbmV3IGZvb2RfMS5kZWZhdWx0KGJvYXJkKS5nZW5lcmF0ZUZvb2QoKTtcclxuICAgIGxldCBoYW5kbGUgPSBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgKDAsIGdhbWVfMS5kcmF3R2FtZSkoYm9hcmQsIHNuYWtlKTtcclxuICAgICAgICBpc1BsYXlpbmcgPSAoMCwgZ2FtZV8xLmdldElzcGxheWluZykoKTtcclxuICAgICAgICBkaXJlY3Rpb24gPSAoMCwgZ2FtZV8xLmdldERpcmVjdGlvbikoKTtcclxuICAgICAgICBzY29yZSA9ICgwLCBnYW1lXzEuZ2V0U2NvcmUpKCk7XHJcbiAgICAgICAgc2NvcmVCb2FyZC5pbm5lclRleHQgPSBgU2NvcmU6ICR7c2NvcmV9YDtcclxuICAgICAgICBpZiAoIWlzUGxheWluZykge1xyXG4gICAgICAgICAgICBjbGVhckludGVydmFsKGhhbmRsZSk7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGNvbmZpcm0oXCJHYW1lT3ZlciEgV2FubmEgZ28gYWdhaW4/XCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCAzMDApO1xyXG4gICAgICAgIH1cclxuICAgIH0sIHNwZWVkKTtcclxuICAgIC8vU2V0IGRpcmVjdGlvbiBhY2NvcmRpbmcgdG8gaW5wdXQgZnJvbSBwbGF5ZXIuLi5cclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBpZiAoZXZlbnQua2V5ID09PSBcIkFycm93TGVmdFwiICYmIGRpcmVjdGlvbiAhPT0gdXRpbF8xLkRpcmVjdGlvbi5SSUdIVCkge1xyXG4gICAgICAgICAgICAoMCwgZ2FtZV8xLnNldERpcmVjdGlvbikodXRpbF8xLkRpcmVjdGlvbi5MRUZUKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoZXZlbnQua2V5ID09PSBcIkFycm93UmlnaHRcIiAmJiBkaXJlY3Rpb24gIT09IHV0aWxfMS5EaXJlY3Rpb24uTEVGVCkge1xyXG4gICAgICAgICAgICAoMCwgZ2FtZV8xLnNldERpcmVjdGlvbikodXRpbF8xLkRpcmVjdGlvbi5SSUdIVCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGV2ZW50LmtleSA9PT0gXCJBcnJvd1VwXCIgJiYgZGlyZWN0aW9uICE9PSB1dGlsXzEuRGlyZWN0aW9uLkRPV04pIHtcclxuICAgICAgICAgICAgKDAsIGdhbWVfMS5zZXREaXJlY3Rpb24pKHV0aWxfMS5EaXJlY3Rpb24uVVApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChldmVudC5rZXkgPT09IFwiQXJyb3dEb3duXCIgJiYgZGlyZWN0aW9uICE9PSB1dGlsXzEuRGlyZWN0aW9uLlVQKSB7XHJcbiAgICAgICAgICAgICgwLCBnYW1lXzEuc2V0RGlyZWN0aW9uKSh1dGlsXzEuRGlyZWN0aW9uLkRPV04pO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgLy9JbnB1dCBmcm9tIG1vYmlsZSBkZXZpY2VzLi4uXHJcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgaGFuZGxlVG91Y2hTdGFydCwgZmFsc2UpO1xyXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgaGFuZGxlVG91Y2hNb3ZlLCBmYWxzZSk7XHJcbiAgICBsZXQgeERvd24gPSBudWxsO1xyXG4gICAgbGV0IHlEb3duID0gbnVsbDtcclxuICAgIGZ1bmN0aW9uIGdldFRvdWNoZXMoZXZ0KSB7XHJcbiAgICAgICAgcmV0dXJuIGV2dC50b3VjaGVzO1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gaGFuZGxlVG91Y2hTdGFydChldnQpIHtcclxuICAgICAgICBjb25zdCBmaXJzdFRvdWNoID0gZ2V0VG91Y2hlcyhldnQpWzBdO1xyXG4gICAgICAgIHhEb3duID0gZmlyc3RUb3VjaC5jbGllbnRYO1xyXG4gICAgICAgIHlEb3duID0gZmlyc3RUb3VjaC5jbGllbnRZO1xyXG4gICAgfVxyXG4gICAgO1xyXG4gICAgZnVuY3Rpb24gaGFuZGxlVG91Y2hNb3ZlKGV2dCkge1xyXG4gICAgICAgIGlmICgheERvd24gfHwgIXlEb3duKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHhVcCA9IGV2dC50b3VjaGVzWzBdLmNsaWVudFg7XHJcbiAgICAgICAgbGV0IHlVcCA9IGV2dC50b3VjaGVzWzBdLmNsaWVudFk7XHJcbiAgICAgICAgbGV0IHhEaWZmID0geERvd24gLSB4VXA7XHJcbiAgICAgICAgbGV0IHlEaWZmID0geURvd24gLSB5VXA7XHJcbiAgICAgICAgaWYgKE1hdGguYWJzKHhEaWZmKSA+IE1hdGguYWJzKHlEaWZmKSkge1xyXG4gICAgICAgICAgICBpZiAoeERpZmYgPiAwICYmIGRpcmVjdGlvbiAhPT0gdXRpbF8xLkRpcmVjdGlvbi5SSUdIVCkge1xyXG4gICAgICAgICAgICAgICAgKDAsIGdhbWVfMS5zZXREaXJlY3Rpb24pKHV0aWxfMS5EaXJlY3Rpb24uTEVGVCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoZGlyZWN0aW9uICE9PSB1dGlsXzEuRGlyZWN0aW9uLkxFRlQpIHtcclxuICAgICAgICAgICAgICAgICgwLCBnYW1lXzEuc2V0RGlyZWN0aW9uKSh1dGlsXzEuRGlyZWN0aW9uLlJJR0hUKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKHlEaWZmID4gMCAmJiBkaXJlY3Rpb24gIT09IHV0aWxfMS5EaXJlY3Rpb24uRE9XTikge1xyXG4gICAgICAgICAgICAgICAgKDAsIGdhbWVfMS5zZXREaXJlY3Rpb24pKHV0aWxfMS5EaXJlY3Rpb24uVVApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGRpcmVjdGlvbiAhPT0gdXRpbF8xLkRpcmVjdGlvbi5VUCkge1xyXG4gICAgICAgICAgICAgICAgKDAsIGdhbWVfMS5zZXREaXJlY3Rpb24pKHV0aWxfMS5EaXJlY3Rpb24uRE9XTik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgeERvd24gPSBudWxsO1xyXG4gICAgICAgIHlEb3duID0gbnVsbDtcclxuICAgIH1cclxufVxyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5jb25zdCB1dGlsXzEgPSByZXF1aXJlKFwiLi91dGlsXCIpO1xyXG5jbGFzcyBTbmFrZSB7XHJcbiAgICBjb25zdHJ1Y3Rvcihib2FyZCkge1xyXG4gICAgICAgIHRoaXMuc25ha2VTaXplID0gMztcclxuICAgICAgICB0aGlzLmJvYXJkID0gYm9hcmQ7XHJcbiAgICB9XHJcbiAgICAvL0dlbmVyYXRlIHNuYWtlIGluIHRoZSBtaWRkbGUgb2YgdGhlIGdhbWUgYm9hcmQuLi5cclxuICAgIGdlbmVyYXRlU25ha2UoKSB7XHJcbiAgICAgICAgbGV0IHNuYWtlID0gbmV3IEFycmF5KHRoaXMuc25ha2VTaXplKTtcclxuICAgICAgICBsZXQgcm93ID0gTnVtYmVyKE1hdGgucm91bmQodGhpcy5ib2FyZC5sZW5ndGggLyAyKSk7XHJcbiAgICAgICAgbGV0IGNvbCA9IE51bWJlcihNYXRoLnJvdW5kKHRoaXMuYm9hcmQubGVuZ3RoIC8gMikpO1xyXG4gICAgICAgIC8vIFNuYWtlIG9iamVjdCBpcyBhbiBhcnJheSB3aGljaCBob2xkcyB0aGUgeCBhbmQgeSBjb29yZGluYXRlIG9mIGl0cyBjdXJyZW50IGxvY2F0aW9uLlxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5zbmFrZVNpemU7IGkrKykge1xyXG4gICAgICAgICAgICBzbmFrZVtpXSA9IHsgeDogcm93IC0gaSwgeTogY29sIH07XHJcbiAgICAgICAgICAgIHRoaXMuYm9hcmRbcm93IC0gaV1bY29sXSA9IHV0aWxfMS5DZWxsVHlwZS5TTkFLRTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHNuYWtlO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuZGVmYXVsdCA9IFNuYWtlO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLkRpcmVjdGlvbiA9IGV4cG9ydHMuQ2VsbFR5cGUgPSB2b2lkIDA7XHJcbnZhciBDZWxsVHlwZTtcclxuKGZ1bmN0aW9uIChDZWxsVHlwZSkge1xyXG4gICAgQ2VsbFR5cGVbQ2VsbFR5cGVbXCJGT09EXCJdID0gMF0gPSBcIkZPT0RcIjtcclxuICAgIENlbGxUeXBlW0NlbGxUeXBlW1wiU05BS0VcIl0gPSAxXSA9IFwiU05BS0VcIjtcclxuICAgIENlbGxUeXBlW0NlbGxUeXBlW1wiRU1QVFlcIl0gPSAyXSA9IFwiRU1QVFlcIjtcclxufSkoQ2VsbFR5cGUgPSBleHBvcnRzLkNlbGxUeXBlIHx8IChleHBvcnRzLkNlbGxUeXBlID0ge30pKTtcclxudmFyIERpcmVjdGlvbjtcclxuKGZ1bmN0aW9uIChEaXJlY3Rpb24pIHtcclxuICAgIERpcmVjdGlvbltEaXJlY3Rpb25bXCJSSUdIVFwiXSA9IDBdID0gXCJSSUdIVFwiO1xyXG4gICAgRGlyZWN0aW9uW0RpcmVjdGlvbltcIkxFRlRcIl0gPSAxXSA9IFwiTEVGVFwiO1xyXG4gICAgRGlyZWN0aW9uW0RpcmVjdGlvbltcIlVQXCJdID0gMl0gPSBcIlVQXCI7XHJcbiAgICBEaXJlY3Rpb25bRGlyZWN0aW9uW1wiRE9XTlwiXSA9IDNdID0gXCJET1dOXCI7XHJcbn0pKERpcmVjdGlvbiA9IGV4cG9ydHMuRGlyZWN0aW9uIHx8IChleHBvcnRzLkRpcmVjdGlvbiA9IHt9KSk7XHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9tYWluLnRzXCIpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9