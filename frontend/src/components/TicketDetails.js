import { useTicketsContext } from "../hooks/useTicketsContext"
import { useAuthContext } from "../hooks/useAuthContext"
import { Link } from 'react-router-dom'

//date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const TicketDetails = ({ ticket }) => {
    const { dispatch } = useTicketsContext()
    const { user } = useAuthContext()

    const handleClick = async () => {
        if (!user) {
            return
        }
        const response = await fetch('/api/tickets/' + ticket._id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
            
        })
        const json = await response.json()

        if (response.ok){
            dispatch({type: 'DELETE_TICKET', payload: json})
        }
    }

    return (
        <div className="ticket-details-main">
            <div className="ticket-details">
                <Link to={"/ticket/" + ticket._id}>
                    <div>
                        <h3>{ticket.title}</h3>
                        <p><b>Created by:</b> <i>{ticket.creator}</i></p>
                        <p><b>Created:</b> <i>{formatDistanceToNow(new Date(ticket.createdAt), { addSuffix: true })}</i></p>
                        <p><b>Last Update:</b> <i>{formatDistanceToNow(new Date(ticket.updatedAt), { addSuffix: true })}</i></p>
                        <p>{ticket.text}</p>
                    </div>
                </Link>
                <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
            </div>
        </div>
    )
}

export default TicketDetails