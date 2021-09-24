import { CellType } from "./util";

export default class Board{
    private board: number[][];

    public constructor(size: number){
        this.board = new Array(size);
    }

    public generateBoard(): number[][]{
        for(let i = 0; i < this.board.length; i++){
            this.board[i] = new Array(this.board.length);

            for(let j = 0; j < this.board.length; j++){
                this.board[i][j] = CellType.EMPTY;
            }
        }
        return this.board;
    }
}