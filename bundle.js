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
    generateBoard() {
        for (let i = 0; i < this.board.length; i++) {
            this.board[i] = new Array(this.board.length);
        }
        for (let i = 0; i < this.board.length; i++) {
            for (let j = 0; j < this.board.length; j++) {
                this.board[i][j] = util_1.CellType.EMPTY;
            }
        }
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
    generateFood() {
        let row = Number(Math.abs(Math.round(Math.random() * this.board.length - 2)));
        let col = Number(Math.abs(Math.round(Math.random() * this.board.length - 2)));
        console.log(row, col);
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
function drawGame(board, snake, size) {
    let canvas = document.getElementById("canvas");
    let context = canvas.getContext("2d");
    let canvasSize = size * 10;
    let head = 0;
    let tail = snake.length - 1;
    context === null || context === void 0 ? void 0 : context.clearRect(0, 0, canvasSize, canvasSize);
    for (let i = tail; i >= 0; i--) {
        //Handle head...
        if (i === head) {
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
            if (snake[head].x < 0 ||
                snake[head].x >= size ||
                snake[head].y < 0 ||
                snake[head].y >= size) {
                gameOver();
                return;
            }
            if (board[snake[head].x][snake[head].y] === util_1.CellType.SNAKE) {
                gameOver();
                return;
            }
            if (board[snake[head].x][snake[head].y] === util_1.CellType.FOOD) {
                score = score + 10;
                new food_1.default(board).generateFood();
                snake.push({ x: snake[tail].x, y: snake[tail].y });
                board[snake[tail].x][snake[tail].y] = util_1.CellType.SNAKE;
            }
            board[snake[head].x][snake[head].y] = util_1.CellType.SNAKE;
        }
        else {
            if (i === tail) {
                board[snake[i].x][snake[i].y] = util_1.CellType.EMPTY;
            }
            snake[i] = { x: snake[i - 1].x, y: snake[i - 1].y };
            board[snake[i].x][snake[i].y] = util_1.CellType.SNAKE;
        }
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
        context.fillStyle = 'black';
        context.font = '16px sans-serif';
        context.fillText('Game Over!', ((canvasSize / 2) - (context.measureText('Game Over!').width / 2)), size / 2);
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
const canvas = document.getElementById("canvas");
const scoreBoard = document.getElementById("score");
let score;
let speed = 400;
const size = 40;
let board = new board_1.default(size).generateBoard();
let snake = new snake_1.default(board).generateSnake();
let isPlaying = true;
let direction;
window.onload = function () {
    canvas.width = size * 10;
    canvas.height = size * 10;
    new food_1.default(board).generateFood();
    let handle = setInterval(function () {
        (0, game_1.drawGame)(board, snake, size);
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
};


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
    generateSnake() {
        let snake = new Array(this.snakeSize);
        let row = Number(Math.round(this.board.length / 2));
        let col = Number(Math.round(this.board.length / 2));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBYTtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxlQUFlLG1CQUFPLENBQUMsNkJBQVE7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qix1QkFBdUI7QUFDL0M7QUFDQTtBQUNBLHdCQUF3Qix1QkFBdUI7QUFDL0MsNEJBQTRCLHVCQUF1QjtBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBZTs7Ozs7Ozs7Ozs7QUNuQkY7QUFDYiw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0QsZUFBZSxtQkFBTyxDQUFDLDZCQUFRO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBZTs7Ozs7Ozs7Ozs7QUNqQkY7QUFDYjtBQUNBLDZDQUE2QztBQUM3QztBQUNBLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxnQkFBZ0IsR0FBRyxvQkFBb0IsR0FBRyxvQkFBb0IsR0FBRyxvQkFBb0IsR0FBRyxnQkFBZ0I7QUFDeEcsK0JBQStCLG1CQUFPLENBQUMsNkJBQVE7QUFDL0MsZUFBZSxtQkFBTyxDQUFDLDZCQUFRO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLFFBQVE7QUFDL0I7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDO0FBQ2hDO0FBQ0E7QUFDQSxnQ0FBZ0M7QUFDaEM7QUFDQTtBQUNBLGdDQUFnQztBQUNoQztBQUNBO0FBQ0EsZ0NBQWdDO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QixvQ0FBb0M7QUFDakU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0Esd0JBQXdCLGtCQUFrQjtBQUMxQyw0QkFBNEIsa0JBQWtCO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQjtBQUNwQjtBQUNBO0FBQ0E7QUFDQSxvQkFBb0I7QUFDcEI7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCOzs7Ozs7Ozs7OztBQ3BHSDtBQUNiO0FBQ0EsNkNBQTZDO0FBQzdDO0FBQ0EsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELCtCQUErQixtQkFBTyxDQUFDLDZCQUFRO0FBQy9DLGdDQUFnQyxtQkFBTyxDQUFDLCtCQUFTO0FBQ2pELGdDQUFnQyxtQkFBTyxDQUFDLCtCQUFTO0FBQ2pELGVBQWUsbUJBQU8sQ0FBQyw2QkFBUTtBQUMvQixlQUFlLG1CQUFPLENBQUMsNkJBQVE7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUNBQXlDLE1BQU07QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7Ozs7Ozs7Ozs7O0FDckRhO0FBQ2IsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELGVBQWUsbUJBQU8sQ0FBQyw2QkFBUTtBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0Isb0JBQW9CO0FBQzVDLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWU7Ozs7Ozs7Ozs7O0FDbkJGO0FBQ2IsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELGlCQUFpQixHQUFHLGdCQUFnQjtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxrQ0FBa0MsZ0JBQWdCLEtBQUs7QUFDeEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxvQ0FBb0MsaUJBQWlCLEtBQUs7Ozs7Ozs7VUNmM0Q7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7OztVRXRCQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2ZpbG1vcmEvLi9zcmMvYm9hcmQudHMiLCJ3ZWJwYWNrOi8vZmlsbW9yYS8uL3NyYy9mb29kLnRzIiwid2VicGFjazovL2ZpbG1vcmEvLi9zcmMvZ2FtZS50cyIsIndlYnBhY2s6Ly9maWxtb3JhLy4vc3JjL21haW4udHMiLCJ3ZWJwYWNrOi8vZmlsbW9yYS8uL3NyYy9zbmFrZS50cyIsIndlYnBhY2s6Ly9maWxtb3JhLy4vc3JjL3V0aWwudHMiLCJ3ZWJwYWNrOi8vZmlsbW9yYS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9maWxtb3JhL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vZmlsbW9yYS93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vZmlsbW9yYS93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuY29uc3QgdXRpbF8xID0gcmVxdWlyZShcIi4vdXRpbFwiKTtcclxuY2xhc3MgQm9hcmQge1xyXG4gICAgY29uc3RydWN0b3Ioc2l6ZSkge1xyXG4gICAgICAgIHRoaXMuYm9hcmQgPSBuZXcgQXJyYXkoc2l6ZSk7XHJcbiAgICB9XHJcbiAgICBnZW5lcmF0ZUJvYXJkKCkge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5ib2FyZC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLmJvYXJkW2ldID0gbmV3IEFycmF5KHRoaXMuYm9hcmQubGVuZ3RoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmJvYXJkLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5ib2FyZC5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ib2FyZFtpXVtqXSA9IHV0aWxfMS5DZWxsVHlwZS5FTVBUWTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5ib2FyZDtcclxuICAgIH1cclxufVxyXG5leHBvcnRzLmRlZmF1bHQgPSBCb2FyZDtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuY29uc3QgdXRpbF8xID0gcmVxdWlyZShcIi4vdXRpbFwiKTtcclxuY2xhc3MgRm9vZCB7XHJcbiAgICBjb25zdHJ1Y3Rvcihib2FyZCkge1xyXG4gICAgICAgIHRoaXMuYm9hcmQgPSBib2FyZDtcclxuICAgIH1cclxuICAgIGdlbmVyYXRlRm9vZCgpIHtcclxuICAgICAgICBsZXQgcm93ID0gTnVtYmVyKE1hdGguYWJzKE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqIHRoaXMuYm9hcmQubGVuZ3RoIC0gMikpKTtcclxuICAgICAgICBsZXQgY29sID0gTnVtYmVyKE1hdGguYWJzKE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqIHRoaXMuYm9hcmQubGVuZ3RoIC0gMikpKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhyb3csIGNvbCk7XHJcbiAgICAgICAgaWYgKHRoaXMuYm9hcmRbcm93XVtjb2xdID09PSB1dGlsXzEuQ2VsbFR5cGUuU05BS0UpIHtcclxuICAgICAgICAgICAgdGhpcy5nZW5lcmF0ZUZvb2QoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5ib2FyZFtyb3ddW2NvbF0gPSB1dGlsXzEuQ2VsbFR5cGUuRk9PRDtcclxuICAgIH1cclxufVxyXG5leHBvcnRzLmRlZmF1bHQgPSBGb29kO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcclxufTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLmdldFNjb3JlID0gZXhwb3J0cy5nZXREaXJlY3Rpb24gPSBleHBvcnRzLmdldElzcGxheWluZyA9IGV4cG9ydHMuc2V0RGlyZWN0aW9uID0gZXhwb3J0cy5kcmF3R2FtZSA9IHZvaWQgMDtcclxuY29uc3QgZm9vZF8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL2Zvb2RcIikpO1xyXG5jb25zdCB1dGlsXzEgPSByZXF1aXJlKFwiLi91dGlsXCIpO1xyXG5sZXQgaXNQbGF5aW5nID0gdHJ1ZTtcclxubGV0IGRpcmVjdGlvbiA9IHV0aWxfMS5EaXJlY3Rpb24uVVA7XHJcbmxldCBzY29yZSA9IDA7XHJcbmZ1bmN0aW9uIGRyYXdHYW1lKGJvYXJkLCBzbmFrZSwgc2l6ZSkge1xyXG4gICAgbGV0IGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2FudmFzXCIpO1xyXG4gICAgbGV0IGNvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xyXG4gICAgbGV0IGNhbnZhc1NpemUgPSBzaXplICogMTA7XHJcbiAgICBsZXQgaGVhZCA9IDA7XHJcbiAgICBsZXQgdGFpbCA9IHNuYWtlLmxlbmd0aCAtIDE7XHJcbiAgICBjb250ZXh0ID09PSBudWxsIHx8IGNvbnRleHQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGNvbnRleHQuY2xlYXJSZWN0KDAsIDAsIGNhbnZhc1NpemUsIGNhbnZhc1NpemUpO1xyXG4gICAgZm9yIChsZXQgaSA9IHRhaWw7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgICAgLy9IYW5kbGUgaGVhZC4uLlxyXG4gICAgICAgIGlmIChpID09PSBoZWFkKSB7XHJcbiAgICAgICAgICAgIGlmIChkaXJlY3Rpb24gPT09IHV0aWxfMS5EaXJlY3Rpb24uUklHSFQpIHtcclxuICAgICAgICAgICAgICAgIHNuYWtlW2hlYWRdID0geyB4OiBzbmFrZVtoZWFkXS54ICsgMSwgeTogc25ha2VbaGVhZF0ueSB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGRpcmVjdGlvbiA9PT0gdXRpbF8xLkRpcmVjdGlvbi5MRUZUKSB7XHJcbiAgICAgICAgICAgICAgICBzbmFrZVtoZWFkXSA9IHsgeDogc25ha2VbaGVhZF0ueCAtIDEsIHk6IHNuYWtlW2hlYWRdLnkgfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChkaXJlY3Rpb24gPT09IHV0aWxfMS5EaXJlY3Rpb24uVVApIHtcclxuICAgICAgICAgICAgICAgIHNuYWtlW2hlYWRdID0geyB4OiBzbmFrZVtoZWFkXS54LCB5OiBzbmFrZVtoZWFkXS55IC0gMSB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGRpcmVjdGlvbiA9PT0gdXRpbF8xLkRpcmVjdGlvbi5ET1dOKSB7XHJcbiAgICAgICAgICAgICAgICBzbmFrZVtoZWFkXSA9IHsgeDogc25ha2VbaGVhZF0ueCwgeTogc25ha2VbaGVhZF0ueSArIDEgfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoc25ha2VbaGVhZF0ueCA8IDAgfHxcclxuICAgICAgICAgICAgICAgIHNuYWtlW2hlYWRdLnggPj0gc2l6ZSB8fFxyXG4gICAgICAgICAgICAgICAgc25ha2VbaGVhZF0ueSA8IDAgfHxcclxuICAgICAgICAgICAgICAgIHNuYWtlW2hlYWRdLnkgPj0gc2l6ZSkge1xyXG4gICAgICAgICAgICAgICAgZ2FtZU92ZXIoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoYm9hcmRbc25ha2VbaGVhZF0ueF1bc25ha2VbaGVhZF0ueV0gPT09IHV0aWxfMS5DZWxsVHlwZS5TTkFLRSkge1xyXG4gICAgICAgICAgICAgICAgZ2FtZU92ZXIoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoYm9hcmRbc25ha2VbaGVhZF0ueF1bc25ha2VbaGVhZF0ueV0gPT09IHV0aWxfMS5DZWxsVHlwZS5GT09EKSB7XHJcbiAgICAgICAgICAgICAgICBzY29yZSA9IHNjb3JlICsgMTA7XHJcbiAgICAgICAgICAgICAgICBuZXcgZm9vZF8xLmRlZmF1bHQoYm9hcmQpLmdlbmVyYXRlRm9vZCgpO1xyXG4gICAgICAgICAgICAgICAgc25ha2UucHVzaCh7IHg6IHNuYWtlW3RhaWxdLngsIHk6IHNuYWtlW3RhaWxdLnkgfSk7XHJcbiAgICAgICAgICAgICAgICBib2FyZFtzbmFrZVt0YWlsXS54XVtzbmFrZVt0YWlsXS55XSA9IHV0aWxfMS5DZWxsVHlwZS5TTkFLRTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBib2FyZFtzbmFrZVtoZWFkXS54XVtzbmFrZVtoZWFkXS55XSA9IHV0aWxfMS5DZWxsVHlwZS5TTkFLRTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGlmIChpID09PSB0YWlsKSB7XHJcbiAgICAgICAgICAgICAgICBib2FyZFtzbmFrZVtpXS54XVtzbmFrZVtpXS55XSA9IHV0aWxfMS5DZWxsVHlwZS5FTVBUWTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzbmFrZVtpXSA9IHsgeDogc25ha2VbaSAtIDFdLngsIHk6IHNuYWtlW2kgLSAxXS55IH07XHJcbiAgICAgICAgICAgIGJvYXJkW3NuYWtlW2ldLnhdW3NuYWtlW2ldLnldID0gdXRpbF8xLkNlbGxUeXBlLlNOQUtFO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJvYXJkLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgYm9hcmQubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChib2FyZFtpXVtqXSA9PT0gdXRpbF8xLkNlbGxUeXBlLkZPT0QpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb250ZXh0LmZpbGxTdHlsZSA9ICdncmVlbic7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dC5maWxsUmVjdChpICogMTAsIGogKiAxMCwgMTAsIDEwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChib2FyZFtpXVtqXSA9PT0gdXRpbF8xLkNlbGxUeXBlLlNOQUtFKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dC5maWxsU3R5bGUgPSAncmVkJztcclxuICAgICAgICAgICAgICAgICAgICBjb250ZXh0LmZpbGxSZWN0KGkgKiAxMCwgaiAqIDEwLCAxMCwgMTApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGJvYXJkW2ldW2pdID09PSB1dGlsXzEuQ2VsbFR5cGUuRU1QVFkpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb250ZXh0LmZpbGxTdHlsZSA9ICd3aGl0ZSc7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dC5maWxsUmVjdChpICogMTAsIGogKiAxMCwgMTAsIDEwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIGdhbWVPdmVyKCkge1xyXG4gICAgICAgIGlzUGxheWluZyA9IGZhbHNlO1xyXG4gICAgICAgIGNvbnRleHQgPT09IG51bGwgfHwgY29udGV4dCA9PT0gdm9pZCAwID8gdm9pZCAwIDogY29udGV4dC5jbGVhclJlY3QoMCwgMCwgY2FudmFzU2l6ZSwgY2FudmFzU2l6ZSk7XHJcbiAgICAgICAgY29udGV4dC5maWxsU3R5bGUgPSAnYmxhY2snO1xyXG4gICAgICAgIGNvbnRleHQuZm9udCA9ICcxNnB4IHNhbnMtc2VyaWYnO1xyXG4gICAgICAgIGNvbnRleHQuZmlsbFRleHQoJ0dhbWUgT3ZlciEnLCAoKGNhbnZhc1NpemUgLyAyKSAtIChjb250ZXh0Lm1lYXN1cmVUZXh0KCdHYW1lIE92ZXIhJykud2lkdGggLyAyKSksIHNpemUgLyAyKTtcclxuICAgIH1cclxufVxyXG5leHBvcnRzLmRyYXdHYW1lID0gZHJhd0dhbWU7XHJcbmZ1bmN0aW9uIHNldERpcmVjdGlvbihkaXIpIHtcclxuICAgIGRpcmVjdGlvbiA9IGRpcjtcclxufVxyXG5leHBvcnRzLnNldERpcmVjdGlvbiA9IHNldERpcmVjdGlvbjtcclxuZnVuY3Rpb24gZ2V0SXNwbGF5aW5nKCkge1xyXG4gICAgcmV0dXJuIGlzUGxheWluZztcclxufVxyXG5leHBvcnRzLmdldElzcGxheWluZyA9IGdldElzcGxheWluZztcclxuZnVuY3Rpb24gZ2V0RGlyZWN0aW9uKCkge1xyXG4gICAgcmV0dXJuIGRpcmVjdGlvbjtcclxufVxyXG5leHBvcnRzLmdldERpcmVjdGlvbiA9IGdldERpcmVjdGlvbjtcclxuZnVuY3Rpb24gZ2V0U2NvcmUoKSB7XHJcbiAgICByZXR1cm4gc2NvcmU7XHJcbn1cclxuZXhwb3J0cy5nZXRTY29yZSA9IGdldFNjb3JlO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcclxufTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5jb25zdCBmb29kXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vZm9vZFwiKSk7XHJcbmNvbnN0IHNuYWtlXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vc25ha2VcIikpO1xyXG5jb25zdCBib2FyZF8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL2JvYXJkXCIpKTtcclxuY29uc3QgdXRpbF8xID0gcmVxdWlyZShcIi4vdXRpbFwiKTtcclxuY29uc3QgZ2FtZV8xID0gcmVxdWlyZShcIi4vZ2FtZVwiKTtcclxuY29uc3QgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjYW52YXNcIik7XHJcbmNvbnN0IHNjb3JlQm9hcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNjb3JlXCIpO1xyXG5sZXQgc2NvcmU7XHJcbmxldCBzcGVlZCA9IDQwMDtcclxuY29uc3Qgc2l6ZSA9IDQwO1xyXG5sZXQgYm9hcmQgPSBuZXcgYm9hcmRfMS5kZWZhdWx0KHNpemUpLmdlbmVyYXRlQm9hcmQoKTtcclxubGV0IHNuYWtlID0gbmV3IHNuYWtlXzEuZGVmYXVsdChib2FyZCkuZ2VuZXJhdGVTbmFrZSgpO1xyXG5sZXQgaXNQbGF5aW5nID0gdHJ1ZTtcclxubGV0IGRpcmVjdGlvbjtcclxud2luZG93Lm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGNhbnZhcy53aWR0aCA9IHNpemUgKiAxMDtcclxuICAgIGNhbnZhcy5oZWlnaHQgPSBzaXplICogMTA7XHJcbiAgICBuZXcgZm9vZF8xLmRlZmF1bHQoYm9hcmQpLmdlbmVyYXRlRm9vZCgpO1xyXG4gICAgbGV0IGhhbmRsZSA9IHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAoMCwgZ2FtZV8xLmRyYXdHYW1lKShib2FyZCwgc25ha2UsIHNpemUpO1xyXG4gICAgICAgIGlzUGxheWluZyA9ICgwLCBnYW1lXzEuZ2V0SXNwbGF5aW5nKSgpO1xyXG4gICAgICAgIGRpcmVjdGlvbiA9ICgwLCBnYW1lXzEuZ2V0RGlyZWN0aW9uKSgpO1xyXG4gICAgICAgIHNjb3JlID0gKDAsIGdhbWVfMS5nZXRTY29yZSkoKTtcclxuICAgICAgICBzY29yZUJvYXJkLmlubmVyVGV4dCA9IGBTY29yZTogJHtzY29yZX1gO1xyXG4gICAgICAgIGlmICghaXNQbGF5aW5nKSB7XHJcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaGFuZGxlKTtcclxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY29uZmlybShcIkdhbWVPdmVyISBXYW5uYSBnbyBhZ2Fpbj9cIikpIHtcclxuICAgICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sIDMwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSwgc3BlZWQpO1xyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIGlmIChldmVudC5rZXkgPT09IFwiQXJyb3dMZWZ0XCIgJiYgZGlyZWN0aW9uICE9PSB1dGlsXzEuRGlyZWN0aW9uLlJJR0hUKSB7XHJcbiAgICAgICAgICAgICgwLCBnYW1lXzEuc2V0RGlyZWN0aW9uKSh1dGlsXzEuRGlyZWN0aW9uLkxFRlQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChldmVudC5rZXkgPT09IFwiQXJyb3dSaWdodFwiICYmIGRpcmVjdGlvbiAhPT0gdXRpbF8xLkRpcmVjdGlvbi5MRUZUKSB7XHJcbiAgICAgICAgICAgICgwLCBnYW1lXzEuc2V0RGlyZWN0aW9uKSh1dGlsXzEuRGlyZWN0aW9uLlJJR0hUKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoZXZlbnQua2V5ID09PSBcIkFycm93VXBcIiAmJiBkaXJlY3Rpb24gIT09IHV0aWxfMS5EaXJlY3Rpb24uRE9XTikge1xyXG4gICAgICAgICAgICAoMCwgZ2FtZV8xLnNldERpcmVjdGlvbikodXRpbF8xLkRpcmVjdGlvbi5VUCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGV2ZW50LmtleSA9PT0gXCJBcnJvd0Rvd25cIiAmJiBkaXJlY3Rpb24gIT09IHV0aWxfMS5EaXJlY3Rpb24uVVApIHtcclxuICAgICAgICAgICAgKDAsIGdhbWVfMS5zZXREaXJlY3Rpb24pKHV0aWxfMS5EaXJlY3Rpb24uRE9XTik7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn07XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmNvbnN0IHV0aWxfMSA9IHJlcXVpcmUoXCIuL3V0aWxcIik7XHJcbmNsYXNzIFNuYWtlIHtcclxuICAgIGNvbnN0cnVjdG9yKGJvYXJkKSB7XHJcbiAgICAgICAgdGhpcy5zbmFrZVNpemUgPSAzO1xyXG4gICAgICAgIHRoaXMuYm9hcmQgPSBib2FyZDtcclxuICAgIH1cclxuICAgIGdlbmVyYXRlU25ha2UoKSB7XHJcbiAgICAgICAgbGV0IHNuYWtlID0gbmV3IEFycmF5KHRoaXMuc25ha2VTaXplKTtcclxuICAgICAgICBsZXQgcm93ID0gTnVtYmVyKE1hdGgucm91bmQodGhpcy5ib2FyZC5sZW5ndGggLyAyKSk7XHJcbiAgICAgICAgbGV0IGNvbCA9IE51bWJlcihNYXRoLnJvdW5kKHRoaXMuYm9hcmQubGVuZ3RoIC8gMikpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5zbmFrZVNpemU7IGkrKykge1xyXG4gICAgICAgICAgICBzbmFrZVtpXSA9IHsgeDogcm93IC0gaSwgeTogY29sIH07XHJcbiAgICAgICAgICAgIHRoaXMuYm9hcmRbcm93IC0gaV1bY29sXSA9IHV0aWxfMS5DZWxsVHlwZS5TTkFLRTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHNuYWtlO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuZGVmYXVsdCA9IFNuYWtlO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLkRpcmVjdGlvbiA9IGV4cG9ydHMuQ2VsbFR5cGUgPSB2b2lkIDA7XHJcbnZhciBDZWxsVHlwZTtcclxuKGZ1bmN0aW9uIChDZWxsVHlwZSkge1xyXG4gICAgQ2VsbFR5cGVbQ2VsbFR5cGVbXCJGT09EXCJdID0gMF0gPSBcIkZPT0RcIjtcclxuICAgIENlbGxUeXBlW0NlbGxUeXBlW1wiU05BS0VcIl0gPSAxXSA9IFwiU05BS0VcIjtcclxuICAgIENlbGxUeXBlW0NlbGxUeXBlW1wiRU1QVFlcIl0gPSAyXSA9IFwiRU1QVFlcIjtcclxufSkoQ2VsbFR5cGUgPSBleHBvcnRzLkNlbGxUeXBlIHx8IChleHBvcnRzLkNlbGxUeXBlID0ge30pKTtcclxudmFyIERpcmVjdGlvbjtcclxuKGZ1bmN0aW9uIChEaXJlY3Rpb24pIHtcclxuICAgIERpcmVjdGlvbltEaXJlY3Rpb25bXCJSSUdIVFwiXSA9IDBdID0gXCJSSUdIVFwiO1xyXG4gICAgRGlyZWN0aW9uW0RpcmVjdGlvbltcIkxFRlRcIl0gPSAxXSA9IFwiTEVGVFwiO1xyXG4gICAgRGlyZWN0aW9uW0RpcmVjdGlvbltcIlVQXCJdID0gMl0gPSBcIlVQXCI7XHJcbiAgICBEaXJlY3Rpb25bRGlyZWN0aW9uW1wiRE9XTlwiXSA9IDNdID0gXCJET1dOXCI7XHJcbn0pKERpcmVjdGlvbiA9IGV4cG9ydHMuRGlyZWN0aW9uIHx8IChleHBvcnRzLkRpcmVjdGlvbiA9IHt9KSk7XHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9tYWluLnRzXCIpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9