import { React, useEffect, useState }from 'react'
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import { bookingSchema } from "../components/formSchema";
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { booking_url, url } from '../components/api';
import { Link } from 'react-router-dom';

function Booking() {
    const [error, setError] = useState(null);
    const [hotels, setHotels] = useState([]);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        document.title = "Holidaze | Booking"
      })
    
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(bookingSchema)
    });

    // Fetch hotel name for hotel select
    useEffect(() => {
        async function fetchName() {
            try {
                const res = await fetch(url);
                const json = await res.json();
                setHotels(json.data)
            }
            catch (error) {
                setError(error.toString());
            }
        }
        fetchName();
    }, []);

    const onSubmit = async (data) => {
        const parsedData = JSON.stringify({data:data})
        setSubmitting(false);
        
        const options = {
            method: "POST",
            body: parsedData,
            headers: {
                "Content-Type": "application/json",
            }
        };
    
        try {
            await fetch(booking_url, options);
            
        } 
        catch (error) {
            console.log('error', error);
        } 
        finally {
            setSubmitting(true);
        }
    };

    if (error) {
        return <div>Error</div>
    }

    // Dates before todays date deactivated
    const formatYmd = (date) => date.toISOString().slice(0, 10);

    return (
        <Container className='booking'>
            <Form className='booking-form' onSubmit={handleSubmit(onSubmit)}>
                <h1>Book hotel</h1>
                <Row className="mb-3">
                    <Form.Group as={Col} xs={6} controlId="formGridHotelName">
                        <Form.Label>Hotel name</Form.Label>
                        <Form.Select defaultValue="" {...register("hotel_name")}>
                            <option value="" disabled >Choose...</option>
                            {hotels.map(hotel => (
                                <option key={hotel.id}>{hotel.attributes.hotel_name}</option>
                            ))}
                            
                        </Form.Select>
                        {errors.hotel_name && <span>{errors.hotel_name.message}</span>}
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridDate">
                        <Form.Label>From</Form.Label>
                        <input className='form-control date-select' type="date" min={formatYmd(new Date())} {...register("from")} />
                        {errors.hotel_name && <span>{errors.hotel_name.message}</span>}
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridDate">
                        <Form.Label>To</Form.Label>
                        <input className='form-control date-select' type="date" min={formatYmd(new Date())} {...register("to")} />
                        {errors.hotel_name && <span>{errors.hotel_name.message}</span>}
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridFullName">
                        <Form.Label>Full name</Form.Label>
                        <Form.Control placeholder="Enter full name" {...register("full_name")} />
                        {errors.full_name && <span>{errors.full_name.message}</span>}
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>Guests</Form.Label>
                        <Form.Select defaultValue="Choose..." {...register("guests")}>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                        </Form.Select>
                        {errors.guests && <span>{errors.guests.message}</span>}
                    </Form.Group>
                </Row>


                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" {...register("email")} />
                        {errors.email && <span>{errors.email.message}</span>}
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPhone">
                        <Form.Label>Phone number</Form.Label>
                        <Form.Control placeholder='Enter phone number' {...register("phone_number")} />
                        {errors.phone_number && <span>{errors.phone_number.message}</span>}
                    </Form.Group>
                </Row>

                <Button className={submitting ? "success-button" : "primary-button"} disabled={submitting ? true : false} type="submit">{submitting ? "Success" : "Book"}</Button>
                <Link to={"/hotels"}>Go back</Link>
            </Form>
        </Container>
    )
}

export default Booking