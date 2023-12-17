import { Direction, WormBody, FoodType, Screens } from "../types";

export function getLocalJson(item: string) {
  const data = localStorage.getItem(item);

  if (data) {
    return JSON.parse(data);
  } else {
    return undefined;
  }
}

export function setLocalJson(item: string, value: any) {
  localStorage.setItem(item, JSON.stringify(value));
}

export function getRandomToken() {
  const random = Math.floor(Math.random() * 100000);
  return random.toString();
}

export function getRandomFoodPosition(screens: Screens, size: number) {
  const keys = Object.keys(screens);

  const locations: number[][][] = [];

  keys.forEach((item) => {
    const screen = screens[item];

    locations.push([
      [
        Math.round(screen.left / size),
        Math.round(screen.left / size) + screen.horizontal,
      ],
      [
        Math.round(screen.top / size),
        Math.round(screen.top / size) + screen.vertical,
      ],
    ]);
  });

  const location = getRandomArrayItem(locations);

  return getRandomPosition(location);
}

function getRandomPosition(intervals: number[][]): number[] {
  const randomNumbers: number[] = [];

  for (const interval of intervals) {
    const [min, max] = interval;
    const randomNumber = Math.random() * (max - min) + min;
    randomNumbers.push(Math.round(randomNumber - 1));
  }

  return randomNumbers;
}

function getRandomArrayItem(array: any[]) {
  if (array.length === 0) {
    return undefined;
  }

  const randomIndice = Math.floor(Math.random() * array.length);
  return array[randomIndice];
}

export function addWormMove(body: WormBody, direction: Direction) {
  let newBody: WormBody = [];

  body.forEach((element, index) => {
    if (index === 0) {
      if (direction === "right") {
        newBody.push([element[0] + 1, element[1]]);
      }
      if (direction === "left") {
        newBody.push([element[0] - 1, element[1]]);
      }
      if (direction === "top") {
        newBody.push([element[0], element[1] - 1]);
      }
      if (direction === "bottom") {
        newBody.push([element[0], element[1] + 1]);
      }
    } else {
      newBody.push([body[index - 1][0], body[index - 1][1]]);
    }
  });

  return newBody;
}

export function isWormEating(body: WormBody, foods: FoodType[]) {
  if (body.length > 0 && foods.length > 0) {
    let value: number | boolean = false;
    foods.some((item, index) => {
      if (item[0] === body[0][0] && item[1] === body[0][1]) value = index;
    });
    return value;
  }

  return false;
}
