import { useEffect, useState } from "react"

import AdminTicketDetails from "../components/AdminTicketDetails"

const AdminTickets = () => {
    const [tickets, setTickets] = useState(null)

    useEffect(() => {
        const fetchTickets = async () => {
            const response = await fetch('/api/admin/tickets')
            const json = await response.json()

            if (response.ok) {
                setTickets(json)
            }
        }

        fetchTickets()
    }, [])

    return (
        <div className="main-div">
            <h2>Ticket Database</h2>
            <div className="adminTickets">
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Company</th>
                            <th>Creator</th>
                            <th>Location</th>
                            <th>Priority</th>
                            <th>State</th>
                            <th>Completion date</th>
                            <th>Internal</th>
                            <th>Assigned to</th>
                        </tr>
                    </thead>
                    {tickets && tickets.map((ticket) => (
                        <AdminTicketDetails key={ticket._id} ticket={ticket} />
                    ))}
                </table>
            </div>
        </div>
    )
}

export default AdminTickets