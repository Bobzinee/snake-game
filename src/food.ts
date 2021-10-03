import { CellType } from "./util";

export default class Food{
    private board: number[][];

    public constructor(board: any){
        this.board = board;
    }

    //Randomly generate food anywhere within the bounds of the game board...
    public generateFood(): void{
        let row = Math.abs(Math.round(Math.random() * this.board.length - 2));
        let col = Math.abs(Math.round(Math.random() * this.board.length - 2));
        // If generated food is on the snake, run the function again...
        if(this.board[row][col] === CellType.SNAKE){
            this.generateFood();  
        }
        this.board[row][col] = CellType.FOOD;
    }
}