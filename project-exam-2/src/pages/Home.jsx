import {React , useState, useEffect} from 'react'
import { Container} from "react-bootstrap";
import HotelCarousel from '../components/carousel';
import { url } from '../components/api';
import logo from "../images/logo.svg";
import { Link } from 'react-router-dom';

function Home() {
  const [hotels, setHotel] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    document.title = "Holidaze | Home"
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
    <>
      <div className='home-hero-image'>
        <img src={logo} className="front-logo" alt="logo" />   
      </div>

      <Container className='featured'>
          <HotelCarousel />
          <Container className='featured-sub'>
            {hotels.filter(hotel => hotel.attributes.featured ? true : false).map(filteredHotel => (
              <div className='home-featured' key={filteredHotel.id} >
                <Link to={`/hotel/${filteredHotel.id}`}><img alt={filteredHotel.attributes.image_alt_text} src={filteredHotel.attributes.image_url} /></Link>
                <h5>{filteredHotel.attributes.hotel_name}</h5>
              </div>
          ))}
        </Container>
      </Container>
    </>
  )
}

export default Home