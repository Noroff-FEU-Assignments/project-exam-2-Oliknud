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

function App() {
  return (
    <>
      <Navigation />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hotels" element={<Hotels />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
