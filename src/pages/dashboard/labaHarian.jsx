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
import { fetchDataTrxBank, fetchDataTrxSPL, fetchLabaHarian, fetchUsers } from "@/store/actionCreators";
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

export function LabaHarian() {
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

  const labaHarian = useSelector((state) => state.labaHarian.labaHarian);
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

  const todayUse = new Date();
  let h2 = new Date();
  let h1 = new Date();
  h2.setDate(todayUse.getDate() - 2);
  h1.setDate(todayUse.getDate() - 1);
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Bulan dimulai dari 0
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  const formattedDateTodayMinusTwo = formatTimestamp(h2);
  const formattedDateTodayMinusOne = formatTimestamp(h1);
  const formattedToday = formatTimestamp(todayUse);

  const flattenedData = labaHarian?.data?.flat() || [];

  const filteredData = flattenedData.filter(item => {
    return item.tanggal == formattedToday;
  });
  const filteredData2 = flattenedData.filter(item => {
    return item.tanggal == formattedDateTodayMinusTwo;
  });
  const filteredData1 = flattenedData.filter(item => {
    return item.tanggal == formattedDateTodayMinusOne;
  });

  console.log("today", filteredData);
  console.log("2", filteredData2);
  console.log("1", filteredData1);

  // console.log(formattedDateTodayMinusOne, '1');
  // console.log(filteredData, '2');
  // console.log(formattedToday, 'h');
  // console.log(labaHarian.data,'iyaiayiayaiayiay');
  // console.log(labaHarian.data[0], 'ini yang 0');
  // console.log(labaHarian.data[1], 'ini yang 1');
  // console.log(labaHarian.data[2], 'ini yang 2');

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
    dispatch(fetchLabaHarian());
    dispatch(fetchDataTrxSPL(storedStartDate, storedEndDates));
    dispatch(fetchDataTrxBank(storedStartDateBank, storedEndDatesBank));
  }, [dispatch, storedStartDate, storedEndDates, storedStartDateBank, storedEndDatesBank]);

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

  // console.log(labaHarian, 'yaaak');
  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      {/* {JSON.stringify(users.data)} */}
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            LABA HARIAN
          </Typography>
        </CardHeader>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <DropdownAgenID />
        </div>
        <CardBody className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <Card className="border border-blue-gray-100 shadow-sm">
            <CardHeader
              floated={false}
              shadow={false}
              color="transparent"
              className="m-0 p-6"
            >
              <div>
                <Typography variant="h5" color="blue-gray" className="mb-1">
                  LABA {formattedDateTodayMinusTwo}
                </Typography>
              </div>
            </CardHeader>

            <CardBody className="overflow-x-scroll pt-0">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[64  0px] table-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      {["JAM", "TRX", "LABA"].map((el) => (
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
                    {filteredData2?.map((laba, index) => (
                      <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {laba.jam}
                        </td>
                        <td className="px-6 py-4">{formatNumber(laba.trx)}</td>
                        <td className="px-6 py-4">{formatNumber(laba.laba)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardBody>
          </Card>
          <Card className="border border-blue-gray-100 shadow-sm">
            <CardHeader
              floated={false}
              shadow={false}
              color="transparent"
              className="m-0 p-6"
            >
              <div>
                <Typography variant="h5" color="blue-gray" className="mb-1">
                  LABA {formattedDateTodayMinusOne}
                </Typography>
              </div>
            </CardHeader>

            <CardBody className="overflow-x-scroll pt-0">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[64  0px] table-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      {["JAM", "TRX", "LABA"].map((el) => (
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
                    {filteredData1?.map((laba, index) => (
                      <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {laba.jam}
                        </td>
                        <td className="px-6 py-4">{formatNumber(laba.trx)}</td>
                        <td className="px-6 py-4">{formatNumber(laba.laba)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardBody>
          </Card>
          <Card className="border border-blue-gray-100 shadow-sm">
            <CardHeader
              floated={false}
              shadow={false}
              color="transparent"
              className="m-0 p-6"
            >
              <div>
                <Typography variant="h5" color="blue-gray" className="mb-1">
                  LABA {formattedToday}
                </Typography>
              </div>
            </CardHeader>

            <CardBody className="overflow-x-scroll pt-0">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[64  0px] table-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      {["JAM", "TRX", "LABA"].map((el) => (
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
                    {filteredData?.map((laba, index) => (
                      <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {laba.jam}
                        </td>
                        <td className="px-6 py-4">{formatNumber(laba.trx)}</td>
                        <td className="px-6 py-4">{formatNumber(laba.laba)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardBody>
          </Card>
        </CardBody>
      </Card>
    </div >
  );
}

export default LabaHarian;
