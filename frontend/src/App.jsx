import './App.css'
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/Home.jsx';
import Error from './components/Error.jsx';
import Success from './components/Success.jsx';
import LoginForm from './components/LoginForm.jsx';
import RegisterForm from './components/RegisterForm.jsx';
import TourList from './components/TourList.jsx';
import TourDetailPage from './pages/TourDetailPage.jsx';
import TravelPage from './pages/TravelPage.jsx';
function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/tours/:id" element={<TourDetailPage />} />
      <Route path="/tours/search/:location" element={<TravelPage/>}/>
    </Routes>
  );
}
export default App
