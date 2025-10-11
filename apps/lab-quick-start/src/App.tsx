import "./App.css";
import ShopList from "./components/ShopList";
import MyButton from "./components/MyButton";
import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <>
      <div className="card">
        <ShopList />
        <MyButton count={count} onClick={handleClick} />
        <MyButton count={count} onClick={handleClick} />
        <p style={{ marginTop: "20px", fontSize: "14px", color: "#666" }}>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">使用 @miao/* 共享包构建的 Monorepo 应用</p>
    </>
  );
}

export default App;
