import { useMainContext } from "../../context/mainContext";
import Controls from "../Controls";
import Food from "./components/Food";
import Worm from "./components/Worm";

import styles from "./styles.module.scss";

export default function Scene() {
  const {
    blockSize,
    left,
    top,
    horizontal,
    getScreens,
    vertical,
    changeDirectionHandle,
  } = useMainContext();

  return (
    <div
      className={styles.container}
      onKeyDown={changeDirectionHandle}
      tabIndex={0}
    >
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
