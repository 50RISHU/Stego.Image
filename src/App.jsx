import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";
import './App.css'

// Pages (create these)
import Home from "./pages/Home";
import Encode from "./pages/Encode";
import Decode from "./pages/Decode";
import About from "./pages/About";

function App() {
  return (
    <div className="app-container d-flex flex-column min-vh-100">

      <Navbar />

      <div className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/encode" element={<Encode />} />
          <Route path="/decode" element={<Decode />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>

      <Footer />
    </div>
  )
}

export default App