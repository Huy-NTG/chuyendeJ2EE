// Đặt hàm này bên ngoài component hoặc trong một file tiện ích (utility file)

export const slugify = (str) => {
    // 1. Chuyển sang chữ thường
    str = str.toLowerCase();

    // 2. Chuyển đổi các ký tự có dấu thành không dấu
    str = str.replace(/á|à|ả|ã|ạ|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/g, 'a');
    str = str.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/g, 'e');
    str = str.replace(/í|ì|ỉ|ĩ|ị/g, 'i');
    str = str.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/g, 'o');
    str = str.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/g, 'u');
    str = str.replace(/ý|ỳ|ỷ|ỹ|ỵ/g, 'y');
    str = str.replace(/đ/g, 'd');

    // 3. Xóa các ký tự đặc biệt, giữ lại chữ cái, số và dấu gạch ngang
    str = str.replace(/[^0-9a-z- ]/g, ''); 

    // 4. Thay thế khoảng trắng và gạch dưới bằng dấu gạch ngang (-)
    str = str.replace(/ /g, '-'); 
    
    // 5. Đảm bảo không có nhiều dấu gạch ngang liền kề
    str = str.replace(/-+/g, '-'); 
    
    // 6. Xóa dấu gạch ngang ở đầu và cuối chuỗi (nếu có)
    str = str.replace(/^-+|-+$/g, ''); 
    
    return str;
};