import { useState } from "react";
import { Link } from "react-router-dom";
import { initialTravelPlan } from "./data";
import { flattenRecursive, flattenIterative } from "./algorithms";
import { FlatPlace } from "./types";
import { OriginalDataCard } from "./components/OriginalDataCard";
import { AlgorithmCard } from "./components/AlgorithmCard";
import { PerformanceComparison } from "./components/PerformanceComparison";
import { ResultTable } from "./components/ResultTable";

export function FlattenObject() {
  const [recursiveTime, setRecursiveTime] = useState<number>(0);
  const [iterativeTime, setIterativeTime] = useState<number>(0);
  const [recursiveResult, setRecursiveResult] = useState<FlatPlace[]>([]);
  const [iterativeResult, setIterativeResult] = useState<FlatPlace[]>([]);

  const runRecursive = () => {
    const start = performance.now();
    const result = flattenRecursive(initialTravelPlan);
    const end = performance.now();
    setRecursiveTime(end - start);
    setRecursiveResult(result);
  };

  const runIterative = () => {
    const start = performance.now();
    const result = flattenIterative(initialTravelPlan);
    const end = performance.now();
    setIterativeTime(end - start);
    setIterativeResult(result);
  };

  const runBoth = () => {
    runRecursive();
    runIterative();
  };

  // 算法配置
  const recursiveConfig = {
    title: "递归实现",
    icon: "🔄",
    principle:
      "使用函数自身调用的方式遍历树形结构。每次访问一个节点时，先将该节点添加到结果数组，然后递归处理所有子节点。",
    features: [
      "✅ 代码简洁直观",
      "✅ 易于理解和维护",
      "⚠️ 深度过大可能栈溢出",
      "⚠️ 有函数调用开销",
    ],
    code: `function flattenRecursive(
  node,
  parentId = null,
  level = 0,
  result = []
) {
  // 添加当前节点
  result.push({
    id: node.id,
    title: node.title,
    parentId,
    level,
  });

  // 递归处理子节点
  node.childPlaces.forEach((child) => {
    flattenRecursive(
      child,
      node.id,
      level + 1,
      result
    );
  });

  return result;
}`,
    executionTime: recursiveTime,
    itemCount: recursiveResult.length,
    colorScheme: "indigo" as const,
  };

  const iterativeConfig = {
    title: "迭代实现",
    icon: "➿",
    principle:
      "使用队列（Queue）数据结构进行广度优先遍历（BFS）。从根节点开始，依次访问每一层的节点，并将子节点加入队列末尾。",
    features: [
      "✅ 不会栈溢出",
      "✅ 性能稳定",
      "⚠️ 需要额外队列空间",
      "⚠️ 代码稍复杂",
    ],
    code: `function flattenIterative(root) {
  const result = [];
  const queue = [];

  // 初始化队列
  queue.push({
    node: root,
    parentId: null,
    level: 0
  });

  while (queue.length > 0) {
    const { node, parentId, level } =
      queue.shift();

    // 添加当前节点
    result.push({
      id: node.id,
      title: node.title,
      parentId,
      level,
    });

    // 将子节点加入队列
    node.childPlaces.forEach((child) => {
      queue.push({
        node: child,
        parentId: node.id,
        level: level + 1
      });
    });
  }

  return result;
}`,
    executionTime: iterativeTime,
    itemCount: iterativeResult.length,
    colorScheme: "purple" as const,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* 页头 */}
        <header className="mb-8">
          <Link
            to="/"
            className="text-indigo-600 hover:text-indigo-700 mb-4 inline-flex items-center gap-2"
          >
            ← 返回首页
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            对象扁平化算法
          </h1>
          <p className="text-gray-600">
            将树形结构转换为扁平列表：递归 vs 迭代实现对比
          </p>
        </header>

        {/* 原始数据展示 */}
        <section className="mb-8">
          <OriginalDataCard data={initialTravelPlan} />
        </section>

        {/* 执行按钮 */}
        <div className="mb-8 flex justify-center">
          <button
            onClick={runBoth}
            className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:from-indigo-700 hover:to-purple-700 transition-all transform hover:scale-105"
          >
            🚀 运行两种算法
          </button>
        </div>

        {/* 算法实现对比 */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            算法实现对比
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <AlgorithmCard {...recursiveConfig} />
            <AlgorithmCard {...iterativeConfig} />
          </div>
        </section>

        {/* 性能对比 */}
        {recursiveTime > 0 && iterativeTime > 0 && (
          <section className="mb-8">
            <PerformanceComparison
              recursiveTime={recursiveTime}
              iterativeTime={iterativeTime}
            />
          </section>
        )}

        {/* 结果展示 */}
        {recursiveResult.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              扁平化结果数据
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <ResultTable
                title="递归结果"
                data={recursiveResult}
                colorScheme="indigo"
              />
              <ResultTable
                title="迭代结果"
                data={iterativeResult}
                colorScheme="purple"
              />
            </div>
          </section>
        )}

        {/* 底部提示 */}
        <footer className="mt-12 text-center text-sm text-gray-500">
          <p>💡 点击顶部按钮运行算法并查看结果</p>
        </footer>
      </div>
    </div>
  );
}
