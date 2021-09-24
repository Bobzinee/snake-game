import Food from "./food";
import { Direction, SnakeShape, CellType } from "./util";

let isPlaying: boolean = true;
let direction: Direction = Direction.UP;
let score: number = 0;

export function drawGame(board: any, snake: SnakeShape[], size: number){
    let canvas = <HTMLCanvasElement> document.getElementById("canvas");
    let context = canvas.getContext("2d");
    let canvasSize = size * 10;
    let head = 0;
    let tail = snake.length - 1;
    
    context?.clearRect(0, 0, canvasSize, canvasSize);

    for(let i = tail; i >= 0; i--){
        //Handle head...
        if(i === head){
            if(direction === Direction.RIGHT){
                snake[head] = {x: snake[head].x + 1, y: snake[head].y}
            } else if(direction === Direction.LEFT){
                snake[head] = {x: snake[head].x - 1, y: snake[head].y}
            } else if(direction === Direction.UP){
                snake[head] = {x: snake[head].x, y: snake[head].y - 1}
            } else if(direction === Direction.DOWN){
                snake[head] = {x: snake[head].x, y: snake[head].y + 1}
            }
            if(snake[head].x < 0 ||
               snake[head].x >= size ||
               snake[head].y < 0 ||
               snake[head].y >= size)
            {
                gameOver();
                return; 
            }
            if(board[snake[head].x][snake[head].y] === CellType.SNAKE){
                gameOver();
                return;
            }
            if(board[snake[head].x][snake[head].y] === CellType.FOOD){
                score = score + 10;
                new Food(board).generateFood();
                snake.push({x: snake[tail].x, y: snake[tail].y});
                board[snake[tail].x][snake[tail].y] = CellType.SNAKE;
            }
            board[snake[head].x][snake[head].y] = CellType.SNAKE;
        } else{
            if(i === tail){
                board[snake[i].x][snake[i].y] = CellType.EMPTY; 
            }
            snake[i] = {x: snake[i - 1].x, y: snake[i - 1].y};
            board[snake[i].x][snake[i].y] = CellType.SNAKE;
        }
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
        context!.fillStyle = 'black';
        context!.font = '16px sans-serif';
        context!.fillText('Game Over!', ((canvasSize / 2) - (context!.measureText('Game Over!').width / 2)), size/2);
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




