import { useMainContext } from "../../context/mainContext";
import GameOver from "../GameOver";
import StartModal from "../Start";
import Detail from "./components/Detail";
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

      <div
        className={styles.scene}
        style={{
          width: `calc(100vw + ${left}px)`,
          height: `calc(100vh + ${top}px)`,
          marginLeft: `-${left}px`,
          marginTop: `-${top}px`,
        }}
      >
        <Worm />
        <Food />
        <Detail />
      </div>
    </div>
  );
}
