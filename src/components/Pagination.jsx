import { Button } from '@material-tailwind/react';
import React from 'react';

function CustomPagination({ totalPages, currentPage, onPageChange }) {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2px', marginBottom: '2px' }}>
      <nav aria-label="Page navigation example">
        <ul className="inline-flex -space-x-px text-sm">
          <li>
            <Button
              variant="outlined"
              color="blue"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`mr-4`}
            >
              Previous
            </Button>
          </li>
          {pageNumbers.map(number => (
            <li key={number}>
              <Button
                variant="outlined"
                color="blue"
                onClick={() => onPageChange(number)}
              // className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${currentPage === number ? 'text-blue-600 bg-blue-50 hover:bg-blue-100 dark:bg-gray-700 dark:text-white' : ''}`}
              >
                {number}
              </Button>
            </li>
          ))}
          <li>
            <Button
              variant="outlined"
              color="blue"
              onClick={() => onPageChange(currentPage + 1)}
            // className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}`}
            >
              Next
            </Button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default CustomPagination;
