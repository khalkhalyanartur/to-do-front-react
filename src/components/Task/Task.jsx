import { useState } from "react";
import EditedTask from "../EditedTask/EditedTask";
import { edit, del } from "src/img/img";
import "./style.scss"

const Task = ({ taskItem, changeCheckById, deleteTask, editTaskText}) => {

  const [isCheked, setIsCheked] = useState(taskItem.isCheck);
  const [editableId, setEditableId] = useState("");

  const changeCheckClick = (currentCheck) => {
    setIsCheked(currentCheck);
    changeCheckById(taskItem._id, currentCheck);
  }

  const deleteTaskClick = (id) => {
    deleteTask(id);
  }

  const applayEditTask = (text) => {
    editTaskText(taskItem._id, text)
    setEditableId("");
  }
  const cancelEditTask = () => {
    setEditableId("");
  }

  return (

    <div className = "task">
  
      {editableId
        ? <EditedTask
            applayEditTask={applayEditTask}
            cancelEditTask={cancelEditTask}
            text={taskItem.text} 
          /> 
        : <div className = "task">
            <input type={"checkbox"} checked={isCheked} onChange={(e)=>{changeCheckClick(e.target.checked)}}/> 
            <p className="text">
              {taskItem.text}
            </p>
            <button className = "btn" onClick={()=>{
              if (!taskItem.isCheck) setEditableId(taskItem._id)
            }}>
              <img src={edit} alt="edit"/>
            </button>
            <button className = "btn" onClick={()=>deleteTaskClick(taskItem._id)}>
              <img src={del} alt="delete"/>
            </button>
          </div>
      }
    </div> 
  )
}
 
export default Task;