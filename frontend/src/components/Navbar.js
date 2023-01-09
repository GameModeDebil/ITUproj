import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

const Navbar = () => {
    const { logout } = useLogout()
    const { user } = useAuthContext()

    const handleClick = () => {
        logout()
    }

    return (
        <header>
            <div className="container">
                <Link to="/">
                    <h1>Lerner Solutions</h1>
                </Link>
                <nav>
                    {user && (
                        <div>
                            <Link to="/">
                                <button>Tickets</button>
                            </Link>
                            <span>{user.email}</span>                    
                    
                            {user.role == "admin" ? (
                                        <div className="dropdown">
                                            <button className="dropbtn">Admin</button>
                                            <div className="dropdown-content">
                                                <Link to="/admin/tickets">Tickets</Link>
                                                <Link to="/admin/users">Users</Link>
                                            </div>
                                        </div>
                            ):""}
                            
                            <button onClick={handleClick}>Logout</button>
                        </div>
                    )}
                    {!user && (
                    <div>
                        <Link to="/login">
                            <button>Login</button>
                        </Link>
                        <Link to="/signup">
                            <button>Signup</button>
                        </Link>     
                    </div>
                    )}
                </nav>
            </div>
        </header>
    )
}

export default Navbar