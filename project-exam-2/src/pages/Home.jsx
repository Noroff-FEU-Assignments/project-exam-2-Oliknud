import React from 'react'
import { InputGroup, FormControl, Container} from "react-bootstrap";
import searchIcon from "../images/search.svg"
import HotelCarousel from '../components/carousel';

function Home() {
  return (
    <>
        <div className='home-hero-image'>
            <div className='hotel-search'>
              <InputGroup size="lg">
                <InputGroup.Text id="inputGroup-sizing-lg"><img src={searchIcon} alt="search-icon" /></InputGroup.Text>
                <FormControl aria-label="Large" aria-describedby="inputGroup-sizing-sm" />
              </InputGroup>
              
              <button>Search</button>
            </div>
        </div>

        <Container className='featured'>
          <HotelCarousel />
        </Container>

        <Container>
          <div className='home-featured'>
            <img src="" alt="featured hotels" />
          </div>
          <div className='home-featured'>
            <img src="" alt="featured hotels" />
          </div>
          <div className='home-featured'>
            <img src="" alt="featured hotels" />
          </div>
        </Container>
    </>
  )
}

export default Home