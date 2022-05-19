import './scss/styles.scss';
import {
  Routes,
  Route,
} from "react-router-dom";
import Navigation from "./components/navigation";
import Home from "./pages/Home";
import Hotels from "./pages/Hotels";
import Footer from './components/footer';
import Contact from './pages/Contact';
import Detail from './pages/HotelDetail';
import Booking from './pages/Booking';
import AdminLogin from './pages/AdminLogin';
import Admin from './pages/Admin';

function App() {
  return (
    <>
      <Navigation />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hotels" element={<Hotels />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/:id" element={<Detail />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/login" element={<AdminLogin />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>

        <Footer />
    </>
  );
}

export default App;
