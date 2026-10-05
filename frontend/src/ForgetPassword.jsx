import React, { useState } from "react";

const ForgetPassword = () => {

  const [forgetEmail, setforgetEmail] = useState("");

  async function forget() {

    const data = await fetch("http://localhost:3000/forget_password",
      {
        method: "post",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({
          email: forgetEmail
        })
      }
    );
    const ans = await data.text();
    alert(ans);
  }

  return (
    <div>

      <h2>Forgot Password</h2>
<input placeholder="Enter your registered email" value={forgetEmail}onChange={(e) => setforgetEmail(e.target.value)}/>

    <button onClick={forget}>Send Reset Link</button>

    </div>
  );
};

export default ForgetPassword;