import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Kanban from './pages/Kanban.jsx'
import Register from './pages/Register.jsx'
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navigate to="/login"/>}></Route>

          <Route path='/login' element={<Login/>}></Route>
          <Route path='/registrar' element={<Register/>}></Route>

          <Route path='/dashboard' element={<Dashboard/>}></Route>
          <Route path='/projeto/:id' element={<Kanban/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App