import React, { useRef,useState } from "react";
import "../../styles/style.css";
import { login } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

export default function LoginForm({onSwitch, onClose}) {
    const { setCurrentUser } = useContext(UserContext);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({username: "", password: ""});
    const [showPassword, setShowPassword] = useState(false);
    const inputRef = useRef(null);
    const [isFocused, setIsFocused] = useState(false);
    const [errors, setErrors] = useState({});

    const togglePassword = () => {
            setShowPassword((s) => !s);
            inputRef.current?.focus();
        };
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userData = await login(formData); 
            // alert(`Đăng nhập thành công! Chào mừng ${userData.username}`);
            setCurrentUser({ ...userData });
            if (userData.role.toLowerCase() === "admin") {
                navigate("/admin", { replace: true });
            } else {
                navigate("/", { replace: true });
            onClose();

            }
        } catch (error) {
            console.error("Lỗi đăng nhập:", error);
            alert(`Đăng nhập thất bại! Chi tiết: ${error.message}`);
        }
    };
    

    return (
        <div className="login flex justify-center bg-white rounded-xl">
            <div className="login--wrapper px-8 w-96 mt-5 mb-5 ">
                <div className="flex justify-end">
                    <button onClick={onClose} className="fa-solid fa-x inline-block text-gray-400 hover:text-black"></button>
                </div>
                <h2 className="login__title text-2xl flex justify-center font-bold mb-2 right-0">Đăng nhập</h2>
                <form onSubmit={handleSubmit} className="login__form">
                    <div className="login__field">
                        <label name="label" className="login__label block px-8 text-left pl-0">Tên đăng nhập</label>
                        <input 
                        type="text" 
                        name="username"
                        placeholder="Tên đăng nhập"
                        value={formData.username}
                        onChange={handleChange}
                        onClick={() => setErrors({})}
                        className={`login__input w-full rounded p-3 ${errors.username ? "bg-red-300 border-red-800 border-2" : "bg-gray-200 focus:bg-white focus:text-black hover:bg-gray-400"}`}
                        />
                        {errors.username && (
                            <p className="text-red-500 text-sm mt-1">{errors.username}</p>
                        )}
                    </div>
                    <div className="relative">
                        <label name="label" className="login__label block px-8 text-left pl-0">Mật khẩu</label>
                        <input 
                        ref={inputRef}
                        type={showPassword ? 'text' : 'password'} 
                        name="password"
                        placeholder="Mật khẩu"
                        value={formData.password}
                        onChange={handleChange}
                        onFocus={() => setIsFocused(true)}   // focus → show button
                        onBlur={() => setIsFocused(false)}   // blur → hide button
                        onClick={() => setErrors({})}
                        className={`login__input w-full rounded p-3 ${errors.password ? "bg-red-300 border-red-800 border-2" : "bg-gray-200 focus:bg-white focus:text-black hover:bg-gray-400"}`}
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                        )}
                    {isFocused &&(
                        <button type="button" onClick={togglePassword} onMouseDown={(e) => e.preventDefault()} className="absolute right-3 top-9 rounded-4xl text-gray-500 hover:text-black ">
                            {showPassword ? "Ẩn" : "Hiện"}
                        </button>
                    )}
                    </div>
                    <button 
                        type="submit" 
                        disabled={!formData.username || !formData.password}
                        className={`login__button text-white w-full mt-2 mb-1 bg-black text-2xl rounded-2xl py-2 font-bold cursor-pointer
                            ${!formData.username || !formData.password ? "bg-gray-400 cursor-not-allowed" : "hover:bg-green-400 hover:text-black"
                        }`}
                            >Đăng nhập</button>
                </form>

                <p className="login__swtich ">
                    Chưa có tài khoản?{""}
                    <button type="button" onClick={onSwitch} className="login__link text-blue-600 ml-1.5 font underline cursor-pointer">Đăng ký</button>
                </p>
            </div>
        </div>
    );
}


// export default function LoginForm({ onSubmit, onSwitch, onClose }) {
//     const [username, setUsername] = useState("");
//     const [password, setPassword] = useState("");
//     const [loading, setLoading] = useState(false);

//     const handleLogin = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         try {
//             const res = await login({ username, password });
//             // res = { id, username, token }
//             onSubmit(res); // Trả về App để setUser
//         } catch (err) {
//             alert(err.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <form
//             onSubmit={handleLogin}
//             className="bg-white p-5 rounded shadow-md w-96 flex flex-col gap-3"
//         >
//             <h2 className="text-2xl font-bold text-center">Đăng nhập</h2>
//             <input
//                 type="text"
//                 placeholder="Username"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 className="border p-2 rounded"
//                 required
//             />
//             <input
//                 type="password"
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="border p-2 rounded"
//                 required
//             />
//             <button
//                 type="submit"
//                 className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
//                 disabled={loading}
//             >
//                 {loading ? "Đang đăng nhập..." : "Đăng nhập"}
//             </button>
//             <p className="text-center text-sm">
//                 Chưa có tài khoản?{" "}
//                 <span className="text-blue-600 cursor-pointer" onClick={onSwitch}>
//                     Đăng ký
//                 </span>
//             </p>
//             <button type="button" onClick={onClose} className="text-red-500 mt-2">
//                 Đóng
//             </button>
//         </form>
//     );
// }
