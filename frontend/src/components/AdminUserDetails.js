import { useEffect, useState } from "react"
import { useAuthContext } from "../hooks/useAuthContext"
import { useTicketsContext } from "../hooks/useTicketsContext"
import Modal from 'react-modal';


//comp
import ModalUser from "../components/ModalUser";

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




const AdminUserDetails = ({ account }) => {
    
    const { dispatch } = useTicketsContext()
    const { user } = useAuthContext()  
    const [editProfile, setEditProfile] = useState(false)
    
    const editUser = () => {
        setEditProfile(true)
    }
    const closeEditUser = () => {
        setEditProfile(false)
    }
    
    useEffect(() => {
        const fetchCreator = async () => {
            
            //~~~ Fetch Minimized Creator Profile
            const response_creator = await fetch('/api/profile/min/' + account._id, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json_creator = await response_creator.json()
        }

        if (user) {
            fetchCreator()
        }
    }, [account])
    
    const deleteUser = async () => {
        if (!user) {
            return
        }
        const response = await fetch('/api/user/' + account._id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
            
        })
        const json = await response.json()
    
        if (response.ok){
            dispatch({type: 'DELETE_USER', payload: json})
        }
    }
    
    if(!editProfile)
    {
        return (
            <tbody>
                <tr className="admin-users">
                    <td>{account.name}</td>
                    <td>{account.email}</td>
                    <td>{account.company}</td>
                    <td>{account.role}</td>
                    <td>{account.verified}</td>
                    <span className="material-symbols-outlined" onClick={editUser}>edit</span>
                    {user.id !== account._id ? <span className="material-symbols-outlined" onClick={deleteUser}>delete</span>:""}
                </tr>
                </tbody>
        )
    } else {
        return(
        <Modal
            appElement={document.getElementById('root') || undefined}
            isOpen={editProfile}
            onRequestClose={closeEditUser}
            style={customStyles}
        >
            <ModalUser key={account._id} account={account} />
        </Modal>
        )
    }

}

export default AdminUserDetails