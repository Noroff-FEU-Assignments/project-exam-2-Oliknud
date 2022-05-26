import { React , useState, useEffect, useContext } from 'react'
import { Container, Card, Button} from "react-bootstrap";
import { url } from '../components/api';
import AuthContext from './authContext';
import { deleteFunction } from './deleteFunction';

function AdminHotelList() {
  const [hotels, setHotel] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [auth] = useContext(AuthContext);

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
      <Container className='hotel-list'>
        {hotels.map(hotel => (
          <Card key={hotel.id} style={{ width: '18rem' }}>
          <Card.Img variant="top" src={hotel.attributes.image_url} />
          <Card.Body>
            <Card.Title>{hotel.attributes.hotel_name}</Card.Title>
            <Card.Text>Price: {hotel.attributes.price} kr</Card.Text>
            <Button onClick={() => { deleteFunction(url, hotel.id, auth.jwt); }} className='delete-button'>Delete</Button>
          </Card.Body>
          </Card>
        ))}
      </Container>
    </>
  )
}

export default AdminHotelList