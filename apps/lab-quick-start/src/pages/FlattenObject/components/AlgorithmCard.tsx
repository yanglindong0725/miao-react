interface Props {
  title: string;
  icon: string;
  principle: string;
  features: string[];
  code: string;
  executionTime?: number;
  itemCount?: number;
  colorScheme: "indigo" | "purple";
}

export function AlgorithmCard({
  title,
  icon,
  principle,
  features,
  code,
  executionTime,
  itemCount,
  colorScheme,
}: Props) {
  const colors = {
    indigo: {
      gradient: "from-indigo-500 to-indigo-600",
      border: "border-indigo-200",
      bg: "bg-indigo-50",
      borderAccent: "border-indigo-200",
      text: "text-indigo-900",
      textSecondary: "text-indigo-700",
    },
    purple: {
      gradient: "from-purple-500 to-purple-600",
      border: "border-purple-200",
      bg: "bg-purple-50",
      borderAccent: "border-purple-200",
      text: "text-purple-900",
      textSecondary: "text-purple-700",
    },
  };

  const scheme = colors[colorScheme];

  return (
    <div
      className={`bg-white rounded-xl shadow-lg overflow-hidden border ${scheme.border}`}
    >
      <div className={`bg-gradient-to-r ${scheme.gradient} px-6 py-4`}>
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <span>{icon}</span>
          {title}
        </h3>
      </div>
      <div className="p-6">
        <div className="mb-4">
          <h4 className="font-semibold text-gray-900 mb-2">算法原理</h4>
          <p className="text-sm text-gray-600 leading-relaxed">{principle}</p>
        </div>

        <div className="mb-4">
          <h4 className="font-semibold text-gray-900 mb-2">特点</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            {features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>

        <div className="mb-4">
          <h4 className="font-semibold text-gray-900 mb-2">代码实现</h4>
          <div className="bg-gray-50 rounded-lg p-4 overflow-auto">
            <pre className="text-xs text-gray-800 leading-relaxed">{code}</pre>
          </div>
        </div>

        {executionTime !== undefined && executionTime > 0 && (
          <div
            className={`mt-4 p-4 ${scheme.bg} rounded-lg border ${scheme.borderAccent}`}
          >
            <p className={`text-sm font-semibold ${scheme.text}`}>
              执行时间: {executionTime.toFixed(4)} ms
            </p>
            <p className={`text-xs ${scheme.textSecondary} mt-1`}>
              共处理 {itemCount} 个节点
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
