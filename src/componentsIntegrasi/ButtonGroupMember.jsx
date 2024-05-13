import React from 'react';
import { useNavigate } from "react-router-dom"

function ButtonGroupMember() {
  let navigate = useNavigate()
  return (
    <div >
      <a
        onClick={(e) => {
          e.preventDefault()
          localStorage.removeItem('startLocal');
          localStorage.removeItem('endLocal');
          localStorage.removeItem('pickedOperatorLocal');
          localStorage.removeItem('pickedBerdasarkanLocal');
          localStorage.removeItem('pickedJenisLocal');
          navigate("/saldo")
        }}
        href="/saldo"
        aria-current="page"
        className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700  focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
      >
        SALDO
      </a>
      <a
        onClick={(e) => {
          e.preventDefault()
          localStorage.removeItem('startLocal');
          localStorage.removeItem('endLocal');
          localStorage.removeItem('pickedOperatorLocal');
          localStorage.removeItem('pickedBerdasarkanLocal');
          localStorage.removeItem('pickedJenisLocal');
          navigate("/depositMember")
        }}
        href="/depositMember"
        className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
      >
        DEPO
      </a>
      <a
        onClick={(e) => {
          e.preventDefault()
          localStorage.removeItem('startLocal');
          localStorage.removeItem('endLocal');
          localStorage.removeItem('pickedOperatorLocal');
          localStorage.removeItem('pickedBerdasarkanLocal');
          localStorage.removeItem('pickedJenisLocal');
          navigate("/inactive")
        }}
        href="/inactive"
        className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
      >
        HILANG
      </a>
    </div>
  );
}

export default ButtonGroupMember;
