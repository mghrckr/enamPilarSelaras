import React from 'react';
import '../css/Button.css';
import { useNavigate } from "react-router-dom"

const GradientButton = ({text}) => {
  let navigate = useNavigate()
  return (
    <button
      className="shadow-lg shadow-brown-800/80 rounded-lg gradient text-white px-4 py-2 text-sm rounded font-medium focus:ring ring-black ring-opacity-10 gradient element-to-rotate"
      onClick={(e) => {
        e.preventDefault();
        navigate(`/`);
      }}
    >
      Back
    </button>
  );
};

export default GradientButton;
