// import { Route, Routes } from "react-router-dom";
// import './App.css';
// import HomePage from './pages/Home.jsx';
// import HoteDetaillPage from './pages/HotelDetailPage.jsx';
// import TourDetailPage from './pages/TourDetailPage.jsx';
// import TravelPage from './pages/TravelPage.jsx';
// 3
// function App() {
//   return (
//     <Routes>
//       <Route path="/" element={<HomePage />} />
//       <Route path="/tours/:id" element={<TourDetailPage />} />
//       <Route path="/tours/location/:location" element={<TravelPage />} />
//       <Route path='/hotels/:id_hotel' element={<HoteDetaillPage />} />
//     </Routes>
//   );
// }
// export default App
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import ChatBot from "./components/ChatBot.jsx";
import Header from "./components/Global/Header";
import HomePage from "./pages/Home.jsx";
import HoteDetaillPage from "./pages/HotelDetailPage.jsx";
import TourDetailPage from "./pages/TourDetailPage.jsx";
import TravelPage from "./pages/TravelPage.jsx";

function App() {
  const [user, setUser] = useState(() => {
    // Lấy user từ localStorage khi load trang
    return JSON.parse(localStorage.getItem("user")) || null;
  });

  // Đồng bộ localStorage khi user thay đổi
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("authToken", user.token);
    } else {
      localStorage.removeItem("user");
      localStorage.removeItem("authToken");
    }
  }, [user]);

  return (
    <>
      <ChatBot />
      <Header user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/tours/:id" element={<TourDetailPage user={user} />} />
        <Route path="/tours/location/:location" element={<TravelPage />} />
        <Route path="/hotels/:id_hotel" element={<HoteDetaillPage />} />
      </Routes>
    </>
  );
}
export default App;