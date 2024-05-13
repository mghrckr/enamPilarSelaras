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
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { authorsTableData, projectsTableData } from "@/data";
import { useDispatch, useSelector } from "react-redux";
import { addDataSupplier, fetchDataSupplier, fetchUsers } from "@/store/actionCreators";
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from "react-router-dom"
import Dropdown from "@/components/Dropdown";
import DropdownOutbox from "@/components/DropdownOutbox";
import SupplierStatusCheckbox from "@/components/SupplierStatusCheckbox";
import CustomPagination from "@/components/Pagination";

export function Inbox() {
  const dispatch = useDispatch();
  let navigate = useNavigate()
  let [startDate, setStartDate] = useState('');
  let [endDate, setEndDate] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [totalBalance, setTotalBalance] = useState(0);

  const formatNumber = (number) => {
    if (number === undefined) {
      return "";
    }
    return number.toLocaleString();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addDataSupplier(formData));
    toggleModal();
    window.location.reload()
  };

  const [formData, setFormData] = useState({
    name: '',
    balance: '',
    status: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const users = useSelector((state) => state.users.users);
  const dataSupplier = useSelector((state) => state.dataSupplier.dataSupplier);

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchDataSupplier())
  }, [dispatch]);
  useEffect(() => {
    // Hitung total balance setiap kali dataSupplier berubah
    if (dataSupplier && dataSupplier.data) {
      const total = dataSupplier.data.reduce((acc, curr) => acc + curr.balance, 0);
      setTotalBalance(total);
    }
  }, [dataSupplier]);
  console.log(totalBalance, 'wkwkwkwkwkwk');
  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      {/* {JSON.stringify(users.data)} */}
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            DATA SPL
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <button
            type="button"
            className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          >
            REFRESH
          </button>
          <button
            onClick={toggleModal}
            className="shadow-lg shadow-black-800/80 rounded-lg gradient text-white px-4 py-2 text-sm rounded font-medium focus:ring ring-black ring-opacity-10 gradient element-to-rotate"
            aria-label="Submit"
            title="Submit"
            style={{ backgroundColor: 'green', marginBottom: '8px', marginLeft: '4px' }}
          >
            TAMBAH SUPPLIER
          </button>
          <div className="mt-12 mb-8 flex flex-col gap-12 items-center justify-center">
            <div
              id="crud-modal"
              className={`fixed inset-0 z-50 flex items-center justify-center ${modalOpen ? 'backdrop-filter backdrop-blur-md' : 'hidden'} ${modalOpen ? 'bg-opacity-40 bg-gray-300' : ''}`}
            >
              <div className="relative p-4 w-full max-w-md max-h-full mx-auto my-32">
                {/* Modal content */}
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                  {/* Modal header */}
                  <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Tambah Supplier
                    </h3>
                    {/* Close button */}
                    <button
                      type="button"
                      onClick={toggleModal}
                      className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 14"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                        />
                      </svg>
                      <span className="sr-only">Close modal</span>
                    </button>
                  </div>
                  {/* Modal body */}
                  <form className="p-4 md:p-5" onSubmit={handleSubmit}>
                    {/* Form content */}
                    <div className="grid gap-4 mb-4 grid-cols-2">
                      <div className="col-span-2">
                        <label
                          htmlFor="name"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Name
                        </label>
                        <input
                          value={formData.name}
                          onChange={handleInputChange}
                          type="text"
                          name="name"
                          id="name"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          placeholder="Type supplier name"
                          required=""
                        />
                      </div>
                      <div className="col-span-2 sm:col-span-1">
                        <label
                          htmlFor="balance"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Balance
                        </label>
                        <input
                          value={formData.balance}
                          onChange={handleInputChange}
                          type="number"
                          name="balance"
                          id="balance"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          placeholder="Type balance"
                          required=""
                        />
                      </div>
                      <div className="col-span-2 sm:col-span-1">
                        <label
                          htmlFor="status"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Status
                        </label>
                        <select
                          name="status"
                          id="status"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          value={formData.status}
                          onChange={handleInputChange}
                        >
                          <option value="" disabled selected>Select Status</option>
                          <option value={true}>Aktif</option>
                          <option value={false}>Tidak Aktif</option>
                        </select>
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="text-white inline-flex items-center bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    >
                      <svg
                        className="me-1 -ms-1 w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Tambah
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["NO", "NAMA", 'BALANCE', "STATUS", "OPSI(ACTIVE/NON ACTIVE)"].map((el) => (
                  <th
                    key={el}
                    className="border-b border-blue-gray-50 py-3 px-5 text-left"
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
              {dataSupplier?.data?.map((supp, index) => (
                <tr key={index}>
                  <td className='border-b border-blue-gray-50'>
                    <div className="flex items-center gap-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-semibold ml-4"
                      >
                        {index + 1}
                      </Typography>
                    </div>
                  </td>
                  <td className='border-b border-blue-gray-50'>
                    <Typography className="text-xs font-semibold text-blue-gray-600">
                      {supp.name}
                    </Typography>
                  </td>
                  <td className='border-b border-blue-gray-50'>
                    <Typography className="text-xs font-semibold text-blue-gray-600">
                      Rp. {formatNumber(supp.balance)}
                    </Typography>
                  </td>
                  <td className='border-b border-blue-gray-50'>
                    <span className={`bg-${supp.status === true ? 'green' : 'red'}-100 text-${supp.status === true ? 'green' : 'red'}-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-${supp.status === true ? 'green' : 'red'}-900 dark:text-${supp.status === true ? 'green' : 'red'}-300`}>
                      {supp.status === true ? 'Aktif' : 'Tidak Aktif'}
                    </span>
                  </td>
                  <SupplierStatusCheckbox id={supp.id} status={supp.status} />
                </tr>
              ))}
              <tr>
                <td className='border-b border-blue-gray-50'>
                  <Typography className="text-xs font-bold text-blue-gray-600">
                    TOTAL
                  </Typography>
                </td>
                <td className='border-b border-blue-gray-50'>
                </td>
                <td className='border-b border-blue-gray-50'>
                  <Typography className="text-xs font-bold text-blue-gray-600">
                    Rp. {formatNumber(totalBalance)}
                  </Typography>
                </td>
                <td className='border-b border-blue-gray-50'>
                </td>
              </tr>
            </tbody>
          </table>
        </CardBody>
        <CustomPagination />
      </Card>
    </div>
  );
}

export default Inbox;
