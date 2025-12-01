import React, { useState } from "react";
import axios from "axios";
import styles from "./AddTourForm.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);
const AddTourForm = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    description: "",
    price: "",
    startDate: "",
<<<<<<< HEAD
    endDate: "",  
=======
    endDate: "",
>>>>>>> origin/master
    seats: "",
  });
  const [imageFile, setImageFile] = useState(null); // Lưu file ảnh
  const [previewUrl, setPreviewUrl] = useState(null); // Ảnh preview
  const [loading, setLoading] = useState(false); // Chặn gửi nhiều lần
  
  // 🧠 Khi thay đổi input text
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 🖼 Khi chọn ảnh
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file)); // Tạo link preview tạm thời
    }
  };

  // 📤 Gửi form
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    try {
      const data = new FormData();

      // Gửi dữ liệu text
      Object.entries(formData).forEach(([key, value]) => {
        if (key === "price" || key === "seats") {
          data.append(key, Number(value)); // ép kiểu số
        } else {
          data.append(key, value);
        }
      });

      // Gửi ảnh (nếu có)
      if (imageFile) {
        data.append("image", imageFile);
      }

      const response = await axios.post("http://localhost:8080/api/tours", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
<<<<<<< HEAD
      console.log(response.data);
=======
>>>>>>> origin/master

      console.log("✅ Server response:", response.data);
      alert("✅ Thêm tour thành công!");

      // Reset form
      setFormData({
        name: "",
        location: "",
        description: "",
        price: "",
        startDate: "",
        endDate: "",
        seats: "",
      });
      setImageFile(null);
      setPreviewUrl(null);
      onSuccess?.(); // 👈 gọi callback để cập nhật danh sách
      onClose();
    } catch (error) {
      console.error("❌ Lỗi khi thêm tour:", error);
      alert("❌ Lỗi khi thêm tour!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={cx("overlay")}>
      <div className={cx("form-container")}>
        <h2>Thêm Tour Mới</h2>
        <form onSubmit={handleSubmit} className={cx("form")}>
          <input
            name="name"
            placeholder="Tên tour"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            name="location"
            placeholder="Địa điểm"
            value={formData.location}
            onChange={handleChange}
            required
          />

          {/* 🖼 Upload ảnh */}
          <div className={cx("image-upload")}>
            <label htmlFor="image" className={cx("upload-label")}>
              Chọn ảnh
            </label>
            <input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className={cx("hidden-input")}
            />
            {previewUrl && (
              <div className={cx("image-preview")}>
                <img src={previewUrl} alt="Preview" />
              </div>
            )}
          </div>

          <textarea
            name="description"
            placeholder="Mô tả"
            value={formData.description}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Giá"
            value={formData.price}
            onChange={handleChange}
            required
          />
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required
          />
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="seats"
            placeholder="Số chỗ"
            value={formData.seats}
            onChange={handleChange}
            required
          />
          <div className={cx("buttons")}>
            <button type="submit" className={cx("submit")} disabled={loading}>
              {loading ? "Đang thêm..." : "Thêm"}
            </button>
            <button type="button" className={cx("cancel")} onClick={onClose}>
              Hủy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTourForm;
