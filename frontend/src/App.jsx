import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import ForgetPassword from './ForgetPassword';
import ResetPassword from './ResetPassword';

function Home() {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [finalans, setfinalans] = useState({});

  const navigate = useNavigate();

  async function signup() {
    const email_check = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email_check.test(email)) {
      return alert("enter the valid email id");
    }

    const data = await fetch("http://localhost:3000/signup", {
      method: "post",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        name,
        email,
        password
      })
    });

    const ans = await data.text();

    alert(ans);

    setname("");
    setemail("");
    setpassword("");
  }

  async function login() {
    const data = await fetch("http://localhost:3000/login", {
      method: "post",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        name,
        email,
        password
      })
    });

    const ans = await data.json();

    localStorage.setItem("token", ans.token);

    alert(ans.message);

    setemail("");
    setpassword("");

    getuser();
  }

  async function getuser() {
    const data1 = await fetch("http://localhost:3000/me", {
      headers: {
        authorization: localStorage.getItem("token")
      }
    });

    const ans1 = await data1.json();

    setfinalans(ans1);

    console.log(ans1);
  }

  useEffect(() => {
    getuser();
  }, []);

  return (
    <div>

      <input
        placeholder="Enter your name here"
        value={name}
        onChange={(e) => setname(e.target.value)}
      />

      <input
        placeholder="Enter your email here"
        value={email}
        onChange={(e) => setemail(e.target.value)}
      />

      <input
        placeholder="Enter your password here"
        value={password}
        onChange={(e) => setpassword(e.target.value)}
      />

      <button onClick={signup}>
        registration
      </button>

      <button onClick={login}>
        login
      </button>

      <br />
      <br />

      <hr />

      <p>Name:= {finalans.name}</p>
      <p>Email:= {finalans.email}</p>
      <p>Role:= {finalans.role}</p>

      <hr />

      <br />

      <button onClick={() => navigate("/forget-password")}>
        Forgot Password?
      </button>

    </div>
  );
}


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/forget-password"
          element={<ForgetPassword />}
        />
        <Route
          path="/reset-password/:token"
          element={<ResetPassword />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;