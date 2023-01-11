import { useState, useEffect } from "react"
import { useTicketsContext } from "../hooks/useTicketsContext"
import { useAuthContext } from "../hooks/useAuthContext"



const ModalUser = ({account}) => {
    const { dispatch } = useTicketsContext()
    const { user } = useAuthContext()

    const [error, setError] = useState(null)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [company, setCompany] = useState('')
    const [role, setRole] = useState('')
    const [verified, setVerified] = useState('')
    const [profileID,setUserID] = useState('')
    
    

    useEffect(() => {
        setName(account.name)
        setEmail(account.email)
        setCompany(account.company)
        setRole(account.role)
        setVerified(account.verified)
        setUserID(account._id)
    }, [])

    const closeForm = async (e) => {
        e.preventDefault()

        if (!user) {
            setError('You must be logged in')
            return
        }

        const profile = {name, email, company, role, verified}

        if (name  !== "" && email !== "" && company !== ""){
            console.log("hello")
            const response2 = await fetch('/api/profile/' + profileID, {
                method: 'PATCH',
                body: JSON.stringify(profile),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response2.json()
    
            if(!response2.ok){
                setError(json.error)
            }
    
            if(response2.ok){
                setError(null)
                //console.log('new ticket added', json)     //debug added ticket
                dispatch({type: 'DELETE_TICKET', payload: json})
                dispatch({type: 'CREATE_TICKET', payload: json})
            }
        }
    }





    return (
        <form className="create" onSubmit={closeForm}>
            <h3>Edit profile</h3>

            <label>Name:</label>
            <input
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
                required
            />

            <label>Email:</label>
            <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
            ></input>
            
            <label>Company:</label>
            <input
                type="text"
                onChange={(e) => setCompany(e.target.value)}
                value={company}
                required
            />

            <label>Role:</label>
            <input
                type="text"
                value={role}
                required
            />

            <label>Verified:</label>
            <input
                type="text"
                value={verified}
                required
            />

            <button>Save</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default ModalUser