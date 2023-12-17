import { Direction, WormBody, FoodType, Screens } from "../types";

/**
 * local storage
 */
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

/**
 * food auxiar functions
 */
export function getRandomFoodPosition(screens: Screens, size: number) {
  const keys = Object.keys(screens);

  const locations: number[][][] = [];

  keys.forEach((item) => {
    const screen = screens[item];
    locations.push([
      [
        Math.round(screen.left / size) + 1,
        Math.round(screen.left / size) + screen.horizontal - 1,
      ],
      [
        Math.round(screen.top / size) + 1,
        Math.round(screen.top / size) + screen.vertical - 1,
      ],
    ]);
  });

  const location = getRandomArrayItem(locations);

  return getRandomPosition(location);
}

/**
 * worm auxiar functions
 */
export function addWormMove(body: WormBody, direction: Direction) {
  let newBody: WormBody = [];

  // verify worm direction and set move
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

export function verifyMove(body: WormBody, screens: Screens, size: number) {
  // validate self body
  let status = true;
  body.some((item, index) => {
    if (item[0] === body[0][0] && item[1] === body[0][1] && index !== 0)
      status = false;
  });

  if (!status) return false;

  // validate is out of max screen limit
  const keys = Object.keys(screens);
  const starter = localStorage.getItem("starter") ?? "";

  let maxLeft = Math.round(screens[starter]?.left / size);
  let maxRight = Math.round(
    screens[starter]?.left / size + screens[starter]?.horizontal
  );
  let maxTop = Math.round(screens[starter]?.top / size);
  let maxBottom = Math.round(
    screens[starter]?.top / size + screens[starter]?.vertical
  );

  // re-set max values
  keys.forEach((key, index) => {
    const screen = screens[key];
    if (Math.round(screen?.left / size) < maxLeft)
      maxLeft = Math.round(screen?.left / size);
    if (Math.round(screen?.left / size + screen?.horizontal) > maxRight)
      maxRight = Math.round(screen?.left / size + screen?.horizontal);
    if (Math.round(screen?.top / size) < maxTop)
      maxTop = Math.round(screen?.top / size);
    if (Math.round(screen?.top / size + screen?.vertical) > maxBottom)
      maxBottom = Math.round(screen?.top / size + screen?.vertical);
  });

  // verify by max values
  if (body.length > 0) {
    if (body[0][0] < maxLeft) return false;
    if (body[0][0] > maxRight) return false;
    if (body[0][1] < maxTop) return false;
    if (body[0][1] > maxBottom) return false;
  }

  return true;
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

/**
 * utils
 */
export function getRandomToken() {
  const random = Math.floor(Math.random() * 100000);
  return random.toString();
}

function getRandomArrayItem(array: any[]) {
  if (array.length === 0) {
    return undefined;
  }

  const randomIndice = Math.floor(Math.random() * array.length);
  return array[randomIndice];
}

function getRandomPosition(intervals: number[][]): number[] {
  const randomNumbers: number[] = [];

  // get random position in interval
  for (const interval of intervals) {
    const [min, max] = interval;
    const randomNumber = Math.random() * (max - min) + min;
    randomNumbers.push(Math.round(randomNumber - 1));
  }

  return randomNumbers;
}
