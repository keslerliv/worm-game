export type Screen = {
  horizontal: number;
  vertical: number;
  left: number;
  top: number;
};

// Food types
export type FoodProps = {
  size: number;
  foods: FoodType[];
  screen: Screen;
};

export type FoodType = number[];

// Control types
export type ControlProps = {
  setFoods: (value: FoodType[]) => void;
  screen: Screen;
  screens: any;
};
