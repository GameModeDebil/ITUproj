import { useEffect, useState } from "react"
import { useAuthContext } from "../hooks/useAuthContext"

import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const Ticket = () => {
    const {user} = useAuthContext()

    const [title, setTitle] = useState('')
    const [creator, setCreator] = useState('')
    const [text, setText] = useState('')
    const [createdAt, setCreatedAt] = useState('')
    const [updatedAt, setupdatedAt] = useState('')

    useEffect(() => {
        const fetchTicket = async () => {
            let url = window.location.pathname
            url = url.split("/")[2]
            console.log(url)
            const response = await fetch('/api/tickets/' + url, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()
            setTitle(json.title)
            setCreator(json.creator)
            setText(json.text)
            setCreatedAt(json.createdAt)
            setupdatedAt(json.updatedAt)
        }

        if (user) {
            fetchTicket()
        }
    }, [user])

    //cant add time?
    return (
        <div className="main-div">
            <h2>{title}</h2>
            <p><b>Created by:</b> <i>{creator}</i></p>
            <p><b>Created:</b> <i>{
                createdAt ? formatDistanceToNow(new Date(createdAt), { addSuffix: true }) : ""
            }</i></p>
            <p><b>Last Update:</b> <i>{
                updatedAt ? formatDistanceToNow(new Date(updatedAt), { addSuffix: true }) : ""
            }</i></p>
            <p>{text}</p>
        </div>
    )
}

export default Ticket

/*

*/