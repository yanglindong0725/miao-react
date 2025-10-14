interface Props {
  recursiveTime: number;
  iterativeTime: number;
}

export function PerformanceComparison({ recursiveTime, iterativeTime }: Props) {
  const difference = Math.abs(recursiveTime - iterativeTime);
  const faster = recursiveTime < iterativeTime ? "递归更快" : "迭代更快";

  return (
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
            {difference.toFixed(4)} ms
          </p>
          <p className="text-xs text-gray-500 mt-1">{faster}</p>
        </div>
      </div>
      <div className="mt-4 text-sm text-gray-600 bg-white rounded-lg p-4">
        <p className="font-semibold mb-2">💡 分析：</p>
        <ul className="space-y-1 ml-4">
          <li>• 对于小型数据集，两种方法性能差异很小（通常在毫秒级）</li>
          <li>• 递归代码更简洁，但深层嵌套（&gt;1000层）可能导致栈溢出</li>
          <li>• 迭代更适合处理大规模或深层嵌套的数据结构</li>
          <li>• 实际应用中应根据数据特点和可读性需求选择合适的方法</li>
        </ul>
      </div>
    </div>
  );
}
