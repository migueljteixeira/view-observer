export default function unflatten(nodes) {
  if (Array.isArray(nodes)) {
    return nodes.reduce((acc, node) => {
      if (node instanceof HTMLCollection) {
        return acc.concat(Array.from(node));
      }

      return acc.concat([node]);
    }, []);
  }

  if (nodes instanceof HTMLCollection) {
    return Array.from(nodes);
  }

  return [nodes];
}
