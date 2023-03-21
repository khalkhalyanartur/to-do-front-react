import axios from "axios"; 
import url from "src/constants"

const getAllTasksService  = async () => {
  const res = await axios.get(url);

  return res.data
} 

const addTasksService  = async (taskText) => {
  const res = await axios.post(url, {
    text: taskText
  });

  return res.data
} 

const delAllTasksService  = async () => {
  const res = await axios.delete(url);

  return res.data
} 

const changeCheckByIdService = async (id, idCheck) => {
const res = await axios.patch(`${url}/checkbox/${id}`, {isCheck: idCheck});

return res.data;
}

const deleteTaskService  = async (id) => {
  const res = await axios.delete(`${url}/${id}`);

  return res.data
}

const editTextByIdService = async (id, text) => {
  const res = await axios.patch(`${url}/text/${id}`, {text});
  
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
