import { useEffect, useState } from "react"
import { useAuthContext } from "../hooks/useAuthContext"
import { useTicketsContext } from "../hooks/useTicketsContext"
import Modal from 'react-modal';


//comp
import ModalForm from '../components/ModalForm'


const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '75%',
      border: '1px solid black'
    },
};



const AdminTicketDetails = ({ ticket }) => {
    
    const [editMode, setEditMode] = useState(false)
    const { user } = useAuthContext()
    const { dispatch } = useTicketsContext()

    const [creator_name, setCreatorName] = useState('')
    const [creator_email, setCreatorEmail] = useState('')
    const [creator_profile_picture, setCreatorProfilePicture] = useState('')

    const openEditMode = () => {
        setEditMode(true)
    }

    const closeEditMode = () => {
        setEditMode(false)
    }

    useEffect(() => {
        const fetchCreator = async () => {
            
            //~~~ Fetch Minimized Creator Profile
            const response_creator = await fetch('/api/profile/min/' + ticket.creator, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json_creator = await response_creator.json()
            setCreatorName(json_creator.name)
            setCreatorEmail(json_creator.email)
            setCreatorProfilePicture(json_creator.profile_picture)
        }

        if (user) {
            fetchCreator()
        }
    }, [user])

    const deleteTicket = async () => {
        if (!user) {
            return
        }
        const response = await fetch('/api/tickets/' + ticket._id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
            
        })
        const json = await response.json()

        if (response.ok){
            dispatch({type: 'DELETE_TICKET', payload: json})
        }
    }
    
    
    
    if(!editMode){
       return(
            <tbody>
                <tr className="admin-ticket">
                    <td>{ticket.title}</td>
                    <td>{ticket.company}</td>
                    <td>{ticket.creator}</td>
                    <td>{ticket.location}</td>
                    <td>{ticket.priority}</td>
                    <td>{ticket.state ? "true" : "false"}</td>
                    <td>{ticket.completion_date}</td>
                    <td>{ticket.internal ? "true" : "false"}</td>
                    <td>{ticket.assigned_employee_id}</td>
                    <span className="material-symbols-outlined" onClick={openEditMode}>edit</span>
                    <span className="material-symbols-outlined" onClick={deleteTicket}>delete</span>

                </tr>
            </tbody>
        )
    } else {
        return (
        
        <Modal
            appElement={document.getElementById('root') || undefined}
            isOpen={editMode}
            onRequestClose={closeEditMode}
            style={customStyles}
        >
            <ModalForm key={ticket._id} ticket={ticket} />
        </Modal>

            
    
        )

    }

    

}

export default AdminTicketDetails