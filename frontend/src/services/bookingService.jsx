import axiosAuth from './axiosAuth';

// bookingService.jsx
export const bookTour = async (bookingData) => {
     const res = await axiosAuth.post("/bookings", bookingData);
     return res.data;
};

export const createMoMoPayment = async (bookingId) => {
     const token = localStorage.getItem("authToken"); // <- thêm dòng này
     const res = await axiosAuth.post(
          `/momo/create?bookingId=${bookingId}`,
          {},
          {
               headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
               },
          }
     );
     return res.data;
};

