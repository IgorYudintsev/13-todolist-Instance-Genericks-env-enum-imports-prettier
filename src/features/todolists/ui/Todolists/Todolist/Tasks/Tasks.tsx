import List from "@mui/material/List"
import { useAppSelector } from "common/hooks/useAppSelector"
import { Task } from "./Task"
import { TodolistType } from "features/todolists/model/todolists-reducer"
import { selectTasks } from "features/todolists/model/tasksSelectors"

//TODO: Task переименовываем в index,  чтобы импорты были чище, когда выдает табличку
// Do you also want to rename the constant? The usages of the constant in import statements will be updated accordingly.
// нажимаем НЕТ

type Props = {
  todolist: TodolistType
}

export const Tasks = ({ todolist }: Props) => {
  const tasks = useAppSelector(selectTasks)

  const allTodolistTasks = tasks[todolist.id]

  let tasksForTodolist = allTodolistTasks

  if (todolist.filter === "active") {
    tasksForTodolist = allTodolistTasks.filter((task) => !task.isDone)
  }

  if (todolist.filter === "completed") {
    tasksForTodolist = allTodolistTasks.filter((task) => task.isDone)
  }

  return (
    <>
      {tasksForTodolist.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <List>
          {tasksForTodolist.map((task) => {
            return <Task task={task} todolist={todolist} />
          })}
        </List>
      )}
    </>
  )
}
