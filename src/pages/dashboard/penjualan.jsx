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
import { fetchPenjualan, fetchUsers, formatNumber, getFirstDayOfMonth, getToday } from "@/store/actionCreators";
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from "react-router-dom"


export function Penjualan() {
  const dispatch = useDispatch();
  let navigate = useNavigate()
  let [startDate, setStartDate] = useState('');
  let [endDate, setEndDate] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const penjualan = useSelector((state) => state.penjualan.penjualan);
  const [startDateDef] = useState(getFirstDayOfMonth());
  const [endDateDef] = useState(getToday());
  const [selectedDatabase, setSelectedDatabase] = useState('re');

  const handleDropdownChange = (value) => {
    setSelectedDatabase(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedDatabase && startDate && endDate) {
      // setSubmitted(true);
      // setSubmitLoading(true);
      dispatch(fetchPenjualan(selectedDatabase, startDate, endDate))
      // .then(() => {
      //   setSubmitLoading(false);
      // });
    } else {
      console.log('kocak');
    }
  };


  useEffect(() => {
    dispatch(fetchPenjualan(selectedDatabase, startDateDef, endDateDef));
  }, [dispatch, selectedDatabase, startDateDef, endDateDef]);

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      {/* {JSON.stringify(users.data)} */}
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            PENJUALAN
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          {/* <div style={{ display: 'flex', justifyContent: 'center' }}> */} <div className="mb-6 ml-2 mr-2 grid gap-y-10 gap-x-2 md:grid-cols-2 xl:grid-cols-4 flex justify-center">
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
            <select
              onChange={(e) => handleDropdownChange(e.target.value)}
              className="bg-white h-10 px-4 rounded-lg focus:outline-none border border-gray-300 mr-2 ml-4 mb-2 md:mb-0"
            >
              <option value="">Database</option>
              <option value="da">Digipos Amazone</option>
              <option value="de">Digipos EPS</option>
              <option value="ra">Replica Amazone</option>
              <option value="re">Replica EPS</option>
            </select>
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
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] table-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  {["TRX", "PEMBELIAN", "PENJUALAN", "LABA", "PPH 22", "LABA NET"].map((el) => (
                    <th
                      key={el}
                      className="border-b border-blue-gray-50 py-3 px-5 text-center"
                      style={{ width: '16.6%' }}
                    >
                      <span className="text-[11px] font-bold uppercase text-blue-gray-400">
                        {el}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {penjualan?.data?.map((p, index) => (
                  <tr key={index} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {formatNumber(p.trx)}
                    </td>
                    <td className="px-6 py-4">Rp. {formatNumber(p.pembelian)}</td>
                    <td className="px-6 py-4">Rp. {formatNumber(p.penjualan)}</td>
                    <td className="px-6 py-4">Rp. {formatNumber(p.laba)}</td>
                    <td className="px-6 py-4">Rp. {formatNumber(p.pph)}</td>
                    <td className="px-6 py-4">Rp. {formatNumber(p.laba_net)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default Penjualan;
