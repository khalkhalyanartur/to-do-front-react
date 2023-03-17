import { useEffect, useState } from "react";
import Task from "src/components/Task/Task"
import { changeCheckByIdService, getAllTasksService, addTasksService, delAllTasksService, deleteTaskService, editTextByIdService }from "src/services/taskServices"
import AddNewTask from "src/components/AddNewTask/AddNewTask"
import sortArray from "src/helpers/sortArray";

const ToDoList = () => {
  const [tasks, setAllTasks] = useState([]);

  useEffect(() => {
    getAllTasks();
  }, [])

  const getAllTasks = async () => {
    const res =  await getAllTasksService();
    const sortArr = sortArray(res);

    setAllTasks(sortArr); 
  }

  const createTask = async (taskText) => {
    const res =  await addTasksService(taskText);
    const sortArr = sortArray([...tasks, res]);

    setAllTasks(sortArr);
  }

  const deleteTasks = async () => {
    const res =  await delAllTasksService();

    if (res.deletedCount === tasks.length) {
      setAllTasks([]);
    }
  }

  const changeCheckById = async (id, valueCheck) => {
    const res = await changeCheckByIdService(id, valueCheck);

    if (!res) {
      console.log("fail");
      return 
    }

    const editedTask = tasks.find(item => item._id === res._id);
    editedTask.isCheck = res.isCheck;
    const sortArr = sortArray(tasks);
    return setAllTasks(sortArr);
  }

  const deleteTask = async (id) => {
    const res = await deleteTaskService(id);

    if (res.deletedCount !== 1 || !res.acknowledged) {
      console.log("Ошибка удаления задачи на сервере");
      return
    } 

    const index = tasks.findIndex(task => id === task._id); 
    tasks.splice(index,1);
    const sortArr = sortArray(tasks);
    return setAllTasks(sortArr);
  }

  const editTaskText = async (id,text) => {
    const res = await editTextByIdService(id,text);

    if (!res) {
      console.log("fail");
      return 
    }

    const editedTask = tasks.find(item => item._id === res._id);
    editedTask.text = res.text;
    const sortArr = sortArray(tasks);

    return setAllTasks(sortArr);
  }

  return (
    <div>
      <AddNewTask 
        createTask={createTask}
        deleteTasks={deleteTasks} 
      />
      {tasks.map(taskItem => (
        <Task 
          key={taskItem._id}
          taskItem={taskItem}
          changeCheckById ={changeCheckById}
          deleteTask={deleteTask}
          editTaskText={editTaskText}
        />
      ))}
    </div>
  )
}

export default ToDoList;