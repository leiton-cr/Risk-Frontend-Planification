
import './App.css'
import AuthProvider from './contexts/AuthProvider'
import MainRouter from './routers/MainRouter'

function App() {


  return (

    <AuthProvider>
      <MainRouter />
    </AuthProvider>

  )
}

export default App
