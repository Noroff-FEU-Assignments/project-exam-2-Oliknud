import { React, useState, useEffect }from 'react';
import { Link } from 'react-router-dom';
import { url } from './api';

function SearchFunction() {
    const [hotels, setHotel] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [query, setQuery] = useState("");

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
        <div className='search-bar'>
            <input className={`form-control search-input ${!query ? "border-search" : ""}`} placeholder='Search hotels..' onChange={event => setQuery(event.target.value)} />
            <div className={`search-result ${!query ? "hide-result" : ""}`}>
            {!query ? (
                ""
            ) : (
                <>
                {hotels.filter(hotel => {
                if (query === "") {
                    return hotel;
                } else if (hotel.attributes.hotel_name.toLowerCase().includes(query.toLowerCase())) {
                    return hotel;
                } 
                
                return false;
            }).map((hotel) => (
                <Link onClick={() => setQuery(null)} to={`/hotel/${hotel.id}`} className='search-link' key={hotel.id}>{hotel.attributes.hotel_name}</Link>
            ))}
            </>
            )}
            </div>
        </div>
    )
}

export default SearchFunction