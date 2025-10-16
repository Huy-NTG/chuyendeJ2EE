import './App.css'
import { Route, Routes } from 'react-router-dom';
import { useState } from "react"
import HomePage from './pages/Home.jsx';
import Error from './components/Error.jsx';
import Success from './components/Success.jsx';
import LoginForm from './components/LoginForm.jsx';
import RegisterForm from './components/RegisterForm.jsx';
import TourList from './components/TourList.jsx';
import TourDetail from './pages/TourDetail.jsx';
function App() {

  const [showLogin, setShowLogin] = useState(true);

  return (
    // <div>
      
    //   {showLogin ? (
    //     <LoginPage onSwitch={() => setShowLogin(false)} />
    //   ) : (
    //     <RegisterPage onSwitch={() => setShowLogin(true)} />
    //   )}
    // </div>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />
      {/* 👈 Thêm Route chi tiết tour */}
      <Route path="/tour/:id" element={<TourDetail />} />
    </Routes>
    // <Error></Error>
    // <Success></Success>
    // <TourList></TourList>
  );
}

export default App
