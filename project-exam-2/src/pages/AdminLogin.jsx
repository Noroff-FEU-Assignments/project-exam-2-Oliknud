// import {  useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { auth_url } from '../components/api';
// import AuthContext from "../components/authContext";
import { useNavigate } from 'react-router-dom';
import { saveToken, saveUser } from '../components/localStorage';



const loginSchema = yup.object().shape({
  identifier: yup.string().required('Please enter your email').email("Please enter valid email address"),
  password: yup.string().required('Please enter your password')
});

const AdminLogin = () => {
//   const [submitting, setSubmitting] = useState(false);
//   const [loginError, setLoginError] = useState(null);
//   const [passwordError, setPasswordError] = useState(null)

  let history = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(loginSchema)
  });

  console.log(errors)

  const onSubmit = async (data) => {
    // setSubmitting(true);
    // setLoginError(null);
    
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

      if (response.status === 400 ) {
          throw new Error("Invalid email or password")
      }

      const json = await response.json();
      console.log(json)
      if (json.user) {
        saveToken(json.jwt);
        saveUser(json.user);
        history("/admin");
      }
      
    } catch (error) {
      console.log('error', error);
      
    //   setLoginError(error.toString());
    } finally {
        
        
    }
  };

  return (
    <>
      <div className='formbox'>
      <form onSubmit={handleSubmit(onSubmit)}>
            <input name='identifier' placeholder="Enter email" {...register("identifier")} />
            {errors.identifier && <span>{errors.identifier.message}</span>}

            <input type="password" name='password' placeholder='Enter password'{...register("password")} />
            {errors.password && <span></span>}

            <button type='submit'>Send</button>
        </form>
      </div>
    </>
  );
};

export default AdminLogin;