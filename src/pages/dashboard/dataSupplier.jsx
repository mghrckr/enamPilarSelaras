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
import { StatisticsCard } from "@/widgets/cards";
import {
  statisticsCardsData,
} from "@/data";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { authorsTableData, projectsTableData } from "@/data";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "@/store/actionCreators";
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from "react-router-dom"
import Dropdown from "@/components/Dropdown";
import DropdownOutbox from "@/components/DropdownOutbox";
import ChatBox from "@/components/ChatBox";
import statisticsCardsDataMember from "@/data/statistics-cards-dataMember";
import DropdownAgenID from "@/components/DropdownAgenID";
import DropdownKelompok from "@/components/DropdownKelompok";
import DropdownStatus from "@/components/DropdownStatus";
import DropdownAction from "@/components/DropdownAction";
import {
  BanknotesIcon,
  UserPlusIcon,
  UsersIcon,
  ChartBarIcon,
} from "@heroicons/react/24/solid";
import CustomPagination from "@/components/Pagination";

export function DataSupplier() {
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
            SALDO SUPPLIER
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <div className="flex items-center mb-4 ml-8">
            <DropdownAgenID />
            <div className="relative w-full ml-2 mr-8">
              <i className="absolute fa fa-search text-gray-400 top-5 left-4" />
              <input
                type="text"
                className="bg-white h-14 w-full px-12 rounded-lg focus:outline-none hover:cursor-pointer border border-gray-300"
                name=""
              />
              <span className="absolute top-4 right-5 border-l pl-4">
                <i className="fa fa-microphone text-gray-500 hover:text-green-500 hover:cursor-pointer" />
              </span>
            </div>
          </div>
          <div className="mb-6 ml-4 mr-4 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-3 flex justify-center">
            <StatisticsCard
              key="Saldo Member Aktif"
              value="RP. 12.313.524.241"
              title={<strong>Total Saldo</strong>}
              icon={React.createElement(BanknotesIcon, {
                className: "w-6 h-6 text-white",
              })}
            />
            <StatisticsCard
              key="Saldo Member Aktif"
              value="RP. 12.313.524.241"
              title={<strong>Total Pemakaian Saldo</strong>}
              icon={React.createElement(BanknotesIcon, {
                className: "w-6 h-6 text-white",
              })}
            />
            <StatisticsCard
              key="Saldo Member Aktif"
              value="RP. 12.313.524.241"
              title={<strong>Total Transaksi</strong>}
              icon={React.createElement(BanknotesIcon, {
                className: "w-6 h-6 text-white",
              })}
            />
          </div>
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["LABEL", "TOTAL TRANSAKSI", "PEMAKAIAN SALDO", "SALDO SEKARANG"].map((el) => (
                  <th
                    key={el}
                    className="border-b border-blue-gray-50 py-3 px-5 text-center"
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
                <td className='border-b border-blue-gray-50' style={{ width: '25%' }}>
                  <Typography className="text-xs font-semibold text-blue-gray-600">
                    SDFSFDSDFSDF
                  </Typography>
                </td>
                <td className='border-b border-blue-gray-50' style={{ width: '25%' }}>
                  <Typography className="text-xs font-semibold text-blue-gray-600">
                    SDFSFDSDFSDF
                  </Typography>
                </td>
                <td className='border-b border-blue-gray-50' style={{ width: '25%' }}>
                  <Typography className="text-xs font-semibold text-blue-gray-600">
                    SDFSFDSDFSDF
                  </Typography>
                </td>
                <td className='border-b border-blue-gray-50' style={{ width: '25%' }}>
                  <Typography className="text-xs font-semibold text-blue-gray-600">
                    SDFSFDSDFSDF
                  </Typography>
                </td>
              </tr>
              <tr>
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
            </tbody>
          </table>
        </CardBody>
        <CustomPagination />
      </Card>
    </div>
  );
}

export default DataSupplier;
