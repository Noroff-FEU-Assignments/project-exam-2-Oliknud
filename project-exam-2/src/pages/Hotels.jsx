import {React , useState, useEffect} from 'react'
import {Link} from "react-router-dom";
import { Container, Card} from "react-bootstrap";
import { url } from '../components/api';

function Hotels() {
  const [hotels, setHotel] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    document.title = "Holidaze | Hotels"
  })

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
    <Container className='hotels-main'>
      
        <Container className='hotel-list-search'>
          <input className='form-control' placeholder='Search hotels..' onChange={event => setQuery(event.target.value)} />
        </Container>

        <Container className='hotel-list'>
        {hotels.filter(hotel => {
                if (query === "") {
                    return hotel;
                } else if (hotel.attributes.hotel_name.toLowerCase().includes(query.toLocaleLowerCase())) {
                    return hotel;
                }
                return false;
            }).map(hotel => (
                <Card key={hotel.id} style={{ width: '18rem' }}>
                  <Card.Img variant="top" src={hotel.attributes.image_url} />
                  <Card.Body>
                    <Card.Title>{hotel.attributes.hotel_name}</Card.Title>
                    <Card.Text>Price: {hotel.attributes.price} kr</Card.Text>
                    <Link to={`/hotel/${hotel.id}`} className='primary-button'>View</Link>
                  </Card.Body>
                </Card>
            ))}           
        </Container>
    </Container>
  )
}

export default Hotels