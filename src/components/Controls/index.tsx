import { useMainContext } from "../../context/mainContext";

import styles from "./styles.module.scss";

export default function Controls() {
  const { startGame } = useMainContext();

  // set food positions in local storage
  const setFoodHandle = () => {
    startGame();
  };

  return (
    <div className={styles.container}>
      <button onClick={setFoodHandle}>Restart</button>
    </div>
  );
}
