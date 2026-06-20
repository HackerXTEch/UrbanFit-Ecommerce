import React, { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import { WishlistProvider } from './context/WishlistContext'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Header from './components/Header'
import MainContent from './components/MainContent'
import Footer from './components/Footer'
import Men from './pages/Men'
import Women from './pages/Women'
import Kids from './pages/Kids'
import Accessories from './pages/Accessories'
import About from './pages/About'
import Sale from './pages/Sale'
import Contact from './pages/Contact'
import FAQ from './pages/FAQ'
import SizeGuide from './pages/SizeGuide'
import Login from './pages/Login'
import MenFormalWear from './pages/MenFormalWear'
import MenCasualWear from './pages/MenCasualWear'
import MenSportswear from './pages/MenSportswear'
import WomenProfessional from './pages/WomenProfessional'
import WomenEveningWear from './pages/WomenEveningWear'
import WomenCasualWear from './pages/WomenCasualWear'
import KidsBoys from './pages/KidsBoys'
import KidsGirls from './pages/KidsGirls'
import KidsBabies from './pages/KidsBabies'
import Checkout from './pages/Checkout'
import Orders from './pages/Orders'
import './App.css'

// Scroll to top component
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App = () => {
  return (
    <AuthProvider>
      <WishlistProvider>
        <CartProvider>
          <ScrollToTop />
          <div className="app">
            <Routes>
              <Route path="/login" element={<Login />} />
              
              <Route path="/*" element={
                <ProtectedRoute>
                  <Header />
                  <Routes>
                    <Route path="/" element={<MainContent />} />
                    <Route path="/men" element={<Men />} />
                    <Route path="/men/formal-wear" element={<MenFormalWear />} />
                    <Route path="/men/casual-wear" element={<MenCasualWear />} />
                    <Route path="/men/sportswear" element={<MenSportswear />} />
                    <Route path="/women" element={<Women />} />
                    <Route path="/women/professional" element={<WomenProfessional />} />
                    <Route path="/women/evening-wear" element={<WomenEveningWear />} />
                    <Route path="/women/casual-wear" element={<WomenCasualWear />} />
                    <Route path="/kids" element={<Kids />} />
                    <Route path="/kids/boys" element={<KidsBoys />} />
                    <Route path="/kids/girls" element={<KidsGirls />} />
                    <Route path="/kids/babies" element={<KidsBabies />} />
                    <Route path="/accessories" element={<Accessories />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/faq" element={<FAQ />} />
                    <Route path="/size-guide" element={<SizeGuide />} />
                    <Route path="/sale" element={<Sale />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/orders" element={<Orders />} />
                  </Routes>
                  <Footer />
                </ProtectedRoute>
              } />
            </Routes>,
          </div>
        </CartProvider>
      </WishlistProvider>
    </AuthProvider>
  )
}

export default App
