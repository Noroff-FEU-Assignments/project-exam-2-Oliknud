import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import AuthContext from '../components/authContext'
import { contact_url } from '../components/api';
import Bookings from '../components/Bookings';


function Admin() {
  const [auth] = useContext(AuthContext);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  let history = useNavigate();
  
  useEffect(() => {
    if(!auth) {
      history("/login");
    }
  },[auth, history]);

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
    <>
      <div>Admin</div>
      {contacts.map((contact) => {
        const contactAttr = contact.attributes;
        return (
          <div key={contact.id}>
            <p>{contactAttr.first_name}</p>
          </div>
        )
      })}

      <Bookings />
      
    </>
  )
}

export default Admin