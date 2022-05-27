import React, { useEffect, useState } from 'react';
import { url } from "../components/api";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Container } from 'react-bootstrap';

function Details() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  let history = useNavigate();
  const {id} = useParams();

  if (!id) {
    history.push("/");
  }

  const newUrl = url + "/" + id;

  useEffect(() => {
      async function fetchData() {
          try {
            const res = await fetch(newUrl);
            const json = await res.json();
            setData(json)
          }
          catch (error) {
              setError(error.toString());
          }
          finally {
              setLoading(false);
          }
      }
      fetchData();
  }, [newUrl]);

  if (loading) {
      return <div>Loading...</div>
  }

  if (error) {
      return <div>{error}</div>
  }
  
  const hotel = data.data.attributes;
  const hotell = data.data.attributes;
  return (
    <>
      <Container className='hotel-details'>
        <h1>{hotel.hotel_name}</h1>
        <img src={hotel.image_url} alt={hotel.image_alt_text}/>
        <p>{hotel.description}</p>
        <p>{hotel.price} kr</p>
        <Link to={`/booking`} className='primary-button'>Book hotel</Link>
      </Container>
    </>
  )
}

export default Details