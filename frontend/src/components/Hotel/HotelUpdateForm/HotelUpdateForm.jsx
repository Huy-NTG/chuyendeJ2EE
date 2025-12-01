import { useEffect, useState } from "react";
import axios from "axios";
import classNames from "classnames/bind";
import styles from "./HotelUpdateForm.module.scss";

const cx = classNames.bind(styles);

const HotelUpdateForm = ({ hotel, onClose, onSave }) => {
  const [form, setForm] = useState({
    name: "",
    location: "",
    description: "",
    address: "",
  });

  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const firstImage = hotel?.images?.length > 0 ? hotel.images[0] : null;

  useEffect(() => {
    if (hotel) {
      setForm({
        name: hotel.name,
        location: hotel.location,
        description: hotel.description,
        address: hotel.address,
      });
    }
  }, [hotel]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setPreviewUrl(URL.createObjectURL(selected));
    }
  };

  const handleSubmit = async () => {
    // 1️⃣ Cập nhật chữ
    await onSave(hotel.id, form);

    // 2️⃣ Nếu có ảnh mới → cập nhật ảnh đầu tiên
    if (file && firstImage) {
      const formData = new FormData();
      formData.append("image", file);

      try {
        await axios.put(
          `http://localhost:8080/api/hotels/images/${firstImage.id}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        alert("Ảnh đầu tiên đã được cập nhật!");
      } catch (error) {
        console.error("Lỗi cập nhật ảnh:", error);
        alert("Không thể cập nhật ảnh!");
      }
    }

    onClose();
  };

  return (
    <div className={cx("overlay")}>
      <div className={cx("modal")}>
        <h2>Chỉnh sửa khách sạn</h2>

        <label>Tên khách sạn</label>
        <input name="name" value={form.name} onChange={handleChange} />

        <label>Vị trí</label>
        <input name="location" value={form.location} onChange={handleChange} />

        <label>Mô tả</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
        />

        <label>Địa chỉ</label>
        <input name="address" value={form.address} onChange={handleChange} />

        {/* Ảnh */}
        <div className={cx("image-section")}>
          <label>Ảnh hiện tại:</label>
          <div className={cx("image-wrapper")}>
            {firstImage ? (
              <img
                src={`http://localhost:8080/uploads/${firstImage.imgUrl}`}
                alt="Current"
                className={cx("current-image")}
              />
            ) : (
              <p>Không có ảnh</p>
            )}
          </div>

          <label>Ảnh mới:</label>
          <input type="file" accept="image/*" onChange={handleFileChange} />

          {previewUrl && (
            <div className={cx("preview-wrapper")}>
              <img src={previewUrl} alt="Preview" className={cx("preview-image")} />
            </div>
          )}
        </div>

        <div className={cx("actions")}>
          <button className={cx("btn-save")} onClick={handleSubmit}>Lưu</button>
          <button className={cx("btn-cancel")} onClick={onClose}>Hủy</button>
        </div>
      </div>
    </div>
  );
};

export default HotelUpdateForm;