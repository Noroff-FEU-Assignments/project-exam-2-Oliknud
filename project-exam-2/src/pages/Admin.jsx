import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import AuthContext from '../components/authContext'
import AdminBookings from '../components/AdminBookings';
import ContactMessages from '../components/ContactMessages';
import { url } from '../components/api';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { addHotelSchema } from "../components/formSchema";

function Admin() {
  const [auth] = useContext(AuthContext);
  const [addHotel, setAddHotel] = useState([]);
  const [featured, setFeatured] = useState(false);
  // const [slideImage, setSlideImage] = useState(false);
  let history = useNavigate();

  // console.log(featured)
  console.log(addHotel);

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
    console.log(parsedData)
    
    const options = {
        method: "POST",
        body: parsedData,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.jwt}`,
        }
    };

    try {
      const response = await fetch(url, options);
      const json = await response.json();
      console.log(json)
      setAddHotel(json)
    } catch (error) {
      console.log('error', error);
      
    //   setLoginError(error.toString());
    } finally {
      window.location.reload();
    }
  };

 
    
  return (
    <>
      <div>Admin</div>
      
      <ContactMessages />
      <AdminBookings />

      <div className='add-hotel-form'>
      <form onSubmit={handleSubmit(onSubmit)}>
            <input name='hotel_name' placeholder='Hotel name' {...register("hotel_name")}/>
            {errors.hotel_name && <span>{errors.hotel_name.message}</span>}

            <input name='description' placeholder='Description' {...register("description")}/>
            {errors.description && <span>{errors.description.message}</span>}

            <input name='image_url' placeholder="Image url" {...register("image_url")} />
            {errors.image_url && <span>{errors.image_url.message}</span>}

            <input name='image_alt_text' placeholder="Image alt text" {...register("image_alt_text")} />
            {errors.image_alt_text && <span>{errors.image_alt_text.message}</span>}

            <input type="price" name='message' placeholder='Price'{...register("price")} />
            {errors.price && <span>{errors.price.message}</span>}

            <input type="checkbox" name="featured" {...register("featured")} />
            <input type="checkbox" name="slide_image" {...register("slide_image")} />

            <button type='submit'>Send</button>
        </form>
    </div>
      
    </>
  )
}

export default Admin