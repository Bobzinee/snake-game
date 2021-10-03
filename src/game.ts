import Food from "./food";
import { Direction, SnakeShape, CellType } from "./util";

let isPlaying: boolean = true;
let direction: Direction = Direction.UP;
let score: number = 0;

export function drawGame(board: any, snake: SnakeShape[]){
    let canvas = <HTMLCanvasElement> document.getElementById("canvas");
    let context = canvas.getContext("2d");
    let size = board.length;
    let canvasSize = size * 10;
    let head = 0;
    let tail = snake.length - 1;
    
    context?.clearRect(0, 0, canvasSize, canvasSize);

    for(let i = tail; i >= 0; i--){
        //Handle head...
        if(i === head){
            //Move coordinate of snake head in the current direction...
            if(direction === Direction.RIGHT){
                snake[head] = {x: snake[head].x + 1, y: snake[head].y}
            } else if(direction === Direction.LEFT){
                snake[head] = {x: snake[head].x - 1, y: snake[head].y}
            } else if(direction === Direction.UP){
                snake[head] = {x: snake[head].x, y: snake[head].y - 1}
            } else if(direction === Direction.DOWN){
                snake[head] = {x: snake[head].x, y: snake[head].y + 1}
            }
            //Check if head collided with boundary...
            if(snake[head].x < 0 ||
               snake[head].x >= size ||
               snake[head].y < 0 ||
               snake[head].y >= size)
            {
                gameOver();
                return; 
            }
            //Check if snake hit itself...
            if(board[snake[head].x][snake[head].y] === CellType.SNAKE){
                gameOver();
                return;
            }
            //Check if snake ate food...
            if(board[snake[head].x][snake[head].y] === CellType.FOOD){
                score = score + 10;
                new Food(board).generateFood();
                snake.push({x: snake[tail].x, y: snake[tail].y});
                board[snake[tail].x][snake[tail].y] = CellType.SNAKE;
            }
            board[snake[head].x][snake[head].y] = CellType.SNAKE;
        } else{
            //Handle tail...
            if(i === tail){
                board[snake[i].x][snake[i].y] = CellType.EMPTY; 
            }
            // Shift the coordinates of the tail to take the one preceding it...
            snake[i] = {x: snake[i - 1].x, y: snake[i - 1].y};
            board[snake[i].x][snake[i].y] = CellType.SNAKE;
        }

            //Paint each cell of the grid according to the cell-type...
        for(let i = 0; i < board.length; i++){
            for(let j = 0; j < board.length; j++){
                if(board[i][j] === CellType.FOOD){
                    context!.fillStyle = 'green';
                    context!.fillRect(i * 10, j * 10, 10, 10);
                }
                if(board[i][j] === CellType.SNAKE){
                    context!.fillStyle = 'red';
                    context!.fillRect(i * 10, j * 10, 10, 10);
                }
                if(board[i][j] === CellType.EMPTY){
                    context!.fillStyle = 'white';
                    context!.fillRect(i * 10, j * 10, 10, 10);
                }
            }
        }
    }

    function gameOver(){
        isPlaying = false;
        context?.clearRect(0,0,canvasSize,canvasSize);
    }

}
export function setDirection(dir: Direction): void{
    direction = dir;
}

export function getIsplaying(): boolean{
    return isPlaying;
}

export function getDirection(): Direction{
    return direction;
}

export function getScore(): number{
    return score;
}




