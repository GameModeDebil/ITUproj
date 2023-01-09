import { useEffect, useState } from "react"

import AdminUserDetails from "../components/AdminUserDetails"

const AdminUsers = () => {
    const [users, setUsers] = useState(null)

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await fetch('/api/admin/users')
            const json = await response.json()

            if (response.ok) {
                setUsers(json)
            }
        }

        fetchUsers()
    }, [])

    return (
        <div className="main-div">
            <h2>User Database</h2>
            <div className="adminUsers">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Company</th>
                            <th>Role</th>
                            <th>Verified</th>
                        </tr>
                    </thead>
                    {users && users.map((user) => (
                        <AdminUserDetails key={user._id} user={user} />
                    ))}
                </table>
            </div>
        </div>
    )
}

export default AdminUsers