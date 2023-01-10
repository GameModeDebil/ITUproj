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




const AdminUserDetails = ({ account }) => {
    
    const { dispatch } = useTicketsContext()
    const { user } = useAuthContext()
    
    const deleteUser = async () => {
        if (!user) {
            return
        }
        const response = await fetch('/api/tickets/' + account._id, {
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
    
    
    
    
    
    
    
    return (
        <tbody>
            <tr className="admin-users">
                <td>{account.name}</td>
                <td>{account.email}</td>
                <td>{account.phone}</td>
                <td>{account.company}</td>
                <td>{account.role}</td>
                <td>{account.verified}</td>
                <span className="material-symbols-outlined" >edit</span>
                <span className="material-symbols-outlined" onClick={deleteUser}>delete</span>
            </tr>
            </tbody>
    )
}

export default AdminUserDetails