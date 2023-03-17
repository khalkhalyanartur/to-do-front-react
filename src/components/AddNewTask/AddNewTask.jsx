import { useState } from "react";

const AddNewTask = ({ createTask, deleteTasks }) => {
  const [taskText, setTaskText] = useState("");

  const addTask = async (taskText) => {
    createTask(taskText);
    setTaskText("");
  }

  const delTasks = async () => {
    deleteTasks();
  }
  
  return (
    <div>
      <input type="text" value={taskText} id="taskText" name="taskText" onChange={(e)=>{setTaskText(e.target.value)}}/>
      <button onClick={() => addTask(taskText)}>Add</button>
      <button onClick={() => delTasks()}>DelAll</button>
      </div>
  )
}

export default AddNewTask;