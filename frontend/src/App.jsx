import './App.css'
import { Outlet } from 'react-router-dom';
import TravelPage from './pages/TravelPage.jsx';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HomePage from './pages/Home.jsx';
import TourDetailPage from './pages/TourDetailPage.jsx';
import HoteDetaillPage from './pages/HotelDetailPage.jsx';
import HotelPage from './pages/HotelPage.jsx';
import FlightPage from './pages/FlightPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import PaymentPage from './pages/PaymentPage.jsx';
import AdminPage from './pages/Adminpage/AdminPage';
import AdminDashboard from './pages/Adminpage/AdminDashboard/AdminDashboard';
import AdminBookings from './pages/Adminpage/AdminBookings/AdminBookings';
import AdminFlights from './pages/Adminpage/AdminFlights/AdminFlights';
import AdminHotels from './pages/Adminpage/AdminHotels/AdminHotels';
import AdminTours from './pages/Adminpage/AdminTours/AdminTours';
import AdminUsers from './pages/Adminpage/AdminUsers/AdminUsers';
import { useContext } from "react";
import { UserContext } from "./context/UserContext";
import ChatBot from "./components/ChatBot.jsx";
import Header from "./components/Global/Header";

const AdminProtectedRoute = ({ isAdmin }) => {
  return isAdmin ? <Outlet /> : <Navigate to="/" replace />;
};
export default function App() {
  const { currentUser, isLoading } = useContext(UserContext);
  if (isLoading) return null;
  console.log("user:",currentUser);
  const isAdmin = !!currentUser && String(currentUser.role).toLocaleLowerCase() === "admin".toLocaleLowerCase();
  console.log(isAdmin);
  return (
    <>
    <ChatBot />
    <Routes>
      <Route
  path="/"
  element={
    currentUser && String(currentUser.role).toLowerCase() === "admin"
      ? <Navigate to="/admin" replace />
      : <HomePage />
  }
/>
      {/* <Route path="/" element={<HomePage />} /> */}
      <Route path="/tours/:id" element={<TourDetailPage />} />
      <Route path="/tours/location/:location" element={<TravelPage/>}/>
      <Route path='/hotels/:id_hotel' element={<HoteDetaillPage/>}/>
      <Route path='/hotels/location/:location' element={<HotelPage/>}/>
      <Route path='/flights/location/:departure/:arrival' element={<FlightPage/>}/>
      <Route path='/profile/user/:id_user' element={<ProfilePage/>}/>
      <Route path='/payment/:type/' element={<PaymentPage/>}/>

      {/* <Route path="/" element={<Navigate to="/default" />} /> */}
      {/* <Route path="/default" element={<DefaultPage />} /> */}
      
      <Route path="/admin" element={<AdminProtectedRoute isAdmin={isAdmin} />}>
        <Route element={<AdminPage />}>
          <Route index element={<AdminDashboard />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="tours" element={<AdminTours />} />
          <Route path="flights" element={<AdminFlights />} />
          <Route path="hotels" element={<AdminHotels />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="bookings" element={<AdminBookings />} />
        </Route>
      </Route>
    </Routes>
    </>
  );
}


