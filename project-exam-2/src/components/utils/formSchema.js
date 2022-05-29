import * as yup from 'yup';

export const loginSchema = yup.object().shape({
    identifier: yup.string().required('Please enter your email').email("Please enter valid email address"),
    password: yup.string().required('Please enter your password')
});

export const contactSchema = yup.object().shape({
    first_name: yup.string().required('Please enter your first name'),
    last_name: yup.string().required("Please enter your last name"),
    email: yup.string().required("Please enter your email").email('Please enter valid email address'),
    message: yup.string().required('Please enter your message')
});

export const bookingSchema = yup.object().shape({
    full_name: yup.string().required('Please enter your first name'),
    email: yup.string().required("Please enter your email").email("Please enter a valid email address"),
    hotel_name: yup.string().required('Please choose hotel'),
    guests: yup.number().required('Please provide number of guests'),
    from: yup.string().required('Please provide when you want to book'),
    to: yup.string().required('Please provide when you want to book'),
    phone_number: yup.string().required('Please enter your phone number')
});

export const addHotelSchema = yup.object().shape({
    hotel_name: yup.string().required('Please enter hotel a name'),
    price: yup.number().required('Please enter price'),
    description: yup.string().required('Please write a description'),
    image_url: yup.string().required('Please enter an image URL'),
    image_alt_text: yup.string().required("Pleace enter image alt text"),
    featured: yup.boolean(false),
    slide_image: yup.boolean(false)
});
