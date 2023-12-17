import { useMainContext } from "../../context/mainContext";

import styles from "./styles.module.scss";

export default function GameOver() {
  const { startGame, wormBody, docRef, isRoot } = useMainContext();

  const reloadHandle = () => {
    startGame();
    docRef.current.focus();
  };

  return (
    <div className={styles.container}>
      <h1>GAME OVER!</h1>
      <p>Score: {wormBody.length}</p>
      {isRoot() && <button onClick={reloadHandle}>Começar de novo</button>}
    </div>
  );
}
