import { useMainContext } from "../../context/mainContext";
import Controls from "../Controls";
import GameOver from "../GameOver";
import StartModal from "../Start";
import Food from "./components/Food";
import Worm from "./components/Worm";

import styles from "./styles.module.scss";

export default function Scene() {
  const { left, top, status, docRef, changeDirectionHandle } = useMainContext();

  return (
    <div
      ref={docRef}
      className={styles.container}
      onKeyDown={changeDirectionHandle}
      tabIndex={0}
    >
      {status === "gameOver" && <GameOver />}

      {status === "start" && <StartModal />}

      {status === "playing" && <Controls />}

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
