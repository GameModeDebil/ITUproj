import { useEffect, useState } from "react"
import { useAuthContext } from "../hooks/useAuthContext"
import { useTicketsContext } from "../hooks/useTicketsContext"
import { useMessagesContext } from "../hooks/useMessagesContext"

import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import ChatMessageForm from "../components/ChatMessageForm"

import { useNavigate } from "react-router-dom";

//components 
import ChatMessageDetails from '../components/ChatMessageDetails'

const Ticket = () => {
    const navigate = useNavigate();
    const {user} = useAuthContext()
    const { dispatch } = useTicketsContext()
    const { chatMessages, dispatch2 } = useMessagesContext()

    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const [company, setCompany] = useState('')
    const [location, setLocation] = useState('')
    const [priority, setPriority] = useState(1)
    const [state, setState] = useState(0)
    const [createdAt, setCreatedAt] = useState('')
    const [updatedAt, setUpdatedAt] = useState('')
    const [ticketID, setTicketID] = useState('')

    const [creator_name, setCreatorName] = useState('')
    const [creator_email, setCreatorEmail] = useState('')

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
        }

        const fetchMessages = async () => {
            let url = window.location.pathname
            url = url.split("/")[2]
            const response = await fetch('/api/tickets/' + url + '/cm', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })

            const json = await response.json()
            dispatch2({type: 'SET_CHAT_MESSAGES', payload: json})
        }

        if (user) {
            fetchTicket()
            fetchMessages()
        }
    }, [dispatch2, user])

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

            if(response2.ok){
                dispatch({type: 'DELETE_TICKET', payload: json})
                dispatch({type: 'CREATE_TICKET', payload: json})
            }
        }
    }

    const handleChange = (selected) => {
        setPriority(selected)
    }

    const handleClick = async () => {
        if (!user) {
            return
        }
        setState(false)
        const ticket = {title, text, location, priority, state: "false"}
        const response = await fetch('/api/tickets/' + ticketID, {
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
            dispatch({type: 'CREATE_TICKET', payload: json})
            navigate("/")
        }
    }

    //cant add time?
    if (!editMode) {
        return (
            <div className="ticket-details2-main">
                <div className="ticket-details2">
                    <h2>{title}</h2>
                    <p className="small">
                        <i>
                            Created: {createdAt ? formatDistanceToNow(new Date(createdAt), { addSuffix: true }):""} - Updated:
                            {updatedAt ? " " + formatDistanceToNow(new Date(updatedAt), { addSuffix: true }):""}
                        </i>
                    </p>
                    <p><b>Company:</b> {company}</p>
                    <p><b>Created by:</b> {creator_name}<i>({creator_email})</i></p>
                    <p><b>Location:</b> {location}</p>
                    <p><b>Priority:</b></p>
                        {priority===1?
                        <div className="priorityCircle greenText">
                            <span className="material-symbols-outlined">radio_button_checked</span>
                        </div>:""
                        }
                        {priority===2?
                        <div className="priorityCircle orangeText">
                            <span className="material-symbols-outlined">radio_button_checked</span>
                        </div>:""
                        }
                        {priority===3?
                        <div className="priorityCircle redText">
                            <span className="material-symbols-outlined">radio_button_checked</span>
                        </div>:""
                        }
                    <br></br>
                    <p className="ticket-text">{text}</p>
                    { user.email === creator_email || user.role==="admin" ?
                        <span className="material-symbols-outlined" onClick={openEditMode}>edit</span>
                    :""}
                    <div className="ticketEditButton">
                        { user.email === creator_email || user.role==="admin" ? 
                            <span className="material-symbols-outlined" onClick={handleClick}>check</span>
                        :""}
                    </div>
                </div>
                {
                    chatMessages === "" ? "" : <h2>Comments</h2> 
                }
                <div className="ticket-details-main">
                    {console.log(chatMessages)}
                    {chatMessages && chatMessages.map((chatMessage) => (
                        <ChatMessageDetails key={chatMessage._id} chatMessage={chatMessage} />
                    ))}
                </div>
                <ChatMessageForm />
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
                        required
                    />

                    <label>Text:</label>
                    <textarea
                        type="text"
                        onChange={(e) => setText(e.target.value)}
                        value={text}
                        required
                        className="textfield-height"
                    ></textarea>

                    <label>Location:</label>
                    <input
                        type="text"
                        onChange={(e) => setLocation(e.target.value)}
                        value={location}
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