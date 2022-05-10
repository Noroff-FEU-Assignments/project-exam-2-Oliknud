import { React, useState, useEffect }from 'react'
import { Carousel } from 'react-bootstrap';
import { url } from '../components/api';

function HotelCarousel() {
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
    <Carousel>
        {hotels.filter(hotel => hotel.attributes.slide_image ? true : false).map(filteredHotel => (
            <Carousel.Item key={filteredHotel.id}>
                <img className="d-block w-100" src={filteredHotel.attributes.image_url} alt={filteredHotel.attributes.image_alt_text}/>
                <Carousel.Caption>
                    <h3>{filteredHotel.attributes.hotel_name}</h3>
                </Carousel.Caption>
            </Carousel.Item>
        ))}
    </Carousel>
  )
}

export default HotelCarousel