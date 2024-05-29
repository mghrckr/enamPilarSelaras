import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Chip,
  Tooltip,
  Progress,
  Button
} from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLabaRugi, fetchUsers, formatNumber, getFirstDayOfMonth, getToday } from "@/store/actionCreators";
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from "react-router-dom"




export function LabaRugi() {
  const dispatch = useDispatch();
  let navigate = useNavigate()
  const [selectedDatabase, setSelectedDatabase] = useState('re');
  const [startDateDef, setStartDateDef] = useState(getFirstDayOfMonth());
  const [endDateDef, setEndDateDef] = useState(getToday());
  let [startDate, setStartDate] = useState('');
  let [endDate, setEndDate] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Number of items per page

  const labaRugi = useSelector((state) => state.labaRugi.labaRugi);
  const filteredData = labaRugi?.data?.filter(item =>
    item.nama.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = filteredData?.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData?.length / itemsPerPage);

  const handleDropdownChange = (value) => {
    setSelectedDatabase(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (selectedDatabase && startDate && endDate) {
      setSubmitted(true);
      setSubmitLoading(true);
      dispatch(fetchLabaRugi(selectedDatabase, startDate, endDate))
        .then(() => {
          setSubmitLoading(false);
        });
    } else {
      console.log('kocak');
    }
  };

  useEffect(() => {
    if (selectedDatabase && startDateDef && endDateDef) {
      dispatch(fetchLabaRugi(selectedDatabase, startDateDef, endDateDef));
    } else {
      console.log('Please select a database');
    }
  }, [dispatch, selectedDatabase, startDate, endDate]);


  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            LABA RUGI
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
        <div className="flex flex-col md:flex-row flex-wrap justify-center items-center space-y-4 md:space-y-0 md:space-x-4 mb-4">
            <div className="flex flex-col items-start">
              <label htmlFor="startDate" className="mr-2">Start Date:</label>
              <input
                type="date"
                id="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="shadow border rounded-lg px-2 py-1"
              />
            </div>
            <div className="flex flex-col items-start">
              <label htmlFor="endDate" className="mr-2">End Date:</label>
              <input
                type="date"
                id="endDate"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="shadow border rounded-lg px-2 py-1"
              />
            </div>
            <div className="relative flex flex-col items-start">
              <label htmlFor="search" className="mr-2">Search:</label>
              <div className="relative">
                <i className="absolute fa fa-search text-gray-400 top-3 left-4" />
                <input
                  type="text"
                  className="bg-white h-10 px-12 rounded-lg focus:outline-none hover:cursor-pointer border border-gray-300"
                  name="search"
                  placeholder="Search"
                  style={{ backgroundColor: '#F0F0F0' }}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-col items-start">
              <label htmlFor="database" className="mr-2">Database:</label>
              <select
                id="database"
                onChange={(e) => handleDropdownChange(e.target.value)}
                className="bg-white h-10 px-4 rounded-lg focus:outline-none border border-gray-300"
              >
                <option value="">Database</option>
                <option value="da">Digipos Amazone</option>
                <option value="de">Digipos EPS</option>
                <option value="ra">Replica Amazone</option>
                <option value="re">Replica EPS</option>
              </select>
            </div>
            <div className="flex flex-col items-start">
              <Button
                onClick={handleSubmit}
                className="shadow-lg shadow-black-800/80 rounded-lg gradient text-white px-4 py-2 text-sm rounded font-medium focus:ring ring-black ring-opacity-10 gradient element-to-rotate"
                aria-label="Submit"
                title="Submit"
                style={{ backgroundColor: 'green' }}
                disabled={submitLoading}
              >
                SUBMIT
              </Button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[64  0px] table-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  {["NO", "NAMA", "TRANSAKSI", "LABA", "RUGI"].map((el) => (
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
                {currentData?.map((laba, index) => (
                  <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700" key={index}>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4">{laba.nama}</td>
                    <td className="px-6 py-4">{formatNumber(laba.trx)}</td>
                    <td className="px-6 py-4">{formatNumber(laba.laba)}</td>
                    <td className="px-6 py-4">{formatNumber(laba.rugi)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardBody>
        <div className="flex justify-between items-center p-4">
          <Button
            variant="outlined"
            color="blue"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <Typography variant="body2">
            Page {currentPage}  {totalPages ? 'of ' + totalPages : ''}
          </Typography>
          <Button
            variant="outlined"
            color="blue"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default LabaRugi;
