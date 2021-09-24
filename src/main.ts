import Food from './food';
import Snake from './snake';
import Board from './board';
import { Direction, SnakeShape } from './util';
import {drawGame, getIsplaying, setDirection, getDirection, getScore} from './game';

const canvas = <HTMLCanvasElement> document.getElementById("canvas");
const scoreBoard = document.getElementById("score");
let score: number;
let speed: number = 500;
const size: number = 35;
let board: number[][] = new Board(size).generateBoard();
let snake: SnakeShape[] = new Snake(board).generateSnake();
new Food(board).generateFood();
let isPlaying: boolean = true;
let direction: Direction;

window.onload = function(){
    canvas.width = size * 10;
    canvas.height = size * 10;

    let handle = setInterval(function(){
        drawGame(board, snake, size);
        isPlaying = getIsplaying();
        direction = getDirection();
        score = getScore();
        scoreBoard!.innerText = `Score: ${score}`;
    
        if(!isPlaying){
            clearInterval(handle);
            setTimeout(function(){
                if(confirm("GameOver! Wanna go again?")){
                    window.location.reload();
                }
            }, 300);
        }
    }, speed);

    

    window.addEventListener('keydown', function(event){
        event.preventDefault();
        if(event.key === "ArrowLeft" && direction !== Direction.RIGHT){
           setDirection(Direction.LEFT);           
        } else if (event.key === "ArrowRight" && direction !== Direction.LEFT){
            setDirection(Direction.RIGHT);
        } else if (event.key === "ArrowUp" && direction !== Direction.DOWN){
            setDirection(Direction.UP);
        } else if (event.key === "ArrowDown" && direction !== Direction.UP){
           setDirection(Direction.DOWN);
        }
    });
}