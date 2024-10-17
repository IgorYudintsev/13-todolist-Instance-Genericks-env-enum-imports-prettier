import { DomainTask, GetTasksResponse, UpdateTaskModel } from "./tasksApi.types"
import { instance } from "common/instance/instance"
import { BaseResponse } from "common/types"

export const tasksApi = {
  getTasks(todolistId: string) {
    return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`)
  },
  createTask(payload: { title: string; todolistId: string }) {
    const { title, todolistId } = payload
    return instance.post<BaseResponse<{ item: DomainTask }>>(`todo-lists/${todolistId}/tasks`, { title })
  },
  removeTask(payload: { taskId: string; todolistId: string }) {
    const { taskId, todolistId } = payload
    return instance.delete<BaseResponse>(`todo-lists/${todolistId}/tasks/${taskId}`)
  },
  changeTaskStatus(payload: { model: UpdateTaskModel; todoListId: string; taskId: string }) {
    const { model, taskId, todoListId } = payload
    return instance.put<BaseResponse<{ item: DomainTask }>>(`todo-lists/${todoListId}/tasks/${taskId}`, model)
  },
  changeTaskTitle(payload: { model: UpdateTaskModel; todoListId: string; taskId: string }) {
    const { model, taskId, todoListId } = payload
    return instance.put<BaseResponse<{ item: DomainTask }>>(`todo-lists/${todoListId}/tasks/${taskId}`, model)
  },
}
