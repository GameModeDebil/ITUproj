import { useAuthContext } from "../hooks/useAuthContext"
import { useNavigate } from "react-router-dom";
import { useMessagesContext } from '../hooks/useMessagesContext'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const ChatMessageDetails = ({chatMessage}) => {
        const navigate = useNavigate();
        const { user } = useAuthContext()
        const {dispatch2} = useMessagesContext()

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
        dispatch2({type: 'DELETE_CHAT_MESSAGES', payload: json})
        }     

    return(
            <div className="ticket-details">
                        <div>
                            <p><b>Posted by:</b> {chatMessage.creator}</p>
                            <br></br>
                            <p>{chatMessage.content}</p>
                            <br></br>
                            <p className="small"><i>Created: {formatDistanceToNow(new Date(chatMessage.createdAt), { addSuffix: true })} </i></p>
                        </div>
                    { user.email === chatMessage.creator || user.role==="admin" ? <span className="material-symbols-outlined" onClick={handleClick}>delete</span>:""}
            </div>
    )
}
export default ChatMessageDetails