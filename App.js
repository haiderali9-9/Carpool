import reactDom from "react-dom";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LogoLoading from "./src/components/LogoLoading";
import SignUp from "./src/components/SignUp";
import Otp from "./src/components/Otp";
import Login from "./src/components/Login";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      {isLoading ? (
        <LogoLoading />
      ) : (
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/home" element={<SignUp />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/otp" element={<Otp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      )}
    </Router>
  );
};

export default App;


reactDom.render(<App />, document.getElementById("root"));


