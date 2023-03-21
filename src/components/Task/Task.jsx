import { useState } from "react";
import EditedTask from "src/components/EditedTask/EditedTask";
import Error from "src/components/Error/Error";
import { edit, del } from "src/img/index";
import "./style.scss"

const Task = ({ taskItem, changeCheckById, deleteTask, editTaskText}) => {

  const [isCheked, setIsCheked] = useState(taskItem.isCheck);
  const [editableId, setEditableId] = useState(null);
  const [message, setError] = useState(null);

  const changeCheckClick = async (currentCheck) => {
      const updatedTask = await changeCheckById(taskItem._id, currentCheck);
      setIsCheked(updatedTask.isCheck);
  }

  const applayEditTask = async (text) => {
    if (!text.trim()) {
      setError("Введите текст");
      return
    }
    const updatedTask = await editTaskText(taskItem._id, text);

    if (updatedTask.text === text) {
      setEditableId("");
    }

  }

  const cancelEditTask = () => {
    setEditableId("");
  }

  const editTask = () => {
    if (!taskItem.isCheck) {
      setEditableId(taskItem._id)
    }
  }

  return (
    <div className = "task">
      {editableId
        ? <div> 
        <EditedTask
            applayEditTask={applayEditTask}
            cancelEditTask={cancelEditTask}
            text={taskItem.text}
          />
          <Error message={message} />
           </div>
        : <div className = "task">
            <input type={"checkbox"} checked={isCheked} onChange={(e)=>{changeCheckClick(e.target.checked)}}/> 
            <p className="text">
              {taskItem.text}
            </p>
            <button className = "btn" onClick={editTask}>
              <img src={edit} alt="edit"/>
            </button>
            <button className = "btn" onClick={()=>deleteTask(taskItem._id)}>
              <img src={del} alt="delete"/>
            </button>
          </div>
      }
    </div> 
  )
}
 
export default Task;