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
