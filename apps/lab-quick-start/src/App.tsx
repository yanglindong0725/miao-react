import { useState } from "react";
import { Button } from "@miao/ui";
import { formatDate, capitalize } from "@miao/utils";
import { useDebounce, useToggle } from "@miao/hooks";
import type { User } from "@miao/types";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const debouncedCount = useDebounce(count, 500);
  const [showDetails, { toggle }] = useToggle(false);

  const user: User = {
    id: "1",
    name: "Miao Developer",
    email: "dev@miao.com",
    createdAt: formatDate(new Date()),
  };

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React + Monorepo</h1>
      <div className="card">
        <Button
          onClick={() => setCount((count) => count + 1)}
          variant="primary"
        >
          count is {count}
        </Button>
        <p>防抖后的值: {debouncedCount}</p>

        <Button
          onClick={toggle}
          variant="secondary"
          style={{ marginTop: "10px" }}
        >
          {showDetails ? "隐藏" : "显示"}详情
        </Button>

        {showDetails && (
          <div
            style={{
              marginTop: "10px",
              padding: "10px",
              background: "#f5f5f5",
              borderRadius: "4px",
            }}
          >
            <p>
              <strong>{capitalize(user.name)}</strong>
            </p>
            <p>邮箱: {user.email}</p>
            <p>创建时间: {user.createdAt}</p>
          </div>
        )}

        <p style={{ marginTop: "20px", fontSize: "14px", color: "#666" }}>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">使用 @miao/* 共享包构建的 Monorepo 应用</p>
    </>
  );
}

export default App;
