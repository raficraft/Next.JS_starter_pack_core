export function convertTimestamp(timestamp) {
  const date = new Date(timestamp);

  return `${date.getDate() < 10 ? "0" + date.getDate() : date.getDate()}/${
    date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1
  }/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${
    date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds()
  }`;
}
