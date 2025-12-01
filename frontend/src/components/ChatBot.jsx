// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "../styles/ChatBot.css";

// const ChatBot = () => {
//      const navigate = useNavigate();
//      const [open, setOpen] = useState(false);
//      const [messages, setMessages] = useState([
//           { role: "bot", content: "Xin chào! Tôi là AI, bạn muốn hỏi gì?" }
//      ]);
//      const [input, setInput] = useState("");
//      const [loading, setLoading] = useState(false);

//      const toggleChat = () => setOpen(!open);

//      const handleSend = async () => {
//           if (!input.trim()) return;

//           const userMessage = { role: "user", content: input };
//           setMessages(prev => [...prev, userMessage]);
//           setInput("");
//           setLoading(true);

//           try {
//                const requestBody = {
//                     collectionName: "tour_collection",
//                     queryText: input,
//                     topK: 10
//                };

//                const response = await fetch("http://localhost:8080/api/ai/chat", {
//                     method: "POST",
//                     headers: { "Content-Type": "application/json" },
//                     body: JSON.stringify(requestBody)
//                });

//                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

//                const data = await response.json();
//                const tours = (data.context || []).map(item => item.tour);
//                console.log("API response data:", data);

//                let botMessage;

//                if (Array.isArray(tours)) {
//                     // Backend trả về mảng TourResponse
//                     botMessage = { role: "bot", type: "tour_list", tours };
//                } else {
//                     // Backend trả về text bình thường
//                     botMessage = { role: "bot", content: data?.answer || "Không có phản hồi từ AI." };
//                }

//                setMessages(prev => [...prev, botMessage]);

//           } catch (error) {
//                console.error("Lỗi khi gọi API:", error);
//                setMessages(prev => [...prev, { role: "bot", content: "❌ Lỗi khi gọi API." }]);
//           } finally {
//                setLoading(false);
//           }
//      };

//      const formatDate = (dateStr) => {
//           if (!dateStr) return "-";
//           const date = new Date(dateStr);
//           return date.toLocaleDateString("vi-VN");
//      };

//      const formatPrice = (price) => {
//           if (!price) return "-";
//           return Number(price).toLocaleString("vi-VN", { style: "currency", currency: "VND" });
//      };

//      return (
//           <>
//                <div className="chatbot-button" onClick={toggleChat}>🤖</div>

//                {open && (
//                     <div className="chatbot-box">
//                          <div className="chatbot-header">
//                               <span>AI Chat</span>
//                               <button className="chatbot-close" onClick={toggleChat}>✖</button>
//                          </div>

//                          <div className="chatbot-body">
//                               {messages.map((msg, i) => (
//                                    msg.type === "tour_list" ? (
//                                         msg.tours.map(tour => (
//                                              <div key={tour.id} className="tour-card">
//                                                   <img src={tour.imageUrl} alt={tour.name} className="tour-img" />
//                                                   <div className="tour-info">
//                                                        <h4>{tour.name}</h4>
//                                                        <p>📍 {tour.location}</p>
//                                                        <p>💰 {formatPrice(tour.price)}</p>
//                                                        <p>🗓 {formatDate(tour.startDate)} – {formatDate(tour.endDate)}</p>
//                                                        <p>Số chỗ còn nhận: {tour.seats ?? "-"}</p>
//                                                        <p>{tour.description}</p>
//                                                        <button onClick={() => navigate(`/tours/${tour.id}`)}>Xem chi tiết</button>
//                                                   </div>
//                                              </div>
//                                         ))
//                                    ) : (
//                                         <div key={i} className={`msg ${msg.role}`}>{msg.content}</div>
//                                    )
//                               ))}
//                               {loading && <div className="chat-msg bot">...</div>}
//                          </div>

//                          <div className="chatbot-footer">
//                               <input
//                                    type="text"
//                                    placeholder="Nhập tin nhắn..."
//                                    value={input}
//                                    onChange={e => setInput(e.target.value)}
//                                    onKeyDown={e => e.key === "Enter" && handleSend()}
//                               />
//                               <button onClick={handleSend}>Gửi</button>
//                          </div>
//                     </div>
//                )}
//           </>
//      );
// };

