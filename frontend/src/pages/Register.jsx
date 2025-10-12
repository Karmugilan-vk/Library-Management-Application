import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import API from "../services/api";


function Register() {
  const[name, setName] = useState("");
  const[email, setEmail] = useState("");
  const[password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSumbit = async (e) => {
    e.preventDefault();
    try{
      const response = await API.post("/users/register", {
        name, email, password,
      });

      alert("Registered successfully");
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="container">
      <h2>Register</h2>
      <form onSubmit={handleSumbit}>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required /><br />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required /><br />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required /><br />
        <button type="submit">Register</button>
      </form>
      <p>Already have an account? <Link to="/">Login</Link></p>
    </div>
  );
}

export default Register;