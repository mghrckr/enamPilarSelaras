import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";
import { fetchDataTransaksi, fetchDataTransaksiAll } from '@/store/actionCreators';
import Dropdown from '@/components/Dropdown';
import ModalFoto from '@/components/ModalFoto';
import CustomPagination from '@/components/Pagination';

const formatDate = (date) => {
  const d = new Date(date);
  let month = '' + (d.getMonth() + 1);
  let day = '' + d.getDate();
  const year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
};

const getFirstDayOfMonth = () => {
  const date = new Date();
  date.setDate(1);
  return formatDate(date);
};

const getToday = () => {
  const date = new Date();
  return formatDate(date);
};

export function TablesAntri() {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [totalNominal, setTotalNominal] = useState(0);
  const [selectedDatabase, setSelectedDatabase] = useState('de');
  const dataTrxs = useSelector((state) => state.dataTrxs.dataTrxs);
  const dataTransaksi = useSelector((state) => state.dataTransaksi.dataTransaksi);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [startDateDef, setStartDateDef] = useState(getFirstDayOfMonth());
  const [endDateDef, setEndDateDef] = useState(getToday());
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Set the number of items per page

  const handleDropdownChange = (value) => {
    setSelectedDatabase(value);
  };

  const convertDateFormat = (dateString) => {
    const [year, month, day] = dateString.split('-');
    return `${year}${month}${day}`;
  };

  const startFormattedDate = convertDateFormat(startDate);
  const endFormattedDate = convertDateFormat(endDate);
  const BASE_URL_ACN = `http://${import.meta.env.VITE_API_URL2}`;

  const formatNumber = (number) => {
    if (number === undefined) {
      return "";
    }
    return number.toLocaleString();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (selectedDatabase && startDate && endDate) {
      setSubmitted(true);
      setSubmitLoading(true);
      dispatch(fetchDataTransaksi(selectedDatabase, startDate, endDate))
        .then(() => {
          setSubmitLoading(false);
        });
    } else {
      console.log('kocak');
    }
  };

  useEffect(() => {
    if (selectedDatabase && startDateDef && endDateDef) {
      dispatch(fetchDataTransaksi(selectedDatabase, startDateDef, endDateDef));
    } else {
      console.log('Please select a database');
    }
  }, [dispatch, selectedDatabase, startDate, endDate]);

  useEffect(() => {
    if (selectedDatabase) {
      dispatch(fetchDataTransaksiAll(selectedDatabase));
    } else {
      console.log('kocak');
    }
    const total = dataTrxs?.data?.reduce((acc, trx) => acc + trx.nominal, 0);
    setTotalNominal(total);
  }, [dataTrxs]);

  const filteredData = useMemo(() => {
    if (!dataTransaksi?.data) return [];
    return dataTransaksi.data.filter((trx) => 
      trx.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trx.supplier.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trx.status.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [dataTransaksi, searchQuery]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredData, currentPage]);

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            DATA TRANSAKSI
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <div className="flex flex-wrap items-center">
            <select
              onChange={(e) => handleDropdownChange(e.target.value)}
              className="bg-white h-10 px-4 rounded-lg focus:outline-none border border-gray-300 mr-2 ml-4 mb-2 md:mb-0"
            >
              <option value="">Database</option>
              <option value="da">Digipos Amazone</option>
              <option value="de">Digipos EPS</option>
            </select>
            <div className="flex flex-col md:flex-row items-center mb-2 md:mb-0 md:ml-4">
              <label htmlFor="startDate" className="mr-2">Start Date:</label>
              <input
                type="date"
                id="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="shadow border rounded-lg px-2 py-1"
              />
            </div>
            <div className="flex flex-col md:flex-row items-center mb-2 md:mb-0 md:ml-4">
              <label htmlFor="endDate" className="mr-2">End Date:</label>
              <input
                type="date"
                id="endDate"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="shadow border rounded-lg px-2 py-1"
              />
            </div>
            <button
              type="button"
              className="ml-4 mt-2 md:mt-0 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-xs px-3 py-1.5 mb-2 md:mb-0"
              onClick={handleSubmit}
            >
              CEK
            </button>
          </div>
          <input
            type="text"
            className="bg-white h-10 px-4 rounded-lg focus:outline-none border border-gray-300 mr-2 ml-4 mb-4 mt-4"
            name="search"
            placeholder="Search"
            style={{ backgroundColor: '#F0F0F0' }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] table-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  {["ID", "TANGGAL ENTRY", "TANGGAL STATUS", "NAME", "SUPPLIER", "AMOUNT", "STATUS", "REKENING ASAL", "REKENING TUJUAN", "IMAGE", "REPLY"].map((el, index) => (
                    <th
                      key={index}
                      className="border-b border-blue-gray-50 py-3 px-5 text-center"
                      style={{ width: `${100 / 11}%` }}
                    >
                      <span className="text-[11px] font-bold uppercase text-blue-gray-400">
                        {el}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((trx, index) => (
                  <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700" key={index}>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {trx.id}
                    </td>
                    <td className="px-6 py-4">{trx.created_at}</td>
                    <td className="px-6 py-4">{trx.updated_at}</td>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {trx.name}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {trx.supplier}
                    </td>
                    <td className="px-6 py-4">{formatNumber(trx.amount)}</td>
                    <td className="px-6 py-4">
                      <span className={`bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300`}>
                        {trx.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">{trx.origin_account}</td>
                    <td className="px-6 py-4">{trx.destination_account}</td>
                    <td className="px-2 py-4"><ModalFoto id={trx.id} /></td>
                    <td className="px-6 py-4">{trx.reply}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardBody>
        <CustomPagination
          totalItems={filteredData.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </Card>
    </div>
  );
}

export default TablesAntri;