// export default ChatBot;
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ChatBot.css";

const ChatBot = () => {
     const navigate = useNavigate();
     const [open, setOpen] = useState(false);
     const [messages, setMessages] = useState([
          { role: "bot", content: "Xin chào! Tôi là AI, bạn muốn hỏi gì?" }
     ]);
     const [input, setInput] = useState("");
     const [loading, setLoading] = useState(false);

     const toggleChat = () => setOpen(!open);

     const handleSend = async () => {
          if (!input.trim()) return;

          const userMessage = { role: "user", content: input };
          setMessages(prev => [...prev, userMessage]);
          setInput("");
          setLoading(true);

          try {
               const requestBody = {
                    collectionName: "tour_collection",
                    queryText: input,
                    topK: 5
               };

               const response = await fetch("http://localhost:8080/api/ai/chat", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(requestBody)
               });

               if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

               const data = await response.json();
               console.log("API response =", data);

               const aiText = data?.answer || "Tôi không có câu trả lời phù hợp.";
               const tours = (data.context || []).map(item => item.tour);

               // 1. Hiển thị câu trả lời text của AI
               setMessages(prev => [
                    ...prev,
                    { role: "bot", content: aiText }
               ]);

               // 2. Nếu có tour → hiển thị thêm block danh sách tour
               if (tours.length > 0) {
                    setMessages(prev => [
                         ...prev,
                         { role: "bot", type: "tour_list", tours }
                    ]);
               }

          } catch (error) {
               console.error("Lỗi khi gọi API:", error);
               setMessages(prev => [...prev, { role: "bot", content: "❌ Lỗi khi gọi API." }]);
          } finally {
               setLoading(false);
          }
     };

     const formatDate = (dateStr) => {
          if (!dateStr) return "-";
          const date = new Date(dateStr);
          return date.toLocaleDateString("vi-VN");
     };

     const formatPrice = (price) => {
          if (!price) return "-";
          return Number(price).toLocaleString("vi-VN", { style: "currency", currency: "VND" });
     };

     return (
          <>
               <div className="chatbot-button" onClick={toggleChat}>🤖</div>

               {open && (
                    <div className="chatbot-box">
                         <div className="chatbot-header">
                              <span>AI Chat</span>
                              <button className="chatbot-close" onClick={toggleChat}>✖</button>
                         </div>

                         <div className="chatbot-body">
                              {messages.map((msg, i) => (
                                   msg.type === "tour_list" ? (
                                        msg.tours.map(tour => (
                                             <div key={tour.id} className="tour-card">
                                                  <img src={tour.imageUrl} alt={tour.name} className="tour-img" />
                                                  <div className="tour-info">
                                                       <h4>{tour.name}</h4>
                                                       <p>📍 {tour.location}</p>
                                                       <p>💰 {formatPrice(tour.price)}</p>
                                                       <p>🗓 {formatDate(tour.startDate)} – {formatDate(tour.endDate)}</p>
                                                       <p>Số chỗ còn nhận: {tour.seats ?? "-"}</p>
                                                       <p>{tour.description}</p>
                                                       <button onClick={() => navigate(`/tours/${tour.id}`)}>Xem chi tiết</button>
                                                  </div>
                                             </div>
                                        ))
                                   ) : (
                                        <div key={i} className={`msg ${msg.role}`}>{msg.content}</div>
                                   )
                              ))}

                              {loading && <div className="msg bot">...</div>}
                         </div>

                         <div className="chatbot-footer">
                              <input
                                   type="text"
                                   placeholder="Nhập tin nhắn..."
                                   value={input}
                                   onChange={e => setInput(e.target.value)}
                                   onKeyDown={e => e.key === "Enter" && handleSend()}
                              />
                              <button onClick={handleSend}>Gửi</button>
                         </div>
                    </div>
               )}
          </>
     );
};

export default ChatBot;
