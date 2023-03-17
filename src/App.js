import { Routes, Route } from "react-router-dom";
import ToDoList from "src/components/ToDoList/ToDoList";

function App() {
  return (
      <Routes>
        <Route path="/" element= {<ToDoList />}/>
      </Routes>
  );
}

export default App;
