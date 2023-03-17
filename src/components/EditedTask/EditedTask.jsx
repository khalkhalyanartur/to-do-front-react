import { useState } from "react";
import { apply, cancel } from "src/img/img";
import "./style.scss"

const EditedTask = ({ applayEditTask, cancelEditTask, text}) => {
const [editText, setEditText] = useState(text);

  return (
    <div className = "task">
      <input type="text" value={editText} onChange={(e)=>{setEditText(e.target.value)}}/>
      <button className = "btn" onClick={()=>applayEditTask(editText)}>
        <img src={apply} alt="apply"/>
      </button>
      <button className = "btn" alt="cancel" onClick={cancelEditTask}>
        <img src={cancel} alt="cancel"/>
      </button>
    </div>
    
  )
}

export default EditedTask