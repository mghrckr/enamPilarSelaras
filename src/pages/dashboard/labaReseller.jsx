// import {
//   Card,
//   CardHeader,
//   CardBody,
//   Typography,
//   Avatar,
//   Chip,
//   Tooltip,
//   Progress,
//   Button
// } from "@material-tailwind/react";
// import { StatisticsCard } from "@/widgets/cards";
// import {
//   statisticsCardsData,
// } from "@/data";
// import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { authorsTableData, projectsTableData } from "@/data";
import { useDispatch, useSelector } from "react-redux";
import { fetchDataTrxBank, fetchDataTrxSPL, fetchUsers } from "@/store/actionCreators";
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from "react-router-dom"
// import React from "react";
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
import {
  EllipsisVerticalIcon,
  ArrowUpIcon,
} from "@heroicons/react/24/outline";
// import { StatisticsCard } from "@/widgets/cards";
// import { StatisticsChart } from "@/widgets/charts";
import {
  // statisticsCardsData,
  // statisticsChartsData,
  // projectsTableData,
  ordersOverviewData,
} from "@/data";
import { CheckCircleIcon, ClockIcon } from "@heroicons/react/24/solid";
import DropdownAction from "@/components/DropdownAction";
import statisticsCardsDataKomisi from "@/data/statistics-cards-dataKomisi copy";
import { StatisticsCard } from "@/widgets/cards";
import DropdownAgenID from "@/components/DropdownAgenID";
import DropdownKodeReseller from "@/components/DropdownKodeReseller";

