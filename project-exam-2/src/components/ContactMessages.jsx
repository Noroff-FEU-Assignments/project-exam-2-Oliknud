import React, { useEffect, useState, useContext } from 'react';
import { contact_url } from './utils/api';
import AuthContext from './utils/authContext';
import { Accordion } from 'react-bootstrap';
import { deleteFunction } from "./utils/deleteFunction";

function ContactMessages() {
  const [auth] = useContext(AuthContext);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchContact();
  }, []);

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



  if (loading) {
    return <div>Loading</div>
  }

  if (error) {
    return <div>Error</div>
  }

  if (contacts.length === 0) {
    return (
      <>
        <h4>Contact messages</h4>
        <p>No messages..</p>
      </>
    )
  }

  return (
    <Accordion defaultActiveKey="0" flush>
      <h4>Contact messages</h4>
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
                deleteFunction(contact_url, contact.id, auth.jwt)
                setTimeout(() => {
                  fetchContact()
                }, 300);
              }}>Delete</button>
            </Accordion.Body>
          </Accordion.Item>
        )
      })}
    </Accordion>
  )
}

export default ContactMessages