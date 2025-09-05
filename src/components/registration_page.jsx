import { useState } from "react";
import "./styles/registration_page.css";
import { Link } from 'react-router-dom';


//API callovi za reg ne rade, promjenio sam forgot password link, da vodi na login, jer ima vise smisla - Redzep


function RegistrationPage() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [device, setDevice] = useState("");

  const API_URL = "https://biblioteka.simonovicp.com/api/register";

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newUser = {
      email,
      password,
    };

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "b3Rvcmlub2xhcmluZ29sb2dpamE=",
        },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        throw new Error("Registration failed");
      }

      const data = await response.json();
      console.log("User registered:", data);
      alert("Registration successful!");

      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Error:", error);
      alert("Registration failed: " + error.message);
    }
  };

  return (
    <div className="overlay registration-body">
      <form className="registration-form" onSubmit={handleSubmit}>
        <h2>Online biblioteka</h2>
        <div>
          <label>Name</label>
          <input
            type="text"
            required
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label>Surname</label>
          <input
            type="text"
            required
            placeholder="Your surname"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
          />
          <label>Email</label>
          <input
            type="email"
            required
            placeholder="example@example.net"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Username</label>
          <input
            type="text"
            required
            placeholder="Choose your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Password</label>
          <input
            type="password"
            required
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label>Confirm Password</label>
          <input
            type="password"
            required
            placeholder="Please confirm your password"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
          <label>Device</label>
          <input
            type="text"
            required
            placeholder="What device are you using?"
            value={device}
            onChange={(e) => setDevice(e.target.value)}
          />
          <button type="submit">
            <strong>SIGN UP</strong>
          </button>
          <Link to="/login">Already have an account? Log in here.</Link>
        </div>
        <p style={{ color: "#00000070" }}>
          ©2021 ICT Cortex. All rights reserved.
        </p>
      </form>
    </div>
  );
}

export default RegistrationPage;
