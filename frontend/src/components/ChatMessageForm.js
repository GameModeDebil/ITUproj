import { useState } from "react"
import { useAuthContext } from "../hooks/useAuthContext"

const ChatMessageForm = () => {

    const [content, setContent] = useState('')
    const [belongTo, setBelongTo] = useState('')

    const hadnleSubmit = async (e) => {
        e.preventDefault()

        const chatMessage = {content}

        const response = await fetch ('/api/tickets/')
    }

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a comment</h3>

            <label>Message:</label>
            <textarea
                type="text"
                onChange={(e) => setText(e.target.value)}
                value={text}
                className={emptyFields.includes('text') ? 'error' : 'textfield-height'}
            ></textarea>
            
            <button>Post the message</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default ChatMessageForm 