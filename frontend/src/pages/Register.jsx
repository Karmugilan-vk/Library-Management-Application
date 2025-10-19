import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [photo, setPhoto] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      if (photo) formData.append("photo", photo);

      const response = await API.post("/users/register", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Registered successfully!");
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        {/* Left side image */}
        <div className="register-left">
          <img src="/register-bg.jpg" alt="Register Background" className="register-image" />
        </div>

        <div className="register-right">
          <h2>Create Account</h2>
          <p>Join our platform and start exploring!</p>

          <form onSubmit={handleSubmit}>
            <label>Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label>Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <label>Upload Photo</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setPhoto(e.target.files[0])}
            />

            <button type="submit">Register</button>
          </form>

          <div className="register-footer">
            Already have an account?{" "}
            <Link to="/" className="login-link">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
