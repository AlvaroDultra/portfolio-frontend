import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        {/* Rota pública - Portfólio */}
        <Route path="/" element={
          <div className="min-h-screen bg-dark-blue-900">
            <Navbar />
            <Hero />
            <About />
            <Projects />
            <Contact />
            <Footer />
          </div>
        } />

        {/* Rotas do Admin */}
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;