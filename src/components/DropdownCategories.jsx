import { fetchCategories, setPickedCategory } from '@/store/actionCreators';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
// import { fetchKodeOperators, setPickedOperator } from '../store/actionCreators';

const DropdownCategories = () => {

  const dispatch = useDispatch();

  const categories = useSelector((state) => state.categories.categories);
  const pickedCategory = useSelector((state) => state.pickedCategory.pickedCategory);
  const [dropdownText, setDropdownText] = useState('');

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };


  const handleOperatorClick = (category) => {
    console.log(category, 'kocaaaaaak');
    dispatch(setPickedCategory(category.id))
    setDropdownText(category.name)
    setIsOpen(false);
  };

  useEffect(() => {
    dispatch(fetchCategories())
  }, [dispatch]);

  // useEffect(() => {
  //   if (pickedCategory) {
  //     setDropdownText(pickedCategory);
  //   }
  // }, [pickedCategory]);

  // console.log(pickedCategory, 'pikkk');

  return (
    <div className="relative inline-block text-left mb-2 mt-2">
      <button
        id="dropdownDefaultButton"
        data-dropdown-toggle="dropdown"
        className="flex items-center mt-2 text-white bg-black hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-brown-300 dark:focus:ring-brown-800 shadow-lg shadow-brown-500/50 dark:shadow-lg dark:shadow-brown-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        type="button"
        onClick={toggleDropdown}
        style={{ backgroundColor: 'black' }}
      >
        <span>
          {dropdownText}
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
          {/* <li>
            <span className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" onClick={() => handleOperatorClick('Semua Operator')}>
              {pickedCategory}
            </span>
          </li> */}
          {categories?.data?.categories.map((category, index) => (
            <li key={index}>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={() => handleOperatorClick(category)}
              >
                {category.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DropdownCategories;
