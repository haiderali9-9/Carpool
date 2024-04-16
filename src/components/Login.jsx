import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function InputField({ icon, id, className, value, onChange }) {
  return (
    <div className={`flex gap-2 text-base text-blue-500 text-opacity-100 ${className}`}>
      <img src={icon} alt="" className="shrink-0 w-8 aspect-square" />
      <div className="flex flex-col my-auto">
        <input
          type="text"
          id={id}
          className="bg-transparent border-b-2 border-solid border-blue-500 focus:outline-none text-blue-500 text-opacity-100"
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
}

function LoginForm() {
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        navigate('/home');
      } else {
        console.error('Failed to sign in:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <div className="flex flex-col px-14 max-md:px-5 max-md:max-w-full">
      <h1 className="text-4xl text-indigo-900">Login</h1>
      <div className="shrink-0 ml-20 border-solid bg-blue-500 bg-opacity-70 border-[5px] border-blue-500 border-opacity-70 h-[5px] w-[58px] max-md:ml-2.5" />

      <form onSubmit={handleSubmit}>
        <InputField
          icon="https://cdn.builder.io/api/v1/image/assets/TEMP/e50e1525f32345e38810f59d35f2d93e41f392afb4ba1c7ddd512a39dee1f9d4?apiKey=64de786e91da426ba2a9ca662fcb557e&"
          className="mx-6 mt-8 max-md:mx-2.5"
          id ="username"
          value={formData[0]}
          onChange={handleInputChange}
        />
        <InputField
          icon="https://cdn.builder.io/api/v1/image/assets/TEMP/5fec249d959093d8739f116be660c40b0902e96a13c1a6e815ce5af40e5a3141?apiKey=64de786e91da426ba2a9ca662fcb557e&"
          className="mt-20 mr-6 ml-6 max-md:mx-2.5 max-md:mt-10"
          id="password"
          value={formData[1]}
          onChange={handleInputChange}
        />

        <a href="#" className="self-end mt-1.5 mr-9 text-xs text-blue-500 max-md:mr-2.5">
          Forgot Password ?
        </a>

        <button
          type="submit"
          className="justify-center items-center px-16 py-3.5 mt-8 text-lg text-white whitespace-nowrap bg-blue-500 rounded-2xl max-md:px-5"
        >
          Login
        </button>
      </form>

      <div className="self-center mt-24 text-sm text-blue-500 max-md:mt-10">
        New Here?<Link to="/signup" className="text-blue-500">Register Now</Link>
      </div>
    </div>
  );
}

export default function Login() {
  return (
    <main className="flex flex-col items-center justify-center px-16 py-12 w-screen h-screen text-base font-bold bg-white ml-[calc(50% - 50vw)] text-stone-300 text-opacity-60 max-md:px-5">
      <div className="flex flex-col max-w-full w-[446px]">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/bd7ad5004ec65b36a12f6f7292119fd044c78b31256e769c505f8d72354d8925?apiKey=64de786e91da426ba2a9ca662fcb557e&"
          alt="Login illustration"
          className="w-full aspect-[1.78] max-w-[356px] max-md:max-w-full"
        />
        <LoginForm />
      </div>
    </main>
  );
}
