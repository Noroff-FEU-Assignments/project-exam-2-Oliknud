import {React , useState, useEffect} from 'react'
import { InputGroup, FormControl, Container} from "react-bootstrap";
// import { Link } from 'react-router-dom';
import searchIcon from "../images/search.svg"
import HotelCarousel from '../components/carousel';
import { url } from '../components/api';
import logo from "../images/logo.svg";
// import Hotels from './Hotels';

function Home() {
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
        <div className='home-hero-image'>
          <img src={logo} className="front-logo" alt="logo" />
            <div className='hotel-search'>
              
              <InputGroup size="sm">
                <InputGroup.Text id="inputGroup-sizing-sm"><img src={searchIcon} alt="search-icon" /></InputGroup.Text>
                <FormControl aria-label="small" aria-describedby="inputGroup-sizing-sm" />
              </InputGroup>
              
              <button className='primary-button'>Search</button>
            </div>
        </div>

        <Container className='featured'>
          <HotelCarousel />

          <Container className='featured-sub'>
            {hotels.filter(hotel => hotel.attributes.featured ? true : false).map(filteredHotel => (
              <div className='home-featured' key={filteredHotel.id} ><img alt={filteredHotel.attributes.image_alt_text} src={filteredHotel.attributes.image_url}></img></div>
            ))}
          </Container>
        </Container>
    </>
  )
}

export default Home