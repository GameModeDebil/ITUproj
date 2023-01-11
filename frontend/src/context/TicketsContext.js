import { createContext, useReducer } from "react"

export const TicketsContext = createContext()

export const ticketsReducer = (state, action) => {
    switch(action.type){
        case 'SET_TICKETS':
            return {
                tickets: action.payload
            }
        case 'CREATE_TICKET':
            return {
                tickets: [action.payload, ...state.tickets]
            }
        case 'DELETE_TICKET':
            return {
                tickets: state.tickets.filter((ticket) => ticket._id !== action.payload._id)
            }
        case 'SET_CHAT_MESSAGES':
            return {
                chatMessages: action.payload
            }
        case 'CREATE_CHAT_MESSAGES':
            return {
                chatMessages: [action.payload, ...state.chatMessages]
            }
        case 'DELETE_CHAT_MESSAGES':
            return {
                chatMessages: state.chatMessages.filter((chatMessage) => chatMessage._id !== action.payload._id)
            }

        
        /*case 'UPDATE_TICKET':
                tickets = state.tickets.filter((ticket) => ticket._id !== action.payload._id)
            return {
                tickets: [action.payload, ...state.tickets]
            }*/

        default:
            return state
    }
}

export const TicketsContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(ticketsReducer, {
        tickets: null,
        chatMessages: null
    })

    return (
        <TicketsContext.Provider value={{...state, dispatch}}>
            { children }
        </TicketsContext.Provider>
    )
}