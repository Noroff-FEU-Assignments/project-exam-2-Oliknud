import * as yup from 'yup';

export const loginSchema = yup.object().shape({
    identifier: yup.string().required('Please enter your email').email("Please enter valid email address"),
    password: yup.string().required('Please enter your password')
});

export const contactSchema = yup.object().shape({
    first_name: yup.string().required('Please provide a first name'),
    last_name: yup.string().required("Please enter a last name"),
    email: yup.string().required("Please enter your email").email('Please enter valid email address'),
    message: yup.string().required('Please provide a message')
});

export const bookingSchema = yup.object().shape({
    name: yup.string().required('Please provide a first name'),
    lastname: yup.string().required('Please provide a last name'),
    email: yup.string().required("Please enter your email").email("Please enter a valid email address"),
    hotel: yup.string().required('Please provide a hotel name'),
    guests: yup.number().required('Please provide number of guests'),
    date: yup.string().required('Please provide when you want to book')
});

export const addHotelSchema = yup.object().shape({
    title: yup.string().required('Please provide a title'),
    price: yup.number().required('Please provide a price'),
    description: yup.string().required('Please provide description'),
    image_url: yup.string().required('Please provide an image URL')
});
