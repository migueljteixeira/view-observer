export default function unflatten(array) {
  return Array.isArray(array) ? array : [array];
}
