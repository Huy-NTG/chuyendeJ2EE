export async function loginUser(data){
    try {
        const response = await fetch("http://localhost:8080/api/login", {
            method: "POST",
            headers: { "Content-Type" : "application/json" },
            body: JSON.stringify(data),
        });

        if(!response.ok){
            throw new Error("Đăng nhập thất bại");
        }

        return await response.json();
        } catch (error) {
            return { success: false, message: error.message};
        }
};