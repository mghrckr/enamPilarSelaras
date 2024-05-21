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
import { fetchCheckSNDuplicate, fetchCheckSNNullable, fetchDataTrxBank, fetchDataTrxSPL, fetchUsers, formatNumber } from "@/store/actionCreators";
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
import statisticsCardsDataKomisi from "@/data/statistics-cards-dataKomisi copy";
import { StatisticsCard } from "@/widgets/cards";
import DropdownAgenID from "@/components/DropdownAgenID";
import { styled } from '@mui/system';


export function CheckSN() {
  const dispatch = useDispatch();
  let navigate = useNavigate()
  let [startDate, setStartDate] = useState('');
  let [endDate, setEndDate] = useState('');
  let [startDateBank, setStartDateBank] = useState('');
  let [endDateBank, setEndDateBank] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submittedBank, setSubmittedBank] = useState(false);
  const [submitLoadingBank, setSubmitLoadingBank] = useState(false);
  const [totalNominalSPL, setTotalNominalSPL] = useState(0);
  const [totalNominalBank, setTotalNominalBank] = useState(0);

  const checkSNNullable = useSelector((state) => state.checkSNNullable.checkSNNullable);
  const checkSNDuplicate = useSelector((state) => state.checkSNDuplicate.checkSNDuplicate);

  const Marquee = styled('div')({
    display: 'inline-block',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    width: '100%', // or set a fixed width if you want
  });
  
  const MarqueeContent = styled('div')({
    display: 'inline-block',
    animation: 'marquee 10s linear infinite',
    '@keyframes marquee': {
      '0%': {
        transform: 'translateX(100%)',
      },
      '100%': {
        transform: 'translateX(0%)',
      }
    }
  });


  const refreshh = (e) => {
    e.preventDefault();
    window.location.reload()
  }

  useEffect(() => {
    dispatch(fetchCheckSNNullable());
    dispatch(fetchCheckSNDuplicate());
  }, [dispatch]);

  console.log(checkSNNullable, 'yoyoyoyoyoyo');
  console.log(checkSNDuplicate, 'ZZZZZZZZZZ');

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      {/* {JSON.stringify(users.data)} */}
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            CHECK SN
          </Typography>
        </CardHeader>
        <CardBody className="px-0 pt-0 pb-2 flex flex-col gap-6">
          {/* <div className="mb-4 grid grid-cols-1 gap-6 xl:grid-cols-3"> */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <DropdownAgenID />
          </div>
          <Card className="border border-blue-gray-100 shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[64  0px] table-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    {["NO", "KODE RESELLER", "KODE PRODUK", "TUJUAN", "TGL ENTRI", "TGL STATUS", "SN", "SELISIH WAKTU"].map((el) => (
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
                  {checkSNNullable?.data?.map((sn, index) => (
                    <tr key={index} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                      <td className="px-6 py-4">{index + 1}</td>
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {sn.kode_reseller}
                      </td>
                      <td className="px-6 py-4">{sn.kode_produk}</td>
                      <td className="px-6 py-4">{sn.tujuan}</td>
                      <td className="px-6 py-4">{sn.tgl_entri}</td>
                      <td className="px-6 py-4">{sn.tgl_status}</td>
                      <td className="px-6 py-4">{sn.sn}</td>
                      <td className="px-6 py-4">{sn.selisih_waktu}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
          <Card className="ooverflow-hidden border border-blue-gray-100 shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[64  0px] table-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    {["NO", "SN TUJUAN", "TUJUAN", "TOTAL"].map((el) => (
                      <th
                        key={el}
                        className="border-b border-blue-gray-50 py-3 px-5 text-center"
                        style={{ width: '25%' }}
                      >
                        <span className="text-[11px] font-bold uppercase text-blue-gray-400">
                          {el}
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {checkSNDuplicate?.data ? (
                    <table>
                      <tbody>
                        {checkSNDuplicate.data.map((sn, index) => (
                          <tr
                            key={index}
                            className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                          >
                            <td className="px-6 py-4">{index + 1}</td>
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                              {sn.sn}
                            </td>
                            <td className="px-6 py-4">{sn.tujuan}</td>
                            <td className="px-6 py-4">{sn.total}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <Marquee>
                      <MarqueeContent>
                        <Typography variant="h6" color="black">
                          TIDAK ADA DATA
                        </Typography>
                      </MarqueeContent>
                    </Marquee>
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </CardBody>
      </Card>
    </div >
  );
}

export default CheckSN;
