import { useEffect, useState } from "react";
import AddNewTask from "src/components/AddNewTask/AddNewTask";
import Task from "src/components/Task/Task";
import Error from "src/components/Error/Error";
import {
  changeCheckByIdService,
  getAllTasksService,
  addTasksService,
  delAllTasksService,
  deleteTaskService,
  editTextByIdService
} from "src/services/task-services";
import sortArray from "src/helpers/sort-array";
import './style.scss';

const ToDoList = () => {
  const [tasks, setTasks] = useState([]);
  const [message, setError] = useState("");

  useEffect(() => {
    getAllTasks();
  }, [])

  const getAllTasks = async () => {
    try {
      const tasks = await getAllTasksService();
      const sortTasks = sortArray(tasks);

      setTasks(sortTasks);
    } catch (error) {
      setError("Ошибка при получении задач");
    }
  }

  const createTask = async (taskText) => {
    try {
      const newTask = await addTasksService(taskText);
      const sortTasks = sortArray([...tasks, newTask]);

      setTasks(sortTasks);
    } catch (error) {
      setError("Ошибка при создании задачи")
    }
  }

  const deleteTasks = async () => {
    try {
      const resDeleteTasks = await delAllTasksService();

      if (resDeleteTasks.deletedCount === tasks.length) {
        setTasks([]);
      }
    } catch (error) {
      setError("Ошибка при удалении всех задач");
    }
  }

  const changeCheckById = async (id, valueCheck) => {
    try {
      const updatedTask = await changeCheckByIdService(id, valueCheck);
      const editedTask = tasks.find(item => item._id === updatedTask._id);

      if (!editedTask) {
        return
      }

      editedTask.isCheck = updatedTask.isCheck;
      const sortTasks = sortArray(tasks);
      setTasks(sortTasks);

      return updatedTask;
    } catch (error) {
      setError("Ошибка при изменении статуса задачи");
    }
  }

  const deleteTask = async (id) => {
    try {
      const res = await deleteTaskService(id);

      if (res.deletedCount !== 1 || !res.acknowledged) {
        console.log("Ошибка удаления задачи на сервере");
        return
      }

      const index = tasks.findIndex(task => id === task._id);

      if (index < 0) {
        return
      }

      tasks.splice(index, 1);
      const sortTasks = sortArray(tasks);
      setTasks(sortTasks);
    } catch (error) {
      setError("Ошибка при удалении задачи");
    }
  }

  const editTaskText = async (id, text) => {
    try {
      const updatedTask = await editTextByIdService(id, text);
      const editedTask = tasks.find(item => item._id === updatedTask._id);

      if (!editedTask) {
        return
      }

      editedTask.text = updatedTask.text;
      const sortTasks = sortArray(tasks);
      setError("");
      setTasks(sortTasks);

      return updatedTask
    } catch (error) {
      setError("Ошибка при редактировании задачи");
    }
  }

  return (
    <div className="to-do-list">
      <div className="to-do-list__content">
        <AddNewTask
          createTask={createTask}
          deleteTasks={deleteTasks}
        />
        <Error className="error" message={message} />
        {tasks.map(taskItem => (
          <Task
            key={taskItem._id}
            taskItem={taskItem}
            changeCheckById={changeCheckById}
            deleteTask={deleteTask}
            editTaskText={editTaskText}
          />
        ))}
      </div>
    </div>
  )
}

export default ToDoList;