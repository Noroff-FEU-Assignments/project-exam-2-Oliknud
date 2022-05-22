// import { useContext } from 'react';
// import AuthContext from './authContext';
import { contact_url, booking_url } from './api';



// export function deleteHotel() {

// }

export const deleteBooking = async (id, auth) => {
    const data = JSON.stringify(id);
    console.log(data)
    const options = {
        method: "DELETE",
        body: data,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth}`,
        },
    };

    try {
        const response = await fetch(`${booking_url}/${id}`, options);
        const json = await response.json();
        
    }
    catch (error) {
        console.log(error)
    }
    finally {
        window.location.reload()
    }
  }

export const deleteMessage = async (id, auth) => {
    // const [auth] = useContext(AuthContext);
    console.log(auth)
    const data = JSON.stringify(id);
    console.log(data)
    const options = {
        method: "DELETE",
        body: data,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth}`,
        },
    };

    try {
        const response = await fetch(`${contact_url}/${id}`, options);
        const json = await response.json();
        
    }
    catch (error) {
        console.log(error)
    }
    finally {
        window.location.reload()
    }
}