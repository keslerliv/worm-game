import { useMainContext } from "../../context/mainContext";
import { ControlProps } from "../../types";
import styles from "./styles.module.scss";

export default function Controls({ screen, screens }: ControlProps) {
  const { startGame } = useMainContext();

  // set food positions in local storage
  const setFoodHandle = () => {
    startGame();
  };

  return (
    <div className={styles.container}>
      <p>
        {screen.horizontal} {screen.vertical}
      </p>
      <button onClick={setFoodHandle}>Start</button>
    </div>
  );
}
