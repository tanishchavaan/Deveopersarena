import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {

    if (!username) {
      alert("Enter username");
      return;
    }

    localStorage.setItem("user", username);
    navigate("/");
  };

  return (

    <div className="p-10 max-w-md mx-auto">

      <h1 className="text-3xl font-bold mb-6">
        Login
      </h1>

      <input
        type="text"
        placeholder="Enter username"
        className="border p-2 w-full mb-4"
        onChange={(e)=>setUsername(e.target.value)}
      />

      <button
        onClick={handleLogin}
        className="bg-black text-white px-4 py-2 w-full"
      >
        Login
      </button>

    </div>

  );
};

export default Login;
