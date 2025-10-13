import { useState } from "react";
import { Link } from "react-router-dom";

interface Place {
  id: number;
  title: string;
  childPlaces: Place[];
}

interface FlatPlace {
  id: number;
  title: string;
  parentId: number | null;
  level: number;
}

const initialTravelPlan: Place = {
  id: 0,
  title: "(Root)",
  childPlaces: [
    {
      id: 1,
      title: "Earth",
      childPlaces: [
        {
          id: 2,
          title: "Africa",
          childPlaces: [
            {
              id: 3,
              title: "Botswana",
              childPlaces: [],
            },
            {
              id: 4,
              title: "Egypt",
              childPlaces: [],
            },
            {
              id: 5,
              title: "Kenya",
              childPlaces: [],
            },
            {
              id: 6,
              title: "Madagascar",
              childPlaces: [],
            },
            {
              id: 7,
              title: "Morocco",
              childPlaces: [],
            },
            {
              id: 8,
              title: "Nigeria",
              childPlaces: [],
            },
            {
              id: 9,
              title: "South Africa",
              childPlaces: [],
            },
          ],
        },
        {
          id: 10,
          title: "Americas",
          childPlaces: [
            {
              id: 11,
              title: "Argentina",
              childPlaces: [],
            },
            {
              id: 12,
              title: "Brazil",
              childPlaces: [],
            },
            {
              id: 13,
              title: "Barbados",
              childPlaces: [],
            },
            {
              id: 14,
              title: "Canada",
              childPlaces: [],
            },
            {
              id: 15,
              title: "Jamaica",
              childPlaces: [],
            },
            {
              id: 16,
              title: "Mexico",
              childPlaces: [],
            },
            {
              id: 17,
              title: "Trinidad and Tobago",
              childPlaces: [],
            },
            {
              id: 18,
              title: "Venezuela",
              childPlaces: [],
            },
          ],
        },
        {
          id: 19,
          title: "Asia",
          childPlaces: [
            {
              id: 20,
              title: "China",
              childPlaces: [],
            },
            {
              id: 21,
              title: "India",
              childPlaces: [],
            },
            {
              id: 22,
              title: "Singapore",
              childPlaces: [],
            },
            {
              id: 23,
              title: "South Korea",
              childPlaces: [],
            },
            {
              id: 24,
              title: "Thailand",
              childPlaces: [],
            },
            {
              id: 25,
              title: "Vietnam",
              childPlaces: [],
            },
          ],
        },
        {
          id: 26,
          title: "Europe",
          childPlaces: [
            {
              id: 27,
              title: "Croatia",
              childPlaces: [],
            },
            {
              id: 28,
              title: "France",
              childPlaces: [],
            },
            {
              id: 29,
              title: "Germany",
              childPlaces: [],
            },
            {
              id: 30,
              title: "Italy",
              childPlaces: [],
            },
            {
              id: 31,
              title: "Portugal",
              childPlaces: [],
            },
            {
              id: 32,
              title: "Spain",
              childPlaces: [],
            },
            {
              id: 33,
              title: "Turkey",
              childPlaces: [],
            },
          ],
        },
        {
          id: 34,
          title: "Oceania",
          childPlaces: [
            {
              id: 35,
              title: "Australia",
              childPlaces: [],
            },
            {
              id: 36,
              title: "Bora Bora (French Polynesia)",
              childPlaces: [],
            },
            {
              id: 37,
              title: "Easter Island (Chile)",
              childPlaces: [],
            },
            {
              id: 38,
              title: "Fiji",
              childPlaces: [],
            },
            {
              id: 39,
              title: "Hawaii (the USA)",
              childPlaces: [],
            },
            {
              id: 40,
              title: "New Zealand",
              childPlaces: [],
            },
            {
              id: 41,
              title: "Vanuatu",
              childPlaces: [],
            },
          ],
        },
      ],
    },
    {
      id: 42,
      title: "Moon",
      childPlaces: [
        {
          id: 43,
          title: "Rheita",
          childPlaces: [],
        },
        {
          id: 44,
          title: "Piccolomini",
          childPlaces: [],
        },
        {
          id: 45,
          title: "Tycho",
          childPlaces: [],
        },
      ],
    },
    {
      id: 46,
      title: "Mars",
      childPlaces: [
        {
          id: 47,
          title: "Corn Town",
          childPlaces: [],
        },
        {
          id: 48,
          title: "Green Hill",
          childPlaces: [],
        },
      ],
    },
  ],
};

// 递归实现
function flattenRecursive(
  node: Place,
  parentId: number | null = null,
  level: number = 0,
  result: FlatPlace[] = []
): FlatPlace[] {
  // 添加当前节点
  result.push({
    id: node.id,
    title: node.title,
    parentId,
    level,
  });

  // 递归处理子节点
  node.childPlaces.forEach((child) => {
    flattenRecursive(child, node.id, level + 1, result);
  });

  return result;
}

