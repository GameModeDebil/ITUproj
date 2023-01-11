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
    const [employee_name, setEmployeeName] = useState('')
    const [employee_email, setEmployeeEmail] = useState('')

    const fetchAssignedEmp = async () => {
        if(ticket.assigned_employee_id){
        //~~~ Fetch Minimized Creator Profile
        const response_employee = await fetch('/api/profile/min/' + ticket.assigned_employee_id, {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json_employee = await response_employee.json()
        setEmployeeName(json_employee.name)
        setEmployeeEmail(json_employee.email)
    }}

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
        }

        if (user) {
            fetchCreator()
            fetchAssignedEmp()
        }
    }, [user])

    const handleClick = async () => {
        if (!user) {
            return
        }
        ticket.state = "false"
        const response = await fetch('/api/tickets/' + ticket._id, {
            method: 'PATCH',
            body: JSON.stringify(ticket),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
            
        })
        const json = await response.json()
        
        if (response.ok){
            dispatch({type: 'DELETE_TICKET', payload: json})
            json.state = false
            dispatch({type: 'CREATE_TICKET', payload: json})
        }     
    }

    const handleAssign = async () => {
        if (!user) {
            return
        }
        ticket.assigned_employee_id = user.id
        console.log(ticket)
        const response = await fetch('/api/tickets/' + ticket._id, {
            method: 'PATCH',
            body: JSON.stringify(ticket),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
            
        })
        const json = await response.json()
        
        if (response.ok){
            fetchAssignedEmp()
            dispatch({type: 'DELETE_TICKET', payload: json})
            json.assigned_employee_id = user.id
            dispatch({type: 'CREATE_TICKET', payload: json})
        }     
    }

    return (
        <div>
            <div className="ticket-details-main">
                <div className={ticket.creator === user.id ? ticket.internal ? "internal_ticket own_ticket ticket-details" : "own_ticket ticket-details": ticket.internal ? "internal_ticket ticket-details" : "ticket-details"}>
                    <Link to={"/ticket/" + ticket._id}>
                        <div>
                            {ticket.priority===1?<h3 className="greenText">{ticket.title}</h3>:""}
                            {ticket.priority===2?<h3 className="orangeText">{ticket.title}</h3>:""}
                            {ticket.priority===3?<h3 className="redText">{ticket.title}</h3>:""}
                            <p className="small"><i>Created: {formatDistanceToNow(new Date(ticket.createdAt), { addSuffix: true })} {ticket.createdAt !== ticket.updatedAt ? "- Updated: " +formatDistanceToNow(new Date(ticket.updatedAt), { addSuffix: true }) :""}</i></p>
                            <p><b>Created by:</b> {creator_name}<i>({creator_email})</i></p>
                            <p><b>Location:</b> {ticket.location}</p>
                            {ticket.assigned_employee_id ? <p><b>Assigned to:</b> {employee_name}<i>({employee_email})</i></p>:""}
                            <br></br>
                            <p>{ticket.text}</p>
                        </div>
                    </Link>
                    { user.email === creator_email || user.role==="admin" ? <span className="material-symbols-outlined" onClick={handleClick}>check</span>:""}
                    { user.role==="employee" ? <div className="claimButtonOverview"><span className="material-symbols-outlined" onClick={handleAssign}>assignment_add</span></div>:""}
                </div>
            </div>
        </div>
    )
}

export default TicketDetails