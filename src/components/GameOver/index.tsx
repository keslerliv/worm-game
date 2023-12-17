import { useMainContext } from "../../context/mainContext";

import styles from "./styles.module.scss";

export default function GameOver() {
  const { startGame, docRef } = useMainContext();

  const reloadHandle = () => {
    startGame();
    docRef.current.focus();
  };

  return (
    <div className={styles.container}>
      <h1>Você perdeu!</h1>
      <button onClick={reloadHandle}>Começar de novo</button>
    </div>
  );
}
