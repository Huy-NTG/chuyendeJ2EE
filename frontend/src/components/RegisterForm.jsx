import React, { useRef, useState } from "react";

export default function RegisterForm({onSubmit, onSwitch}) {
    const [formData, setFormData] = useState({username: "", email: "", 
                                                phone: "", password: ""});
    const [confirm, setConfirm] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const inputRef = useRef(null);
    const [isFocused, setIsFocused] = useState(false);
    const [errors, setErrors] = useState({});

    const togglePassword = () => {
        setShowPassword((s) => !s);
        inputRef.current?.focus();
    };
    const handleChange = (e) => {
        if (e.target.name === "confirm") {
      setConfirm(e.target.value); // chỉ update confirm riêng
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    };

    const validateForm = () => {
        const newErrors = {};
        if(!formData.username.trim())
            newErrors.username = "Tên đăng nhập không được để trống";
        else if (formData.username.length < 6)
            newErrors.username = "Tên đăng nhập phải có ít nhất 6 k tự"
        if (!formData.email.trim()) {
            newErrors.email = "Email không được để trống";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email không hợp lệ";
        }
        if (!formData.phone.trim())
            newErrors.phone = "Số điện thoại không được để trống";
        else if(!/^(0|\+84)(3[2-9]|5[2689]|7[0|6-9]|8[1-9]|9[0-9])[0-9]{7}$/.test(formData.phone))
            newErrors.phone = "Số điện thoại không hợp lệ";
        if (!formData.password.trim()) {
            newErrors.password = "Mật khẩu không được để trống";
        } else if (formData.password.length < 8) {
            newErrors.password = "Mật khẩu phải có ít nhất 8 ký tự";
        }

        if (confirm !== formData.password) {
            newErrors.confirm = "Mật khẩu xác nhận không khớp";
        }

        return newErrors;
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            setErrors({});
            onSubmit(formData); // ✅ gửi dữ liệu nếu hợp lệ
            onSwitch();
        }
    };

    return (
        <div className="register flex justify-center bg-white rounded-xl">
            <div className="register--wrapper px-8 w-96 mt-5 mb-5">
                <h2 className="register__title text-2xl flex justify-center font-bold mb-2">Đăng ký</h2>
                <form onSubmit={handleSubmit}>
                    <div className="register__field">
                        <label name="label" className="register__label block px-8 text-left pl-0">Tên đăng nhập</label>
                        <input 
                        type="text" 
                        name="username" 
                        value={formData.username} 
                        placeholder="Tên đăng nhập"
                        onChange={handleChange}
                        onClick={() => setErrors({})}
                        className={`register__input w-full rounded p-3 ${errors.username ? "bg-red-300 border-red-800 border-2" : "bg-gray-200 focus:bg-white focus:text-black hover:bg-gray-400"}`}
                        />
                        {errors.username && (
                            <p className="text-red-500 text-sm mt-1">{errors.username}</p>
                        )}
                    </div>
                    <div>
                        <label name="label" className="register__label block px-8 text-left pl-0">Email</label>
                        <input 
                        type="text" 
                        name="email" 
                        value={formData.email} 
                        placeholder="Email"
                        onChange={handleChange}
                        onClick={() => setErrors({})}
                        className={`register__input w-full rounded p-3 ${errors.email ? "bg-red-300 border-red-800 border-2" : "bg-gray-200 focus:bg-white focus:text-black hover:bg-gray-400"}`}
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                        )}
                    </div>
                    <div>
                        <label name="label" className="register__label block px-8 text-left pl-0">Số điện thoại</label>
                        <input 
                        type="text" 
                        name="phone" 
                        value={formData.phone} 
                        placeholder="Số điện thoại"
                        onChange={handleChange}
                        onClick={() => setErrors({})}
                        className={`register__input w-full rounded p-3 ${errors.phone ? "bg-red-300 border-red-800 border-2" : "bg-gray-200 focus:bg-white focus:text-black hover:bg-gray-400"}`}
                        />
                        {errors.phone && (
                            <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                        )}
                    </div>
                    <div className="relative">
                        <label name="label" className="register__label block px-8 text-left pl-0">Mật khẩu</label>
                        <input 
                        ref={inputRef}
                        type={showPassword ? 'text' : 'password'} 
                        name="password" 
                        value={formData.password} 
                        placeholder="Mật khẩu"
                        onChange={handleChange}
                        onFocus={() => setIsFocused(true)}   // focus → show button
                        onBlur={() => setIsFocused(false)}   // blur → hide button
                        onClick={() => setErrors({})}
                        className={`register__input w-full rounded p-3 ${errors.password ? "bg-red-300 border-red-800 border-2" : "bg-gray-200 focus:bg-white focus:text-black hover:bg-gray-400"}`}
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
                    <div>
                        <label name="label" className="register__label block px-8 text-left pl-0">Xác nhận mật khẩu</label>
                        <input 
                        type="password" 
                        name="confirm" 
                        value={confirm} 
                        placeholder="Xác nhận mật khẩu"
                        onChange={handleChange}
                        onClick={() => setErrors({})}
                        className={`register__input w-full rounded p-3 ${errors.confirm ? "bg-red-300 border-red-800 border-2" : "bg-gray-200 focus:bg-white focus:text-black hover:bg-gray-400"}`}
                        />
                        {errors.confirm && (
                            <p className="text-red-500 text-sm mt-1">{errors.confirm}</p>
                        )}
                    </div>
                    <button 
                        type="submit" 
                        disabled={!formData.username.trim() ||
                                !formData.email.trim() ||
                                !formData.password.trim() ||
                                !formData.phone.trim() ||
                                !confirm.trim()}
                        className={`login__button text-white w-full mt-2 mb-1 bg-black text-2xl rounded-2xl py-2 font-bold cursor-pointer
                        ${!formData.username.trim() ||
                            !formData.email.trim() ||
                            !formData.password.trim() ||
                            !formData.phone.trim() ||
                            !confirm.trim() ? "bg-gray-400 cursor-not-allowed" : "hover:bg-green-400 hover:text-black"} `}
                        >Đăng ký</button>
                </form>
                <p>
                    Đã có tài khoản ?{""}
                    <button type="button" onClick={onSwitch} className="login__link text-blue-600 ml-1.5 font underline  cursor-pointer">Đăng nhập</button>
                </p>
            </div>
        </div>
    );
}