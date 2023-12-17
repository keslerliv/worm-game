import { useMainContext } from "../../context/mainContext";
import Controls from "../Controls";
import GameOver from "../GameOver";
import StartModal from "../Start";
import Food from "./components/Food";
import Worm from "./components/Worm";

import styles from "./styles.module.scss";

export default function Scene() {
  const {
    blockSize,
    left,
    top,
    horizontal,
    status,
    docRef,
    getScreens,
    vertical,
    changeDirectionHandle,
  } = useMainContext();

  return (
    <div
      ref={docRef}
      className={styles.container}
      onKeyDown={changeDirectionHandle}
      tabIndex={0}
    >
      {status === "gameOver" && <GameOver />}

      {status === "start" && <StartModal />}

      <Controls
        screens={getScreens}
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
        <Worm />
        <Food />
      </div>
    </div>
  );
}
