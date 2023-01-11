import { useTicketsContext } from "../hooks/useTicketsContext"
import { useAuthContext } from "../hooks/useAuthContext"
import { useNavigate } from "react-router-dom";

const ChatMessageDetails = ({chatMessage}) => {
        const navigate = useNavigate();
        const { user } = useAuthContext()
        const {dispatch} = useTicketsContext()

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
        dispatch({type: 'DELETE_CHAT_MESSAGES', payload: json})
        }     

    return(
        <div className="ticket-details">
            <p><strong>Author: </strong>{chatMessage.creator}</p>
            <p>{chatMessage.content}</p>
            <p>{chatMessage.createdAt}</p>
            <span onClick={handleClick}>delete</span>
        </div>
    )
}
export default ChatMessageDetails