import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchKodeOperators, setPickedBerdasarkan } from '../store/actionCreators';

const DropdownBerdasarkan = () => {

  const dispatch = useDispatch();

  const operators = ['Trx', 'Laba']
  const pickedBerdasarkan = useSelector((state) => state.berdasarkan.berdasarkan);

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };


  const handleBerdasarkanClick = (berdasarkan) => {
    dispatch(setPickedBerdasarkan(berdasarkan));
    localStorage.setItem('pickedBerdasarkanLocal', berdasarkan);
    setIsOpen(false);
  };

  useEffect(() => {
    const storedPickedBerdasarkan = localStorage.getItem('pickedBerdasarkanLocal');
    if (storedPickedBerdasarkan) {
        dispatch(setPickedBerdasarkan(storedPickedBerdasarkan));
    }
}, [dispatch]);

  return (
    <div className="relative inline-block text-left mb-2 mt-2  ml-2">
      <button
        id="dropdownDefaultButton"
        data-dropdown-toggle="dropdown"
        className="flex items-center mt-2 text-white bg-gradient-to-r from-brown-400 via-brown-500 to-brown-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-brown-300 dark:focus:ring-brown-800 shadow-lg shadow-brown-500/50 dark:shadow-lg dark:shadow-brown-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 relative"
        type="button"
        onClick={toggleDropdown}
        style={{ backgroundColor: '#594545' }}
      >
        <span className="mr-2">
          {pickedBerdasarkan || 'Operators'}
        </span>
        <svg
          className={`w-2.5 h-2.5 transition-transform transform ${isOpen ? 'rotate-180' : ''}`}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
        </svg>
      </button>

      <div
        id="dropdown"
        className={`z-10 absolute ${isOpen ? 'block' : 'hidden'} bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}
        style={{ top: 'calc(100% + 5px)', left: 0 }}
      >
        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
          <li>
            <span className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" onClick={() => handleBerdasarkanClick('Kode')}>
              Kode
            </span>
          </li>
          {operators.map((operator, index) => (
            <li key={index}>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={() => handleBerdasarkanClick(operator)}
              >
                {operator}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DropdownBerdasarkan;
