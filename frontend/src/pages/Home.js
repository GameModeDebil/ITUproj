import { useEffect, useState } from "react"
import { useTicketsContext } from "../hooks/useTicketsContext"
import { useAuthContext } from "../hooks/useAuthContext"

import Modal from 'react-modal';

//components
import TicketDetails from '../components/TicketDetails'
import TicketForm from '../components/TicketForm'

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

const Home = () => {
    const {tickets, dispatch} = useTicketsContext()
    const {user} = useAuthContext()

    const [modalIsOpen, setIsOpen] = useState(false);

    const [visible, setVisible] = useState(false)

    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        if (scrolled > 300){
            setVisible(true)
        } 
        else if (scrolled <= 300){
            setVisible(false)
        }
    };
    
    const scrollToTop = () =>{
        window.scrollTo({
        top: 0, 
        behavior: 'smooth'
        });
    }
    window.addEventListener('scroll', toggleVisible);

    function openModal() {
        setIsOpen(true)
    }

    function closeModal() {
        setIsOpen(false)
    }

    useEffect(() => {
        const fetchTickets = async () => {
            const response = await fetch('/api/tickets', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if(response.ok){
                dispatch({type: 'SET_TICKETS', payload: json})
            }
        }

        if (user) {
            fetchTickets()
        }
    }, [dispatch, user])

    return (
        <div className="home">
            <div>
                <div className="scrollButtonDiv" onClick={scrollToTop} style={{display: visible ? 'inline' : 'none'}}>
                    <span className="material-symbols-outlined">arrow_upward</span>
                </div>
                <div className="headline">
                    <h1>Tickets</h1>
                    <span className="material-symbols-outlined" onClick={openModal}>
                        add
                    </span>
                    <Modal
                        appElement={document.getElementById('root') || undefined}
                        isOpen={modalIsOpen}
                        onRequestClose={closeModal}
                        style={customStyles}
                    >
                        <TicketForm />
                    </Modal>
                </div>
                {tickets && tickets.map((ticket) => (
                    ticket.state ?
                    <TicketDetails key={ticket._id} ticket={ticket} />
                    : null
                ))}
            </div>
        </div>
    )
}

export default Home