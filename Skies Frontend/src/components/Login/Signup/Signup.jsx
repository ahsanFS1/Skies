import React, { useState } from "react";
import "./Skies.css";
import { useNavigate, Link } from "react-router-dom";
const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName,setUserName] = useState("")
  const navigate = useNavigate();
  

  const handleSignup = async (e) => {
    e.preventDefault();
    console.log(userName)
    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userName,email, password }),
      });

      if (response.ok) {
        alert("Account created successfully!");
        

        navigate("/"); // redirect to login
      } else {
        alert("Signup failed!");
      }
    } catch (error) {
      alert("An error occurred!");
    }
  };

  return (
    <div className="body-background">
      <div className="rain" id="rain"></div>
      <div className="cloud cloud-1"></div>
      <div className="cloud cloud-2"></div>
      <div className="cloud cloud-3"></div>

      <div className="container">
        <div className="header">
          <h1>Sign Up</h1>
          <p>Create your Skies account</p>
        </div>

        <form onSubmit={handleSignup}>
          <div className="form-group">
            <input
              type="username"
              placeholder="User Name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>
           <div className="form-group">
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn">
            Create Account
          </button>
        </form>

        <div className="footer-links">
          <Link to="/">Back to Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
