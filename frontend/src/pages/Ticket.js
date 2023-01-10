import { useEffect, useState } from "react"
import { useAuthContext } from "../hooks/useAuthContext"
import { useTicketsContext } from "../hooks/useTicketsContext"

import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const Ticket = () => {
    const {user} = useAuthContext()
    const { dispatch } = useTicketsContext()

    const [emptyFields, setEmptyFields] = useState([])
    const [error, setError] = useState(null)

    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const [company, setCompany] = useState('')
    const [location, setLocation] = useState('')
    const [priority, setPriority] = useState(1)
    const [state, setState] = useState(0)
    const [createdAt, setCreatedAt] = useState('')
    const [updatedAt, setUpdatedAt] = useState('')
    const [internal, setInternal] = useState(false)
    const [assignedEmp, setAssignedEmp] = useState('')
    const [ticketID, setTicketID] = useState('')

    const [creator_name, setCreatorName] = useState('')
    const [creator_email, setCreatorEmail] = useState('')
    const [creator_profile_picture, setCreatorProfilePicture] = useState('')


    const [editMode, setEditMode] = useState(false)

    useEffect(() => {
        const fetchTicket = async () => {
            let url = window.location.pathname
            url = url.split("/")[2]
            const response = await fetch('/api/tickets/' + url, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()
            setTitle(json.title)
            setText(json.text)
            setCompany(json.company)
            setLocation(json.location)
            setPriority(json.priority)
            setState(json.state)
            setCreatedAt(json.createdAt)
            setUpdatedAt(json.updatedAt)
            setInternal(json.internal)
            setAssignedEmp(json.assigned_employee_id)
            setTicketID(json._id)

            //~~~ Fetch Minimized Creator Profile
            const response_creator = await fetch('/api/profile/min/' + json.creator, {
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
            fetchTicket()
        }
    }, [user])

    const options = [
        {
          label: "Low",
          value: "1",
        },
        {
          label: "Medium",
          value: "2",
        },
        {
          label: "High",
          value: "3",
        },
    ]

    const openEditMode = () => {
        setEditMode(true)
    }

    const closeEditMode = async () => {
        setEditMode(false)

        if (!user) {
            setError('You must be logged in')
            return
        }

        const ticket = {title, text, location, priority, state}
        console.log(ticket)

        if (title !== "" && text !== "" && location !== "" && state !== ""){
            console.log("hello")
            const response2 = await fetch('/api/tickets/' + ticketID, {
                method: 'PATCH',
                body: JSON.stringify(ticket),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response2.json()
    
            if(!response2.ok){
                setError(json.error)
                setEmptyFields(json.emptyFields)
            }
    
            if(response2.ok){
                setEmptyFields([])
                setError(null)
                //console.log('new ticket added', json)     //debug added ticket
                dispatch({type: 'DELETE_TICKET', payload: json})
                dispatch({type: 'CREATE_TICKET', payload: json})
            }
        }
    }

    const handleChange = (selected) => {
        setPriority(selected)
    }

    //cant add time?
    if (!editMode) {
        return (
            <div className="ticket-details2-main">
                <div className="ticket-details2">
                    <h2>{title}</h2>
                    <p><b>Created by:</b> {creator_name}<i>({creator_email})</i></p>
                    <p><b>Created:</b> <i>{
                        createdAt ? formatDistanceToNow(new Date(createdAt), { addSuffix: true }) : ""
                    }</i></p>
                    <p><b>Last Update:</b> <i>{
                        updatedAt ? formatDistanceToNow(new Date(updatedAt), { addSuffix: true }) : ""
                    }</i></p>
                    <br></br>
                    <p className="ticket-text">{text}</p>
                    <span className="material-symbols-outlined" onClick={openEditMode}>edit</span>
                </div>
            </div>
        )
    } else {
        return (
            <div className="ticket-details-main">
                <div className="ticket-details">
                    <form onSubmit={closeEditMode}>
                    <label>Title:</label>
                    <input
                        type="text"
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                        //className={emptyFields.includes('location') ? 'error' : ''}
                        required
                    />

                    <label>Text:</label>
                    <textarea
                        type="text"
                        onChange={(e) => setText(e.target.value)}
                        value={text}
                        //className={emptyFields.includes('location') ? 'error' : ''}
                        required
                        className="textfield-height"
                    ></textarea>

                    <label>Location:</label>
                    <input
                        type="text"
                        onChange={(e) => setLocation(e.target.value)}
                        value={location}
                        //className={emptyFields.includes('location') ? 'error' : ''}
                        required
                    />

                    <label>Priority:</label>
                    <select value={priority} onChange={(e) => handleChange(e.target.value)}>
                        {options.map((option) => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                    <button className="edit-save-button">Save</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default Ticket