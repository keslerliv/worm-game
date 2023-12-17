import { useMainContext } from "../../context/mainContext";

import Arrows from "../../assets/images/arrows.png";

import styles from "./styles.module.scss";

export default function StartModal() {
  const { startGame, docRef, isRoot } = useMainContext();

  const startHandle = () => {
    startGame();
    docRef.current.focus();
  };

  return (
    <div className={styles.container}>
      <h1>Vamos jogar?</h1>
      <p>Para se movimentar use as teclas:</p>
      <img src={Arrows} width="180" alt="Use as teclas W, A, S, D" />
      <button onClick={startHandle}>Iniciar</button>
    </div>
  );
}
