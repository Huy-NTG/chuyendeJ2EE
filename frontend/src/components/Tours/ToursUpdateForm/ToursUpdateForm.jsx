import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./ToursUpdateForm.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const TourUpdateForm = ({ tourId, onClose, onSuccess }) => {
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  // 🔁 Fetch dữ liệu tour theo ID
  useEffect(() => {
    const fetchTour = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/tours/${tourId}`);
        setTour(res.data);
      } catch (err) {
        console.error("Lỗi khi tải tour:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTour();
  }, [tourId]);

  // 🧠 Khi chưa tải xong
  if (loading) return <div className={cx("loading")}>Đang tải dữ liệu...</div>;
  if (!tour) return <div className={cx("error")}>Không tìm thấy tour.</div>;

  // ✏️ Khi thay đổi input text
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTour((prev) => ({ ...prev, [name]: value }));
  };

  // 🖼 Khi chọn ảnh mới
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile)); // Hiển thị ảnh mới tạm thời
    }
  };

  // 💾 Gửi dữ liệu cập nhật
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    // Thêm dữ liệu text
    for (const key in tour) {
      if (key !== "imageUrl") {
        formData.append(key, tour[key]);
      }
    }

    // Nếu có file mới thì thêm vào
    if (file) formData.append("image", file);

    try {
      await axios.put(`http://localhost:8080/api/tours/${tourId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("✅ Cập nhật tour thành công!");
      onSuccess?.();
      onClose();
    } catch (err) {
      console.error("❌ Lỗi khi cập nhật tour:", err);
      alert("❌ Không thể cập nhật tour!");
    }
  };

  return (
    <div className={cx("overlay")}>
      <div className={cx("form-container")}>
        <h3>Cập nhật Tour</h3>

        <form onSubmit={handleSubmit} className={cx("form")}>
          <input
            type="text"
            name="name"
            value={tour.name || ""}
            onChange={handleChange}
            placeholder="Tên tour"
            required
          />
          <input
            type="text"
            name="location"
            value={tour.location || ""}
            onChange={handleChange}
            placeholder="Địa điểm"
          />
          <textarea
            name="description"
            value={tour.description || ""}
            onChange={handleChange}
            placeholder="Mô tả"
          />
          <input
            type="number"
            name="price"
            value={tour.price || ""}
            onChange={handleChange}
            placeholder="Giá"
          />
          <input
            type="number"
            name="seats"
            value={tour.seats || ""}
            onChange={handleChange}
            placeholder="Số chỗ"
          />

          {/* 🖼 Hiển thị ảnh hiện tại và preview ảnh mới */}
          <div className={cx("image-section")}>
            <label>Ảnh hiện tại:</label>
            <div className={cx("image-wrapper")}>
              <img
                src={`http://localhost:8080/uploads/${tour.imageUrl}`}
                alt={tour.name}
                className={cx("tour-image")}
              />
            </div>

            <label>Ảnh mới:</label>
            <input type="file" accept="image/*" onChange={handleFileChange} />
            {previewUrl && (
              <div className={cx("preview-wrapper")}>
                {/* <p>Ảnh mới:</p> */}
                <img src={previewUrl} alt="Preview" className={cx("preview-image")} />
              </div>
            )}
          </div>

          <div className={cx("button-group")}>
            <button type="submit" className={cx("save-btn")}>Lưu</button>
            <button type="button" onClick={onClose} className={cx("cancel-btn")}>Đóng</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TourUpdateForm;
