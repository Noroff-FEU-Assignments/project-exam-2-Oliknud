import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import AuthContext from '../components/authContext'
import AdminBookings from '../components/AdminBookings';
import ContactMessages from '../components/ContactMessages';
import { url } from '../components/api';
import AdminHotelList from '../components/AdminHotelList';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { addHotelSchema } from "../components/formSchema";
import { Container } from "react-bootstrap"

function Admin() {
  const [auth] = useContext(AuthContext);
  // const [addHotel, setAddHotel] = useState([]);
  // const [featured, setFeatured] = useState(false);
  // const [slideImage, setSlideImage] = useState(false);
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
        <h1>Admin</h1>
        
        <ContactMessages />
        <AdminBookings />

        <div className='add-hotel-form'>
          <form onSubmit={handleSubmit(onSubmit)}>
              <input name='hotel_name' className='form-control' placeholder='Hotel name' {...register("hotel_name")}/>
              {errors.hotel_name && <span>{errors.hotel_name.message}</span>}

              <input name='description' className='form-control' placeholder='Description' {...register("description")}/>
              {errors.description && <span>{errors.description.message}</span>}

              <input name='image_url' className='form-control' placeholder="Image url" {...register("image_url")} />
              {errors.image_url && <span>{errors.image_url.message}</span>}

              <input name='image_alt_text' className='form-control' placeholder="Image alt text" {...register("image_alt_text")} />
              {errors.image_alt_text && <span>{errors.image_alt_text.message}</span>}

              <input type="price" className='form-control' name='message' placeholder='Price'{...register("price")} />
              {errors.price && <span>{errors.price.message}</span>}

              <input type="checkbox" name="featured" {...register("featured")} />
              <input type="checkbox" name="slide_image" {...register("slide_image")} />

              <button type='submit' className='primary-button'>Add hotel</button>
          </form>
        </div>
        <AdminHotelList />
      </Container>
    </>
  )
}

export default Admin