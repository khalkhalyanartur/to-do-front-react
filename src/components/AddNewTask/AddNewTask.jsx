import { useState } from "react";
import Error from "src/components/Error/Error";

const AddNewTask = ({ createTask, deleteTasks }) => {
  const [taskText, setTaskText] = useState("");
  const [message, setError] = useState("");

  const deleteTasksClick = () => {
    deleteTasks();
    setError("");
  }

  const addTask = async (taskText) => {
    if (!taskText.trim()) {
      setError("Введите текст");
      console.log("message=", message);

      return
    } 
    createTask(taskText);
    setError("");
    setTaskText("");
  }
  
  return (
    <div>  
      <input type="text" 
      value={taskText} 
      name="taskText" 
      onChange={(e)=>setTaskText(e.target.value)}
      />
      <button onClick={() => addTask(taskText)}>Add</button>
      <button onClick={deleteTasksClick}>DeleteAll</button>
      <Error message={message} />
    </div>
  )
}

export default AddNewTask;