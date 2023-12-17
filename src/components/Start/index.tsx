import { useMainContext } from "../../context/mainContext";

import styles from "./styles.module.scss";

export default function StartModal() {
  const { startGame, docRef } = useMainContext();

  const startHandle = () => {
    startGame();
    docRef.current.focus();
  };

  return (
    <div className={styles.container}>
      <h1>Vamos jogar?</h1>
      <button onClick={startHandle}>Iniciar</button>
    </div>
  );
}
