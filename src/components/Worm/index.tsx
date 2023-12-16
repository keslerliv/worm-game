import { useState } from "react";
import { WormProps } from "../../types";
import styles from "./styles.module.scss";

export default function Worm({ size }: WormProps) {
  const [direction, setDirection] = useState<
    "right" | "left" | "top" | "bottom"
  >("right");

  const [wormBody, setWormBody] = useState([
    [10, 10],
    [11, 10],
    [12, 10],
    [13, 10],
    [14, 10],
  ]);

  return (
    <div className={styles.worm}>
      {wormBody.map((item, index) => (
        <div
          style={{
            width: `${size}px`,
            left: `${item[0] * size}px`,
            top: `${item[1] * size}px`,
          }}
          className={styles.wormBody}
          key={index}
        ></div>
      ))}
    </div>
  );
}
