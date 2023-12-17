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

// Control types
export type ControlProps = {
  screen: Screen;
  screens: any;
};

// Worm types
export type WormBody = number[][];

export type Direction = "right" | "left" | "top" | "bottom";
