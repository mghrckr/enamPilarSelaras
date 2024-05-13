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
import { fetchUsers } from "@/store/actionCreators";
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from "react-router-dom"
import Dropdown from "@/components/Dropdown";
import DropdownOutbox from "@/components/DropdownOutbox";
import DropdownPPOBSupplier from "@/components/DropdownPPOBSupplier";
import DropdownAgenID from "@/components/DropdownAgenID";
import DropdownKelompok from "@/components/DropdownKelompok";
import DropdownStatus from "@/components/DropdownStatus";

export function FormatSupplier() {
  const dispatch = useDispatch();
  let navigate = useNavigate()
  let [startDate, setStartDate] = useState('');
  let [endDate, setEndDate] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (startDate && endDate) {
      setSubmitted(true);
      setSubmitLoading(true);
      dispatch(fetchTrxs(startDate, endDate))
        .then(() => {
          setSubmitLoading(false);
        });
    } else {
      console.log('kocak');
    }
  };

  const users = useSelector((state) => state.users.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      {/* {JSON.stringify(users.data)} */}
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            FORMAT SUPPLIER
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
            <Typography variant="h4" color="black" style={{ marginLeft: '8px' }}>
              SUPPLIER
            </Typography>
            <div className="p-8 rounded-xl shadow-xl sm:p-16">
              <div className="flex flex-col lg:flex-row items-center">
                <DropdownAgenID />
                <DropdownKelompok />
                <DropdownStatus />
                <div className="flex lg:w-1/2">
                  <button
                    onClick={handleSubmit}
                    className="shadow-lg shadow-black-800/80 rounded-lg gradient text-white px-4 py-2 text-sm rounded font-medium focus:ring ring-black ring-opacity-10 gradient element-to-rotate"
                    aria-label="Submit"
                    title="Submit"
                    style={{ backgroundColor: 'blue', marginBottom: '8px', marginRight: '8px' }}
                    disabled={submitLoading}
                  >
                    TAMPILKAN
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="shadow-lg shadow-black-800/80 rounded-lg gradient text-white px-4 py-2 text-sm rounded font-medium focus:ring ring-black ring-opacity-10 gradient element-to-rotate"
                    aria-label="Submit"
                    title="Submit"
                    style={{ backgroundColor: 'orange', marginBottom: '8px', marginLeft: '4px', marginRight: '8px' }}
                    disabled={submitLoading}
                  >
                    ADD BY OPERATOR
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '8px' }}>
              <Typography variant="h6" color="black">
                DATA HPP VOUCHER
              </Typography>
              <div>
                <button
                  onClick={handleSubmit}
                  className="shadow-lg shadow-black-800/80 rounded-lg gradient text-white px-4 py-1 text-sm rounded font-medium focus:ring ring-black ring-opacity-10 gradient element-to-rotate"
                  aria-label="Submit"
                  title="Submit"
                  style={{ backgroundColor: 'blue', marginBottom: '8px', marginLeft: '4px' }}
                  disabled={submitLoading}
                >
                  UPDATE ALL
                </button>
                <button
                  onClick={handleSubmit}
                  className="shadow-lg shadow-black-800/80 rounded-lg gradient text-white px-4 py-1 text-sm rounded font-medium focus:ring ring-black ring-opacity-10 gradient element-to-rotate"
                  aria-label="Submit"
                  title="Submit"
                  style={{ backgroundColor: 'red', marginBottom: '8px', marginLeft: '4px' }}
                  disabled={submitLoading}
                >
                  DELETE ALL
                </button>
              </div>
            </div>
            {/* <div className="w-full p-3"> */}
            <div>
              <button
                onClick={handleSubmit}
                className="shadow-lg shadow-black-800/80 rounded-lg gradient text-white px-4 py-2 text-sm rounded font-medium focus:ring ring-black ring-opacity-10 gradient element-to-rotate"
                aria-label="Submit"
                title="Submit"
                style={{ backgroundColor: 'blue', marginBottom: '8px', marginLeft: '4px', marginRight: '8px' }}
                disabled={submitLoading}
              >
                COPY KE SUPLLIER
              </button>
              <DropdownPPOBSupplier />
            </div>
          </div>
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["NO", "ID TRX", "MEMBER", "PRODUK", "NO HP", "SUPPLIER", 'RESEND', 'HARGA', 'ANTRI', 'STATUS', 'ACTION'].map((el) => (
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
              <tr>
                <td className='border-b border-blue-gray-50'>
                  <div className="flex items-center gap-4">
                    <input
                      id="checkbox-table-search-1"
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 ml-1"
                    />
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-semibold"
                    >
                      1
                    </Typography>
                  </div>
                </td>
                <td className='border-b border-blue-gray-50'>
                  <Typography className="text-xs font-semibold text-blue-gray-600">
                    SFSDFSDFSD
                  </Typography>
                  {/* <Typography className="text-xs font-normal text-blue-gray-500">
                          {job[1]}
                        </Typography> */}
                </td>
                <td className='border-b border-blue-gray-50'>
                  <Typography className="text-xs font-semibold text-blue-gray-600">
                    SDFSFDSDFSDF
                  </Typography>
                </td>
                <td className='border-b border-blue-gray-50'>
                  <Typography className="text-xs font-semibold text-blue-gray-600">
                    SDFSFDSDFSDF
                  </Typography>
                </td>
                <td className='border-b border-blue-gray-50'>
                  <Typography className="text-xs font-semibold text-blue-gray-600">
                    SDFSFDSDFSDF
                  </Typography>
                </td>
                <td className='border-b border-blue-gray-50'>
                  <Typography className="text-xs font-semibold text-blue-gray-600">
                    SDFSFDSDFSDF
                  </Typography>
                </td>
                <td className='border-b border-blue-gray-50'>
                  <Typography className="text-xs font-semibold text-blue-gray-600">
                    SDFSFDSDFSDF
                  </Typography>
                </td>
                <td className='border-b border-blue-gray-50'>
                  <Typography className="text-xs font-semibold text-blue-gray-600">
                    SDFSFDSDFSDF
                  </Typography>
                </td>
                <td className='border-b border-blue-gray-50'>
                  <Typography className="text-xs font-semibold text-blue-gray-600">
                    SDFSFDSDFSDF
                  </Typography>
                </td>
                <td className='border-b border-blue-gray-50'>
                  <Typography className="text-xs font-semibold text-blue-gray-600">
                    SDFSFDSDFSDF
                  </Typography>
                </td>
                <td className='border-b border-blue-gray-50'>
                  <Typography className="text-xs font-semibold text-blue-gray-600">
                    SDFSFDSDFSDF
                  </Typography>
                </td>
              </tr>
              <tr>
                <td className='border-b border-blue-gray-50'>
                  <div className="flex items-center gap-4">
                    <input
                      id="checkbox-table-search-1"
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 ml-1"
                    />
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-semibold"
                    >
                      1
                    </Typography>
                  </div>
                </td>
                <td className='border-b border-blue-gray-50'>
                  <Typography className="text-xs font-semibold text-blue-gray-600">
                    SDFSFDSDFSDF
                  </Typography>
                </td>
                <td className='border-b border-blue-gray-50'>
                  <Typography className="text-xs font-semibold text-blue-gray-600">
                    SDFSFDSDFSDF
                  </Typography>
                </td>
                <td className='border-b border-blue-gray-50'>
                  <Typography className="text-xs font-semibold text-blue-gray-600">
                    SDFSFDSDFSDF
                  </Typography>
                </td>
                <td className='border-b border-blue-gray-50'>
                  <Typography className="text-xs font-semibold text-blue-gray-600">
                    SDFSFDSDFSDF
                  </Typography>
                </td>
                <td className='border-b border-blue-gray-50'>
                  <Typography className="text-xs font-semibold text-blue-gray-600">
                    SFSDFSDFSD
                  </Typography>
                  {/* <Typography className="text-xs font-normal text-blue-gray-500">
                          {job[1]}
                        </Typography> */}
                </td>
                <td className='border-b border-blue-gray-50'>
                  <Typography className="text-xs font-semibold text-blue-gray-600">
                    SDFSFDSDFSDF
                  </Typography>
                </td>
                <td className='border-b border-blue-gray-50'>
                  <Typography className="text-xs font-semibold text-blue-gray-600">
                    SDFSFDSDFSDF
                  </Typography>
                </td>
                <td className='border-b border-blue-gray-50'>
                  <Typography className="text-xs font-semibold text-blue-gray-600">
                    SDFSFDSDFSDF
                  </Typography>
                </td>
                <td className='border-b border-blue-gray-50'>
                  <Typography className="text-xs font-semibold text-blue-gray-600">
                    SDFSFDSDFSDF
                  </Typography>
                </td>
                <td className='border-b border-blue-gray-50'>
                  <Typography className="text-xs font-semibold text-blue-gray-600">
                    SDFSFDSDFSDF
                  </Typography>
                </td>
              </tr>
              <tr>
                <td className='border-b border-blue-gray-50'>
                  <div className="flex items-center gap-4">
                    <input
                      id="checkbox-table-search-1"
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 ml-1"
                    />
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-semibold"
                    >
                      1
                    </Typography>
                  </div>
                </td>
                <td className='border-b border-blue-gray-50'>
                  <Typography className="text-xs font-semibold text-blue-gray-600">
                    SDFSFDSDFSDF
                  </Typography>
                </td>
                <td className='border-b border-blue-gray-50'>
                  <Typography className="text-xs font-semibold text-blue-gray-600">
                    SDFSFDSDFSDF
                  </Typography>
                </td>
                <td className='border-b border-blue-gray-50'>
                  <Typography className="text-xs font-semibold text-blue-gray-600">
                    SDFSFDSDFSDF
                  </Typography>
                </td>
                <td className='border-b border-blue-gray-50'>
                  <Typography className="text-xs font-semibold text-blue-gray-600">
                    SDFSFDSDFSDF
                  </Typography>
                </td>
                <td className='border-b border-blue-gray-50'>
                  <Typography className="text-xs font-semibold text-blue-gray-600">
                    SFSDFSDFSD
                  </Typography>
                  {/* <Typography className="text-xs font-normal text-blue-gray-500">
                          {job[1]}
                        </Typography> */}
                </td>
                <td className='border-b border-blue-gray-50'>
                  <Typography className="text-xs font-semibold text-blue-gray-600">
                    SDFSFDSDFSDF
                  </Typography>
                </td>
                <td className='border-b border-blue-gray-50'>
                  <Typography className="text-xs font-semibold text-blue-gray-600">
                    SDFSFDSDFSDF
                  </Typography>
                </td>
                <td className='border-b border-blue-gray-50'>
                  <Typography className="text-xs font-semibold text-blue-gray-600">
                    SDFSFDSDFSDF
                  </Typography>
                </td>
                <td className='border-b border-blue-gray-50'>
                  <Typography className="text-xs font-semibold text-blue-gray-600">
                    SDFSFDSDFSDF
                  </Typography>
                </td>
                <td className='border-b border-blue-gray-50'>
                  <Typography className="text-xs font-semibold text-blue-gray-600">
                    SDFSFDSDFSDF
                  </Typography>
                </td>
              </tr>
              <tr>
                <td className='border-b border-blue-gray-50'>
                  <div className="flex items-center gap-4">
                    <input
                      id="checkbox-table-search-1"
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 ml-1"
                    />
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-semibold"
                    >
                      1
                    </Typography>
                  </div>
                </td>
                <td className='border-b border-blue-gray-50'>
                  <Typography className="text-xs font-semibold text-blue-gray-600">
                    SDFSFDSDFSDF
                  </Typography>
                </td>
                <td className='border-b border-blue-gray-50'>
                  <Typography className="text-xs font-semibold text-blue-gray-600">
                    SDFSFDSDFSDF
                  </Typography>
                </td>
                <td className='border-b border-blue-gray-50'>
                  <Typography className="text-xs font-semibold text-blue-gray-600">
                    SDFSFDSDFSDF
                  </Typography>
                </td>
                <td className='border-b border-blue-gray-50'>
                  <Typography className="text-xs font-semibold text-blue-gray-600">
                    SDFSFDSDFSDF
                  </Typography>
                </td>
                <td className='border-b border-blue-gray-50'>
                  <Typography className="text-xs font-semibold text-blue-gray-600">
                    SFSDFSDFSD
                  </Typography>
                  {/* <Typography className="text-xs font-normal text-blue-gray-500">
                          {job[1]}
                        </Typography> */}
                </td>
                <td className='border-b border-blue-gray-50'>
                  <Typography className="text-xs font-semibold text-blue-gray-600">
                    SDFSFDSDFSDF
                  </Typography>
                </td>
                <td className='border-b border-blue-gray-50'>
                  <Typography className="text-xs font-semibold text-blue-gray-600">
                    SDFSFDSDFSDF
                  </Typography>
                </td>
                <td className='border-b border-blue-gray-50'>
                  <Typography className="text-xs font-semibold text-blue-gray-600">
                    SDFSFDSDFSDF
                  </Typography>
                </td>
                <td className='border-b border-blue-gray-50'>
                  <Typography className="text-xs font-semibold text-blue-gray-600">
                    SDFSFDSDFSDF
                  </Typography>
                </td>
                <td className='border-b border-blue-gray-50'>
                  <Typography className="text-xs font-semibold text-blue-gray-600">
                    SDFSFDSDFSDF
                  </Typography>
                </td>
              </tr>
              {/* );
              }
              )} */}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
}

export default FormatSupplier;
