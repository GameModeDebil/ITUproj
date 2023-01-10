const chatMessageDetails = ({chatMessage}) => {
    return(
        <div className="ticket-details">
            <p><strong>Author: </strong>{chatMessage.creator}</p>
            <p>{chatMessage.content}</p>
            <p>{chatMessage.createdAt}</p>
        </div>
    )
}
export default chatMessageDetails