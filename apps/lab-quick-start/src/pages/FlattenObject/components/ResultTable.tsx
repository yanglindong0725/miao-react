import { FlatPlace } from "../types";

interface Props {
  title: string;
  data: FlatPlace[];
  colorScheme: "indigo" | "purple";
}

export function ResultTable({ title, data, colorScheme }: Props) {
  const colors = {
    indigo: {
      header: "bg-indigo-500",
      tableHeader: "bg-indigo-50",
      border: "border-indigo-200",
      hover: "hover:bg-indigo-50",
      detailsBg: "bg-indigo-50",
      detailsHover: "hover:bg-indigo-100",
      detailsText: "text-indigo-900",
      detailsArrow: "text-indigo-600",
    },
    purple: {
      header: "bg-purple-500",
      tableHeader: "bg-purple-50",
      border: "border-purple-200",
      hover: "hover:bg-purple-50",
      detailsBg: "bg-purple-50",
      detailsHover: "hover:bg-purple-100",
      detailsText: "text-purple-900",
      detailsArrow: "text-purple-600",
    },
  };

  const scheme = colors[colorScheme];

  return (
    <div
      className={`bg-white rounded-xl shadow-lg overflow-hidden border ${scheme.border}`}
    >
      <div className={`${scheme.header} px-6 py-3`}>
        <h3 className="text-lg font-bold text-white">{title}</h3>
      </div>

      {/* 表格展示 */}
      <div className="overflow-auto max-h-96 border-b border-gray-200">
        <table className="w-full text-sm">
          <thead className={`${scheme.tableHeader} sticky top-0`}>
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
            {data.map((item, index) => (
              <tr
                key={item.id}
                className={`${scheme.hover} transition-colors ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                }`}
              >
                <td className="px-4 py-2 font-mono text-gray-600">{item.id}</td>
                <td className="px-4 py-2 text-gray-800 font-medium">
                  {item.title}
                </td>
                <td className="px-4 py-2 font-mono text-gray-600">
                  {item.parentId ?? "null"}
                </td>
                <td className="px-4 py-2 text-gray-600">{item.level}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 原始 JSON 数据 */}
      <details className="group">
        <summary
          className={`px-6 py-3 ${scheme.detailsBg} cursor-pointer ${scheme.detailsHover} transition-colors flex items-center justify-between`}
        >
          <span className={`text-sm font-semibold ${scheme.detailsText}`}>
            📄 查看原始 JSON 数据
          </span>
          <span
            className={`${scheme.detailsArrow} group-open:rotate-180 transition-transform`}
          >
            ▼
          </span>
        </summary>
        <div className="p-4 bg-gray-50 overflow-auto max-h-64">
          <pre className="text-xs text-gray-800 leading-relaxed">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      </details>
    </div>
  );
}
