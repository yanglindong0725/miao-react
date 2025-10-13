import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { menuConfig } from "@/config/routes.config";

export function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        {/* 页头 */}
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            实验室快速启动
          </h1>
          <p className="text-gray-600">选择一个页面开始探索</p>
        </header>

        {/* 菜单列表 */}
        {menuConfig.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <p className="text-gray-500 mb-4">
              还没有配置任何页面，请查看使用文档开始添加页面。
            </p>
            <a
              href="/src/ROUTER_GUIDE.md"
              className="text-blue-600 hover:text-blue-700 underline"
            >
              查看路由使用指南
            </a>
          </div>
        ) : (
          <div className="space-y-4">
            {menuConfig.map((category) => (
              <Disclosure key={category.id} defaultOpen>
                {({ open }) => (
                  <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <DisclosureButton className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors">
                      <div>
                        <h2 className="text-xl font-semibold text-gray-900">
                          {category.label}
                        </h2>
                        <p className="text-sm text-gray-500 mt-1">
                          {category.routes.length} 个页面
                        </p>
                      </div>
                      <ChevronDown
                        className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                          open ? "rotate-180" : ""
                        }`}
                      />
                    </DisclosureButton>

                    <DisclosurePanel className="px-6 pb-4">
                      <div className="space-y-2 pt-2">
                        {category.routes.map((route) => (
                          <Link
                            key={route.path}
                            to={route.path}
                            className="block p-4 rounded-md hover:bg-gray-50 transition-colors border border-gray-100"
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <h3 className="font-medium text-gray-900">
                                  {route.label}
                                </h3>
                                {route.description && (
                                  <p className="text-sm text-gray-500 mt-1">
                                    {route.description}
                                  </p>
                                )}
                              </div>
                              <span className="text-gray-400">→</span>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </DisclosurePanel>
                  </div>
                )}
              </Disclosure>
            ))}
          </div>
        )}

        {/* 页脚提示 */}
        <footer className="mt-12 text-center text-sm text-gray-500">
          <p>
            添加新页面请参考{" "}
            <code className="px-2 py-1 bg-gray-200 rounded text-gray-800">
              src/config/routes.config.tsx
            </code>
          </p>
        </footer>
      </div>
    </div>
  );
}
