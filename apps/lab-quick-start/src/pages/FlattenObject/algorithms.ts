import { Place, FlatPlace } from "./types";

export function flattenRecursive(
  node: Place,
  parentId: number | null = null,
  level: number = 0,
  result: FlatPlace[] = []
): FlatPlace[] {
  result.push({
    id: node.id,
    title: node.title,
    parentId,
    level,
  });

  node.childPlaces.forEach((child) => {
    flattenRecursive(child, node.id, level + 1, result);
  });

  return result;
}

export function flattenIterative(root: Place): FlatPlace[] {
  const result: FlatPlace[] = [];
  const queue: Array<{ node: Place; parentId: number | null; level: number }> =
    [];

  // 初始化队列
  queue.push({ node: root, parentId: null, level: 0 });

  while (queue.length > 0) {
    const { node, parentId, level } = queue.shift()!;

    result.push({
      id: node.id,
      title: node.title,
      parentId,
      level,
    });

    node.childPlaces.forEach((child) => {
      queue.push({ node: child, parentId: node.id, level: level + 1 });
    });
  }

  return result;
}