export function LabaReseller() {
  const dispatch = useDispatch();
  let navigate = useNavigate()
  let [startDate, setStartDate] = useState('');
  let [endDate, setEndDate] = useState('');
  let [startDateBank, setStartDateBank] = useState('');
  let [endDateBank, setEndDateBank] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submittedBank, setSubmittedBank] = useState(false);
  const [submitLoadingBank, setSubmitLoadingBank] = useState(false);
  const [totalNominalSPL, setTotalNominalSPL] = useState(0);
  const [totalNominalBank, setTotalNominalBank] = useState(0);

  const dataTrxSPL = useSelector((state) => state.dataTrxSPL.dataTrxSPL);
  const dataTrxBank = useSelector((state) => state.dataTrxBank.dataTrxBank);
  let storedStartDate = JSON.parse(localStorage.getItem('startLocal'))
  let storedEndDates = JSON.parse(localStorage.getItem('endLocal'))
  let storedStartDateBank = JSON.parse(localStorage.getItem('startLocalBank'))
  let storedEndDatesBank = JSON.parse(localStorage.getItem('endLocalBank'))
  const formatNumber = (number) => {
    if (number === undefined) {
      return "";
    }
    return number.toLocaleString();
  };
  function convertDateFormat(dateString) {
    const [year, month, day] = dateString.split('-');
    return `${year}${month}${day}`;
  }

  const startFormattedDate = convertDateFormat(startDate);
  const endFormattedDate = convertDateFormat(endDate);
  const startFormattedDateBank = convertDateFormat(startDateBank);
  const endFormattedDateBank = convertDateFormat(endDateBank);


  const handleSubmit = (e) => {
    e.preventDefault();

    if (startDate && endDate) {
      setSubmitted(true);
      setSubmitLoading(true);
      dispatch(fetchDataTrxSPL(startFormattedDate, endFormattedDate))
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

  const handleSubmitBank = (e) => {
    e.preventDefault();

    if (startDateBank && endDateBank) {
      setSubmittedBank(true);
      setSubmitLoadingBank(true);
      dispatch(fetchDataTrxBank(startFormattedDateBank, endFormattedDateBank))
        .then(() => {
          setSubmitLoadingBank(false);
        });
    } else {
      console.log('kocak');
    }
  };

  // const users = useSelector((state) => state.users.users);
  useEffect(() => {
    dispatch(fetchDataTrxSPL(storedStartDate, storedEndDates));
    dispatch(fetchDataTrxBank(storedStartDateBank, storedEndDatesBank));
  }, [dispatch, storedStartDate, storedEndDates, storedStartDateBank, storedEndDatesBank]);
  console.log(dataTrxBank, 'yoyoyoyoyoyo');

  useEffect(() => {
    if (dataTrxSPL?.data) {
      const total = dataTrxSPL.data.reduce((acc, trx) => acc + trx.total_nominal, 0);
      setTotalNominalSPL(total);
    }
  }, [dataTrxSPL]);

  useEffect(() => {
    if (dataTrxBank?.data) {
      const total = dataTrxBank.data.reduce((acc, trx) => acc + trx.total_nominal, 0);
      setTotalNominalBank(total);
    }
  }, [dataTrxBank]);

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
          <div style={{ display: 'flex', justifyContent: 'center' }}>
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
            <DropdownAgenID />
            <DropdownKodeReseller />
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
            <CardBody className="overflow-x-scroll pt-0">
              <table className="w-full min-w-[640px] table-auto">
                <thead>
                  <tr>
                    {["RESELLER", "TOTAL TRANSAKSI", "TOTAL PENJUALAN", "TOTAL PEMBELIAN", "TOTAL LABA"].map(
                      (el) => (
                        <th
                          key={el}
                          className="border-b border-blue-gray-50 py-3 px-6 text-left"
                        >
                          <Typography
                            variant="small"
                            className="text-[11px] font-medium uppercase text-blue-gray-400"
                          >
                            {el}
                          </Typography>
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody>
                  {dataTrxSPL?.data?.map((trxSPL, index) => (
                    <tr key={index}>
                      <td className='border-b border-blue-gray-50'>
                        <div className="flex items-center gap-4 ml-4">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-bold"
                          >
                            {index + 1}
                          </Typography>
                        </div>
                      </td>
                      <td className='border-b border-blue-gray-50'>
                        <div className="flex items-center gap-4">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-bold"
                          >
                            {trxSPL.name}
                          </Typography>
                        </div>
                      </td>
                      <td className='border-b border-blue-gray-50'>
                        Rp. {formatNumber(trxSPL.total_nominal)}
                      </td>
                      <td className='border-b border-blue-gray-50'>
                        Rp. {formatNumber(trxSPL.total_nominal)}
                      </td>
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
                        Rp. {formatNumber(totalNominalSPL)}
                      </Typography>
                    </td>
                    <td className='border-b border-blue-gray-50'>
                    </td>
                    <td className='border-b border-blue-gray-50'>
                      <Typography className="text-xs font-bold text-blue-gray-600">

                      </Typography>
                    </td>
                  </tr>
                </tbody>
              </table>
            </CardBody>
          </Card>
          <Card className="ooverflow-hidden border border-blue-gray-100 shadow-sm">
            <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
              <div className="relative ml-2 mr-8 mt-2">
                <i className="absolute fa fa-search text-gray-400 top-3 left-4" />
                <input
                  type="text"
                  className="bg-white h-10 px-12 rounded-lg focus:outline-none hover:cursor-pointer border border-gray-300"
                  name=""
                  style={{backgroundColor: '#F0F0F0'}}
                />
              </div>
              <table className="w-full min-w-[640px] table-auto">
                <thead>
                  <tr>
                    {["KODE PRODUK", "TRANSAKSI", "LABA"].map(
                      (el) => (
                        <th
                          key={el}
                          className="border-b border-blue-gray-50 py-3 px-6 text-left"
                        >
                          <Typography
                            variant="small"
                            className="text-[11px] font-medium uppercase text-blue-gray-400"
                          >
                            {el}
                          </Typography>
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody>
                  {dataTrxBank?.data?.map((trxBank, index) => (
                    <tr key={index}>
                      <td className='border-b border-blue-gray-50'>
                        <div className="flex items-center gap-4 ml-4">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-bold"
                          >
                            {index + 1}
                          </Typography>
                        </div>
                      </td>
                      <td className='border-b border-blue-gray-50'>
                        <div className="flex items-center gap-4">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-bold"
                          >
                            {trxBank.name}
                          </Typography>
                        </div>
                      </td>
                      <td className='border-b border-blue-gray-50'>
                        Rp. {formatNumber(trxBank.total_nominal)}
                      </td>
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
                        Rp. {formatNumber(totalNominalBank)}
                      </Typography>
                    </td>
                    <td className='border-b border-blue-gray-50'>
                    </td>
                    <td className='border-b border-blue-gray-50'>
                      <Typography className="text-xs font-bold text-blue-gray-600">

                      </Typography>
                    </td>
                  </tr>
                </tbody>
              </table>
            </CardBody>
          </Card>
          {/* </div> */}
        </CardBody>
      </Card>
    </div >
  );
}

export default LabaReseller;
