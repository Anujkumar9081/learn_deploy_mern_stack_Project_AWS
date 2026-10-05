import React, { useState } from "react";
import { useParams } from "react-router-dom";

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  async function resetPassword() {
const data = await fetch(`http://localhost:3000/api/reset-password/${token}`,
      {
        method: "post",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({
          password
        })
      }
    );
    const ans = await data.text();
    alert(ans);
  }

  return (
    <div>
      <h2>Reset Password</h2>
<input type="password" placeholder="Enter new password"value={password} onChange={(e) => setPassword(e.target.value)}/>

      <button onClick={resetPassword}>
        Reset Password
      </button>

    </div>
  );
};

export default ResetPassword;