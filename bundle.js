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
    let speedHandle = setInterval(function () {
        if (speed <= 100) {
            clearInterval(speedHandle);
        }
        speed--;
    }, 1000);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNuR2E7QUFDYiw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0QsZUFBZSxtQkFBTyxDQUFDLDZCQUFRO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixvQkFBb0I7QUFDNUMseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBZTs7Ozs7Ozs7Ozs7QUNuQkY7QUFDYiw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0QsaUJBQWlCLEdBQUcsZ0JBQWdCO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLGtDQUFrQyxnQkFBZ0IsS0FBSztBQUN4RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLG9DQUFvQyxpQkFBaUIsS0FBSzs7Ozs7OztVQ2YzRDtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7O1VFdEJBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZmlsbW9yYS8uL3NyYy9ib2FyZC50cyIsIndlYnBhY2s6Ly9maWxtb3JhLy4vc3JjL2Zvb2QudHMiLCJ3ZWJwYWNrOi8vZmlsbW9yYS8uL3NyYy9nYW1lLnRzIiwid2VicGFjazovL2ZpbG1vcmEvLi9zcmMvbWFpbi50cyIsIndlYnBhY2s6Ly9maWxtb3JhLy4vc3JjL3NuYWtlLnRzIiwid2VicGFjazovL2ZpbG1vcmEvLi9zcmMvdXRpbC50cyIsIndlYnBhY2s6Ly9maWxtb3JhL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2ZpbG1vcmEvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9maWxtb3JhL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9maWxtb3JhL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5jb25zdCB1dGlsXzEgPSByZXF1aXJlKFwiLi91dGlsXCIpO1xyXG5jbGFzcyBCb2FyZCB7XHJcbiAgICBjb25zdHJ1Y3RvcihzaXplKSB7XHJcbiAgICAgICAgdGhpcy5ib2FyZCA9IG5ldyBBcnJheShzaXplKTtcclxuICAgIH1cclxuICAgIGdlbmVyYXRlQm9hcmQoKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmJvYXJkLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYm9hcmRbaV0gPSBuZXcgQXJyYXkodGhpcy5ib2FyZC5sZW5ndGgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuYm9hcmQubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLmJvYXJkLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJvYXJkW2ldW2pdID0gdXRpbF8xLkNlbGxUeXBlLkVNUFRZO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLmJvYXJkO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuZGVmYXVsdCA9IEJvYXJkO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5jb25zdCB1dGlsXzEgPSByZXF1aXJlKFwiLi91dGlsXCIpO1xyXG5jbGFzcyBGb29kIHtcclxuICAgIGNvbnN0cnVjdG9yKGJvYXJkKSB7XHJcbiAgICAgICAgdGhpcy5ib2FyZCA9IGJvYXJkO1xyXG4gICAgfVxyXG4gICAgZ2VuZXJhdGVGb29kKCkge1xyXG4gICAgICAgIGxldCByb3cgPSBOdW1iZXIoTWF0aC5hYnMoTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogdGhpcy5ib2FyZC5sZW5ndGggLSAyKSkpO1xyXG4gICAgICAgIGxldCBjb2wgPSBOdW1iZXIoTWF0aC5hYnMoTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogdGhpcy5ib2FyZC5sZW5ndGggLSAyKSkpO1xyXG4gICAgICAgIGlmICh0aGlzLmJvYXJkW3Jvd11bY29sXSA9PT0gdXRpbF8xLkNlbGxUeXBlLlNOQUtFKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2VuZXJhdGVGb29kKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuYm9hcmRbcm93XVtjb2xdID0gdXRpbF8xLkNlbGxUeXBlLkZPT0Q7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5kZWZhdWx0ID0gRm9vZDtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xyXG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XHJcbn07XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5nZXRTY29yZSA9IGV4cG9ydHMuZ2V0RGlyZWN0aW9uID0gZXhwb3J0cy5nZXRJc3BsYXlpbmcgPSBleHBvcnRzLnNldERpcmVjdGlvbiA9IGV4cG9ydHMuZHJhd0dhbWUgPSB2b2lkIDA7XHJcbmNvbnN0IGZvb2RfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9mb29kXCIpKTtcclxuY29uc3QgdXRpbF8xID0gcmVxdWlyZShcIi4vdXRpbFwiKTtcclxubGV0IGlzUGxheWluZyA9IHRydWU7XHJcbmxldCBkaXJlY3Rpb24gPSB1dGlsXzEuRGlyZWN0aW9uLlVQO1xyXG5sZXQgc2NvcmUgPSAwO1xyXG5mdW5jdGlvbiBkcmF3R2FtZShib2FyZCwgc25ha2UsIHNpemUpIHtcclxuICAgIGxldCBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNhbnZhc1wiKTtcclxuICAgIGxldCBjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcclxuICAgIGxldCBjYW52YXNTaXplID0gc2l6ZSAqIDEwO1xyXG4gICAgbGV0IGhlYWQgPSAwO1xyXG4gICAgbGV0IHRhaWwgPSBzbmFrZS5sZW5ndGggLSAxO1xyXG4gICAgY29udGV4dCA9PT0gbnVsbCB8fCBjb250ZXh0ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBjb250ZXh0LmNsZWFyUmVjdCgwLCAwLCBjYW52YXNTaXplLCBjYW52YXNTaXplKTtcclxuICAgIGZvciAobGV0IGkgPSB0YWlsOyBpID49IDA7IGktLSkge1xyXG4gICAgICAgIC8vSGFuZGxlIGhlYWQuLi5cclxuICAgICAgICBpZiAoaSA9PT0gaGVhZCkge1xyXG4gICAgICAgICAgICBpZiAoZGlyZWN0aW9uID09PSB1dGlsXzEuRGlyZWN0aW9uLlJJR0hUKSB7XHJcbiAgICAgICAgICAgICAgICBzbmFrZVtoZWFkXSA9IHsgeDogc25ha2VbaGVhZF0ueCArIDEsIHk6IHNuYWtlW2hlYWRdLnkgfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChkaXJlY3Rpb24gPT09IHV0aWxfMS5EaXJlY3Rpb24uTEVGVCkge1xyXG4gICAgICAgICAgICAgICAgc25ha2VbaGVhZF0gPSB7IHg6IHNuYWtlW2hlYWRdLnggLSAxLCB5OiBzbmFrZVtoZWFkXS55IH07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoZGlyZWN0aW9uID09PSB1dGlsXzEuRGlyZWN0aW9uLlVQKSB7XHJcbiAgICAgICAgICAgICAgICBzbmFrZVtoZWFkXSA9IHsgeDogc25ha2VbaGVhZF0ueCwgeTogc25ha2VbaGVhZF0ueSAtIDEgfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChkaXJlY3Rpb24gPT09IHV0aWxfMS5EaXJlY3Rpb24uRE9XTikge1xyXG4gICAgICAgICAgICAgICAgc25ha2VbaGVhZF0gPSB7IHg6IHNuYWtlW2hlYWRdLngsIHk6IHNuYWtlW2hlYWRdLnkgKyAxIH07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHNuYWtlW2hlYWRdLnggPCAwIHx8XHJcbiAgICAgICAgICAgICAgICBzbmFrZVtoZWFkXS54ID49IHNpemUgfHxcclxuICAgICAgICAgICAgICAgIHNuYWtlW2hlYWRdLnkgPCAwIHx8XHJcbiAgICAgICAgICAgICAgICBzbmFrZVtoZWFkXS55ID49IHNpemUpIHtcclxuICAgICAgICAgICAgICAgIGdhbWVPdmVyKCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGJvYXJkW3NuYWtlW2hlYWRdLnhdW3NuYWtlW2hlYWRdLnldID09PSB1dGlsXzEuQ2VsbFR5cGUuU05BS0UpIHtcclxuICAgICAgICAgICAgICAgIGdhbWVPdmVyKCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGJvYXJkW3NuYWtlW2hlYWRdLnhdW3NuYWtlW2hlYWRdLnldID09PSB1dGlsXzEuQ2VsbFR5cGUuRk9PRCkge1xyXG4gICAgICAgICAgICAgICAgc2NvcmUgPSBzY29yZSArIDEwO1xyXG4gICAgICAgICAgICAgICAgbmV3IGZvb2RfMS5kZWZhdWx0KGJvYXJkKS5nZW5lcmF0ZUZvb2QoKTtcclxuICAgICAgICAgICAgICAgIHNuYWtlLnB1c2goeyB4OiBzbmFrZVt0YWlsXS54LCB5OiBzbmFrZVt0YWlsXS55IH0pO1xyXG4gICAgICAgICAgICAgICAgYm9hcmRbc25ha2VbdGFpbF0ueF1bc25ha2VbdGFpbF0ueV0gPSB1dGlsXzEuQ2VsbFR5cGUuU05BS0U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYm9hcmRbc25ha2VbaGVhZF0ueF1bc25ha2VbaGVhZF0ueV0gPSB1dGlsXzEuQ2VsbFR5cGUuU05BS0U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoaSA9PT0gdGFpbCkge1xyXG4gICAgICAgICAgICAgICAgYm9hcmRbc25ha2VbaV0ueF1bc25ha2VbaV0ueV0gPSB1dGlsXzEuQ2VsbFR5cGUuRU1QVFk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc25ha2VbaV0gPSB7IHg6IHNuYWtlW2kgLSAxXS54LCB5OiBzbmFrZVtpIC0gMV0ueSB9O1xyXG4gICAgICAgICAgICBib2FyZFtzbmFrZVtpXS54XVtzbmFrZVtpXS55XSA9IHV0aWxfMS5DZWxsVHlwZS5TTkFLRTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBib2FyZC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGJvYXJkLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoYm9hcmRbaV1bal0gPT09IHV0aWxfMS5DZWxsVHlwZS5GT09EKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dC5maWxsU3R5bGUgPSAnZ3JlZW4nO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQuZmlsbFJlY3QoaSAqIDEwLCBqICogMTAsIDEwLCAxMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoYm9hcmRbaV1bal0gPT09IHV0aWxfMS5DZWxsVHlwZS5TTkFLRSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQuZmlsbFN0eWxlID0gJ3JlZCc7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dC5maWxsUmVjdChpICogMTAsIGogKiAxMCwgMTAsIDEwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChib2FyZFtpXVtqXSA9PT0gdXRpbF8xLkNlbGxUeXBlLkVNUFRZKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dC5maWxsU3R5bGUgPSAnd2hpdGUnO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQuZmlsbFJlY3QoaSAqIDEwLCBqICogMTAsIDEwLCAxMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBnYW1lT3ZlcigpIHtcclxuICAgICAgICBpc1BsYXlpbmcgPSBmYWxzZTtcclxuICAgICAgICBjb250ZXh0ID09PSBudWxsIHx8IGNvbnRleHQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGNvbnRleHQuY2xlYXJSZWN0KDAsIDAsIGNhbnZhc1NpemUsIGNhbnZhc1NpemUpO1xyXG4gICAgICAgIGNvbnRleHQuZmlsbFN0eWxlID0gJ2JsYWNrJztcclxuICAgICAgICBjb250ZXh0LmZvbnQgPSAnMTZweCBzYW5zLXNlcmlmJztcclxuICAgICAgICBjb250ZXh0LmZpbGxUZXh0KCdHYW1lIE92ZXIhJywgKChjYW52YXNTaXplIC8gMikgLSAoY29udGV4dC5tZWFzdXJlVGV4dCgnR2FtZSBPdmVyIScpLndpZHRoIC8gMikpLCBzaXplIC8gMik7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5kcmF3R2FtZSA9IGRyYXdHYW1lO1xyXG5mdW5jdGlvbiBzZXREaXJlY3Rpb24oZGlyKSB7XHJcbiAgICBkaXJlY3Rpb24gPSBkaXI7XHJcbn1cclxuZXhwb3J0cy5zZXREaXJlY3Rpb24gPSBzZXREaXJlY3Rpb247XHJcbmZ1bmN0aW9uIGdldElzcGxheWluZygpIHtcclxuICAgIHJldHVybiBpc1BsYXlpbmc7XHJcbn1cclxuZXhwb3J0cy5nZXRJc3BsYXlpbmcgPSBnZXRJc3BsYXlpbmc7XHJcbmZ1bmN0aW9uIGdldERpcmVjdGlvbigpIHtcclxuICAgIHJldHVybiBkaXJlY3Rpb247XHJcbn1cclxuZXhwb3J0cy5nZXREaXJlY3Rpb24gPSBnZXREaXJlY3Rpb247XHJcbmZ1bmN0aW9uIGdldFNjb3JlKCkge1xyXG4gICAgcmV0dXJuIHNjb3JlO1xyXG59XHJcbmV4cG9ydHMuZ2V0U2NvcmUgPSBnZXRTY29yZTtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xyXG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XHJcbn07XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuY29uc3QgZm9vZF8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL2Zvb2RcIikpO1xyXG5jb25zdCBzbmFrZV8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL3NuYWtlXCIpKTtcclxuY29uc3QgYm9hcmRfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9ib2FyZFwiKSk7XHJcbmNvbnN0IHV0aWxfMSA9IHJlcXVpcmUoXCIuL3V0aWxcIik7XHJcbmNvbnN0IGdhbWVfMSA9IHJlcXVpcmUoXCIuL2dhbWVcIik7XHJcbmNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2FudmFzXCIpO1xyXG5jb25zdCBzY29yZUJvYXJkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzY29yZVwiKTtcclxubGV0IHNjb3JlO1xyXG5sZXQgc3BlZWQgPSA0MDA7XHJcbmNvbnN0IHNpemUgPSA0MDtcclxubGV0IGJvYXJkID0gbmV3IGJvYXJkXzEuZGVmYXVsdChzaXplKS5nZW5lcmF0ZUJvYXJkKCk7XHJcbmxldCBzbmFrZSA9IG5ldyBzbmFrZV8xLmRlZmF1bHQoYm9hcmQpLmdlbmVyYXRlU25ha2UoKTtcclxubGV0IGlzUGxheWluZyA9IHRydWU7XHJcbmxldCBkaXJlY3Rpb247XHJcbndpbmRvdy5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBjYW52YXMud2lkdGggPSBzaXplICogMTA7XHJcbiAgICBjYW52YXMuaGVpZ2h0ID0gc2l6ZSAqIDEwO1xyXG4gICAgbmV3IGZvb2RfMS5kZWZhdWx0KGJvYXJkKS5nZW5lcmF0ZUZvb2QoKTtcclxuICAgIGxldCBzcGVlZEhhbmRsZSA9IHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAoc3BlZWQgPD0gMTAwKSB7XHJcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoc3BlZWRIYW5kbGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzcGVlZC0tO1xyXG4gICAgfSwgMTAwMCk7XHJcbiAgICBsZXQgaGFuZGxlID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICgwLCBnYW1lXzEuZHJhd0dhbWUpKGJvYXJkLCBzbmFrZSwgc2l6ZSk7XHJcbiAgICAgICAgaXNQbGF5aW5nID0gKDAsIGdhbWVfMS5nZXRJc3BsYXlpbmcpKCk7XHJcbiAgICAgICAgZGlyZWN0aW9uID0gKDAsIGdhbWVfMS5nZXREaXJlY3Rpb24pKCk7XHJcbiAgICAgICAgc2NvcmUgPSAoMCwgZ2FtZV8xLmdldFNjb3JlKSgpO1xyXG4gICAgICAgIHNjb3JlQm9hcmQuaW5uZXJUZXh0ID0gYFNjb3JlOiAke3Njb3JlfWA7XHJcbiAgICAgICAgaWYgKCFpc1BsYXlpbmcpIHtcclxuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChoYW5kbGUpO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGlmIChjb25maXJtKFwiR2FtZU92ZXIhIFdhbm5hIGdvIGFnYWluP1wiKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwgMzAwKTtcclxuICAgICAgICB9XHJcbiAgICB9LCBzcGVlZCk7XHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgaWYgKGV2ZW50LmtleSA9PT0gXCJBcnJvd0xlZnRcIiAmJiBkaXJlY3Rpb24gIT09IHV0aWxfMS5EaXJlY3Rpb24uUklHSFQpIHtcclxuICAgICAgICAgICAgKDAsIGdhbWVfMS5zZXREaXJlY3Rpb24pKHV0aWxfMS5EaXJlY3Rpb24uTEVGVCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGV2ZW50LmtleSA9PT0gXCJBcnJvd1JpZ2h0XCIgJiYgZGlyZWN0aW9uICE9PSB1dGlsXzEuRGlyZWN0aW9uLkxFRlQpIHtcclxuICAgICAgICAgICAgKDAsIGdhbWVfMS5zZXREaXJlY3Rpb24pKHV0aWxfMS5EaXJlY3Rpb24uUklHSFQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChldmVudC5rZXkgPT09IFwiQXJyb3dVcFwiICYmIGRpcmVjdGlvbiAhPT0gdXRpbF8xLkRpcmVjdGlvbi5ET1dOKSB7XHJcbiAgICAgICAgICAgICgwLCBnYW1lXzEuc2V0RGlyZWN0aW9uKSh1dGlsXzEuRGlyZWN0aW9uLlVQKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoZXZlbnQua2V5ID09PSBcIkFycm93RG93blwiICYmIGRpcmVjdGlvbiAhPT0gdXRpbF8xLkRpcmVjdGlvbi5VUCkge1xyXG4gICAgICAgICAgICAoMCwgZ2FtZV8xLnNldERpcmVjdGlvbikodXRpbF8xLkRpcmVjdGlvbi5ET1dOKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCBoYW5kbGVUb3VjaFN0YXJ0LCBmYWxzZSk7XHJcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCBoYW5kbGVUb3VjaE1vdmUsIGZhbHNlKTtcclxuICAgIGxldCB4RG93biA9IG51bGw7XHJcbiAgICBsZXQgeURvd24gPSBudWxsO1xyXG4gICAgZnVuY3Rpb24gZ2V0VG91Y2hlcyhldnQpIHtcclxuICAgICAgICByZXR1cm4gZXZ0LnRvdWNoZXM7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBoYW5kbGVUb3VjaFN0YXJ0KGV2dCkge1xyXG4gICAgICAgIGNvbnN0IGZpcnN0VG91Y2ggPSBnZXRUb3VjaGVzKGV2dClbMF07XHJcbiAgICAgICAgeERvd24gPSBmaXJzdFRvdWNoLmNsaWVudFg7XHJcbiAgICAgICAgeURvd24gPSBmaXJzdFRvdWNoLmNsaWVudFk7XHJcbiAgICB9XHJcbiAgICA7XHJcbiAgICBmdW5jdGlvbiBoYW5kbGVUb3VjaE1vdmUoZXZ0KSB7XHJcbiAgICAgICAgaWYgKCF4RG93biB8fCAheURvd24pIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgeFVwID0gZXZ0LnRvdWNoZXNbMF0uY2xpZW50WDtcclxuICAgICAgICBsZXQgeVVwID0gZXZ0LnRvdWNoZXNbMF0uY2xpZW50WTtcclxuICAgICAgICBsZXQgeERpZmYgPSB4RG93biAtIHhVcDtcclxuICAgICAgICBsZXQgeURpZmYgPSB5RG93biAtIHlVcDtcclxuICAgICAgICBpZiAoTWF0aC5hYnMoeERpZmYpID4gTWF0aC5hYnMoeURpZmYpKSB7XHJcbiAgICAgICAgICAgIGlmICh4RGlmZiA+IDAgJiYgZGlyZWN0aW9uICE9PSB1dGlsXzEuRGlyZWN0aW9uLlJJR0hUKSB7XHJcbiAgICAgICAgICAgICAgICAoMCwgZ2FtZV8xLnNldERpcmVjdGlvbikodXRpbF8xLkRpcmVjdGlvbi5MRUZUKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChkaXJlY3Rpb24gIT09IHV0aWxfMS5EaXJlY3Rpb24uTEVGVCkge1xyXG4gICAgICAgICAgICAgICAgKDAsIGdhbWVfMS5zZXREaXJlY3Rpb24pKHV0aWxfMS5EaXJlY3Rpb24uUklHSFQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoeURpZmYgPiAwICYmIGRpcmVjdGlvbiAhPT0gdXRpbF8xLkRpcmVjdGlvbi5ET1dOKSB7XHJcbiAgICAgICAgICAgICAgICAoMCwgZ2FtZV8xLnNldERpcmVjdGlvbikodXRpbF8xLkRpcmVjdGlvbi5VUCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoZGlyZWN0aW9uICE9PSB1dGlsXzEuRGlyZWN0aW9uLlVQKSB7XHJcbiAgICAgICAgICAgICAgICAoMCwgZ2FtZV8xLnNldERpcmVjdGlvbikodXRpbF8xLkRpcmVjdGlvbi5ET1dOKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB4RG93biA9IG51bGw7XHJcbiAgICAgICAgeURvd24gPSBudWxsO1xyXG4gICAgfVxyXG59O1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5jb25zdCB1dGlsXzEgPSByZXF1aXJlKFwiLi91dGlsXCIpO1xyXG5jbGFzcyBTbmFrZSB7XHJcbiAgICBjb25zdHJ1Y3Rvcihib2FyZCkge1xyXG4gICAgICAgIHRoaXMuc25ha2VTaXplID0gMztcclxuICAgICAgICB0aGlzLmJvYXJkID0gYm9hcmQ7XHJcbiAgICB9XHJcbiAgICBnZW5lcmF0ZVNuYWtlKCkge1xyXG4gICAgICAgIGxldCBzbmFrZSA9IG5ldyBBcnJheSh0aGlzLnNuYWtlU2l6ZSk7XHJcbiAgICAgICAgbGV0IHJvdyA9IE51bWJlcihNYXRoLnJvdW5kKHRoaXMuYm9hcmQubGVuZ3RoIC8gMikpO1xyXG4gICAgICAgIGxldCBjb2wgPSBOdW1iZXIoTWF0aC5yb3VuZCh0aGlzLmJvYXJkLmxlbmd0aCAvIDIpKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuc25ha2VTaXplOyBpKyspIHtcclxuICAgICAgICAgICAgc25ha2VbaV0gPSB7IHg6IHJvdyAtIGksIHk6IGNvbCB9O1xyXG4gICAgICAgICAgICB0aGlzLmJvYXJkW3JvdyAtIGldW2NvbF0gPSB1dGlsXzEuQ2VsbFR5cGUuU05BS0U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzbmFrZTtcclxuICAgIH1cclxufVxyXG5leHBvcnRzLmRlZmF1bHQgPSBTbmFrZTtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5EaXJlY3Rpb24gPSBleHBvcnRzLkNlbGxUeXBlID0gdm9pZCAwO1xyXG52YXIgQ2VsbFR5cGU7XHJcbihmdW5jdGlvbiAoQ2VsbFR5cGUpIHtcclxuICAgIENlbGxUeXBlW0NlbGxUeXBlW1wiRk9PRFwiXSA9IDBdID0gXCJGT09EXCI7XHJcbiAgICBDZWxsVHlwZVtDZWxsVHlwZVtcIlNOQUtFXCJdID0gMV0gPSBcIlNOQUtFXCI7XHJcbiAgICBDZWxsVHlwZVtDZWxsVHlwZVtcIkVNUFRZXCJdID0gMl0gPSBcIkVNUFRZXCI7XHJcbn0pKENlbGxUeXBlID0gZXhwb3J0cy5DZWxsVHlwZSB8fCAoZXhwb3J0cy5DZWxsVHlwZSA9IHt9KSk7XHJcbnZhciBEaXJlY3Rpb247XHJcbihmdW5jdGlvbiAoRGlyZWN0aW9uKSB7XHJcbiAgICBEaXJlY3Rpb25bRGlyZWN0aW9uW1wiUklHSFRcIl0gPSAwXSA9IFwiUklHSFRcIjtcclxuICAgIERpcmVjdGlvbltEaXJlY3Rpb25bXCJMRUZUXCJdID0gMV0gPSBcIkxFRlRcIjtcclxuICAgIERpcmVjdGlvbltEaXJlY3Rpb25bXCJVUFwiXSA9IDJdID0gXCJVUFwiO1xyXG4gICAgRGlyZWN0aW9uW0RpcmVjdGlvbltcIkRPV05cIl0gPSAzXSA9IFwiRE9XTlwiO1xyXG59KShEaXJlY3Rpb24gPSBleHBvcnRzLkRpcmVjdGlvbiB8fCAoZXhwb3J0cy5EaXJlY3Rpb24gPSB7fSkpO1xyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvbWFpbi50c1wiKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==