import { HelmetProvider } from "react-helmet-async";
import { Component } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Encode from "./pages/Encode";
import Decode from "./pages/Decode";
import About from "./pages/About";

import HowSteganographyWorks from "./pages/learn/HowSteganographyWorks";
import LsbSteganography from "./pages/learn/LsbSteganography";
import ImageSteganography from "./pages/learn/ImageSteganography";
import Aes256Encryption from "./pages/learn/Aes256Encryption";
import SteganographyVsEncryption from "./pages/learn/SteganographyVsEncryption";
import DetectHiddenData from "./pages/learn/DetectHiddenData";
import UseCases from "./pages/learn/UseCases";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  render() {
    if (this.state.error) {
      return (
        <div className="d-flex flex-column align-items-center justify-content-center py-5 text-center">
          <h2 className="mb-3">Something went wrong</h2>
          <p className="text-muted mb-4">{this.state.error.message}</p>
          <button
            className="btn btn-primary"
            onClick={() => this.setState({ error: null })}
          >
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

function AppContent() {
  const location = useLocation();

  const hideFooter = ["/encode", "/decode"].includes(location.pathname);

  return (
    <div className="app-container d-flex flex-column min-vh-100">
      <Navbar />

      <div className="flex-grow-1">
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/encode" element={<Encode />} />
            <Route path="/decode" element={<Decode />} />
            <Route path="/about" element={<About />} />

            <Route
              path="/learn/how-steganography-works"
              element={<HowSteganographyWorks />}
            />
            <Route
              path="/learn/lsb-steganography"
              element={<LsbSteganography />}
            />
            <Route
              path="/learn/image-steganography"
              element={<ImageSteganography />}
            />
            <Route
              path="/learn/aes256-encryption"
              element={<Aes256Encryption />}
            />
            <Route
              path="/learn/steganography-vs-encryption"
              element={<SteganographyVsEncryption />}
            />
            <Route
              path="/learn/detect-hidden-data"
              element={<DetectHiddenData />}
            />
            <Route
              path="/learn/use-cases"
              element={<UseCases />}
            />
          </Routes>
        </ErrorBoundary>
      </div>

      {!hideFooter && <Footer />}
    </div>
  );
}

function App() {
  return (
    <HelmetProvider>
      <AppContent />
    </HelmetProvider>
  );
}

export default App;