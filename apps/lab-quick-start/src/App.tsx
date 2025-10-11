import "./App.css";
import { LoginForm } from "@/components/login-form";

function App() {
  return (
    <div className="flex justify-center items-center h-screen p-4">
      <LoginForm className="w-full max-w-sm md:max-w-4xl shrink-0" />
    </div>
  );
}

export default App;
