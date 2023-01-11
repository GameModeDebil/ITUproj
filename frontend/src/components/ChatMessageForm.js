import { useState } from "react"
import { useAuthContext } from "../hooks/useAuthContext"
import { useMessagesContext } from '../hooks/useMessagesContext'

const ChatMessageForm = () => {
    const { dispatch2 } = useMessagesContext()
    const [content, setContent] = useState('')
    const [belongTo, setBelongTo] = useState('')
    const [emptyFields, setEmptyFields] = useState([])
    const [error, setError] = useState(null)
    const { user } = useAuthContext()

    const handleSubmit = async (e) => {
        e.preventDefault()

        const chatMessage = {content}
        let url = window.location.pathname
        url = url.split("/")[2]

        const response = await fetch('/api/tickets/' + url, {
            method: 'POST',
            body: JSON.stringify(chatMessage),
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
        else{
        setEmptyFields([])
        setContent('')
        console.log('new cm added', json)     //debug added ticket
        dispatch2({type: 'CREATE_CHAT_MESSAGES', payload: json})
        }
        
    }



    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a comment</h3>

            <label>Message:</label>
            <textarea
                type="text"
                onChange={(e) => setContent(e.target.value)}
                value={content}
                className={emptyFields.includes('content') ? 'error' : 'textfield-height'}
            ></textarea>
            
            <button>Post the message</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default ChatMessageForm 