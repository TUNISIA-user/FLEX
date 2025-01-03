// AiTesting.jsx
import React, { useEffect } from "react";

const AiTesting = () => {
  useEffect(() => {
    // Load the Google Custom Search script dynamically
    const script = document.createElement("script");
    script.src = "https://cse.google.com/cse.js?cx=a757cb5214d1b4649";
    script.async = true;
    script.onload = () => {
      // Callback to notify when the script has loaded
      console.log("Google Custom Search loaded");
    };
    document.body.appendChild(script);

    // Clean up the script when the component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div> 
      <div className="gcse-search"></div>
    </div>
  );
};

export default AiTesting;
