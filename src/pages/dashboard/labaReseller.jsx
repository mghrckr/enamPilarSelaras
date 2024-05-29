import { useDispatch, useSelector } from "react-redux";
import { fetchLabaReseller, fetchLabaResellerBot, fetchResellers } from "@/store/actionCreators";
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from "react-router-dom"

import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Tooltip,
  Progress,
} from "@material-tailwind/react";

import DropdownAgenID from "@/components/DropdownAgenID";

export function LabaReseller() {
  const dispatch = useDispatch();
  let navigate = useNavigate()
  let [startDate, setStartDate] = useState('');
  let [endDate, setEndDate] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [selectedDatabase, setSelectedDatabase] = useState('re');


  const labaReseller = useSelector((state) => state.labaReseller.labaReseller);
  const labaResellerBot = useSelector((state) => state.labaResellerBot.labaResellerBot);
  const resellers = useSelector((state) => state.resellers.resellers);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  const filteredData = labaResellerBot?.data?.filter((laba) =>
    laba.kode_produk.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const currentData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  /*dropdown */
  const [selectedCode, setSelectedCode] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleDatabaseClick = (code) => {
    setSelectedCode(code);
    setIsOpen(false);
  };
  /*dropdown */

  const formatNumber = (number) => {
    if (number === undefined) {
      return "";
    }
    return number.toLocaleString();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (startDate && endDate) {
      setSubmitted(true);
      setSubmitLoading(true);
      dispatch(fetchLabaReseller(selectedDatabase, startDate, endDate, selectedCode))
      dispatch(fetchLabaResellerBot(selectedDatabase, startDate, endDate, selectedCode))
        .then(() => {
          setSubmitLoading(false);
        });
    } else {
      console.log('kocak');
    }
  };

  const refreshh = (e) => {
    e.preventDefault();
    localStorage.removeItem('startLocal');
    localStorage.removeItem('endLocal');
    localStorage.removeItem('startLocalBank');
    localStorage.removeItem('endLocalBank');
    window.location.reload()
  }

  const handleDropdownChange = (value) => {
    setSelectedDatabase(value);
  };

  useEffect(() => {
    if (selectedDatabase) {
      dispatch(fetchLabaReseller(selectedDatabase, startDate, endDate, selectedCode))
      dispatch(fetchLabaResellerBot(selectedDatabase, startDate, endDate, selectedCode))
      dispatch(fetchResellers(selectedDatabase));
    }
  }, [dispatch, selectedDatabase]);
  console.log(labaResellerBot, 'yoyoyoyoyoyo');

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      {/* {JSON.stringify(users.data)} */}
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            LABA RESELLER
          </Typography>
        </CardHeader>
        <CardBody className="px-0 pt-0 pb-2 flex flex-col gap-6">
          {/* <div className="mb-4 grid grid-cols-1 gap-6 xl:grid-cols-3"> */}
          {/* <div style={{ display: 'flex', justifyContent: 'center' }}>  */} <div className="mb-6 ml-2 mr-2 grid gap-y-10 gap-x-2 md:grid-cols-2 xl:grid-cols-5 flex justify-center">
            <div style={{ marginTop: '5px', marginLeft: '3px', }}>
              <label htmlFor="startDate">Start Date:</label>
              <input
                style={{ marginLeft: '3px' }}
                type="date"
                id="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="shadow border rounded-lg px-2 py-1"
              />
            </div>
            <div style={{ marginTop: '5px', marginLeft: '3px' }}>
              <label htmlFor="endDate">End Date:</label>
              <input
                style={{ marginLeft: '3px' }}
                type="date"
                id="endDate"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="shadow border rounded-lg px-2 py-1"
              />
            </div>
            <div className="flex flex-col items-start w-full md:w-auto">
              <label htmlFor="database" className="mr-2">Database:</label>
              <select
                id="database"
                onChange={(e) => handleDropdownChange(e.target.value)}
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              >
                <option value="">Database</option>
                <option value="da">Digipos Amazone</option>
                <option value="de">Digipos EPS</option>
                <option value="ra">Replica Amazone</option>
                <option value="re">Replica EPS</option>
              </select>
            </div>
            <div className="relative inline-block text-left ">
              <label htmlFor="database" className="mr-2">Kode Reseller:</label>
              <button
                id="dropdownDefaultButton"
                data-dropdown-toggle="dropdown"
                className="flex items-center ml-4 text-white bg-black hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-brown-300 dark:focus:ring-brown-800 shadow-lg shadow-brown-500/50 dark:shadow-lg dark:shadow-brown-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center  mb-2"
                type="button"
                onClick={toggleDropdown}
                style={{ backgroundColor: 'black' }}
              >
                <span>
                  {selectedCode === '' ? 'KODE RESELLER' : selectedCode}
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
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200 max-h-60 overflow-y-auto" aria-labelledby="dropdownDefaultButton">
                  {resellers?.data?.map((reseller, index) => (
                    <li key={index}>
                      <span
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        onClick={() => handleDatabaseClick(`${reseller.kode}`)}
                      >
                        {reseller.kode} - {reseller.nama}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/*dropdown */}
            <button
              onClick={handleSubmit}
              className="shadow-lg shadow-black-800/80 rounded-lg gradient text-white px-4 py-2 text-sm rounded font-medium focus:ring ring-black ring-opacity-10 gradient element-to-rotate"
              aria-label="Submit"
              title="Submit"
              style={{ backgroundColor: 'green', marginBottom: '8px', marginLeft: '8px' }}
              disabled={submitLoading}
            >
              SUBMIT
            </button>
          </div>
          <Card className="border border-blue-gray-100 shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[64  0px] table-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    {["RESELLER", "TOTAL TRANSAKSI", "TOTAL PENJUALAN", "TOTAL PEMBELIAN", "TOTAL LABA"].map((el) => (
                      <th
                        key={el}
                        className="border-b border-blue-gray-50 py-3 px-5 text-center"
                        style={{ width: '20%' }}
                      >
                        <span className="text-[11px] font-bold uppercase text-blue-gray-400">
                          {el}
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {labaReseller?.data?.nama}
                    </td>
                    <td className="px-6 py-4">{formatNumber(labaReseller?.data?.trx)}</td>
                    <td className="px-6 py-4">{formatNumber(labaReseller?.data?.jual)}</td>
                    <td className="px-6 py-4">{formatNumber(labaReseller?.data?.beli)}</td>
                    <td className="px-6 py-4">{formatNumber(labaReseller?.data?.laba)}</td>
                  </tr>
                  {/* ))} */}
                </tbody>
              </table>
            </div>
          </Card>
          <Card className="ooverflow-hidden border border-blue-gray-100 shadow-sm">
            <div className="relative ml-2 mr-8 mt-2 mb-4">
              <i className="absolute fa fa-search text-gray-400 top-3 left-4" />
              <input
                type="text"
                className="bg-white h-10 px-12 rounded-lg focus:outline-none hover:cursor-pointer border border-gray-300"
                name=""
                style={{ backgroundColor: '#F0F0F0' }}
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[64  0px] table-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    {["KODE PRODUK", "TRX", "LABA"].map((el) => (
                      <th
                        key={el}
                        className="border-b border-blue-gray-50 py-3 px-5 text-center"
                        style={{ width: '40%' }}
                      >
                        <span className="text-[11px] font-bold uppercase text-blue-gray-400">
                          {el}
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {currentData?.map((laba, index) => (
                    <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {laba.kode_produk}
                      </td>
                      <td className="px-6 py-4">{formatNumber(laba.trx)}</td>
                      <td className="px-6 py-4">{formatNumber(laba.laba)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex justify-center mt-4 mb-4">
                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index}
                    className={`mx-1 px-3 py-1 rounded-lg ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                      }`}
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            </div>
          </Card>
          {/* </div> */}
        </CardBody>
      </Card>
    </div >
  );
}

export default LabaReseller;
