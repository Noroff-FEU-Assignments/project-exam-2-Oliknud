import { React, useState, useEffect }from 'react';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import { contact_url } from '../components/api';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { contactSchema } from "../components/formSchema";

function Contact() {
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    document.title = "Holidaze | Contact"
  })

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(contactSchema)
  });

  const onSubmit = async (data) => {
    const parsedData = JSON.stringify({data:data})
    
    const options = {
        method: "POST",
        body: parsedData,
        headers: {
            "Content-Type": "application/json"
        }
    };

    try {
      await fetch(contact_url, options);

    } catch (error) {
      console.log('error', error);
    } finally {
      setSubmitting(true);
      setTimeout(() => {
        setSubmitting(false);
        reset();
      }, 3000);
      
    }
  };

  return (
    <Container className='contact-form'>
      <Form onSubmit={handleSubmit(onSubmit)}>
      <h1>Contact us!</h1>
        <Row className='mb-3'>
          <Form.Group as={Col}>
            <Form.Label>First name</Form.Label>
            <Form.Control name='first_name' className='form-control' placeholder='First name' {...register("first_name")}/>
            {errors.first_name && <span>{errors.first_name.message}</span>}
          </Form.Group>
        </Row>

        <Row className='mb-3'>
          <Form.Group as={Col}>
            <Form.Label>Last name</Form.Label>
            <Form.Control name='last_name' className='form-control' placeholder='Last name' {...register("last_name")}/>
            {errors.last_name && <span>{errors.last_name.message}</span>}
          </Form.Group>
        </Row>

        <Row className='mb-3'>
          <Form.Group as={Col}>
            <Form.Label>Email</Form.Label>
            <Form.Control name='email' className='form-control' placeholder="Enter email" {...register("email")} />
            {errors.email && <span>{errors.email.message}</span>}
          </Form.Group>
        </Row>

        <Row className='mb-3'>
          <Form.Group as={Col}>
            <Form.Label>Message</Form.Label>
            <Form.Control as="textarea" type="message" className='form-control' name='message' placeholder='Message'{...register("message")} />
            {errors.message && <span>{errors.message.message}</span>}
          </Form.Group>
        </Row>
            <Button type='submit' className={submitting ? "success-button" : "primary-button"} disabled={submitting ? true : false}>{submitting ? "Message sent!" : "Send"}</Button>
        </Form>
    </Container>
  )
}

export default Contact