import React, { useState } from 'react'
import { contact_url } from '../components/api';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { contactSchema } from "../components/formSchema";

function Contact() {
  const [contact, setContact] = useState(null)
  console.log(contact);

  const { register, handleSubmit, formState: { errors } } = useForm({
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
      const response = await fetch(contact_url, options);
      const json = await response.json();
      setContact(json)
      console.log(json)
    } catch (error) {
      console.log('error', error);
      
    //   setLoginError(error.toString());
    } finally {
        
        
    }
  };

  return (
    <div className='contact-form'>
      <form onSubmit={handleSubmit(onSubmit)}>
            <input name='first_name' placeholder='First name' {...register("first_name")}/>
            {errors.firstName && <span>{errors.firstName.message}</span>}

            <input name='last_name' placeholder='Last name' {...register("last_name")}/>
            {errors.lastName && <span>{errors.lastName.message}</span>}

            <input name='email' placeholder="Enter email" {...register("email")} />
            {errors.email && <span>{errors.email.message}</span>}

            <input type="message" name='message' placeholder='Message'{...register("message")} />
            {errors.message && <span>{errors.message.message}</span>}

            <button type='submit'>Send</button>
        </form>
      </div>
  )
}

export default Contact