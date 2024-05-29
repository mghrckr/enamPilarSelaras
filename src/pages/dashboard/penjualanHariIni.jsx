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
import { useDispatch, useSelector } from "react-redux";
import { fetchPenjualanHariIni, fetchUsers, formatNumber } from "@/store/actionCreators";
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from "react-router-dom"
import DropdownAgenID from "@/components/DropdownAgenID";


export function PenjualanHariIni() {
  const dispatch = useDispatch();
  const [selectedDatabase, setSelectedDatabase] = useState('re');
  const penjualanHariIni = useSelector((state) => state.penjualanHariIni.penjualanHariIni);

  const handleDropdownChange = (value) => {
    setSelectedDatabase(value);
  };


  useEffect(() => {
    if (selectedDatabase) {
      dispatch(fetchPenjualanHariIni(selectedDatabase));
    }
  }, [dispatch, selectedDatabase]);

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
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
            <div className="flex flex-col items-start w-full md:w-auto">
              <select
                id="database"
                onChange={(e) => handleDropdownChange(e.target.value)}
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              >
                <option value="">Database</option>
                <option value="da">Digipos Amazone</option>
                <option value="de">Digipos EPS</option>
                <option value="ra">Replica Amazone</option>
                <option value="re">Replica EPS</option>
              </select>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] table-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  {["TRX", "PEMBELIAN", "PENJUALAN", "LABA", "PPH 22", "LABA NET"].map((el) => (
                    <th
                      key={el}
                      className="border-b border-blue-gray-50 py-3 px-5 text-center"
                      style={{ width: '16.6%' }}
                    >
                      <span className="text-[11px] font-bold uppercase text-blue-gray-400">
                        {el}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {penjualanHariIni?.data?.map((p, index) => (
                  <tr key={index} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {p.trx}
                    </td>
                    <td className="px-6 py-4">Rp. {formatNumber(p.pembelian)}</td>
                    <td className="px-6 py-4">Rp. {formatNumber(p.penjualan)}</td>
                    <td className="px-6 py-4">Rp. {formatNumber(p.laba)}</td>
                    <td className="px-6 py-4">Rp. {formatNumber(p.pph)}</td>
                    <td className="px-6 py-4">Rp. {formatNumber(p.laba_net)}</td>
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

export default PenjualanHariIni;
