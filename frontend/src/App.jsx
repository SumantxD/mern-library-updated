import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'

function App() {

  const {user} = useAuthContext()

  return (
    <div className="App">
     <BrowserRouter>
     <Navbar/>
      <div className="pages">
        {/* we will register all the routes below */}
        <Routes>
          <Route
            path='/'
            element={user ? <Home/> : <Login/>}
          />
          <Route
            path='/login'
            element={!user ? <Login/>:<Home/>}
          />
          <Route
            path='/signup'
            element={!user ? <Signup/>:<Home/>}
          />
        </Routes>
      </div>
     </BrowserRouter>
    </div>
  )
}

export default App
