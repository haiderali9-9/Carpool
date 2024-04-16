import React, { useState } from "react";
import { Link } from "react-router-dom";
import SignUpImage from '../assests/user.png'; 

const inputFields = [
  {
    id: "email",
    label: "Enter Email",
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/85f98b381b632a8c405312fb1c5c47e41f725168b6e32fa23f0e39f06bba9d17?apiKey=8f116d0eb12a4c578dafc3a9e742eb44&",
    placeholder: "Enter Email",
  },
  {
    id: "password",
    label: "Type Your Password",
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/6cc50a59bca45a925fc472fe1dae17c304b02ba4966bf404e389518db27d2bc7?apiKey=8f116d0eb12a4c578dafc3a9e742eb44&",
    placeholder: "Type Your Password",
  },
  {
    id: "phone",
    label: "Enter Your Phone Number",
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/85dafda31de2508a3b40819c878ed80232f233231c4bd15fe3c6ff66a190e978?apiKey=8f116d0eb12a4c578dafc3a9e742eb44&",
    placeholder: "Enter your Phone Number",
  },
];

function InputField({ id, label, icon, placeholder, value, onChange }) {
  return (
    <div className="flex gap-2.5 mt-6 max-w-full w-[287px] max-md:mt-4">
      <img src={icon} alt="" className="shrink-0 aspect-square w-[29px]" />
      <div className="flex flex-col self-start">
        <label htmlFor={id} className="sr-only">
          {label}
        </label>
        <input
          type="text"
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="text-base text-blue-500 bg-transparent border-b-2 border-solid border-stone-300 focus:outline-none"
        />
      </div>
    </div>
  );
}

function SignUpForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    phone: ""
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    try {
      const response = await fetch('http://localhost:3000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        
        window.location.href = '/otp'; 
      } else {
        console.error('Failed to submit form:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center max-w-full w-[370px]">
      <h1 className="self-stretch mt-3.5 text-4xl text-indigo-900">Sign up</h1>
      {inputFields.map((field) => (
        <InputField 
          key={field.id} 
          {...field} 
          value={formData[field.id]} 
          onChange={handleInputChange} 
        />
      ))}
      <p className="self-stretch mt-12 text-sm text-indigo-500 max-md:mt-8">
        <span className="font-semibold">
          By signing up, you're agree to our{" "}
        </span>
        <a href="#" className="text-blue-500">
          Terms & Conditions
        </a>
        <br />
        <span className="font-semibold">and</span>{" "}
        <a href="#" className="text-indigo-500">
          Privacy Policy
        </a>
      </p>
      <button
        type="submit"
        className="justify-center items-center px-16 py-4 mt-12 max-w-full text-lg font-medium text-white whitespace-nowrap bg-blue-500 rounded-2xl w-[333px] max-md:px-5 max-md:mt-10"
      >
        Continue
      </button>
      <p className="mt-12 text-sm max-md:mt-8">
        <span className="font-semibold">Joined us before?</span>{" "}
        <Link to="/login" className="font-semibold text-blue-500">
          Login
        </Link>
      </p>
    </form>
  );
}

function SignUp() {
  return (
    <main className="flex flex-col items-center justify-center px-16 py-12 w-screen h-screen text-base font-bold bg-white ml-[calc(50% - 50vw)] text-stone-300 text-opacity-60 max-md:px-5">
      <img
        src={SignUpImage}
        alt="Sign up illustration"
        className="max-w-full aspect-[1.56] w-[323px] mb-8"
      />
      <SignUpForm />
    </main>
  );
}

export default SignUp;
