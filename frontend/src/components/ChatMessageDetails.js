import { useAuthContext } from "../hooks/useAuthContext"
import { useNavigate } from "react-router-dom";
import { useMessagesContext } from '../hooks/useMessagesContext'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import openEditMessageMode from '../pages/Ticket'
import { useEffect, useState } from "react"

const ChatMessageDetails = ({ chatMessage }) => {
    const [error, setError] = useState(null)
    const navigate = useNavigate();
    const { user } = useAuthContext()
    const { dispatch2 } = useMessagesContext()
    const [editMessageMode, setEditMessageMode] = useState(false)
    const [content, setContent] = useState('')
    const [emptyFields, setEmptyFields] = useState([])
    const [messageID, setMessageID ] = useState('')

    
    const handleClick = async () => {
        if (!user) {
            return
        }
        const response = await fetch('/api/messages/' + chatMessage._id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }

        })
        const json = await response.json()
        dispatch2({ type: 'DELETE_CHAT_MESSAGES', payload: json })
    }


    const setEditModeToTrue = () => {
        setMessageID(chatMessage._id)
        setEditMessageMode(true)
        setContent(chatMessage.content)
    }


    const handleSubmit = async (e) => {
        setEditMessageMode(false)
        e.preventDefault()

        const chatMessage = { content }

        const response = await fetch('/api/messages/' + messageID, {
            method: 'PATCH',
            body: JSON.stringify(chatMessage),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        setEmptyFields([])
        setContent('')
        dispatch2({ type: 'DELETE_CHAT_MESSAGES', payload: json })
        dispatch2({ type: 'CREATE_CHAT_MESSAGES', payload: json })

        let url = window.location.pathname
        url = url.split("/")[2]
        const response1 = await fetch('/api/tickets/' + url + '/cm', {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
            })
        const json1 = await response1.json()
        dispatch2({type: 'SET_CHAT_MESSAGES', payload: json1})
    }


    if (!editMessageMode) {
        return (
            <div className="ticket-details">
                <p><b>Posted by:</b> {chatMessage.creator}</p>
                <br></br>
                <p>{chatMessage.content}</p>
                <br></br>
                <p className="small"><i>Created: {formatDistanceToNow(new Date(chatMessage.createdAt), { addSuffix: true })} </i></p>
                <span className="material-symbols-outlined" onClick={setEditModeToTrue}>edit</span>
                <div className="button2">

                    <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
                </div>
                <br></br>
            </div>
        )
    }

    else {
        return (
            <div className="ticket-details-main">
                <div className="ticket-details">
                    <form onSubmit={handleSubmit}>
                        <label>Content:</label>
                        <textarea
                            type="text"
                            onChange={(e) => setContent(e.target.value)}
                            value={content}
                            required
                        />
                        <button className="edit-save-button">Save</button>
                    </form>
                </div>
            </div>
        )
    }

}
export default ChatMessageDetails