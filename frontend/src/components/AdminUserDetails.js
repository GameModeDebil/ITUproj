const AdminUserDetails = ({ user }) => {
    return (
        <tbody>
            <tr>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.company}</td>
                <td>{user.role}</td>
                <td>{user.verified}</td>
            </tr>
            </tbody>
    )
}

export default AdminUserDetails