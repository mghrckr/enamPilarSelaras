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
import { fetchUsers } from "@/store/actionCreators";
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

export function PiutangReseller() {
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
  const handleExportToExcel = () => {
    const tableData = document.querySelector('.table-auto');
    exportToExcel(tableData, 'Data_Piutang_Reseller');
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
            PIUTANG RESELLER
          </Typography>
        </CardHeader>
        <CardBody className="px-0 pt-0 pb-2">
          <div className="mb-4 grid grid-cols-1 gap-6 xl:grid-cols-3">
            <Card className="border border-blue-gray-100 shadow-sm">
              <CardHeader
                floated={false}
                shadow={false}
                color="transparent"
                className="m-0 p-6"
              >
                <div>
                  <Typography variant="h3" color="blue-gray">
                    Data Piutang Reseller
                  </Typography>
                </div>
                <>
                  <div aria-label="content" className="mt-4 grid gap-2.5">
                    <a href="#">
                      <div className="flex items-center space-x-4 p-3.5 rounded-full bg-gray-100">
                        <span className="flex items-center justify-center w-10 h-10 shrink-0 rounded-full bg-white text-gray-900">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="w-6 h-6"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            fill="none"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M3 5a1 1 0 0 1 1 -1h16a1 1 0 0 1 1 1v10a1 1 0 0 1 -1 1h-16a1 1 0 0 1 -1 -1v-10z" />
                            <rect x="4" y="12" width="16" height="8" rx="1" />
                            <path d="M4 12v-3a1 1 0 0 1 1 -1h14a1 1 0 0 1 1 1v3" />
                            <path d="M7 15v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1 -1v-1" />
                          </svg>
                        </span>
                        <div className="flex flex-col flex-1">
                          <h2 className="text-sm font-medium">Rp. 0</h2>
                        </div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-5 h-5 shrink-0"
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M9 6l6 6l-6 6" />
                        </svg>
                      </div>
                    </a>
                    <a href="#" onClick={handleExportToExcel}>
                      <div className="flex items-center space-x-4 p-3.5 rounded-full bg-gray-100">
                        <span className="flex items-center justify-center w-10 h-10 shrink-0 rounded-full bg-white text-gray-900">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                            <path d="M17 14v3a2 2 0 0 1 -2 2H9a2 2 0 0 1 -2 -2v-3" />
                            <path d="M12 4v12" />
                            <path d="M7 9l5 5 5-5" />
                          </svg>
                        </span>
                        <div className="flex flex-col flex-1">
                          <h3 className="text-sm font-medium">Download Excel</h3>
                        </div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-5 h-5 shrink-0"
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M9 6l6 6l-6 6" />
                        </svg>
                      </div>
                    </a>
                  </div>
                </>

              </CardHeader>
              <CardBody className="overflow-x-scroll pt-0">
                <table className="w-full min-w-[640px] table-auto">
                  <thead>
                    <tr>
                      {["Member", "Jumlah", "Action"].map(
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
                    {projectsTableData.map(
                      ({ img, name, members, budget, completion }, key) => {
                        const className = `py-3 px-5 ${key === projectsTableData.length - 1
                          ? ""
                          : "border-b border-blue-gray-50"
                          }`;

                        return (
                          <tr key={name}>
                            <td className={className}>
                              <div className="flex items-center gap-4">
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-bold"
                                >
                                  {name}
                                </Typography>
                              </div>
                            </td>
                            <td className={className}>
                              {members}
                            </td>
                            <td className={className}>
                              <Typography
                                variant="small"
                                className="text-xs font-medium text-blue-gray-600"
                              >
                                {budget}
                              </Typography>
                            </td>
                          </tr>
                        );
                      }
                    )}
                  </tbody>
                </table>
              </CardBody>
            </Card>
            <Card className="overflow-hidden xl:col-span-2 border border-blue-gray-100 shadow-sm">
              <CardHeader
                floated={false}
                shadow={false}
                color="transparent"
                className="m-0 flex items-center justify-between p-6"
              >
                <div>
                  <Typography variant="h3" color="blue-gray" className="mb-1">
                    Detail Invocie
                  </Typography>
                </div>
                <div className="col-span-2">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Jumlah Bayar"
                    required=""
                  />
                </div>
                <div className="col-span-2">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Keterangan"
                    required=""
                  />
                </div>
                <button
                  onClick={handleSubmit}
                  className="shadow-lg shadow-black-800/80 rounded-lg gradient text-white px-4 py-2 text-sm rounded font-medium focus:ring ring-black ring-opacity-10 gradient element-to-rotate"
                  aria-label="Submit"
                  title="Submit"
                  style={{ backgroundColor: 'green', marginBottom: '8px', marginLeft: '8px' }}
                  disabled={submitLoading}
                >
                  Bayar
                </button>
              </CardHeader>
              <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
                <table className="w-full min-w-[640px] table-auto">
                  <thead>
                    <tr>
                      {["Tanggal", "Member", "Jml Piutang", "Jml Bayar", "Sisa Piutang"].map(
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
                    {projectsTableData.map(
                      ({ img, name, members, budget, completion }, key) => {
                        const className = `py-3 px-5 ${key === projectsTableData.length - 1
                          ? ""
                          : "border-b border-blue-gray-50"
                          }`;

                        return (
                          <tr key={name}>
                            <td className={className}>
                              <div className="flex items-center gap-4">
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-bold"
                                >
                                  tes
                                </Typography>
                              </div>
                            </td>
                            <td className={className}>
                              <div className="flex items-center gap-4">
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-bold"
                                >
                                  tes
                                </Typography>
                              </div>
                            </td>
                            <td className={className}>
                              <div className="flex items-center gap-4">
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-bold"
                                >
                                  tes
                                </Typography>
                              </div>
                            </td>
                            <td className={className}>
                              <div className="flex items-center gap-4">
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-bold"
                                >
                                  tes
                                </Typography>
                              </div>
                            </td>
                            <td className={className}>
                              <div className="flex items-center gap-4">
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-bold"
                                >
                                  tes
                                </Typography>
                              </div>
                            </td>
                          </tr>
                        );
                      }
                    )}
                  </tbody>
                </table>
              </CardBody>
            </Card>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default PiutangReseller;
export const exportToExcel = (table, fileName) => {
  const tableToExcel = (table, filename = '') => {
    const downloadLink = document.createElement('a');
    const dataType = 'application/vnd.ms-excel';
    const tableHTML = table.outerHTML.replace(/ /g, '%20');

    downloadLink.href = 'data:' + dataType + ', ' + tableHTML;
    downloadLink.download = filename;
    downloadLink.click();
  };

  tableToExcel(table, fileName);
};