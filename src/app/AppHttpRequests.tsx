import React, { ChangeEvent, useEffect, useState } from "react"

// import {AddItemForm} from '../common/components/AddItemForm/AddItemForm'
// import {EditableSpan} from '../common/components/EditableSpan/EditableSpan'
import Checkbox from "@mui/material/Checkbox"
import { Todolist } from "../features/todolists/api/todolistsApi.types"
import { DomainTask, UpdateTaskModel } from "../features/todolists/api/tasksApi.types"
import { todolistsApi } from "../features/todolists/api/todolistsApi"
import { tasksApi } from "../features/todolists/api/tasksApi"
import { TaskStatus } from "../features/todolists/lib/enums"
import { AddItemForm, EditableSpan } from "common/components"

export const AppHttpRequests = () => {
  const [todolists, setTodolists] = useState<Todolist[]>([])
  const [tasks, setTasks] = useState<{
    [key: string]: DomainTask[]
  }>({})

  useEffect(() => {
    todolistsApi.getTodolists().then((res) => {
      const todolists = res.data
      setTodolists(todolists)
      todolists.forEach((tl) => {
        tasksApi.getTasks(tl.id).then((res) => {
          setTasks((prevState) => {
            return { ...prevState, [tl.id]: res.data.items }
          })
        })
      })
    })
  }, [])

  const createTodolistHandler = (title: string) => {
    todolistsApi.createTodolist(title).then((res) => {
      const newTodolist = res.data.data.item
      setTodolists([newTodolist, ...todolists])
    })
  }

  const removeTodolistHandler = (id: string) => {
    todolistsApi.removeTodolist(id).then((res) => {
      const newTodolists = todolists.filter((item) => item.id !== id)
      setTodolists(newTodolists)
    })
  }

  const updateTodolistHandler = (id: string, title: string) => {
    todolistsApi.updateTodolist({ id, title }).then((res) => {
      const newTodolists = todolists.map((item) => (item.id === id ? { ...item, title } : item))
      setTodolists(newTodolists)
    })
  }

  const createTaskHandler = (title: string, todolistId: string) => {
    tasksApi.createTask({ title, todolistId }).then((res) => {
      const newTask = res.data.data.item
      setTasks({ ...tasks, [todolistId]: [newTask, ...tasks[todolistId]] })
    })
  }

  const removeTaskHandler = (taskId: string, todolistId: string) => {
    tasksApi.removeTask({ taskId, todolistId }).then((res) => {
      setTasks({
        ...tasks,
        [todolistId]: tasks[todolistId].filter((t) => t.id !== taskId),
      })
    })
  }

  const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>, task: DomainTask) => {
    //let status = e.currentTarget.checked ? 2 : 0;
    let status = e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New

    const model: UpdateTaskModel = {
      status,
      title: task.title,
      deadline: task.deadline,
      description: task.description,
      priority: task.priority,
      startDate: task.startDate,
    }
    tasksApi.changeTaskStatus({ model, todoListId: task.todoListId, taskId: task.id }).then((res) => {
      const newTasks = tasks[task.todoListId].map((t) => (t.id === task.id ? { ...t, ...model } : t))
      setTasks({ ...tasks, [task.todoListId]: newTasks })
    })
  }

  const changeTaskTitleHandler = (title: string, task: DomainTask) => {
    const model: UpdateTaskModel = {
      status: task.status,
      title,
      deadline: task.deadline,
      description: task.description,
      priority: task.priority,
      startDate: task.startDate,
    }
    tasksApi.changeTaskTitle({ model, todoListId: task.todoListId, taskId: task.id }).then((res) => {
      const newTasks = tasks[task.todoListId].map((t) => (t.id === task.id ? { ...t, ...model } : t))
      setTasks({ ...tasks, [task.todoListId]: newTasks })
    })
  }

  return (
    <div style={{ margin: "20px" }}>
      <AddItemForm addItem={createTodolistHandler} />

      {/* Todolists */}
      {todolists.map((tl) => {
        return (
          <div key={tl.id} style={todolist}>
            <div>
              <EditableSpan value={tl.title} onChange={(title: string) => updateTodolistHandler(tl.id, title)} />
              <button onClick={() => removeTodolistHandler(tl.id)}>x</button>
            </div>
            <AddItemForm addItem={(title) => createTaskHandler(title, tl.id)} />

            {/* Tasks */}
            {!!tasks[tl.id] &&
              tasks[tl.id].map((task: DomainTask) => {
                return (
                  <div key={task.id}>
                    <Checkbox checked={task.status === 2} onChange={(e) => changeTaskStatusHandler(e, task)} />
                    <EditableSpan value={task.title} onChange={(title) => changeTaskTitleHandler(title, task)} />
                    <button onClick={() => removeTaskHandler(task.id, tl.id)}>x</button>
                  </div>
                )
              })}
          </div>
        )
      })}
    </div>
  )
}

// Styles
const todolist: React.CSSProperties = {
  border: "1px solid black",
  margin: "20px 0",
  padding: "10px",
  width: "300px",
  display: "flex",
  justifyContent: "space-between",
  flexDirection: "column",
}

//TODO: yarn add --dev --exact prettier
// Settings-Tools-Actions on Save-Run Prettier-Configuration-Automatic либо Manual
// т.е. в каждом склонненом проектк нужно ставить галки Претира
// .prettierrc  -создаем в корне файл:
// yarn prettier . --write      -чтобы пробежался по всему проекту и настроил
