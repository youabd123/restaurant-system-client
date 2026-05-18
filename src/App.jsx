import { ThemeProvider } from '@mui/material/styles'
import { theme } from './theme'
import MainLayout from './layout/MainLayout'
import HomePage from './pages/HomePage'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <MainLayout>
        <HomePage />
      </MainLayout>
    </ThemeProvider>
  )
}

export default App

