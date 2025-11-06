import './App.css'
import TravelPage from './pages/TravelPage.jsx';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HomePage from './pages/Home.jsx';3
import TourDetailPage from './pages/TourDetailPage.jsx';
function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/tours/:id" element={<TourDetailPage />} />
      <Route path="/tours/location/:location" element={<TravelPage/>}/>
    </Routes>
  );
}
export default App