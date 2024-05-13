import React, { useState } from 'react';
;

const DropdownAgenID = () => {
  const [selectedDatabase, setSelectedDatabase] = useState('DATABASE');
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOperatorClick = (database) => {
    setSelectedDatabase(database);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left ">
      <button
        id="dropdownDefaultButton"
        data-dropdown-toggle="dropdown"
        className="flex items-center ml-4 text-white bg-black hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-brown-300 dark:focus:ring-brown-800 shadow-lg shadow-brown-500/50 dark:shadow-lg dark:shadow-brown-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center  mb-2"
        type="button"
        onClick={toggleDropdown}
        style={{ backgroundColor: 'black' }}
      >
        <span>
          {selectedDatabase}
        </span>
        <svg
          className={`w-2.5 h-2.5 ml-3 transition-transform transform ${isOpen ? 'rotate-180' : ''}`}
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
            <span className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" onClick={() => handleOperatorClick('Digipos Amazone')}>
              Digipos Amazone
            </span>
          </li>
          <li>
            <span className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" onClick={() => handleOperatorClick('Digipos EPS')}>
              Digipos EPS
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DropdownAgenID;
