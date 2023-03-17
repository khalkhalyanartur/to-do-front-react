import axios from "axios"; 

const getAllTasksService  = async () => {
  const res = await axios.get("http://localhost:8000/tasks");
  return res.data
} 

const addTasksService  = async (taskText) => {
  const res = await axios.post("http://localhost:8000/tasks", {
    text: taskText
  });
  return res.data
} 

const delAllTasksService  = async () => {
  const res = await axios.delete("http://localhost:8000/tasks");
  return res.data
} 

const changeCheckByIdService = async (id, valueCheck) => {
const res = await axios.patch(`http://localhost:8000/tasks/checkbox/${id}`, {isCheck: valueCheck});

return res.data;
}

const deleteTaskService  = async (id) => {
  const res = await axios.delete(`http://localhost:8000/tasks/${id}`);
  return res.data
}

const editTextByIdService = async (id, text) => {
  const res = await axios.patch(`http://localhost:8000/tasks/text/${id}`, {text});
  
  return res.data;
  }

export {
  getAllTasksService,
  addTasksService,
  delAllTasksService,
  changeCheckByIdService,
  deleteTaskService,
  editTextByIdService
}
