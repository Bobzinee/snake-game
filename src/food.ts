import { CellType } from "./util";

export default class Food{
    private board: number[][];

    public constructor(board: any){
        this.board = board;
    }

    public generateFood(): void{
        let row = Number(Math.abs(Math.round(Math.random() * this.board.length - 2)));
        let col = Number(Math.abs(Math.round(Math.random() * this.board.length - 2)));
        while(this.board[row][col] === CellType.SNAKE){
            this.generateFood();  
        }
        this.board[row][col] = CellType.FOOD;
    }
}
