import { useState, useEffect } from "react"
import { useTicketsContext } from "../hooks/useTicketsContext"
import { useAuthContext } from "../hooks/useAuthContext"

const ModalForm = ({ticket}) => {
    const { dispatch } = useTicketsContext()
    const { user } = useAuthContext()

    const [error, setError] = useState(null)
    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const [location, setLocation] = useState('')
    const [priority, setPriority] = useState('1')
    const [state, setState] = useState(false)
    const [ticketID, setTicketID] = useState('')
    
    

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

    const handleChange = (selected) => {
        setPriority(selected)
    }
    

    useEffect(() => {
        setText(ticket.text)
        setLocation(ticket.location)
        setTitle(ticket.title)
        setPriority(ticket.priority)
        setTicketID(ticket._id)
        setState(ticket.state)
    }, [])

    const closeEditMode = async (e) => {
        e.preventDefault()

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
            }
    
            if(response2.ok){
                setError(null)
                //console.log('new ticket added', json)     //debug added ticket
                dispatch({type: 'DELETE_TICKET', payload: json})
                dispatch({type: 'CREATE_TICKET', payload: json})
            }
        }
    }

    return (
        <form className="create" onSubmit={closeEditMode}>
            <h3>Edit ticket</h3>

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
                className="textfield-height"
                value={text}
                required
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

            <label>State:</label>
            <input
                type="text"
                onChange={(e) => setState(e.target.value)}
                value={state}
                required
            />

            <button>Save</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default ModalForm