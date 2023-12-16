import { useEffect, useState } from "react";
import { FoodType } from "../../types";
import { getLocalJson, getRandomToken, setLocalJson } from "../../utils";
import Controls from "../Controls";
import Food from "../Food";
import Worm from "../Worm";
import styles from "./styles.module.scss";

export default function Scene() {
  const blockSize = 30;
  const foodStore = getLocalJson("foods");
  const screenToken = getRandomToken();

  const [foods, setFoods] = useState<FoodType[]>(foodStore);

  const [screens, setScreens] = useState<FoodType[]>(foodStore);

  const [left, setLeft] = useState(Math.round(window.screenX));
  const [top, setTop] = useState(Math.round(window.screenY));
  const [horizontal, setHorizontal] = useState(
    Math.floor(window.innerWidth / blockSize)
  );
  const [vertical, setVerical] = useState(
    Math.floor(window.innerHeight / blockSize)
  );

  // reset screens local storage
  useEffect(() => {
    localStorage.setItem("screens", "{}");
  }, []);

  // change view size on resize screen
  useEffect(() => {
    window.addEventListener("resize", () => {
      // set new sizes
      setHorizontal(Math.floor(window.innerWidth / blockSize));
      setVerical(Math.floor(window.innerHeight / blockSize));
    });
  }, [horizontal, vertical]);

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

    const intervalId = setInterval(updateWindowPosition, 10);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  // on change local storage
  useEffect(() => {
    const handleStorageChange = () => {
      setFoods(JSON.parse(localStorage.getItem("foods") ?? "[]"));
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <div className={styles.container}>
      <Controls
        setFoods={setFoods}
        screens={screens}
        screen={{
          horizontal,
          vertical,
          left: left / blockSize,
          top: top / blockSize,
        }}
      />
      <div
        className={styles.scene}
        style={{ marginLeft: `-${left}px`, marginTop: `-${top}px` }}
      >
        <Worm size={blockSize} />
        <Food
          size={blockSize}
          foods={foods}
          screen={{
            vertical,
            horizontal,
            left: left / blockSize,
            top: top / blockSize,
          }}
        />
      </div>
    </div>
  );
}
