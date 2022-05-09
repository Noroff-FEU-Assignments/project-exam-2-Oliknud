import {React , useState, useEffect} from 'react'
import { Container, InputGroup, FormControl, Card} from "react-bootstrap";
import { url } from '../components/api';
import searchIcon from "../images/search.svg"

function Hotels() {
  const [hotels, setHotel] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  

  useEffect(function () {
    async function fetchData() {
      try {
        const res = await fetch(url);
        if (res.ok) {
          const json = await res.json();
          setHotel(json.data);
        } else {
          setError("Error..");
        }
      } catch (error) {
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading</div>
  }

  if (error) {
    return <div>Error</div>
  }
 
  return (
    <>
        <Container className='hotel-list-search'>
            <InputGroup size="sm">
              <InputGroup.Text id="inputGroup-sizing-sm"><img src={searchIcon} alt="search-icon" /></InputGroup.Text>
              <FormControl aria-label="small" aria-describedby="inputGroup-sizing-sm" />
            </InputGroup>
        </Container>
        <Container className='hotel-list'>
            {hotels.map(hotel => (
              <Card key={hotel.id} style={{ width: '18rem' }}>
              <Card.Img variant="top" src={hotel.attributes.image_url} />
              <Card.Body>
                <Card.Title>{hotel.attributes.hotel_name}</Card.Title>
                <Card.Text>Price: {hotel.attributes.price} kr</Card.Text>
                <button className='primary-button'>View</button>
              </Card.Body>
            </Card>
            ))}
        </Container>
    </>
  )
}

export default Hotels