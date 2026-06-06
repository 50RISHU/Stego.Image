import { HelmetProvider } from 'react-helmet-async'
import Navbar             from './components/Navbar'
import Footer             from './components/Footer'
import { Routes, Route }  from 'react-router-dom'
import './App.css'

import Home   from './pages/Home'
import Encode from './pages/Encode'
import Decode from './pages/Decode'
import About  from './pages/About'

import HowSteganographyWorks     from './pages/learn/HowSteganographyWorks'
import LsbSteganography          from './pages/learn/LsbSteganography'
import ImageSteganography        from './pages/learn/ImageSteganography'
import Aes256Encryption          from './pages/learn/Aes256Encryption'
import SteganographyVsEncryption from './pages/learn/SteganographyVsEncryption'
import DetectHiddenData          from './pages/learn/DetectHiddenData'
import UseCases                  from './pages/learn/UseCases'

function App() {
  return (
    <HelmetProvider>
      <div className="app-container d-flex flex-column min-vh-100">
        <Navbar />
        <div className="flex-grow-1">
          <Routes>
            <Route path="/"                                  element={<Home />}   />
            <Route path="/encode"                            element={<Encode />} />
            <Route path="/decode"                            element={<Decode />} />
            <Route path="/about"                             element={<About />}  />
            <Route path="/learn/how-steganography-works"     element={<HowSteganographyWorks />} />
            <Route path="/learn/lsb-steganography"           element={<LsbSteganography />} />
            <Route path="/learn/image-steganography"         element={<ImageSteganography />} />
            <Route path="/learn/aes256-encryption"           element={<Aes256Encryption />} />
            <Route path="/learn/steganography-vs-encryption" element={<SteganographyVsEncryption />} />
            <Route path="/learn/detect-hidden-data"          element={<DetectHiddenData />} />
            <Route path="/learn/use-cases"                   element={<UseCases />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </HelmetProvider>
  )
}

export default App