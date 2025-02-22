import "./App.css";
import ToDoList from "./components/TodoListWithEdit";
import { SpeedInsights } from "@vercel/speed-insights/next";

function App() {
  return (
    <>
      <ToDoList />
      <SpeedInsights />
    </>
  );
}

export default App;
