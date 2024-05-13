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
import { fetchCekPendings, fetchUsers } from "@/store/actionCreators";
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from "react-router-dom"
import Dropdown from "@/components/Dropdown";
import DropdownOutbox from "@/components/DropdownOutbox";
import ModalFile from "@/components/ModalFile";
import ModalPut from "@/components/ModalPut";

export function TablesOutbox() {
  const dispatch = useDispatch();
  let navigate = useNavigate()
  let [startDate, setStartDate] = useState('');
  let [endDate, setEndDate] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [totalNominalTop, setTotalNominalTop] = useState(0);
  const [totalNominalBottom, setTotalNominalBottom] = useState(0);

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
  const formatNumber = (number) => {
    if (number === undefined) {
      return "";
    }
    return number.toLocaleString();
  };

  const users = useSelector((state) => state.users.users);
  const cekPendings = useSelector((state) => state.cekPendings.cekPendings);

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchCekPendings())
  }, [dispatch]); console.log(cekPendings, 'csscscs');
  useEffect(() => {
    // Hitung total nominal untuk tabel atas
    const totalTop = cekPendings?.data
      ?.filter((pending) => pending.status === 'pending')
      .reduce((acc, curr) => acc + curr.nominal, 0);
    setTotalNominalTop(totalTop);

    // Hitung total nominal untuk tabel bawah
    const totalBottom = cekPendings?.data
      ?.filter((pending) => pending.status !== 'pending' && pending.additional_proof === null)
      .reduce((acc, curr) => acc + curr.nominal, 0);
    setTotalNominalBottom(totalBottom);
  }, [cekPendings]);

  console.log(totalNominalTop, totalNominalBottom, 'top', 'bot');
  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      {/* {JSON.stringify(users.data)} */}
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            CEK PENDING
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <button
            type="button"
            className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          >
            REFRESH
          </button>
          <Typography variant="h6" color="black">
            HANYA MENAMPILKAN DATA YANG BELUM ADA BUKTI TRANSFER
          </Typography>
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["NO", "TANGGAL", "PEMOHON", "SUPPLIER", "JUMLAH", "REKENING ASAL", 'REKENING TUJUAN', 'OPSI'].map((el) => (
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
              {cekPendings?.data
                ?.filter((pending) => pending.status === 'pending')
                .map((pending, index) => (
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
                        {pending.date}
                      </Typography>
                    </td>
                    <td className='border-b border-blue-gray-50'>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {pending.user_name}
                      </Typography>
                    </td>
                    <td className='border-b border-blue-gray-50'>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {pending.supplier_name}
                      </Typography>
                    </td>
                    <td className='border-b border-blue-gray-50'>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        Rp. {formatNumber(pending.nominal)}
                      </Typography>
                    </td>
                    <td className='border-b border-blue-gray-50'>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {pending.bankaccount_name}
                      </Typography>
                    </td>
                    <td className='border-b border-blue-gray-50'>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {pending.banknote}
                      </Typography>
                    </td>
                    <td className='border-b border-blue-gray-50'>
                      <ModalFile id={pending.id} />
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
                    Rp. {formatNumber(totalNominalTop)}
                  </Typography>
                </td>
              </tr>
            </tbody>
          </table>
          <Typography variant="h6" color="black">
            HANYA MENAMPILKAN DATA YANG BELUM ADA BUKTI PENAMBAHAN
          </Typography>
          <table className="w-full min-w-[640px] table-auto MT-8">
            <thead>
              <tr>
                {["NO", "TANGGAL", "PEMOHON", "SUPPLIER", "JUMLAH", "REKENING ASAL", 'REKENING TUJUAN', 'OPSI'].map((el) => (
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
              {cekPendings?.data
                ?.filter((pending) => pending.status !== 'pending' && pending.additional_proof === null)
                .map((pending, index) => (
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
                        {pending.date}
                      </Typography>
                    </td>
                    <td className='border-b border-blue-gray-50'>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {pending.user_name}
                      </Typography>
                    </td>
                    <td className='border-b border-blue-gray-50'>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {pending.supplier_name}
                      </Typography>
                    </td>
                    <td className='border-b border-blue-gray-50'>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        Rp. {formatNumber(pending.nominal)}
                      </Typography>
                    </td>
                    <td className='border-b border-blue-gray-50'>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {pending.bankaccount_name}
                      </Typography>
                    </td>
                    <td className='border-b border-blue-gray-50'>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {pending.banknote}
                      </Typography>
                    </td>
                    <td className='border-b border-blue-gray-50'>
                      <ModalPut id={pending.id} additional_proof={pending.additional_proof} />
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
                    Rp. {formatNumber(totalNominalBottom)}
                  </Typography>
                </td>
              </tr>
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
}

export default TablesOutbox;
