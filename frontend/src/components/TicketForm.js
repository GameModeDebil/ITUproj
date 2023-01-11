import { useState } from "react"
import { useTicketsContext } from "../hooks/useTicketsContext"
import { useAuthContext } from "../hooks/useAuthContext"

const TicketForm = () => {
    const { dispatch } = useTicketsContext()
    const { user } = useAuthContext()
    const [emptyFields, setEmptyFields] = useState([])

    const [error, setError] = useState(null)
    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const [location, setLocation] = useState('')
    const [priority, setPriority] = useState('1')

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
    
    const handleSubmit = async (e) => {
        e.preventDefault()  //prevent page refresh on submit

        if (!user) {
            setError('You must be logged in')
            return
        }

        const ticket = {title, text, location, priority}

        const response = await fetch('/api/tickets', {
            method: 'POST',
            body: JSON.stringify(ticket),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if(!response.ok){
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if(response.ok){
            //Reset form
            setError(null)
            setEmptyFields([])

            setTitle('')
            setText('')
            setLocation('')
            setPriority('1')
            //console.log('new ticket added', json)     //debug added ticket
            dispatch({type: 'CREATE_TICKET', payload: json})
        }
    }

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Create a ticket</h3>

            <label>Title:</label>
            <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className={emptyFields.includes('title') ? 'error' : ''}
            />

            <label>Text:</label>
            <textarea
                type="text"
                onChange={(e) => setText(e.target.value)}
                value={text}
                className={emptyFields.includes('text') ? 'error' : 'textfield-height'}
            ></textarea>
            
            <label>Location:</label>
            <input
                type="text"
                onChange={(e) => setLocation(e.target.value)}
                value={location}
                className={emptyFields.includes('location') ? 'error' : ''}
            />

            <label>Priority:</label>
            <select value={priority} onChange={(e) => handleChange(e.target.value)}>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                ))}
            </select>

            <button>Add Ticket</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default TicketForm