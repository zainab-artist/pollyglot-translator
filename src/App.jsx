import { useState } from "react";
import './index.css';
import MainTranslator from "./components/MainTranslator";

export default function App() {
  const [mode, setMode] = useState("main"); 

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <div className="mb-4">
       
       
      </div>

      {mode === "main" && <MainTranslator />}
      
    </div>
  );
}