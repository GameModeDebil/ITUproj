import { createContext, useReducer } from "react"

export const MessagesContext = createContext()

export const messagesReducer = (state, action) => {
    switch(action.type){
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
        default:
            return state
    }
}

export const MessagesContextProvider = ({ children }) => {
    const [state, dispatch2] = useReducer(messagesReducer, {
        chatMessages: null
    })

    return (
        <MessagesContext.Provider value = {{...state, dispatch2}}>
            { children }
        </MessagesContext.Provider>
    )
}