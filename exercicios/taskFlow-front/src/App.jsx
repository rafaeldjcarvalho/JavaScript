import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Kanban from './pages/Kanban.jsx'
import { Routes, Route, BrowserRouter } from 'react-router-dom'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>}></Route>
          <Route path='/dashboard' element={<Dashboard/>}></Route>
          <Route path='/projeto/:id' element={<Kanban/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App