import { Place } from "../types";

interface Props {
  data: Place;
}

export function OriginalDataCard({ data }: Props) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <span className="text-2xl">📦</span>
        原始嵌套数据
      </h2>
      <div className="bg-gray-50 rounded-lg p-4 overflow-auto max-h-96">
        <pre className="text-sm text-gray-800">
          {JSON.stringify(data, null, 2)}
        </pre>
      </div>
      <div className="mt-4 text-sm text-gray-600">
        <p>
          <strong>节点总数：</strong>
          {data.childPlaces.length} 个节点
        </p>
        <p>
          <strong>最大深度：</strong>
          {data.childPlaces.reduce(
            (max, place) => Math.max(max, place.childPlaces.length),
            0
          )}{" "}
          层
        </p>
      </div>
    </div>
  );
}
