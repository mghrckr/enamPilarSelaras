import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchSaldoSupplier, formatNumber } from "@/store/actionCreators";
import { Card, CardHeader, CardBody, Typography, Button } from "@material-tailwind/react";
import { BanknotesIcon, TicketIcon } from "@heroicons/react/24/solid";
import { StatisticsCard } from "@/widgets/cards";
import DropdownAgenID from "@/components/DropdownAgenID";

export function DataSupplier() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((state) => state.users.users);
  const saldoSupplier = useSelector((state) => state.saldoSupplier.saldoSupplier);
  const totalTransaksi = saldoSupplier?.data?.reduce((total, saldo) => total + saldo.total_transaksi, 0);
  const totalPemakaianSaldo = saldoSupplier?.data?.reduce((total, saldo) => total + saldo.pemakaian_saldo, 0);
  const totalSaldoSekarang = saldoSupplier?.data?.reduce((total, saldo) => total + saldo.saldo_sekarang, 0);

  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredData = useMemo(() => {
    if (!searchQuery) {
      return saldoSupplier?.data || [];
    }
    return saldoSupplier?.data?.filter((saldo) =>
      saldo.label.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, saldoSupplier?.data]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredData.slice(startIndex, endIndex);
  }, [currentPage, filteredData]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  useEffect(() => {
    dispatch(fetchSaldoSupplier());
  }, [dispatch]);

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
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
                style={{ backgroundColor: '#F0F0F0' }}
                value={searchQuery}
                onChange={handleSearchInputChange}
                placeholder="Search..."
              />
            </div>
          </div>
          <div className="mb-6 ml-4 mr-4 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-3 flex justify-center">
            <StatisticsCard
              key="Saldo Member Aktif"
              value={`Rp. ${formatNumber(totalSaldoSekarang)}`}
              title={<strong>Total Saldo</strong>}
              icon={React.createElement(BanknotesIcon, {
                className: "w-14 h-14 text-white",
              })}
            />
            <StatisticsCard
              key="Saldo Member Aktif"
              value={`Rp. ${formatNumber(totalPemakaianSaldo)}`}
              title={<strong>Total Pemakaian Saldo</strong>}
              icon={React.createElement(BanknotesIcon, {
                className: "w-14 h-14 text-white",
              })}
            />
            <StatisticsCard
              key="Saldo Member Aktif"
              value={formatNumber(totalTransaksi)}
              title={<strong>Total Transaksi</strong>}
              icon={React.createElement(TicketIcon, {
                className: "w-14 h-14 text-white",
              })}
            />
          </div>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400" style={{ borderCollapse: 'collapse' }}>
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  {["LABEL", "TOTAL TRANSAKSI", "PEMAKAIAN SALDO", "SALDO SEKARANG"].map((el) => (
                    <th
                      key={el}
                      className="border-b border-blue-gray-50 py-3 px-5 text-center"
                      style={{ width: '25%' }}
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
                {paginatedData?.map((saldo, index) => (
                  <tr key={index} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                    <td
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      style={{ width: '25%', padding: '10px 5px' }}
                    >
                      {saldo.label}
                    </td>
                    <td className="px-6 py-4" style={{ width: '25%', padding: '10px 5px' }}>{saldo.total_transaksi}</td>
                    <td className="px-6 py-4" style={{ width: '25%', padding: '10px 5px' }}>Rp. {formatNumber(saldo.pemakaian_saldo)}</td>
                    <td className="px-6 py-4" style={{ width: '25%', padding: '10px 5px' }}>Rp. {formatNumber(saldo.saldo_sekarang)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between items-center p-4">
            <Button
              variant="outlined"
              color="blue"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <Typography variant="body2">
              Page {currentPage} of {totalPages}
            </Typography>
            <Button
              variant="outlined"
              color="blue"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default DataSupplier;
