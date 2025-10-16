import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AdminPage from './pages/Adminpage/AdminPage';
import DefaultPage from './pages/DefaultPage/DefaultPage';
import AdminDashboard from './pages/Adminpage/AdminDashboard/AdminDashboard';
import AdminBookings from './pages/Adminpage/AdminBookings/AdminBookings';
import AdminFlights from './pages/Adminpage/AdminFlights/AdminFlights';
import AdminHotels from './pages/Adminpage/AdminHotels/AdminHotels';
import AdminTours from './pages/Adminpage/AdminTours/AdminTours';
import AdminUsers from './pages/Adminpage/AdminUsers/AdminUsers';

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
