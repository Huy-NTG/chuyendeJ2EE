import React, { useRef,useState } from "react";
import "../styles/style.css";

export default function LoginForm({onSubmit, onSwitch}) {
    const [formData, setFormData] = useState({username: "", password: ""});
    const [showPassword, setShowPassword] = useState(true);
    const inputRef = useRef(null);
    const [isFocused, setIsFocused] = useState(false);
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = [{}];
        if(formData.username.trim())
            newErrors.username = "Tên đăng nhập không được để trống";
        if (!formData.password.trim()) 
            newErrors.password = "Mật khẩu không được để trống";
    }
    const togglePassword = () => {
            setShowPassword((s) => !s);
            inputRef.current?.focus();
        };
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        onSubmit(formData);
    };


    return (
        <div className="login flex justify-center bg-white rounded-xl">
            <div className="login--wrapper px-8 w-96 mt-5 mb-5 ">
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