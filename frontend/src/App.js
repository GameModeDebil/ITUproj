import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'
import Navbar from './components/Navbar'

//pages and components
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'

import AdminTickets from './pages/AdminTickets'
import AdminUsers from './pages/AdminUsers'

import Ticket from './pages/Ticket'
import Profile from './pages/Profile'

function App() {
  const { user } = useAuthContext()

  return (
    <div className="App">
      <BrowserRouter>
      <Navbar />
        <div className='pages'>
          <Routes>
            <Route
              path="/"
              element={user ? <Home /> : <Navigate to="/login"/>}
            />
            <Route
              path="/ticket/:id"
              element={user ? <Ticket /> : <Navigate to="/login"/>}
            />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/signup"
              element={!user ? <Signup /> : <Navigate to="/" />}
            />
            <Route
              path="/admin/tickets"
              element={user ? <AdminTickets /> : <Navigate to="/login" />}
            />
            <Route
              path="/admin/users"
              element={user ? <AdminUsers /> : <Navigate to="/login" />}
            />
            <Route
              path="/profile/:id"
              element={user ? <Profile /> : <Navigate to="/login" />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App;
