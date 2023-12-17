// scene types
export type Status = "start" | "playing" | "gameOver";

export type Screens = {
  [key: string]: Screen;
};

export type Screen = {
  horizontal: number;
  vertical: number;
  left: number;
  top: number;
};

export type FoodType = number[];

// Worm types
export type WormBody = number[][];

export type Direction = "right" | "left" | "top" | "bottom";
