import { React, useState, useEffect, useContext }from 'react'
import { Accordion } from 'react-bootstrap'
import { booking_url } from './api';
import { AuthContext } from './authContext';
import { deleteBooking } from "../components/delete";

function AdminBookings() {
    const [bookings, setBooking] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [auth] = useContext(AuthContext);
    useEffect(() => {
        const fetchBookings = async () => {
          try {
            const res = await fetch(booking_url);
            const json = await res.json();
    
          if (res.ok) {
            setBooking(json.data);
          } else {
            setError("Error..");
          }
            
          } catch (error) {
            setError(error.toString());
            console.log(error)
          } finally {
            setLoading(false);
          }
        }
        fetchBookings();
      },[]);

      

      if (loading) {
        return <div>Loading</div>
      }
    
      if (error) {
        return <div>Error</div>
      }

     

    return (
        <Accordion defaultActiveKey="0" flush>
        {bookings.map((booking) => {
          const bookingAttr = booking.attributes;
          const bookingNumber = bookings.indexOf(booking);
          return (
            <Accordion.Item eventKey={booking.id} key={booking.id}>
                <Accordion.Header>Booking {bookingNumber + 1}</Accordion.Header>
                <Accordion.Body>
                    <p>Hotel: {bookingAttr.hotel_name}</p>
                    <p>Name: {bookingAttr.full_name}</p>
                    <p>From: {bookingAttr.from}</p>
                    <p>To: {bookingAttr.to}</p>
                    <p>Guests: {bookingAttr.guests}</p>
                    <p>Email: {bookingAttr.email}</p>
                    <p>Phone number: {bookingAttr.phone_number}</p>
                    <button className='primary-button' onClick={() => {
                        const deleteConfirmation = window.confirm("Delete booking?");
                        if (deleteConfirmation) {
                            deleteBooking(booking.id, auth.jwt)}
                        }
                        }>Delete</button>
                </Accordion.Body>
            </Accordion.Item>
          )
        })}
      </Accordion>
        
        
    )
}

export default AdminBookings