import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "./authService";

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        try {
            const response = await authService.login(formData.email, formData.password);
            setSuccess("Login successful! Redirecting to post...");

            setTimeout(() => {
                navigate("/post");  // ✅ Chuyển hướng sau khi đăng nhập thành công
            }, 1500); 
        } catch (error) {
            if (error.response) {
                setError(error.response.data.message || "Login failed");
            } else {
                setError("Login failed");
            }
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                {error && <p style={{ color: "red" }}>{error}</p>}
                {success && <p style={{ color: "green" }}>{success}</p>}
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;