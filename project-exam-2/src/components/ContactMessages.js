import React, { useEffect, useState, useContext} from 'react';
import { contact_url } from '../components/api';
import AuthContext from './authContext';
import { Accordion } from 'react-bootstrap';
import { deleteMessage } from "../components/delete";

function ContactMessages() {
    const [auth] = useContext(AuthContext);
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchContact = async () => {
          try {
            const res = await fetch(contact_url);
            const json = await res.json();
    
          if (res.ok) {
            setContacts(json.data);
          } else {
            setError("Error..");
          }
            
          } catch (error) {
            setError(error.toString());
          } finally {
            setLoading(false);
          }
        }
        fetchContact();
      },[]);

    
    
    if (loading) {
        return <div>Loading</div>
    }

    if (error) {
        return <div>Error</div>
    }

  return (
    <Accordion defaultActiveKey="0" flush>
        {contacts.map((contact) => {
          const contactAttr = contact.attributes;
          const contactNumber = contacts.indexOf(contact);
          return (
            <Accordion.Item eventKey={contact.id} key={contact.id}>
                <Accordion.Header>Message {contactNumber + 1}</Accordion.Header>
                <Accordion.Body>
                    <p>First name: {contactAttr.first_name}</p>
                    <p>Last name: {contactAttr.last_name}</p>
                    <p>Email: {contactAttr.email}</p>
                    <p>Message: {contactAttr.message}</p>
                    <button className='primary-button' onClick={() => {
                        const deleteConfirmation = window.confirm("Delete booking?");
                        if (deleteConfirmation) {
                            deleteMessage(contact.id, auth.jwt)}
                        }
                        }>Delete</button>
                </Accordion.Body>
            </Accordion.Item>
          )
        })}
      </Accordion>
  )
}

export default ContactMessages