import {
  useMemo,
  useContext,
  createContext,
  useState,
  useEffect,
  useCallback,
  KeyboardEvent,
} from "react";
import { Direction, FoodType, Screens, WormBody } from "../types";
import {
  addWormMove,
  getLocalJson,
  getRandomFoodPosition,
  getRandomToken,
  isWormEating,
  setLocalJson,
} from "../utils";
import { MainContextProps, MainProviderProps } from "./types";

const screenToken = getRandomToken();

export const MainContext = createContext({} as MainContextProps);

export function MainProvider({ children }: MainProviderProps) {
  const blockSize = 30;

  // scene options
  const [screens, setScreens] = useState<Screens>({});
  const [left, setLeft] = useState(Math.round(window.screenX));
  const [top, setTop] = useState(Math.round(window.screenY));
  const [horizontal, setHorizontal] = useState(
    Math.floor(window.innerWidth / blockSize)
  );
  const [vertical, setVerical] = useState(
    Math.floor(window.innerHeight / blockSize)
  );

  // worm options
  const [moveDirection, setMoveDirection] = useState<Direction>("right");
  const [wormBody, setWormBody] = useState<WormBody>([]);

  // food options
  const [foods, setFoods] = useState<FoodType[]>([]);

  // return current screen and localStorage screens
  const getScreens = useCallback(() => {
    return screens;
  }, [screens]);

  const startGame = useCallback(() => {
    const foodPositions = [
      getRandomFoodPosition(screens, blockSize),
      getRandomFoodPosition(screens, blockSize),
    ];
    const wormBody = [
      [12, 10],
      [11, 10],
      [10, 10],
    ];

    localStorage.setItem("starter", screenToken.toString());

    setLocalJson("worm", wormBody);
    setWormBody(wormBody);

    setLocalJson("foods", foodPositions);
    setFoods(foodPositions);

    return screens;
  }, [screens]);

  const changeDirectionHandle = useCallback(
    (key: KeyboardEvent<HTMLDivElement>) => {
      switch (key.key) {
        case "w":
          setMoveDirection("top");
          break;
        case "a":
          setMoveDirection("left");
          break;
        case "d":
          setMoveDirection("right");
          break;
        case "s":
          setMoveDirection("bottom");
          break;
      }
    },
    []
  );

  const addNewFood = (foods: FoodType[]) => {
    const newFood: number[][] = foods;

    newFood.push(getRandomFoodPosition(screens, blockSize));

    setLocalJson("foods", newFood);
    setFoods(newFood);
  };

  // reset screens local storage
  useEffect(() => {
    localStorage.setItem("start", "");
    localStorage.setItem("screens", "{}");
    localStorage.setItem("worm", "[]");
  }, []);

  /**
   * change view size on resize screen
   */
  useEffect(() => {
    window.addEventListener("resize", () => {
      // set new sizes
      setHorizontal(Math.floor(window.innerWidth / blockSize));
      setVerical(Math.floor(window.innerHeight / blockSize));
    });
  }, [horizontal, vertical]);

  /**
   * add worm move by time
   */
  useEffect(() => {
    const wormCallback = () => {
      const starter = localStorage.getItem("starter");

      // add worm move
      if (starter === screenToken.toString()) {
        const newBody = addWormMove(wormBody, moveDirection);
        setLocalJson("worm", newBody);
        setWormBody(newBody);
      }

      // add worm eat action
      const cleanFoods: number[][] = [...foods];
      const ateFood: number | boolean = isWormEating(wormBody, foods);
      if (
        starter === screenToken.toString() &&
        ateFood !== false &&
        ateFood !== true
      ) {
        cleanFoods.splice(ateFood, 1);
        setLocalJson("foods", cleanFoods);
        setFoods(cleanFoods);

        addNewFood(cleanFoods);
      }
    };

    const intervalId = setInterval(wormCallback, 100);

    return () => {
      clearInterval(intervalId);
    };
  }, [wormBody, foods, moveDirection]);

  /**
   * change view position by time
   */
  useEffect(() => {
    const updateWindowPosition = () => {
      setLeft(Math.round(window.screenX));
      setTop(Math.round(window.screenY));

      const screens = getLocalJson("screens");
      screens[screenToken] = { left, top, horizontal, vertical };
      setScreens(screens);
      setLocalJson("screens", screens);
    };

    const intervalId = setInterval(updateWindowPosition, 10);

    return () => {
      clearInterval(intervalId);
    };
  }, [horizontal, vertical, top, left]);

  // on change local storage
  useEffect(() => {
    const handleStorageChange = () => {
      setFoods(getLocalJson("foods") ?? []);
      setWormBody(getLocalJson("worm") ?? []);

      const newScreens = getLocalJson("screens");
      newScreens[screenToken] = screens[screenToken];

      setScreens(newScreens);
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // build return values
  const contextValue = useMemo(
    () => ({
      blockSize,
      left,
      top,
      horizontal,
      vertical,
      startGame,
      foods,
      getScreens,
      wormBody,
      changeDirectionHandle,
    }),
    [
      blockSize,
      left,
      top,
      horizontal,
      vertical,
      startGame,
      foods,
      getScreens,
      wormBody,
      changeDirectionHandle,
    ]
  );

  return (
    <MainContext.Provider value={contextValue}>{children}</MainContext.Provider>
  );
}

export const useMainContext = () => useContext(MainContext);
