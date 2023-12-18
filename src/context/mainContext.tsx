import {
  useMemo,
  useContext,
  createContext,
  useState,
  useEffect,
  useCallback,
  KeyboardEvent,
  useRef,
} from "react";

import {
  addWormMove,
  getLocalJson,
  getRandomItemPosition,
  getRandomToken,
  isWormEating,
  setLocalJson,
  verifyMove,
} from "../utils";
import { MainContextProps, MainProviderProps } from "./types";
import { Direction, FoodType, Screens, Status, WormBody } from "../types";

const screenToken = getRandomToken();

export const MainContext = createContext({} as MainContextProps);

export function MainProvider({ children }: MainProviderProps) {
  const blockSize = 30;
  const docRef = useRef(null);

  // scene options
  const [status, setStatus] = useState<Status>("start");
  const [screens, setScreens] = useState<Screens>({});
  const [details, setDetails] = useState<number[][]>([]);
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

  const startGame = useCallback(() => {
    const foodPositions = [
      getRandomItemPosition(screens, blockSize),
      getRandomItemPosition(screens, blockSize),
    ];

    // set initial direction
    localStorage.setItem("direction", "right");
    setMoveDirection("right");

    // set initial status
    localStorage.setItem("status", "playing");
    setStatus("playing");

    // set main screen
    localStorage.setItem("starter", screenToken.toString());

    // define start worm body
    const startWormX = Math.round(screens[screenToken].left / blockSize);
    const startWormY = Math.round(screens[screenToken].top / blockSize);
    const wormBody = [
      [startWormX + 7, startWormY + 7],
      [startWormX + 6, startWormY + 7],
      [startWormX + 5, startWormY + 7],
    ];
    const details = [
      getRandomItemPosition(screens, blockSize),
      getRandomItemPosition(screens, blockSize),
      getRandomItemPosition(screens, blockSize),
      getRandomItemPosition(screens, blockSize),
    ];

    // set initial details
    setLocalJson("details", details);
    setDetails(details);

    setLocalJson("worm", wormBody);
    setWormBody(wormBody);

    setLocalJson("foods", foodPositions);
    setFoods(foodPositions);
  }, [screens]);

  const changeDirectionHandle = useCallback(
    (key: KeyboardEvent<HTMLDivElement>) => {
      if (key.key === "w" && moveDirection !== "bottom") {
        setMoveDirection("top");
        localStorage.setItem("direction", "top");
      }
      if (key.key === "a" && moveDirection !== "right") {
        setMoveDirection("left");
        localStorage.setItem("direction", "left");
      }
      if (key.key === "d" && moveDirection !== "left") {
        setMoveDirection("right");
        localStorage.setItem("direction", "right");
      }
      if (key.key === "s" && moveDirection !== "top") {
        setMoveDirection("bottom");
        localStorage.setItem("direction", "bottom");
      }
    },
    [moveDirection]
  );

  const addNewFood = useCallback(
    (foods: FoodType[]) => {
      const newFood: number[][] = foods;
      newFood.push(getRandomItemPosition(screens, blockSize));
      setLocalJson("foods", newFood);
      setFoods(newFood);
    },
    [screens]
  );

  const addNewBlock = useCallback(() => {
    const newWormBody = wormBody;
    newWormBody.push([-10, -10]);
    setLocalJson("worm", newWormBody);
    setWormBody(newWormBody);
  }, [wormBody]);

  // verify if is root screen
  const isRoot = useCallback(() => {
    const starter = localStorage.getItem("starter");
    if (starter === screenToken.toString()) return true;
    return false;
  }, []);

  // reset screens local storage
  useEffect(() => {
    localStorage.setItem("start", "");
    localStorage.setItem("screens", "{}");
    localStorage.setItem("worm", "[]");
    localStorage.setItem("status", "start");
  }, []);

  // change view size on resize screen
  useEffect(() => {
    window.addEventListener("resize", () => {
      // set new sizes
      setHorizontal(Math.floor(window.innerWidth / blockSize));
      setVerical(Math.floor(window.innerHeight / blockSize));
    });
  }, [horizontal, vertical]);

  // add worm move by time
  useEffect(() => {
    const wormCallback = () => {
      if (status === "playing") {
        const starter = localStorage.getItem("starter");

        // add worm move
        if (starter === screenToken.toString()) {
          const newBody = addWormMove(wormBody, moveDirection);
          setLocalJson("worm", newBody);
          setWormBody(newBody);
        }

        // verify is valid move
        const isValid = verifyMove(wormBody, screens, blockSize);
        if (!isValid) {
          setMoveDirection("right");

          setStatus("gameOver");
          localStorage.setItem("status", "gameOver");
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
          addNewBlock();
        }
      }
    };

    const intervalId = setInterval(wormCallback, 100);

    return () => {
      clearInterval(intervalId);
    };
  }, [wormBody, foods, moveDirection]);

  // change view position by time
  useEffect(() => {
    const updateWindowPosition = () => {
      setLeft(Math.round(window.screenX));
      setTop(Math.round(window.screenY));

      const screens = getLocalJson("screens");
      screens[screenToken] = { left, top, horizontal, vertical };
      setScreens(screens);
      setLocalJson("screens", screens);
    };

    const intervalId = setInterval(updateWindowPosition, 50);

    return () => {
      clearInterval(intervalId);
    };
  }, [horizontal, vertical, top, left]);

  // on change local storage
  useEffect(() => {
    const handleStorageChange = () => {
      setFoods(getLocalJson("foods") ?? []);
      setWormBody(getLocalJson("worm") ?? []);
      setDetails(getLocalJson("details"));

      const status = localStorage.getItem("status");
      if (status === "gameOver" || status === "start" || status === "playing")
        setStatus(status);

      const direction = localStorage.getItem("direction");
      if (
        direction === "left" ||
        direction === "right" ||
        direction === "top" ||
        direction === "bottom"
      ) {
        setMoveDirection(direction);
        localStorage.setItem("direction", direction);
      }

      const newScreens = getLocalJson("screens");
      newScreens[screenToken] = screens[screenToken];

      setScreens(newScreens);
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [screens]);

  // build return values
  const contextValue = useMemo(
    () => ({
      blockSize,
      left,
      top,
      horizontal,
      vertical,
      status,
      docRef,
      isRoot,
      startGame,
      foods,
      screens,
      wormBody,
      details,
      moveDirection,
      changeDirectionHandle,
    }),
    [
      blockSize,
      left,
      top,
      horizontal,
      vertical,
      status,
      docRef,
      isRoot,
      startGame,
      foods,
      screens,
      wormBody,
      details,
      moveDirection,
      changeDirectionHandle,
    ]
  );

  return (
    <MainContext.Provider value={contextValue}>{children}</MainContext.Provider>
  );
}

export const useMainContext = () => useContext(MainContext);
