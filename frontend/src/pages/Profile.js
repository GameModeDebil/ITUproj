import { useEffect, useState } from "react"
import { useAuthContext } from "../hooks/useAuthContext"

const Profile = () => {
    const {user} = useAuthContext()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhonenumber] = useState('')
    const [company, setCompany] = useState('')
    const [profilePicture, setProfilePicture] = useState('')

    useEffect(() => {
        const fetchUser = async () => {
            let url = window.location.pathname
            url = url.split("/")[2]
            const response = await fetch('/api/profile/' + url, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()
            setName(json.name)
            setEmail(json.email)
            setPhonenumber(json.phone)
            setCompany(json.company)
            setProfilePicture(json.profile_picture)
        }

        if (user) {
            fetchUser()
            console.log(user)
        }
    }, [user])

    return (
        <div className="main-div">
            <h2>{name}</h2>
            <p><b>Email:</b> <i>{email}</i></p>
            <p><b>Phone:</b> <i>{phone}</i></p>
            <p><b>Works at:</b> <i>{company}</i></p>
        </div>
    )
}

export default Profile