import { CellType, SnakeShape } from "./util";

export default class Snake{
    private board: number[][];
    private snakeSize: number = 3;

    public constructor(board: any){
        this.board = board;
    }

    //Generate snake in the middle of the game board...
    public generateSnake(): SnakeShape[]{
        let snake: SnakeShape[] = new Array(this.snakeSize);
        let row = Number(Math.round(this.board.length / 2));
        let col = Number(Math.round(this.board.length / 2));

        // Snake object is an array which holds the x and y coordinate of its current location.
        for(let i = 0; i < this.snakeSize; i++){
            snake[i] = { x: row - i, y: col};
            this.board[row - i][col] = CellType.SNAKE;    
        }
        return snake;
    }
}