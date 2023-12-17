import { Status } from "../types";

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
  docRef: any;
  isRoot: () => any;
  startGame: any;
  foods: any;
  getScreens: () => any;
  wormBody: number[][];
  changeDirectionHandle: (key: KeyboardEvent<HTMLDivElement>) => void;
};
