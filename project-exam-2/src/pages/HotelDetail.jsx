import React, { useEffect, useState } from 'react';
import { url } from "../components/api";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Col, Container, Row } from 'react-bootstrap';

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
  
  return (
    <>
      <Container className='hotel-details'>
        <h1>{hotel.hotel_name}</h1>

        <Row>
          <Col>
            <img src={hotel.image_url} alt={hotel.image_alt_text}/>
          </Col>

          <Col className='info-text'>
            <div>
              <p>{hotel.description}</p>
              <h5>{hotel.price} kr</h5>
            </div>
            <Link to={`/booking`} className='primary-button'>Book hotel</Link>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Details