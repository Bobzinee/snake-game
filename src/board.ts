import { CellType } from "./util";

export default class Board{
    private board: number[][];

    public constructor(size: number){
        this.board = new Array(size);
    }

//Make an array of arrays with the given size to represent the game board...
// Example-[   
//             [  ,  ,  ,  , ],
//             [  ,  ,  ,  , ],
//             [  ,  ,  ,  , ],
//             [  ,  ,  ,  , ]
//         ];
    
    public generateBoard(): number[][]{
        for(let i = 0; i < this.board.length; i++){
            this.board[i] = new Array(this.board.length);
            
            //Initially mark all of the spaces in the board as "Empty";
            for(let j = 0; j < this.board.length; j++){
                this.board[i][j] = CellType.EMPTY;
            }
        }
      //Finally return the generated board...
        return this.board;
    }
}