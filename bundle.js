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
        let row = Number(Math.round(Math.random() * this.board.length - 2));
        let col = Number(Math.round(Math.random() * this.board.length - 2));
        while (this.board[row][col] === util_1.CellType.SNAKE) {
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
let speed = 500;
const size = 35;
let board = new board_1.default(size).generateBoard();
let snake = new snake_1.default(board).generateSnake();
new food_1.default(board).generateFood();
let isPlaying = true;
let direction;
window.onload = function () {
    canvas.width = size * 10;
    canvas.height = size * 10;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0Esa0JBQWU7Ozs7Ozs7Ozs7O0FDbkJGO0FBQ2IsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELGlCQUFpQixHQUFHLGdCQUFnQjtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxrQ0FBa0MsZ0JBQWdCLEtBQUs7QUFDeEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxvQ0FBb0MsaUJBQWlCLEtBQUs7Ozs7Ozs7VUNmM0Q7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7OztVRXRCQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2ZpbG1vcmEvLi9zcmMvYm9hcmQudHMiLCJ3ZWJwYWNrOi8vZmlsbW9yYS8uL3NyYy9mb29kLnRzIiwid2VicGFjazovL2ZpbG1vcmEvLi9zcmMvZ2FtZS50cyIsIndlYnBhY2s6Ly9maWxtb3JhLy4vc3JjL21haW4udHMiLCJ3ZWJwYWNrOi8vZmlsbW9yYS8uL3NyYy9zbmFrZS50cyIsIndlYnBhY2s6Ly9maWxtb3JhLy4vc3JjL3V0aWwudHMiLCJ3ZWJwYWNrOi8vZmlsbW9yYS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9maWxtb3JhL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vZmlsbW9yYS93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vZmlsbW9yYS93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuY29uc3QgdXRpbF8xID0gcmVxdWlyZShcIi4vdXRpbFwiKTtcclxuY2xhc3MgQm9hcmQge1xyXG4gICAgY29uc3RydWN0b3Ioc2l6ZSkge1xyXG4gICAgICAgIHRoaXMuYm9hcmQgPSBuZXcgQXJyYXkoc2l6ZSk7XHJcbiAgICB9XHJcbiAgICBnZW5lcmF0ZUJvYXJkKCkge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5ib2FyZC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLmJvYXJkW2ldID0gbmV3IEFycmF5KHRoaXMuYm9hcmQubGVuZ3RoKTtcclxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLmJvYXJkLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJvYXJkW2ldW2pdID0gdXRpbF8xLkNlbGxUeXBlLkVNUFRZO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLmJvYXJkO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuZGVmYXVsdCA9IEJvYXJkO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5jb25zdCB1dGlsXzEgPSByZXF1aXJlKFwiLi91dGlsXCIpO1xyXG5jbGFzcyBGb29kIHtcclxuICAgIGNvbnN0cnVjdG9yKGJvYXJkKSB7XHJcbiAgICAgICAgdGhpcy5ib2FyZCA9IGJvYXJkO1xyXG4gICAgfVxyXG4gICAgZ2VuZXJhdGVGb29kKCkge1xyXG4gICAgICAgIGxldCByb3cgPSBOdW1iZXIoTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogdGhpcy5ib2FyZC5sZW5ndGggLSAyKSk7XHJcbiAgICAgICAgbGV0IGNvbCA9IE51bWJlcihNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiB0aGlzLmJvYXJkLmxlbmd0aCAtIDIpKTtcclxuICAgICAgICB3aGlsZSAodGhpcy5ib2FyZFtyb3ddW2NvbF0gPT09IHV0aWxfMS5DZWxsVHlwZS5TTkFLRSkge1xyXG4gICAgICAgICAgICB0aGlzLmdlbmVyYXRlRm9vZCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmJvYXJkW3Jvd11bY29sXSA9IHV0aWxfMS5DZWxsVHlwZS5GT09EO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuZGVmYXVsdCA9IEZvb2Q7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcclxuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xyXG59O1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuZ2V0U2NvcmUgPSBleHBvcnRzLmdldERpcmVjdGlvbiA9IGV4cG9ydHMuZ2V0SXNwbGF5aW5nID0gZXhwb3J0cy5zZXREaXJlY3Rpb24gPSBleHBvcnRzLmRyYXdHYW1lID0gdm9pZCAwO1xyXG5jb25zdCBmb29kXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vZm9vZFwiKSk7XHJcbmNvbnN0IHV0aWxfMSA9IHJlcXVpcmUoXCIuL3V0aWxcIik7XHJcbmxldCBpc1BsYXlpbmcgPSB0cnVlO1xyXG5sZXQgZGlyZWN0aW9uID0gdXRpbF8xLkRpcmVjdGlvbi5VUDtcclxubGV0IHNjb3JlID0gMDtcclxuZnVuY3Rpb24gZHJhd0dhbWUoYm9hcmQsIHNuYWtlLCBzaXplKSB7XHJcbiAgICBsZXQgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjYW52YXNcIik7XHJcbiAgICBsZXQgY29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XHJcbiAgICBsZXQgY2FudmFzU2l6ZSA9IHNpemUgKiAxMDtcclxuICAgIGxldCBoZWFkID0gMDtcclxuICAgIGxldCB0YWlsID0gc25ha2UubGVuZ3RoIC0gMTtcclxuICAgIGNvbnRleHQgPT09IG51bGwgfHwgY29udGV4dCA9PT0gdm9pZCAwID8gdm9pZCAwIDogY29udGV4dC5jbGVhclJlY3QoMCwgMCwgY2FudmFzU2l6ZSwgY2FudmFzU2l6ZSk7XHJcbiAgICBmb3IgKGxldCBpID0gdGFpbDsgaSA+PSAwOyBpLS0pIHtcclxuICAgICAgICAvL0hhbmRsZSBoZWFkLi4uXHJcbiAgICAgICAgaWYgKGkgPT09IGhlYWQpIHtcclxuICAgICAgICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gdXRpbF8xLkRpcmVjdGlvbi5SSUdIVCkge1xyXG4gICAgICAgICAgICAgICAgc25ha2VbaGVhZF0gPSB7IHg6IHNuYWtlW2hlYWRdLnggKyAxLCB5OiBzbmFrZVtoZWFkXS55IH07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoZGlyZWN0aW9uID09PSB1dGlsXzEuRGlyZWN0aW9uLkxFRlQpIHtcclxuICAgICAgICAgICAgICAgIHNuYWtlW2hlYWRdID0geyB4OiBzbmFrZVtoZWFkXS54IC0gMSwgeTogc25ha2VbaGVhZF0ueSB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGRpcmVjdGlvbiA9PT0gdXRpbF8xLkRpcmVjdGlvbi5VUCkge1xyXG4gICAgICAgICAgICAgICAgc25ha2VbaGVhZF0gPSB7IHg6IHNuYWtlW2hlYWRdLngsIHk6IHNuYWtlW2hlYWRdLnkgLSAxIH07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoZGlyZWN0aW9uID09PSB1dGlsXzEuRGlyZWN0aW9uLkRPV04pIHtcclxuICAgICAgICAgICAgICAgIHNuYWtlW2hlYWRdID0geyB4OiBzbmFrZVtoZWFkXS54LCB5OiBzbmFrZVtoZWFkXS55ICsgMSB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChzbmFrZVtoZWFkXS54IDwgMCB8fFxyXG4gICAgICAgICAgICAgICAgc25ha2VbaGVhZF0ueCA+PSBzaXplIHx8XHJcbiAgICAgICAgICAgICAgICBzbmFrZVtoZWFkXS55IDwgMCB8fFxyXG4gICAgICAgICAgICAgICAgc25ha2VbaGVhZF0ueSA+PSBzaXplKSB7XHJcbiAgICAgICAgICAgICAgICBnYW1lT3ZlcigpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChib2FyZFtzbmFrZVtoZWFkXS54XVtzbmFrZVtoZWFkXS55XSA9PT0gdXRpbF8xLkNlbGxUeXBlLlNOQUtFKSB7XHJcbiAgICAgICAgICAgICAgICBnYW1lT3ZlcigpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChib2FyZFtzbmFrZVtoZWFkXS54XVtzbmFrZVtoZWFkXS55XSA9PT0gdXRpbF8xLkNlbGxUeXBlLkZPT0QpIHtcclxuICAgICAgICAgICAgICAgIHNjb3JlID0gc2NvcmUgKyAxMDtcclxuICAgICAgICAgICAgICAgIG5ldyBmb29kXzEuZGVmYXVsdChib2FyZCkuZ2VuZXJhdGVGb29kKCk7XHJcbiAgICAgICAgICAgICAgICBzbmFrZS5wdXNoKHsgeDogc25ha2VbdGFpbF0ueCwgeTogc25ha2VbdGFpbF0ueSB9KTtcclxuICAgICAgICAgICAgICAgIGJvYXJkW3NuYWtlW3RhaWxdLnhdW3NuYWtlW3RhaWxdLnldID0gdXRpbF8xLkNlbGxUeXBlLlNOQUtFO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGJvYXJkW3NuYWtlW2hlYWRdLnhdW3NuYWtlW2hlYWRdLnldID0gdXRpbF8xLkNlbGxUeXBlLlNOQUtFO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKGkgPT09IHRhaWwpIHtcclxuICAgICAgICAgICAgICAgIGJvYXJkW3NuYWtlW2ldLnhdW3NuYWtlW2ldLnldID0gdXRpbF8xLkNlbGxUeXBlLkVNUFRZO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHNuYWtlW2ldID0geyB4OiBzbmFrZVtpIC0gMV0ueCwgeTogc25ha2VbaSAtIDFdLnkgfTtcclxuICAgICAgICAgICAgYm9hcmRbc25ha2VbaV0ueF1bc25ha2VbaV0ueV0gPSB1dGlsXzEuQ2VsbFR5cGUuU05BS0U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYm9hcmQubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBib2FyZC5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKGJvYXJkW2ldW2pdID09PSB1dGlsXzEuQ2VsbFR5cGUuRk9PRCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQuZmlsbFN0eWxlID0gJ2dyZWVuJztcclxuICAgICAgICAgICAgICAgICAgICBjb250ZXh0LmZpbGxSZWN0KGkgKiAxMCwgaiAqIDEwLCAxMCwgMTApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGJvYXJkW2ldW2pdID09PSB1dGlsXzEuQ2VsbFR5cGUuU05BS0UpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb250ZXh0LmZpbGxTdHlsZSA9ICdyZWQnO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQuZmlsbFJlY3QoaSAqIDEwLCBqICogMTAsIDEwLCAxMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoYm9hcmRbaV1bal0gPT09IHV0aWxfMS5DZWxsVHlwZS5FTVBUWSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQuZmlsbFN0eWxlID0gJ3doaXRlJztcclxuICAgICAgICAgICAgICAgICAgICBjb250ZXh0LmZpbGxSZWN0KGkgKiAxMCwgaiAqIDEwLCAxMCwgMTApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gZ2FtZU92ZXIoKSB7XHJcbiAgICAgICAgaXNQbGF5aW5nID0gZmFsc2U7XHJcbiAgICAgICAgY29udGV4dCA9PT0gbnVsbCB8fCBjb250ZXh0ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBjb250ZXh0LmNsZWFyUmVjdCgwLCAwLCBjYW52YXNTaXplLCBjYW52YXNTaXplKTtcclxuICAgICAgICBjb250ZXh0LmZpbGxTdHlsZSA9ICdibGFjayc7XHJcbiAgICAgICAgY29udGV4dC5mb250ID0gJzE2cHggc2Fucy1zZXJpZic7XHJcbiAgICAgICAgY29udGV4dC5maWxsVGV4dCgnR2FtZSBPdmVyIScsICgoY2FudmFzU2l6ZSAvIDIpIC0gKGNvbnRleHQubWVhc3VyZVRleHQoJ0dhbWUgT3ZlciEnKS53aWR0aCAvIDIpKSwgc2l6ZSAvIDIpO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuZHJhd0dhbWUgPSBkcmF3R2FtZTtcclxuZnVuY3Rpb24gc2V0RGlyZWN0aW9uKGRpcikge1xyXG4gICAgZGlyZWN0aW9uID0gZGlyO1xyXG59XHJcbmV4cG9ydHMuc2V0RGlyZWN0aW9uID0gc2V0RGlyZWN0aW9uO1xyXG5mdW5jdGlvbiBnZXRJc3BsYXlpbmcoKSB7XHJcbiAgICByZXR1cm4gaXNQbGF5aW5nO1xyXG59XHJcbmV4cG9ydHMuZ2V0SXNwbGF5aW5nID0gZ2V0SXNwbGF5aW5nO1xyXG5mdW5jdGlvbiBnZXREaXJlY3Rpb24oKSB7XHJcbiAgICByZXR1cm4gZGlyZWN0aW9uO1xyXG59XHJcbmV4cG9ydHMuZ2V0RGlyZWN0aW9uID0gZ2V0RGlyZWN0aW9uO1xyXG5mdW5jdGlvbiBnZXRTY29yZSgpIHtcclxuICAgIHJldHVybiBzY29yZTtcclxufVxyXG5leHBvcnRzLmdldFNjb3JlID0gZ2V0U2NvcmU7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcclxuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xyXG59O1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmNvbnN0IGZvb2RfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9mb29kXCIpKTtcclxuY29uc3Qgc25ha2VfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9zbmFrZVwiKSk7XHJcbmNvbnN0IGJvYXJkXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vYm9hcmRcIikpO1xyXG5jb25zdCB1dGlsXzEgPSByZXF1aXJlKFwiLi91dGlsXCIpO1xyXG5jb25zdCBnYW1lXzEgPSByZXF1aXJlKFwiLi9nYW1lXCIpO1xyXG5jb25zdCBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNhbnZhc1wiKTtcclxuY29uc3Qgc2NvcmVCb2FyZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2NvcmVcIik7XHJcbmxldCBzY29yZTtcclxubGV0IHNwZWVkID0gNTAwO1xyXG5jb25zdCBzaXplID0gMzU7XHJcbmxldCBib2FyZCA9IG5ldyBib2FyZF8xLmRlZmF1bHQoc2l6ZSkuZ2VuZXJhdGVCb2FyZCgpO1xyXG5sZXQgc25ha2UgPSBuZXcgc25ha2VfMS5kZWZhdWx0KGJvYXJkKS5nZW5lcmF0ZVNuYWtlKCk7XHJcbm5ldyBmb29kXzEuZGVmYXVsdChib2FyZCkuZ2VuZXJhdGVGb29kKCk7XHJcbmxldCBpc1BsYXlpbmcgPSB0cnVlO1xyXG5sZXQgZGlyZWN0aW9uO1xyXG53aW5kb3cub25sb2FkID0gZnVuY3Rpb24gKCkge1xyXG4gICAgY2FudmFzLndpZHRoID0gc2l6ZSAqIDEwO1xyXG4gICAgY2FudmFzLmhlaWdodCA9IHNpemUgKiAxMDtcclxuICAgIGxldCBoYW5kbGUgPSBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgKDAsIGdhbWVfMS5kcmF3R2FtZSkoYm9hcmQsIHNuYWtlLCBzaXplKTtcclxuICAgICAgICBpc1BsYXlpbmcgPSAoMCwgZ2FtZV8xLmdldElzcGxheWluZykoKTtcclxuICAgICAgICBkaXJlY3Rpb24gPSAoMCwgZ2FtZV8xLmdldERpcmVjdGlvbikoKTtcclxuICAgICAgICBzY29yZSA9ICgwLCBnYW1lXzEuZ2V0U2NvcmUpKCk7XHJcbiAgICAgICAgc2NvcmVCb2FyZC5pbm5lclRleHQgPSBgU2NvcmU6ICR7c2NvcmV9YDtcclxuICAgICAgICBpZiAoIWlzUGxheWluZykge1xyXG4gICAgICAgICAgICBjbGVhckludGVydmFsKGhhbmRsZSk7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGNvbmZpcm0oXCJHYW1lT3ZlciEgV2FubmEgZ28gYWdhaW4/XCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCAzMDApO1xyXG4gICAgICAgIH1cclxuICAgIH0sIHNwZWVkKTtcclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBpZiAoZXZlbnQua2V5ID09PSBcIkFycm93TGVmdFwiICYmIGRpcmVjdGlvbiAhPT0gdXRpbF8xLkRpcmVjdGlvbi5SSUdIVCkge1xyXG4gICAgICAgICAgICAoMCwgZ2FtZV8xLnNldERpcmVjdGlvbikodXRpbF8xLkRpcmVjdGlvbi5MRUZUKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoZXZlbnQua2V5ID09PSBcIkFycm93UmlnaHRcIiAmJiBkaXJlY3Rpb24gIT09IHV0aWxfMS5EaXJlY3Rpb24uTEVGVCkge1xyXG4gICAgICAgICAgICAoMCwgZ2FtZV8xLnNldERpcmVjdGlvbikodXRpbF8xLkRpcmVjdGlvbi5SSUdIVCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGV2ZW50LmtleSA9PT0gXCJBcnJvd1VwXCIgJiYgZGlyZWN0aW9uICE9PSB1dGlsXzEuRGlyZWN0aW9uLkRPV04pIHtcclxuICAgICAgICAgICAgKDAsIGdhbWVfMS5zZXREaXJlY3Rpb24pKHV0aWxfMS5EaXJlY3Rpb24uVVApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChldmVudC5rZXkgPT09IFwiQXJyb3dEb3duXCIgJiYgZGlyZWN0aW9uICE9PSB1dGlsXzEuRGlyZWN0aW9uLlVQKSB7XHJcbiAgICAgICAgICAgICgwLCBnYW1lXzEuc2V0RGlyZWN0aW9uKSh1dGlsXzEuRGlyZWN0aW9uLkRPV04pO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59O1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5jb25zdCB1dGlsXzEgPSByZXF1aXJlKFwiLi91dGlsXCIpO1xyXG5jbGFzcyBTbmFrZSB7XHJcbiAgICBjb25zdHJ1Y3Rvcihib2FyZCkge1xyXG4gICAgICAgIHRoaXMuc25ha2VTaXplID0gMztcclxuICAgICAgICB0aGlzLmJvYXJkID0gYm9hcmQ7XHJcbiAgICB9XHJcbiAgICBnZW5lcmF0ZVNuYWtlKCkge1xyXG4gICAgICAgIGxldCBzbmFrZSA9IG5ldyBBcnJheSh0aGlzLnNuYWtlU2l6ZSk7XHJcbiAgICAgICAgbGV0IHJvdyA9IE51bWJlcihNYXRoLnJvdW5kKHRoaXMuYm9hcmQubGVuZ3RoIC8gMikpO1xyXG4gICAgICAgIGxldCBjb2wgPSBOdW1iZXIoTWF0aC5yb3VuZCh0aGlzLmJvYXJkLmxlbmd0aCAvIDIpKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuc25ha2VTaXplOyBpKyspIHtcclxuICAgICAgICAgICAgc25ha2VbaV0gPSB7IHg6IHJvdyAtIGksIHk6IGNvbCB9O1xyXG4gICAgICAgICAgICB0aGlzLmJvYXJkW3JvdyAtIGldW2NvbF0gPSB1dGlsXzEuQ2VsbFR5cGUuU05BS0U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzbmFrZTtcclxuICAgIH1cclxufVxyXG5leHBvcnRzLmRlZmF1bHQgPSBTbmFrZTtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5EaXJlY3Rpb24gPSBleHBvcnRzLkNlbGxUeXBlID0gdm9pZCAwO1xyXG52YXIgQ2VsbFR5cGU7XHJcbihmdW5jdGlvbiAoQ2VsbFR5cGUpIHtcclxuICAgIENlbGxUeXBlW0NlbGxUeXBlW1wiRk9PRFwiXSA9IDBdID0gXCJGT09EXCI7XHJcbiAgICBDZWxsVHlwZVtDZWxsVHlwZVtcIlNOQUtFXCJdID0gMV0gPSBcIlNOQUtFXCI7XHJcbiAgICBDZWxsVHlwZVtDZWxsVHlwZVtcIkVNUFRZXCJdID0gMl0gPSBcIkVNUFRZXCI7XHJcbn0pKENlbGxUeXBlID0gZXhwb3J0cy5DZWxsVHlwZSB8fCAoZXhwb3J0cy5DZWxsVHlwZSA9IHt9KSk7XHJcbnZhciBEaXJlY3Rpb247XHJcbihmdW5jdGlvbiAoRGlyZWN0aW9uKSB7XHJcbiAgICBEaXJlY3Rpb25bRGlyZWN0aW9uW1wiUklHSFRcIl0gPSAwXSA9IFwiUklHSFRcIjtcclxuICAgIERpcmVjdGlvbltEaXJlY3Rpb25bXCJMRUZUXCJdID0gMV0gPSBcIkxFRlRcIjtcclxuICAgIERpcmVjdGlvbltEaXJlY3Rpb25bXCJVUFwiXSA9IDJdID0gXCJVUFwiO1xyXG4gICAgRGlyZWN0aW9uW0RpcmVjdGlvbltcIkRPV05cIl0gPSAzXSA9IFwiRE9XTlwiO1xyXG59KShEaXJlY3Rpb24gPSBleHBvcnRzLkRpcmVjdGlvbiB8fCAoZXhwb3J0cy5EaXJlY3Rpb24gPSB7fSkpO1xyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvbWFpbi50c1wiKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==