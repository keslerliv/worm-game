import { ControlProps } from "../../types";
import styles from "./styles.module.scss";

export default function Controls({ screen, screens, setFoods }: ControlProps) {
  const keys = Object.keys(screens);

  const generateAreas: number[][][] = [
    [
      [screen.left, screen.left + screen.horizontal],
      [screen.top, screen.top + screen.vertical],
    ],
  ];

  keys.forEach((item) => {
    generateAreas.push([
      [screens[item].left, screens[item].left + screens[item].horizontal],
      [screens[item].top, screens[item].top + screens[item].vertical],
    ]);
  });

  // set food positions in local storage
  const setFoodHandle = () => {
    const foodPositions = [
      [
        Math.floor(
          Math.random() *
            (generateAreas[0][0][1] - generateAreas[0][0][0] + 1) +
            generateAreas[0][0][0]
        ),
        Math.floor(
          Math.random() *
            (generateAreas[0][1][1] - generateAreas[0][1][0] + 1) +
            generateAreas[0][1][0]
        ),
      ],
      [
        Math.floor(
          Math.random() *
            (generateAreas[1][0][1] - generateAreas[1][0][0] + 1) +
            generateAreas[0][0][0]
        ),
        Math.floor(
          Math.random() *
            (generateAreas[1][1][1] - generateAreas[1][1][0] + 1) +
            generateAreas[0][1][0]
        ),
      ],
    ];
    setFoods(foodPositions);
    localStorage.setItem("foods", JSON.stringify(foodPositions));
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
