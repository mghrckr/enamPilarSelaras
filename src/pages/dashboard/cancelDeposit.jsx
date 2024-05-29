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
import { fetchCancelDeposit, fetchUsers, handleDelete } from "@/store/actionCreators";
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
import TimePicker from "@/components/TimePicker";

export function CancelDeposit() {
  const dispatch = useDispatch();
  let navigate = useNavigate()
  let [startDate, setStartDate] = useState('');
  let [endDate, setEndDate] = useState('');
  const [selectedDatabase, setSelectedDatabase] = useState('de');
  const [submitted, setSubmitted] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [selectedTime, setSelectedTime] = useState('');

  // utils.js (buat file baru atau tambahkan ke file utilitas yang ada)
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const formattedDate = formatDate(startDate)
  const handleDropdownChange = (value) => {
    setSelectedDatabase(value);
  };
  const handleTimeChange = (time) => {
    setSelectedTime(time);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (selectedDatabase && startDate && selectedTime) {
      setSubmitted(true);
      setSubmitLoading(true);
      dispatch(fetchCancelDeposit(selectedDatabase, formattedDate, selectedTime))
        .then(() => {
          setSubmitLoading(false);
        });
    } else {
      console.log('kocak');
    }
  };

  const cancelDeposit = useSelector((state) => state.cancelDeposit.cancelDeposit);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);
  console.log(selectedTime, formattedDate, 'yah');
  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      {/* {JSON.stringify(users.data)} */}
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            CANCEL DEPOSIT
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <div className="mb-6 ml-2 mr-2 grid gap-y-10 gap-x-2 md:grid-cols-2 xl:grid-cols-4 flex justify-center">
            <div style={{ marginTop: '5px', marginLeft: '3px', }}>
              <label htmlFor="startDate">Search Date:</label>
              <input
                style={{ marginLeft: '3px' }}
                type="date"
                id="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="shadow border rounded-lg px-2 py-1"
              />
            </div>
            <TimePicker onTimeChange={handleTimeChange} />
            <select
              onChange={(e) => handleDropdownChange(e.target.value)}
              className="bg-white h-10 px-4 rounded-lg focus:outline-none border border-gray-300 mr-2 ml-4 mb-2 md:mb-0"
            >
              <option value="">Database</option>
              <option value="da">Digipos Amazone</option>
              <option value="de">Digipos EPS</option>
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
                  {["ID", "TANGGAL ENTRY", "TANGGAL STATUS", "PIC", 'SUPPLIER', 'REKENING ASAL', 'AMOUNT', 'STATUS', 'OPSI'].map((el) => (
                    <th
                      key={el}
                      className="border-b border-blue-gray-50 py-3 px-5 text-center"
                      style={{ width: '9,7%' }}
                    >
                      <span className="text-[11px] font-bold uppercase text-blue-gray-400">
                        {el}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {cancelDeposit?.data?.map((cancel, index) => (
                  <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700" key={index}>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {cancel.id}
                    </td>
                    <td className="px-6 py-4">{cancel.created_at}</td>
                    <td className="px-6 py-4">{cancel.updated_at}</td>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {cancel.name}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {cancel.supplier}
                    </td>
                    <td className="px-6 py-4">{cancel.origin_account}</td>
                    <td className="px-6 py-4">{cancel.amount}</td>
                    <td className="px-6 py-4">{cancel.status}</td>
                    <td className="px-6 py-4">
                      <button
                        className="shadow-lg shadow-black-800/80 rounded-lg gradient text-white px-4 py-2 text-sm rounded font-medium focus:ring ring-black ring-opacity-10 gradient element-to-rotate"
                        aria-label="Submit"
                        title="Submit"
                        style={{ backgroundColor: 'red', marginBottom: '8px', marginLeft: '8px' }}
                        onClick={() => handleDelete(cancel.id)}>Delete
                      </button>
                    </td>
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

export default CancelDeposit;
