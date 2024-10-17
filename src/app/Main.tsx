import Container from "@mui/material/Container"
import React from "react"
import { useAppDispatch } from "common/hooks/useAppDispatch"
import { addTodolistAC } from "features/todolists/model/todolists-reducer"
import { Todolists } from "features/todolists/ui/Todolists/Todolists"
import { Grid } from "@mui/material"
import { AddItemForm } from "common/components"

export const Main = () => {
  const dispatch = useAppDispatch()

  const addTodolist = (title: string) => {
    dispatch(addTodolistAC(title))
  }

  return (
    <Container fixed>
      <Grid container sx={{ mb: "30px" }}>
        <AddItemForm addItem={addTodolist} />
      </Grid>

      <Grid container spacing={4}>
        <Todolists />
      </Grid>
    </Container>
  )
}
