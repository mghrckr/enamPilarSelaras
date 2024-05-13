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

export function PenjualanHariIni() {
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
            PENJUALAN HARI INI
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">

          <div class="grid grid-cols-2 gap-4">

          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <DropdownAgenID />
          </div>
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["TRX", "PEMBELIAN", "PENJUALAN", "LABA"].map((el) => (
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
                    SFSDFSDFSD
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
                    SFSDFSDFSD
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
                    SFSDFSDFSD
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

export default PenjualanHariIni;
