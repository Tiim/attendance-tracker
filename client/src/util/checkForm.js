export function check(value, array, message) {
  if (!value) {
    array.push(message);
  }
}
