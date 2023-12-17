import { useMainContext } from "../../context/mainContext";

import styles from "./styles.module.scss";

export default function Controls() {
  const { startGame, isRoot } = useMainContext();

  const setFoodHandle = () => {
    startGame();
  };

  return (
    <div className={styles.container}>
      {isRoot() && <button onClick={setFoodHandle}>Restart</button>}
    </div>
  );
}
