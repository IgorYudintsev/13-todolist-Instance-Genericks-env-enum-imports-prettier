import CssBaseline from "@mui/material/CssBaseline"
import { ThemeProvider } from "@mui/material/styles"
import React from "react"
import { useAppSelector } from "common/hooks/useAppSelector"
import { getTheme } from "common/theme/theme"
import { selectThemeMode } from "./appSelectors"
import { Main } from "./Main"
import { Header } from "common/components"

export const App = () => {
  const themeMode = useAppSelector(selectThemeMode)

  return (
    <ThemeProvider theme={getTheme(themeMode)}>
      <CssBaseline />
      <Header />
      <Main />
    </ThemeProvider>
  )
}

//TODO: 1. создаем файл .env
// в .gitignore в # misc прописываем наш .env
// Переменные окружения при работе с CRA обязательно должны начинаться с REACT_APP_
// REACT_APP_BASE_URL=https://social-network.samuraijs.com/api/1.1/
// REACT_APP_AUTH_TOKEN=f0191812-a3f4-4861-9f62-a6181a5e3238
// REACT_APP_API_KEY=8f2534e2-22a4-4052-894e-a66c04807482
