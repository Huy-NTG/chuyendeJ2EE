import './App.css'
<<<<<<< HEAD
import TravelPage from './pages/TravelPage.jsx';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HomePage from './pages/Home.jsx';3
import TourDetailPage from './pages/TourDetailPage.jsx';
import HoteDetaillPage from './pages/HotelDetailPage.jsx';
import HotelPage from './pages/HotelPage.jsx';
import FlightPage from './pages/FlightPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import PaymentPage from './pages/PaymentPage.jsx';
=======
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
>>>>>>> origin/master
import AdminPage from './pages/Adminpage/AdminPage';
import DefaultPage from './pages/DefaultPage/DefaultPage';
import AdminDashboard from './pages/Adminpage/AdminDashboard/AdminDashboard';
import AdminBookings from './pages/Adminpage/AdminBookings/AdminBookings';
import AdminFlights from './pages/Adminpage/AdminFlights/AdminFlights';
import AdminHotels from './pages/Adminpage/AdminHotels/AdminHotels';
import AdminTours from './pages/Adminpage/AdminTours/AdminTours';
import AdminUsers from './pages/Adminpage/AdminUsers/AdminUsers';
<<<<<<< HEAD
import { useCurrentUser } from './hooks/useCurrentUser.jsx';

const AdminProtectedRoute = ({ isAdmin }) => {
    return isAdmin ? <AdminPage /> : <Navigate to="/" replace />; 
};
export default function App() {
  const { currentUser } = useCurrentUser() || {};
  const isAdmin = !!currentUser && String(currentUser.role).toLocaleLowerCase() === "admin".toLocaleLowerCase();
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
      <Route path="/" element={<Navigate to="/default" />} />
      <Route path="/default" element={<DefaultPage />} />
      <Route path="/admin" element={<AdminProtectedRoute isAdmin={isAdmin}/>}>
        <Route index element={<AdminDashboard />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="tours" element={<AdminTours />} />
        <Route path="flights" element={<AdminFlights />} />
        <Route path="hotels" element={<AdminHotels />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="bookings" element={<AdminBookings />} />
      </Route>
    </Routes>
  );
}

=======

function App() {
  return (
    <Router>
      <Routes>
        {/* Trang mặc định */}
        <Route path="/" element={<Navigate to="/default" />} />
        <Route path="/default" element={<DefaultPage />} />

        {/* Trang quản trị - có sidebar cố định */}
        <Route path="/admin" element={<AdminPage />}>
          {/* Đây là các route con nằm trong layout AdminPage */}
          <Route index element={<AdminDashboard />} /> {/* Khi vào /admin thì load Dashboard */}
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="tours" element={<AdminTours />} />
          <Route path="flights" element={<AdminFlights />} />
          <Route path="hotels" element={<AdminHotels />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="bookings" element={<AdminBookings />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App;
>>>>>>> origin/master
