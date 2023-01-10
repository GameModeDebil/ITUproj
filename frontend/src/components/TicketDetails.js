import { useTicketsContext } from "../hooks/useTicketsContext"
import { useAuthContext } from "../hooks/useAuthContext"
import { Link } from 'react-router-dom'
import { useEffect, useState } from "react"

//date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const TicketDetails = ({ ticket }) => {
    const { dispatch } = useTicketsContext()
    const { user } = useAuthContext()

    const [creator_name, setCreatorName] = useState('')
    const [creator_email, setCreatorEmail] = useState('')
    const [creator_profile_picture, setCreatorProfilePicture] = useState('')

    useEffect(() => {
        const fetchCreator = async () => {
            
            //~~~ Fetch Minimized Creator Profile
            const response_creator = await fetch('/api/profile/min/' + ticket.creator, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json_creator = await response_creator.json()
            setCreatorName(json_creator.name)
            setCreatorEmail(json_creator.email)
            setCreatorProfilePicture(json_creator.profile_picture)
        }

        if (user) {
            fetchCreator()
        }
    }, [user])

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
                        <p className="small"><i>Created: {formatDistanceToNow(new Date(ticket.createdAt), { addSuffix: true })} {ticket.createdAt !== ticket.updatedAt ? "- Updated: " +formatDistanceToNow(new Date(ticket.updatedAt), { addSuffix: true }) :""}</i></p>
                        <p><b>Created by:</b> {creator_name}<i>({creator_email})</i></p>
                        <p><b>Location:</b> {ticket.location}<i>({creator_email})</i></p>
                        <p>{ticket.text}</p>
                    </div>
                </Link>
                <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
            </div>
        </div>
    )
}

export default TicketDetails