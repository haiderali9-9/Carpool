import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 

function OtpInput({ value, onChange }) {
  return (
    <input
      type="text"
      maxLength="1"
      className="w-12 h-12 text-3xl text-center text-blue-500 bg-transparent border-b-2 border-solid border-stone-300 focus:outline-none"
      value={value}
      onChange={onChange}
    />
  );
}

function Otp() {
  const [otpValues, setOtpValues] = useState(["", "", "", ""]);
  const navigate = useNavigate();
  const handleInputChange = (index, newValue) => {
    const newOtpValues = [...otpValues];
    newOtpValues[index] = newValue;
    setOtpValues(newOtpValues);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const otpCode = otpValues.join("");

    try {
      console.log(otpCode);
      const response = await fetch('http://localhost:3000/otpverify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ otpCode })
      });
      
      if (response.ok) {
      navigate('/home');
      } else {
        console.error('Failed to verify OTP:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center px-16 py-12 w-screen h-screen text-base font-bold bg-white ml-[calc(50% - 50vw)] text-stone-300 text-opacity-60 max-md:px-5">
      <div className="flex flex-col max-w-full w-[446px]">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/fada4e0dc443f5c0b745e897218856531e5998adda6d5d8a966558f9b5255f3b?apiKey=8f116d0eb12a4c578dafc3a9e742eb44&"
          alt="Descriptive alt text for the image"
          className="max-w-full aspect-[1.56] w-[323px] mb-8"
        />
        <div className="shrink-0 self-center mt-2 bg-blue-500 bg-opacity-70 h-1 w-71" />
        <div className="flex flex-col items-center pr-12 pl-4 mt-3.5 max-md:pr-5 overflow-hidden">
          <p className="self-start text-stone-300">
            An OTP has been sent to your mobile <br /> number
          </p>
          <form onSubmit={handleSubmit}>
            <div className="flex gap-5 mt-2 max-w-full whitespace-nowrap text-3xl text-neutral-800 w-[285px] max-md:mt-10">
              {otpValues.map((value, index) => (
                <OtpInput
                  key={index}
                  value={value}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                />
              ))}
            </div>
            <button className="justify-center items-center px-16 py-3 mt-16 max-w-full font-medium text-white whitespace-nowrap bg-blue-500 rounded-2xl w-[287px] max-md:px-5 max-md:mt-10">
              Verify
            </button>
          </form>
          <button className="justify-center items-center px-16 py-4 mt-9 max-w-full font-medium bg-white rounded-2xl border-2 border-gray-300 border-solid text-stone-400 text-opacity-70 w-[287px] max-md:px-5">
            Resend Code
          </button>
          <p className="self-center mt-28 text-sm font-bold text-blue-500 max-md:mt-10">
            Need Help?<span className="text-blue-500"> Contact Us</span>
          </p>
        </div>
      </div>
    </main>
  );
}

export default Otp;
