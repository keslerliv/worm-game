export type MainProviderProps = {
  children: import("react").ReactNode;
};

export type MainContextProps = {
  blockSize: number;
  left: number;
  top: number;
  horizontal: number;
  vertical: number;
  startGame: any;
  foods: any;
  getScreens: () => any;
  wormBody: number[][];
  changeDirectionHandle: (key: KeyboardEvent<HTMLDivElement>) => void;
};
