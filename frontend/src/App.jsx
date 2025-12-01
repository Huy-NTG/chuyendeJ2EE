import './App.css'
import TravelPage from './pages/TravelPage.jsx';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HomePage from './pages/Home.jsx';3
import TourDetailPage from './pages/TourDetailPage.jsx';
import HoteDetaillPage from './pages/HotelDetailPage.jsx';
import HotelPage from './pages/HotelPage.jsx';
import FlightPage from './pages/FlightPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import PaymentPage from './pages/PaymentPage.jsx';
function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/tours/:id" element={<TourDetailPage />} />
      <Route path="/tours/location/:location" element={<TravelPage/>}/>
      <Route path='/hotels/:id_hotel' element={<HoteDetaillPage/>}/>
      <Route path='/hotels/location/:location' element={<HotelPage/>}/>
      <Route path='/flights/location/:departure/:arrival' element={<FlightPage/>}/>
      <Route path='/profile/user/:id_user' element={<ProfilePage/>}/>
      <Route path='/payment/:type/' element={<PaymentPage/>}/>

    </Routes>
  );
}
export default App