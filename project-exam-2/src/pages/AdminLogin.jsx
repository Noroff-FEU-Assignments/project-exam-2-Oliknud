import { React, useState } from 'react'
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
// import { saveUser, saveToken } from '../components/localStorage';

const schema = yup.object().shape({
    email: yup.string().required("Enter email").email("Enter valid email address"),
    password: yup.string().required("Enter password").min(5, "Enter valid password"),
})

function AdminLogin() {
    // const url = "https://polar-plateau-90468.herokuapp.com/api/auth/local"
    // const loginData = JSON.stringify({identifier: email, password: password});

    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    // const options = {
    //     method: "POST",
    //     body: loginData,
    //     headers: {
    //         "Content-Type": "application/json"
    //     }
    // };

    // try {
    //     const response = await fetch(url, options);
    //     const json = await response.json();
    //     if (json.user) {
    //         saveToken(json.jwt);
    //         saveUser(json.user);
    //     }
        
    // }
    // catch (error) {
    //     console.log(error)
    // }

    const { register, handleSubmit, formState: { errors }} = useForm({
        resolver: yupResolver(schema),
    });

    function onSubmit(data) {
        setEmail(data.email)
        setPassword(data.password)
        console.log(email, password);
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input {...register("email")} />
                {errors.email && <span>{errors.email.message}</span>}

                <input {...register("password", { required: true })} />
                {errors.password && <span>This field is required</span>}

                <button>Send</button>
            </form>
        </>
    )
}

export default AdminLogin








    // const [email, setEmail] = useState(() => {
    //     const saved = localStorage.getItem("email");
    //     const initValue = JSON.parse(saved);

    //     return initValue || "";
    // });

    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");
    // console.log(email);

    // function handleSubmit (e) {
    //     e.preventDefault();
    //     console.log("submitted")
    //     localStorage.setItem("email", JSON.stringify(email));
    // }
    // console.log(email)

    // useEffect(() => {
    //     localStorage.setItem("email", JSON.stringify(email));
    //     localStorage.setItem("password", JSON.stringify(password));
    //   }, [email, password]);