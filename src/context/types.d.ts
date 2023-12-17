import { FoodType, Status } from "../types";

export type MainProviderProps = {
  children: import("react").ReactNode;
};

export type MainContextProps = {
  blockSize: number;
  left: number;
  top: number;
  horizontal: number;
  vertical: number;
  status: Status;
  docRef: Tipo | null;
  isRoot: () => boolean;
  startGame: () => void;
  foods: FoodType[];
  screens: Screens;
  wormBody: WormBody[];
  changeDirectionHandle: (key: KeyboardEvent<HTMLDivElement>) => void;
};
