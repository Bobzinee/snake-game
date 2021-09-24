export enum CellType {
    FOOD,
    SNAKE,
    EMPTY,
}

export enum Direction {
    RIGHT,
    LEFT,
    UP,
    DOWN,
}

export interface SnakeShape {
    x: number;
    y: number;
} 
