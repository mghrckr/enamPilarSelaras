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
import { fetchDataTrxs, fetchUsers } from "@/store/actionCreators";
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from "react-router-dom"
import Dropdown from "@/components/Dropdown";
import ModalFoto from "@/components/ModalFoto";
import CustomPagination from "@/components/Pagination";

export function TablesAntri() {
  const dispatch = useDispatch();
  let navigate = useNavigate()
  let [startDate, setStartDate] = useState('');
  let [endDate, setEndDate] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [totalNominal, setTotalNominal] = useState(0);
  const dataTrxs = useSelector((state) => state.dataTrxs.dataTrxs);
  function convertDateFormat(dateString) {
    // Pisahkan tahun, bulan, dan tanggal
    const [year, month, day] = dateString.split('-');
    // Gabungkan kembali dengan format 'YYYYMMDD'
    return `${year}${month}${day}`;
  }
  const startFormattedDate = convertDateFormat(startDate);
  const endFormattedDate = convertDateFormat(endDate);
  const BASE_URL_ACN = `http://${import.meta.env.VITE_API_URL2}`

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
      dispatch(fetchDataTrxs(startFormattedDate, endFormattedDate))
        .then(() => {
          setSubmitLoading(false);
        });
    } else {
      console.log('kocak');
    }
  };

  const users = useSelector((state) => state.users.users);


  useEffect(() => {

    const total = dataTrxs?.data?.reduce((acc, trx) => acc + trx.nominal, 0);
    setTotalNominal(total);
  }, [dataTrxs]);
  console.log(totalNominal, 'yahahahahahaha');
  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      {/* {JSON.stringify(users.data)} */}
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            DATA TRANSAKSI
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <div style={{ marginTop: '5px', marginLeft: '3px' }}>
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
          <button
            type="button"
            className="mt-2 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-xs px-3 py-1.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            onClick={handleSubmit}
          >
            CEK
          </button>
          <Typography variant="h6" color="black">
            MENAMPILKAN DATA PERIODE 2024-04-05 S/D 2024-04-06
          </Typography>
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["NO", "TANGGAL ENTRI", "TANGGAL STATUS", "PIC", "SUPPLIER", 'BANK', 'NOMINAL', 'STATUS', 'BUKTI PENAMBAHAN', 'BUKTI TRANSFER'].map((el) => (
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
              {dataTrxs?.data?.map((trx, index) => (
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
                      {trx.date}
                    </Typography>
                  </td>
                  <td className='border-b border-blue-gray-50'>
                    <Typography className="text-xs font-semibold text-blue-gray-600 ml-2">
                      {trx.updatedAt}
                    </Typography>
                  </td>
                  <td className='border-b border-blue-gray-50'>
                    <Typography className="text-xs font-semibold text-blue-gray-600">
                      {trx.user_name}
                    </Typography>
                  </td>
                  <td className='border-b border-blue-gray-50'>
                    <Typography className="text-xs font-semibold text-blue-gray-600">
                      {trx.supplier_name}
                    </Typography>
                  </td>
                  <td className='border-b border-blue-gray-50'>
                    <Typography className="text-xs font-semibold text-blue-gray-600">
                      {trx.bankaccount_name}
                    </Typography>
                  </td>
                  <td className='border-b border-blue-gray-50'>
                    <Typography className="text-xs font-semibold text-blue-gray-600">
                      Rp. {formatNumber(trx.nominal)}
                    </Typography>
                  </td>
                  <td className='border-b border-blue-gray-50'>
                    <Typography className="text-xs font-semibold text-blue-gray-600">
                      {trx.status}
                    </Typography>
                  </td>
                  <td className='border-b border-blue-gray-50'>
                    <Typography className="text-xs font-semibold text-blue-gray-600">
                      {trx.additional_proof}
                    </Typography>
                  </td>
                  <td className='border-b border-blue-gray-50'>
                    <ModalFoto url={BASE_URL_ACN} url2={trx.transfer_proof} />
                  </td>
                </tr>
              ))}
              <tr>
                <td className='border-b border-blue-gray-50'>
                </td>
                <td className='border-b border-blue-gray-50'>
                  <Typography className="text-xs font-bold text-blue-gray-600">
                    TOTAL
                  </Typography>
                </td>
                <td className='border-b border-blue-gray-50'>

                </td>
                <td className='border-b border-blue-gray-50'>
                </td>
                <td className='border-b border-blue-gray-50'>
                  <Typography className="text-xs font-bold text-blue-gray-600">

                  </Typography>
                </td>
                <td className='border-b border-blue-gray-50'>
                </td>
                <td className='border-b border-blue-gray-50'>
                  <Typography className="text-xs font-bold text-blue-gray-600">
                    Rp. {formatNumber(totalNominal)}
                  </Typography>
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

export default TablesAntri;
