import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import AppRoutes from './routes/AppRoutes';
import Footer from './pages/Footer';

const App = () => {
  return (
    <>
   <Router>
      <Navbar />
      <p style={{marginBottom:'80px'}}></p>
      <AppRoutes />
    </Router>
    <Footer />
    
    </>
  )
}

export default App;