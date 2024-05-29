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
import { fetchDepositsorCheckPendings, fetchUploadedorCheckPendings } from "@/store/actionCreators";
import React, { useEffect,useState } from 'react';
import ModalFile from "@/components/ModalFile";
import ModalPut from "@/components/ModalPut";
import ModalFoto from "@/components/ModalFoto";


export function TablesOutbox() {
  const dispatch = useDispatch();
  const [selectedDatabase, setSelectedDatabase] = useState('de');

  const handleDropdownChange = (value) => {
    setSelectedDatabase(value);
  };

  const formatNumber = (number) => {
    if (number === undefined) {
      return "";
    }
    return number.toLocaleString();
  };

  const deposits = useSelector((state) => state.deposits.deposits);
  const uploaded = useSelector((state) => state.uploaded.uploaded);

  useEffect(() => {
    if (selectedDatabase) {
      dispatch(fetchDepositsorCheckPendings(selectedDatabase));
      dispatch(fetchUploadedorCheckPendings(selectedDatabase))
    }
  }, [dispatch,selectedDatabase])

  console.log(uploaded, 'yayayayayay');
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
              </select>
            </div>
          </div>
          <Typography className="ml-4" variant="h6" color="black">
            HANYA MENAMPILKAN DATA YANG BELUM ADA BUKTI TRANSFER
          </Typography>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] table-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  {["NO", "TANGGAL", "PEMOHON", "SUPPLIER", "JUMLAH", "REKENING ASAL", 'REKENING TUJUAN', 'OPSI'].map((el) => (
                    <th
                      key={el}
                      className="border-b border-blue-gray-50 py-3 px-5 text-center"
                      style={{ width: '12,5%' }}
                    >
                      <span className="text-[11px] font-bold uppercase text-blue-gray-400">
                        {el}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {deposits?.data?.map((pending, index) => (
                  <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700" key={index}>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4">{pending.created_at}</td>
                    <td className="px-6 py-4">{pending.name}</td>
                    <td className="px-6 py-4">{pending.supplier}</td>
                    <td className="px-6 py-4"> Rp. {formatNumber(pending.amount)}</td>
                    <td className="px-6 py-4">{pending.origin_account}</td>
                    <td className="px-6 py-4">{pending.destination_account}</td>
                    <td className="px-6 py-4"><ModalFile id={pending.id} name={pending.name} supplier={pending.supplier} amount={pending.amount} origin_account={pending.origin_account} destination_account={pending.destination_account} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Typography className="ml-4 mt-4" variant="h6" color="black">
            HANYA MENAMPILKAN DATA YANG BELUM ADA BUKTI PENAMBAHAN
          </Typography>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] table-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  {["NO", "TANGGAL", "PEMOHON", "SUPPLIER", "JUMLAH", "REKENING ASAL", 'REKENING TUJUAN', 'REPLY', 'IMAGE', 'OPSI'].map((el) => (
                    <th
                      key={el}
                      className="border-b border-blue-gray-50 py-3 px-5 text-center"
                      style={{ width: '12,5%' }}
                    >
                      <span className="text-[11px] font-bold uppercase text-blue-gray-400">
                        {el}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {uploaded?.data?.map((pending, index) => (
                  <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700" key={index}>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4">{pending.created_at}</td>
                    <td className="px-6 py-4">{pending.name}</td>
                    <td className="px-6 py-4">{pending.supplier}</td>
                    <td className="px-6 py-4"> Rp. {formatNumber(pending.amount)}</td>
                    <td className="px-6 py-4">{pending.origin_account}</td>
                    <td className="px-6 py-4">{pending.destination_account}</td>
                    <td className="px-6 py-4">{pending.reply}</td>
                    <td className="px-6 py-4">  <ModalFoto id={pending.id} /></td>
                    {/* <td className="px-6 py-4">  <ModalPut id={pending.id} additional_proof={pending.reply} /></td>
                     */}
                    <td className="px-6 py-4">
                      <ModalPut
                        id={pending.id}
                        name={pending.name}
                        supplier={pending.supplier}
                        amount={pending.amount}
                        origin_account={pending.origin_account}
                        destination_account={pending.destination_account}
                        image_upload={pending.image_upload}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* <table className="w-full min-w-[640px] table-auto MT-8">
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
          </table> */}
        </CardBody>
      </Card>
    </div>
  );
}

export default TablesOutbox;
