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

export function DataPerkiraan() {
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
            DATA PERKIRAAN
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
                <button
                  onClick={handleSubmit}
                  className="shadow-lg shadow-black-800/80 rounded-lg gradient text-white px-4 py-2 text-sm rounded font-medium focus:ring ring-black ring-opacity-10 gradient element-to-rotate"
                  aria-label="Submit"
                  title="Submit"
                  style={{ backgroundColor: 'green', marginBottom: '8px', marginLeft: '8px' }}
                  disabled={submitLoading}
                >
                  Input Data Perkiraan
                </button>
              </CardHeader>
              <CardBody className="overflow-x-scroll pt-0">
                <table className="w-full min-w-[640px] table-auto">
                  <thead>
                    <tr>
                      {["Kode", "Nama", "Posisi", "Act"].map(
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
                            <td className={className}>
                              <DropdownAction />
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
                  <Typography variant="h6" color="blue-gray" className="mb-1">
                    Setting Parameter Laporan
                  </Typography>
                </div>
                <Menu placement="left-start">
                  <MenuHandler>
                    <IconButton size="sm" variant="text" color="blue-gray">
                      <EllipsisVerticalIcon
                        strokeWidth={3}
                        fill="currenColor"
                        className="h-6 w-6"
                      />
                    </IconButton>
                  </MenuHandler>
                  <MenuList>
                    <MenuItem>Action</MenuItem>
                    <MenuItem>Another Action</MenuItem>
                    <MenuItem>Something else here</MenuItem>
                  </MenuList>
                </Menu>
              </CardHeader>
              <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
                <table className="w-full min-w-[640px] table-auto">
                  <thead>
                    <tr>
                      {["Perkiraan", "Laba Rugi", "Neraca", "Buku Besar"].map(
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
                              <label className="inline-flex items-center me-5 cursor-pointer">
                                <input
                                  type="checkbox"
                                  defaultValue=""
                                  className="sr-only peer"
                                  defaultChecked=""
                                />
                                <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600" />
                              </label>
                            </td>
                            <td className={className}>
                              <label className="inline-flex items-center me-5 cursor-pointer">
                                <input
                                  type="checkbox"
                                  defaultValue=""
                                  className="sr-only peer"
                                  defaultChecked=""
                                />
                                <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600" />
                              </label>
                            </td>
                            <td className={className}>
                              <label className="inline-flex items-center me-5 cursor-pointer">
                                <input
                                  type="checkbox"
                                  defaultValue=""
                                  className="sr-only peer"
                                  defaultChecked=""
                                />
                                <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600" />
                              </label>
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

export default DataPerkiraan;
