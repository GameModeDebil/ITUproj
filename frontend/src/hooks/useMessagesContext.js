import { useContext } from "react"
import { MessagesContext } from "../context/MessagesContext"

export const useMessagesContext= () => {
    const context = useContext(MessagesContext)

    if(!context){
        throw Error("useTicketsContext must be used inside a TicketsContextProvider")
    }

    return context
}