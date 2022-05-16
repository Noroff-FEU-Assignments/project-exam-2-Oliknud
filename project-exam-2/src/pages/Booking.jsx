import React from 'react'
import { Container, Form, Row, Col, Button } from 'react-bootstrap'

function Booking() {
  return (
    <Container className='booking'>
        <Form className='booking-form'>
            <h1>Book hotel</h1>
            <Row className="mb-3">
                <Form.Group as={Col} xs={6} controlId="formGridHotelName">
                    <Form.Label>Hotel name</Form.Label>
                    <Form.Control placeholder="Hotel name" />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridDate">
                    <Form.Label>From</Form.Label>
                    <Form.Control placeholder="From" />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridDate">
                    <Form.Label>To</Form.Label>
                    <Form.Control placeholder="To" />
                </Form.Group>
            </Row>

            <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridHotelName">
                    <Form.Label>Full name</Form.Label>
                    <Form.Control placeholder="Enter full name" />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>Guests</Form.Label>
                    <Form.Select defaultValue="Choose...">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                    </Form.Select>
                </Form.Group>
            </Row>


            <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridZip">
                    <Form.Label>Phone number</Form.Label>
                    <Form.Control placeholder='Enter phone number'/>
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