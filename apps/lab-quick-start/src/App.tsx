import { Routes, Route } from "react-router-dom";
import { Home } from "@/pages/Home";
import { NotFound } from "@/pages/NotFound";
import { menuConfig } from "@/config/routes.config";
import "./App.css";

function App() {
  return (
    <Routes>
      {/* 首页路由 */}
      <Route path="/" element={<Home />} />

      {/* 自动生成的页面路由 */}
      {menuConfig.map((category) =>
        category.routes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={<route.component />}
          />
        ))
      )}

      {/* 404 页面 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
