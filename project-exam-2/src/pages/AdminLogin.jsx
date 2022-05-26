import {  useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { auth_url } from '../components/api';
import AuthContext from "../components/authContext";
import { useNavigate } from 'react-router-dom';
import { loginSchema } from '../components/formSchema';
import { Container, Form, Row, Button } from 'react-bootstrap';

const AdminLogin = () => {
  const [submitting, setSubmitting] = useState(false);
  const [loginError, setLoginError] = useState(null);

  const [, setAuth] = useContext(AuthContext);
  let history = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(loginSchema)
  });

  const onSubmit = async (data) => {
    setSubmitting(true);
    
    const parsedData = JSON.stringify(data)
    
    const options = {
        method: "POST",
        body: parsedData,
        headers: {
            "Content-Type": "application/json"
        }
    };

    try {
      const response = await fetch(auth_url, options);
      const json = await response.json();

      if (response.status === 400 ) {
        setLoginError("Invalid email or password");
        
      } else {
        setAuth(json);
        history("/");
        setLoginError(null)
      }
      
      
    } catch (error) {
      console.log('error', error);
      
    //   setLoginError(error.toString());
    } finally {
        setSubmitting(false)
    }
  };

  return (
    <>
      <Container className='login-form'>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control name='identifier' placeholder="Enter email" {...register("identifier")} />
            {errors.identifier && <span>{errors.identifier.message}</span>}
            <p>{loginError}</p>
        </Row>

        <Row className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" name='password' placeholder='Enter password'{...register("password")} />
            {errors.password && <span></span>}
        </Row>
            <Button className='primary-button' type='submit'>{submitting ? "Logging in.." : "Log in"}</Button>
        </Form>
      </Container>
    </>
  );
};

export default AdminLogin;