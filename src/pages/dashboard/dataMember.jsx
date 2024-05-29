import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button
} from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { getKpi } from "@/store/actionCreators";
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from "react-router-dom"
import ReactHtmlTableToExcel from 'react-html-table-to-excel';


export function DataMember() {
  const dispatch = useDispatch();
  let navigate = useNavigate()
  let [startDate, setStartDate] = useState('');
  let [endDate, setEndDate] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const kpis = useSelector((state) => state.kpi.kpi);
  const [selectedDatabase, setSelectedDatabase] = useState('re');
  const [currentPage, setCurrentPage] = useState(1); // Pagination state
  const [totalItems, setTotalItems] = useState(0); // Total items state


  /*dropdown */
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleDropdownChange = (value) => {
    setSelectedDatabase(value);
  };

  const [selectedShift, setSelectedShift] = useState('');
  const [isOpenShift, setIsOpenShift] = useState(false);

  const toggleDropdownShift = () => {
    setIsOpenShift(!isOpenShift);
  };

  const handleShiftClick = (shift) => {
    setSelectedShift(shift);
    setIsOpenShift(false);
  };

  const [selectedStatus, setSelectedStatus] = useState('');
  const [isOpenStatus, setIsOpenStatus] = useState(false);

  const toggleDropdownStatus = () => {
    setIsOpenStatus(!isOpenStatus);
  };

  const handleStatusClick = (status) => {
    setSelectedStatus(status);
    setIsOpenStatus(false);
  };

  /*dropdown */

  const [formData, setFormData] = useState({
    tujuan: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData(currentPage);
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const fetchData = (page) => {
    const dataFilter = {
      "startDt": startDate,
      "endDt": endDate,
      "page": page,
      "view": 20,
      "status": statusValue,
      "mdn": formData.tujuan,
      "shift": selectedShift
    };
    dispatch(getKpi(dataFilter))
      .then(response => {
        console.log(response, 'res');
        setTotalItems(kpis.total); // Assuming the API returns total items
      });
  };
  const totalPages = Math.ceil(totalItems / 20); // Calculate total pages


  let statusValue;

  if (selectedStatus === 'Gagal') {
    statusValue = 40;
  } else if (selectedStatus === 'Tujuan Salah') {
    statusValue = 52;
  } else if (selectedStatus === 'Sukses') {
    statusValue = 20;
  }

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            KPI
          </Typography>
          <Button
            variant="outlined"
            color="green"
          >
            <ReactHtmlTableToExcel
              id="test-table-xls-button"
              className="btn"
              table="table-to-xls"
              filename="kpixls"
              sheet="tablexls"
              buttonText="Export to Excel"
            />
          </Button>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <div className="flex flex-col md:flex-row md:flex-wrap justify-center items-center space-y-4 md:space-y-0 md:space-x-4 p-4">
            <div className="flex flex-col items-start w-full md:w-auto">
              <label htmlFor="startDate" className="mb-1">Start Date:</label>
              <input
                type="date"
                id="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              />
            </div>
            <div className="flex flex-col items-start w-full md:w-auto">
              <label htmlFor="endDate" className="mb-1">End Date:</label>
              <input
                type="date"
                id="endDate"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              />
            </div>
            <div className="flex flex-col items-start w-full md:w-auto">
              <label htmlFor="database" className="mr-2">Tujuan:</label>
              <input
                type="text"
                name="tujuan"
                id="tujuan"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="TUJUAN"
                required
                value={formData.tujuan}
                onChange={handleInputChange}
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
            <div className="flex flex-col items-start w-full md:w-auto relative">
              <label htmlFor="database" className="mr-2">Shift:</label>
              <button
                id="dropdownDefaultButton"
                data-dropdown-toggle="dropdown"
                className="flex items-center text-white bg-black hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-brown-300 dark:focus:ring-brown-800 shadow-lg shadow-brown-500/50 dark:shadow-lg dark:shadow-brown-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center w-full"
                type="button"
                onClick={toggleDropdownShift}
              >
                <span>{selectedShift === '' ? 'SHIFT' : selectedShift}</span>
                <svg className={`w-2.5 h-2.5 ml-3 transition-transform transform ${isOpenShift ? 'rotate-180' : ''}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                </svg>
              </button>
              <div id="dropdown" className={`z-10 absolute ${isOpenShift ? 'block' : 'hidden'} bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`} style={{ top: 'calc(100% + 5px)', left: 0 }}>
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                  <li>
                    <span className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" onClick={() => handleShiftClick('pagi')}>Pagi</span>
                  </li>
                  <li>
                    <span className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" onClick={() => handleShiftClick('sore')}>Sore</span>
                  </li>
                  <li>
                    <span className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" onClick={() => handleShiftClick('malam')}>Malam</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="flex flex-col items-start w-full md:w-auto relative">
              <label htmlFor="database" className="mr-2">Status:</label>
              <button
                id="dropdownDefaultButton"
                data-dropdown-toggle="dropdown"
                className="flex items-center text-white bg-black hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-brown-300 dark:focus:ring-brown-800 shadow-lg shadow-brown-500/50 dark:shadow-lg dark:shadow-brown-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center w-full"
                type="button"
                onClick={toggleDropdownStatus}
              >
                <span>{selectedStatus === '' ? 'STATUS' : selectedStatus}</span>
                <svg className={`w-2.5 h-2.5 ml-3 transition-transform transform ${isOpenStatus ? 'rotate-180' : ''}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                </svg>
              </button>
              <div id="dropdown" className={`z-10 absolute ${isOpenStatus ? 'block' : 'hidden'} bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`} style={{ top: 'calc(100% + 5px)', left: 0 }}>
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                  <li>
                    <span className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" onClick={() => handleStatusClick('Gagal')}>Gagal</span>
                  </li>
                  <li>
                    <span className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" onClick={() => handleStatusClick('Tujuan Salah')}>Tujuan Salah</span>
                  </li>
                  <li>
                    <span className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" onClick={() => handleStatusClick('Sukses')}>Sukses</span>
                  </li>
                </ul>
              </div>
            </div>
            <button
              onClick={handleSubmit}
              className="shadow-lg shadow-black-800/80 rounded-lg gradient text-white px-4 py-2 text-sm rounded font-medium focus:ring ring-black ring-opacity-10 gradient element-to-rotate bg-green-500"
              aria-label="Submit"
              title="Submit"
              disabled={submitLoading}
            >
              SUBMIT
            </button>
          </div>
          <div className="overflow-x-auto">
            <table
              id="table-to-xls"
              className="w-full min-w-[640px] table-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  {["NO", "KODE PRODUK", "ENTRY DATE", "STATUS DATE", "TUJUAN", "SHIFT", "STATUS", "KPI"].map((el, index) => (
                    <th
                      key={index}
                      className="border-b border-blue-gray-50 py-3 px-5 text-center"
                      style={{
                        width: index === 0 ? '3%' : index === 5 || index === 6 ? '10%' : index === 7 ? '30%' : '15%', // Lebar KPI lebih besar
                        minWidth: index === 7 ? '150px' : 'auto' // Minimal lebar KPI untuk tampilan lebih kecil
                      }}
                    >
                      <Typography
                        variant="small"
                        className="text-[11px] font-bold uppercase text-blue-gray-400"
                      >
                        {el}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {kpis && kpis.data && kpis.data
                  .filter(kpi => ['20', '40', '52'].includes(kpi.status))
                  .map((kpi, index) => {
                    const date = new Date(kpi.tanggal_entri);

                    const day = date.getDate().toString().padStart(2, "0");
                    const month = (date.getMonth() + 1).toString().padStart(2, "0");
                    const year = date.getFullYear();
                    const hours = date.getHours().toString().padStart(2, "0");
                    const minutes = date.getMinutes().toString().padStart(2, "0");
                    const seconds = date.getSeconds().toString().padStart(2, "0");

                    const formattedDate = `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;

                    const dateStatus = new Date(kpi.tanggal_status);

                    const dayStatus = dateStatus.getDate().toString().padStart(2, "0");
                    const monthStatus = (dateStatus.getMonth() + 1).toString().padStart(2, "0");
                    const yearStatus = dateStatus.getFullYear();
                    const hoursStatus = dateStatus.getHours().toString().padStart(2, "0");
                    const minutesStatus = dateStatus.getMinutes().toString().padStart(2, "0");
                    const secondsStatus = dateStatus.getSeconds().toString().padStart(2, "0");

                    const formattedDateStatus = `${dayStatus}-${monthStatus}-${yearStatus} ${hoursStatus}:${minutesStatus}:${secondsStatus}`;

                    return (
                      <tr key={index} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                        <td
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                          style={{ padding: '10px 5px' }} // Set padding
                        >
                          {index + 1}
                        </td>
                        <td
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                          style={{ padding: '10px 5px' }} // Set padding
                        >
                          {kpi.kode_produk}
                        </td>
                        <td className="px-6 py-4" style={{ padding: '10px 5px' }}>{formattedDate}</td>
                        <td className="px-6 py-4" style={{ padding: '10px 5px' }}>{formattedDateStatus}</td>
                        <td className="px-6 py-4" style={{ padding: '10px 5px' }}>{kpi.tujuan}</td>
                        <td className="px-6 py-4" style={{ padding: '10px 5px' }}>{kpi.shift}</td>
                        <td className="px-6 py-4" style={{ padding: '10px 5px' }}>
                          {kpi.status === '20' && (
                            <span className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                              Sukses
                            </span>
                          )}
                          {kpi.status === '52' && (
                            <span className="bg-orange-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                              Tujuan Salah
                            </span>
                          )}
                          {kpi.status === '40' && (
                            <span className="bg-red-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                              Gagal
                            </span>
                          )}
                        </td>
                        <td className="px-10 py-4" style={{ padding: '10px 5px', minWidth: '150px' }}>{kpi.waktu_respon}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between items-center p-4">
            <Button
              variant="outlined"
              color="blue"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Previous
            </Button>
            <Typography variant="body2">
              Page {currentPage} of {totalPages}
            </Typography>
            <Button
              variant="outlined"
              color="blue"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default DataMember;
