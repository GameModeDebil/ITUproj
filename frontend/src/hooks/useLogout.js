import { useAuthContext } from "./useAuthContext"
import { useTicketsContext } from "./useTicketsContext"

export const useLogout = () => {
    const { dispatch } = useAuthContext()
    const { dispatch: ticketsDispatch } = useTicketsContext()

    const logout = () => {
        // remove user from storage
        localStorage.removeItem('user')

        //dispatch logout action
        dispatch({type: 'LOGOUT'})
        ticketsDispatch({type: 'SET_TICKETS', payload: null})
    }

    return {logout}
}