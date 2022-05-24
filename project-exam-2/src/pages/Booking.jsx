import { React, useState }from 'react'
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import { bookingSchema } from "../components/formSchema";
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
import { booking_url } from '../components/api';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Booking() {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    console.log(startDate.toDateString())

    const { control, watch, register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(bookingSchema)
    });
    console.log(watch(control))

    const onSubmit = async (data) => {
        console.log(data)
        const parsedData = JSON.stringify({data:data})
        console.log(parsedData)

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
            
        }
    };

    return (
        <Container className='booking'>
            <Form className='booking-form' onSubmit={handleSubmit(onSubmit)}>
                <h1>Book hotel</h1>
                <Row className="mb-3">
                    <Form.Group as={Col} xs={6} controlId="formGridHotelName">
                        <Form.Label>Hotel name</Form.Label>
                        <Form.Control placeholder='Hotel name' {...register("hotel_name")} />
                        {errors.hotel_name && <span>{errors.hotel_name.message}</span>}
                    </Form.Group>
                    
                    <Controller control={control} name="from" render={({ field }) => {
                        <DatePicker selected={field.value} onChange={(date) => field.onChange(date)} />
                    }}/>



                    <Form.Group as={Col} controlId="formGridDate">
                        <Form.Label>From</Form.Label>

                        

                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridDate">
                        <Form.Label>To</Form.Label>
                        {/* <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} /> */}
                        
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridHotelName">
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

                    <Form.Group as={Col} controlId="formGridZip">
                        <Form.Label>Phone number</Form.Label>
                        <Form.Control placeholder='Enter phone number' {...register("phone_number")} />
                        {errors.phone_number && <span>{errors.phone_number.message}</span>}
                    </Form.Group>
                </Row>

                <Button className='primary-button' type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
    )
}

export default Booking