// 迭代实现（使用队列）
function flattenIterative(root: Place): FlatPlace[] {
  const result: FlatPlace[] = [];
  const queue: Array<{ node: Place; parentId: number | null; level: number }> =
    [];

  // 初始化队列
  queue.push({ node: root, parentId: null, level: 0 });

  while (queue.length > 0) {
    const { node, parentId, level } = queue.shift()!;

    // 添加当前节点
    result.push({
      id: node.id,
      title: node.title,
      parentId,
      level,
    });

    // 将子节点加入队列
    node.childPlaces.forEach((child) => {
      queue.push({ node: child, parentId: node.id, level: level + 1 });
    });
  }

  return result;
}

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
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <span className="text-2xl">📦</span>
              原始嵌套数据
            </h2>
            <div className="bg-gray-50 rounded-lg p-4 overflow-auto max-h-96">
              <pre className="text-sm text-gray-800">
                {JSON.stringify(initialTravelPlan, null, 2)}
              </pre>
            </div>
            <div className="mt-4 text-sm text-gray-600">
              <p>
                <strong>节点总数：</strong>49 个节点
              </p>
              <p>
                <strong>最大深度：</strong>4 层
              </p>
            </div>
          </div>
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
            {/* 递归实现 */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-indigo-200">
              <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 px-6 py-4">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <span>🔄</span>
                  递归实现
                </h3>
              </div>
              <div className="p-6">
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">算法原理</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    使用函数自身调用的方式遍历树形结构。每次访问一个节点时，先将该节点添加到结果数组，然后递归处理所有子节点。
                  </p>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">特点</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>✅ 代码简洁直观</li>
                    <li>✅ 易于理解和维护</li>
                    <li>⚠️ 深度过大可能栈溢出</li>
                    <li>⚠️ 有函数调用开销</li>
                  </ul>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">代码实现</h4>
                  <div className="bg-gray-50 rounded-lg p-4 overflow-auto">
                    <pre className="text-xs text-gray-800 leading-relaxed">
                      {`function flattenRecursive(
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
}`}
                    </pre>
                  </div>
                </div>

                {recursiveTime > 0 && (
                  <div className="mt-4 p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                    <p className="text-sm font-semibold text-indigo-900">
                      执行时间: {recursiveTime.toFixed(4)} ms
                    </p>
                    <p className="text-xs text-indigo-700 mt-1">
                      共处理 {recursiveResult.length} 个节点
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* 迭代实现 */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-purple-200">
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 px-6 py-4">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <span>➿</span>
                  迭代实现
                </h3>
              </div>
              <div className="p-6">
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">算法原理</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    使用队列（Queue）数据结构进行广度优先遍历（BFS）。从根节点开始，依次访问每一层的节点，并将子节点加入队列末尾。
                  </p>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">特点</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>✅ 不会栈溢出</li>
                    <li>✅ 性能稳定</li>
                    <li>⚠️ 需要额外队列空间</li>
                    <li>⚠️ 代码稍复杂</li>
                  </ul>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">代码实现</h4>
                  <div className="bg-gray-50 rounded-lg p-4 overflow-auto">
                    <pre className="text-xs text-gray-800 leading-relaxed">
                      {`function flattenIterative(root) {
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
}`}
                    </pre>
                  </div>
                </div>

                {iterativeTime > 0 && (
                  <div className="mt-4 p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <p className="text-sm font-semibold text-purple-900">
                      执行时间: {iterativeTime.toFixed(4)} ms
                    </p>
                    <p className="text-xs text-purple-700 mt-1">
                      共处理 {iterativeResult.length} 个节点
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* 性能对比 */}
        {recursiveTime > 0 && iterativeTime > 0 && (
          <section className="mb-8">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl shadow-lg p-6 border border-green-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span>📊</span>
                性能对比
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg p-4 text-center">
                  <p className="text-sm text-gray-600 mb-2">递归耗时</p>
                  <p className="text-2xl font-bold text-indigo-600">
                    {recursiveTime.toFixed(4)} ms
                  </p>
                </div>
                <div className="bg-white rounded-lg p-4 text-center">
                  <p className="text-sm text-gray-600 mb-2">迭代耗时</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {iterativeTime.toFixed(4)} ms
                  </p>
                </div>
                <div className="bg-white rounded-lg p-4 text-center">
                  <p className="text-sm text-gray-600 mb-2">性能差异</p>
                  <p className="text-2xl font-bold text-green-600">
                    {Math.abs(recursiveTime - iterativeTime).toFixed(4)} ms
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {recursiveTime < iterativeTime ? "递归更快" : "迭代更快"}
                  </p>
                </div>
              </div>
              <div className="mt-4 text-sm text-gray-600 bg-white rounded-lg p-4">
                <p className="font-semibold mb-2">💡 分析：</p>
                <ul className="space-y-1 ml-4">
                  <li>
                    • 对于小型数据集，两种方法性能差异很小（通常在毫秒级）
                  </li>
                  <li>
                    • 递归代码更简洁，但深层嵌套（&gt;1000层）可能导致栈溢出
                  </li>
                  <li>• 迭代更适合处理大规模或深层嵌套的数据结构</li>
                  <li>• 实际应用中应根据数据特点和可读性需求选择合适的方法</li>
                </ul>
              </div>
            </div>
          </section>
        )}

        {/* 结果展示 */}
        {recursiveResult.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              扁平化结果数据
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {/* 递归结果 */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-indigo-200">
                <div className="bg-indigo-500 px-6 py-3">
                  <h3 className="text-lg font-bold text-white">递归结果</h3>
                </div>

                {/* 表格展示 */}
                <div className="overflow-auto max-h-96 border-b border-gray-200">
                  <table className="w-full text-sm">
                    <thead className="bg-indigo-50 sticky top-0">
                      <tr>
                        <th className="px-4 py-3 text-left font-semibold text-gray-700">
                          ID
                        </th>
                        <th className="px-4 py-3 text-left font-semibold text-gray-700">
                          Title
                        </th>
                        <th className="px-4 py-3 text-left font-semibold text-gray-700">
                          Parent ID
                        </th>
                        <th className="px-4 py-3 text-left font-semibold text-gray-700">
                          Level
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {recursiveResult.map((item, index) => (
                        <tr
                          key={item.id}
                          className={`hover:bg-indigo-50 transition-colors ${
                            index % 2 === 0 ? "bg-white" : "bg-gray-50"
                          }`}
                        >
                          <td className="px-4 py-2 font-mono text-gray-600">
                            {item.id}
                          </td>
                          <td className="px-4 py-2 text-gray-800 font-medium">
                            {item.title}
                          </td>
                          <td className="px-4 py-2 font-mono text-gray-600">
                            {item.parentId ?? "null"}
                          </td>
                          <td className="px-4 py-2 text-gray-600">
                            {item.level}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* 原始 JSON 数据 */}
                <details className="group">
                  <summary className="px-6 py-3 bg-indigo-50 cursor-pointer hover:bg-indigo-100 transition-colors flex items-center justify-between">
                    <span className="text-sm font-semibold text-indigo-900">
                      📄 查看原始 JSON 数据
                    </span>
                    <span className="text-indigo-600 group-open:rotate-180 transition-transform">
                      ▼
                    </span>
                  </summary>
                  <div className="p-4 bg-gray-50 overflow-auto max-h-64">
                    <pre className="text-xs text-gray-800 leading-relaxed">
                      {JSON.stringify(recursiveResult, null, 2)}
                    </pre>
                  </div>
                </details>
              </div>

              {/* 迭代结果 */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-purple-200">
                <div className="bg-purple-500 px-6 py-3">
                  <h3 className="text-lg font-bold text-white">迭代结果</h3>
                </div>

                {/* 表格展示 */}
                <div className="overflow-auto max-h-96 border-b border-gray-200">
                  <table className="w-full text-sm">
                    <thead className="bg-purple-50 sticky top-0">
                      <tr>
                        <th className="px-4 py-3 text-left font-semibold text-gray-700">
                          ID
                        </th>
                        <th className="px-4 py-3 text-left font-semibold text-gray-700">
                          Title
                        </th>
                        <th className="px-4 py-3 text-left font-semibold text-gray-700">
                          Parent ID
                        </th>
                        <th className="px-4 py-3 text-left font-semibold text-gray-700">
                          Level
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {iterativeResult.map((item, index) => (
                        <tr
                          key={item.id}
                          className={`hover:bg-purple-50 transition-colors ${
                            index % 2 === 0 ? "bg-white" : "bg-gray-50"
                          }`}
                        >
                          <td className="px-4 py-2 font-mono text-gray-600">
                            {item.id}
                          </td>
                          <td className="px-4 py-2 text-gray-800 font-medium">
                            {item.title}
                          </td>
                          <td className="px-4 py-2 font-mono text-gray-600">
                            {item.parentId ?? "null"}
                          </td>
                          <td className="px-4 py-2 text-gray-600">
                            {item.level}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* 原始 JSON 数据 */}
                <details className="group">
                  <summary className="px-6 py-3 bg-purple-50 cursor-pointer hover:bg-purple-100 transition-colors flex items-center justify-between">
                    <span className="text-sm font-semibold text-purple-900">
                      📄 查看原始 JSON 数据
                    </span>
                    <span className="text-purple-600 group-open:rotate-180 transition-transform">
                      ▼
                    </span>
                  </summary>
                  <div className="p-4 bg-gray-50 overflow-auto max-h-64">
                    <pre className="text-xs text-gray-800 leading-relaxed">
                      {JSON.stringify(iterativeResult, null, 2)}
                    </pre>
                  </div>
                </details>
              </div>
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
