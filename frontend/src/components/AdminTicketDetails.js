const AdminTicketDetails = ({ ticket }) => {
    return (
        <tbody>
            <tr>
                <td>{ticket.title}</td>
                <td>{ticket.company}</td>
                <td>{ticket.creator}</td>
                <td>{ticket.location}</td>
                <td>{ticket.priority}</td>
                <td>{ticket.state}</td>
                <td>{ticket.completion_date}</td>
                <td>{ticket.internal}</td>
                <td>{ticket.assigned_employee_id}</td>
            </tr>
        </tbody>
    )
}

export default AdminTicketDetails