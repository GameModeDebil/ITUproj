import { useEffect, useState } from "react"
import { useAuthContext } from "../hooks/useAuthContext"

const Profile = () => {
    const {user} = useAuthContext()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [company, setCompany] = useState('')

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
            setCompany(json.company)
        }

        if (user) {
            fetchUser()
            console.log(user)
        }
    }, [user])

    return (
        <div className="cont">   
            <div className="box1">
                <h2>{name}</h2>
                <p><b>Email:</b> <i>{email}</i></p>
                <p><b>Works at:</b> <i>{company}</i></p>
            </div>
            <div className="box2">
                <div className="img1">
                    <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="" ></img>
                </div>
            </div>
        </div>
    )
}

export default Profile