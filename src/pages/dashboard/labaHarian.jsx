import { useDispatch, useSelector } from "react-redux";
import { fetchLabaHarian } from "@/store/actionCreators";
import React, { useState, useEffect } from 'react';
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
} from "@material-tailwind/react";

export function LabaHarian() {
  const dispatch = useDispatch();
  const [selectedDatabase, setSelectedDatabase] = useState('re');
  const labaHarian = useSelector((state) => state.labaHarian.labaHarian);

  const handleDropdownChange = (value) => {
    setSelectedDatabase(value);
  };
  const formatNumber = (number) => {
    if (number === undefined) {
      return "";
    }
    return number.toLocaleString();
  };



  const todayUse = new Date();
  let h2 = new Date();
  let h1 = new Date();
  h2.setDate(todayUse.getDate() - 2);
  h1.setDate(todayUse.getDate() - 1);
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Bulan dimulai dari 0
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  const formattedDateTodayMinusTwo = formatTimestamp(h2);
  const formattedDateTodayMinusOne = formatTimestamp(h1);
  const formattedToday = formatTimestamp(todayUse);

  const flattenedData = labaHarian?.data?.flat() || [];

  const filteredData = flattenedData.filter(item => {
    return item.tanggal == formattedToday;
  });
  const filteredData2 = flattenedData.filter(item => {
    return item.tanggal == formattedDateTodayMinusTwo;
  });
  const filteredData1 = flattenedData.filter(item => {
    return item.tanggal == formattedDateTodayMinusOne;
  });


  const refreshh = (e) => {
    e.preventDefault();
    localStorage.removeItem('startLocal');
    localStorage.removeItem('endLocal');
    localStorage.removeItem('startLocalBank');
    localStorage.removeItem('endLocalBank');
    window.location.reload()
  }

  useEffect(() => {
    if (selectedDatabase) {
      dispatch(fetchLabaHarian(selectedDatabase));
    }
  }, [dispatch,selectedDatabase]);


  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      {/* {JSON.stringify(users.data)} */}
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            LABA HARIAN
          </Typography>
        </CardHeader>
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
        <CardBody className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <Card className="border border-blue-gray-100 shadow-sm">
            <CardHeader
              floated={false}
              shadow={false}
              color="transparent"
              className="m-0 p-6"
            >
              <div>
                <Typography variant="h5" color="blue-gray" className="mb-1">
                  LABA {formattedDateTodayMinusTwo}
                </Typography>
              </div>
            </CardHeader>

            <CardBody className="overflow-x-scroll pt-0">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[64  0px] table-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      {["JAM", "TRX", "LABA"].map((el) => (
                        <th
                          key={el}
                          className="border-b border-blue-gray-50 py-3 px-5 text-center"
                          style={{ width: '40%' }}
                        >
                          <span className="text-[11px] font-bold uppercase text-blue-gray-400">
                            {el}
                          </span>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData2?.map((laba, index) => (
                      <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {laba.jam}
                        </td>
                        <td className="px-6 py-4">{formatNumber(laba.trx)}</td>
                        <td className="px-6 py-4">{formatNumber(laba.laba)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardBody>
          </Card>
          <Card className="border border-blue-gray-100 shadow-sm">
            <CardHeader
              floated={false}
              shadow={false}
              color="transparent"
              className="m-0 p-6"
            >
              <div>
                <Typography variant="h5" color="blue-gray" className="mb-1">
                  LABA {formattedDateTodayMinusOne}
                </Typography>
              </div>
            </CardHeader>

            <CardBody className="overflow-x-scroll pt-0">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[64  0px] table-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      {["JAM", "TRX", "LABA"].map((el) => (
                        <th
                          key={el}
                          className="border-b border-blue-gray-50 py-3 px-5 text-center"
                          style={{ width: '40%' }}
                        >
                          <span className="text-[11px] font-bold uppercase text-blue-gray-400">
                            {el}
                          </span>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData1?.map((laba, index) => (
                      <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {laba.jam}
                        </td>
                        <td className="px-6 py-4">{formatNumber(laba.trx)}</td>
                        <td className="px-6 py-4">{formatNumber(laba.laba)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardBody>
          </Card>
          <Card className="border border-blue-gray-100 shadow-sm">
            <CardHeader
              floated={false}
              shadow={false}
              color="transparent"
              className="m-0 p-6"
            >
              <div>
                <Typography variant="h5" color="blue-gray" className="mb-1">
                  LABA {formattedToday}
                </Typography>
              </div>
            </CardHeader>

            <CardBody className="overflow-x-scroll pt-0">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[64  0px] table-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      {["JAM", "TRX", "LABA"].map((el) => (
                        <th
                          key={el}
                          className="border-b border-blue-gray-50 py-3 px-5 text-center"
                          style={{ width: '40%' }}
                        >
                          <span className="text-[11px] font-bold uppercase text-blue-gray-400">
                            {el}
                          </span>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData?.map((laba, index) => (
                      <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {laba.jam}
                        </td>
                        <td className="px-6 py-4">{formatNumber(laba.trx)}</td>
                        <td className="px-6 py-4">{formatNumber(laba.laba)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardBody>
          </Card>
        </CardBody>
      </Card>
    </div >
  );
}

export default LabaHarian;
