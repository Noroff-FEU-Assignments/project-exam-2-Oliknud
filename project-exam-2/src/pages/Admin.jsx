import React, { useContext, useEffect } from 'react'
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../components/authContext'
import AdminBookings from '../components/AdminBookings';
import ContactMessages from '../components/ContactMessages';
import { url } from '../components/api';
import AdminHotelList from '../components/AdminHotelList';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { addHotelSchema } from "../components/formSchema";

function Admin() {
  const [auth] = useContext(AuthContext);
  console.log(auth);
  let history = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(addHotelSchema)
  });

  useEffect(() => {
    if(!auth) {
      history("/login");
    }
  },[auth, history]);

  const onSubmit = async (data) => {
    const parsedData = JSON.stringify({data:data})
    const options = {
        method: "POST",
        body: parsedData,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.jwt}`,
        }
    };

    try {
       await fetch(url, options);
      
    } catch (error) {
      console.log('error', error);
      
    
    } finally {
      window.location.reload();
    }
  };

  return (
    <>
      <Container>
        
        <div className='admin-page row'>
          <h1>Admin</h1>
          <div className='messages col'>
            <ContactMessages />
            <AdminBookings />
          </div>
      
          <Container className='add-hotel-form col'>
            
            <Form onSubmit={handleSubmit(onSubmit)}>
              <h4>Add hotel</h4>
              <Row className='mb-3'>
                <Form.Group as={Col}>
                  <Form.Label>Hotel name</Form.Label>
                  <input name='hotel_name' className='form-control' placeholder='Hotel name' {...register("hotel_name")}/>
                  {errors.hotel_name && <span>{errors.hotel_name.message}</span>}
                </Form.Group>
              </Row>

              <Row className='mb-3'>
                <Form.Group as={Col}>
                  <Form.Label>Description</Form.Label>
                  <input name='description' className='form-control' placeholder='Description' {...register("description")}/>
                  {errors.description && <span>{errors.description.message}</span>}
                </Form.Group>
              </Row>

              <Row className='mb-3'>
                <Form.Group as={Col}>
                  <Form.Label>Image url</Form.Label>
                  <input name='image_url' className='form-control' placeholder="Image url" {...register("image_url")} />
                  {errors.image_url && <span>{errors.image_url.message}</span>}
                </Form.Group>
              </Row>

              <Row className='mb-3'>
                <Form.Group as={Col}>
                  <Form.Label>Image alt text</Form.Label>
                  <input name='image_alt_text' className='form-control' placeholder="Image alt text" {...register("image_alt_text")} />
                  {errors.image_alt_text && <span>{errors.image_alt_text.message}</span>}
                </Form.Group>
              </Row>

              <Row className='mb-3'>
                <Form.Group as={Col}>
                  <Form.Label>Price</Form.Label>
                  <input type="price" className='form-control' name='message' placeholder='Price'{...register("price")} />
                  {errors.price && <span>{errors.price.message}</span>}
                </Form.Group>
              </Row>

              <Row className='mb-3'>
                <Form.Group>
                  <input type="checkbox" name="featured" {...register("featured")} />
                  <Form.Label className='checkbox-label'>Featured</Form.Label>                  
                </Form.Group>

                <Form.Group>
                  <input type="checkbox" name="slide_image" {...register("slide_image")} />
                  <Form.Label className='checkbox-label'>Slide image</Form.Label>
                </Form.Group>
              </Row>

                <Button type='submit' className='primary-button'>Add hotel</Button>
            </Form>
          </Container>        
        </div>
        
        <AdminHotelList />

      </Container>
    </>
  )
}

export default Admin