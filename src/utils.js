export function unflatten(array) {
  return Array.isArray(array) ? array : [array];
}
