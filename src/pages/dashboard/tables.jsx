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
import { fetchUsers } from "@/store/actionCreators";
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from "react-router-dom"
import Dropdown from "@/components/Dropdown";

export function Tables() {
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
            INBOX
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          {/*tanggal */}
          <div style={{ marginTop: '5px', marginBottom: '5px' }}>
            <label htmlFor="startDate">Start Date:</label>
            <input
              style={{ marginLeft: '14px', marginBottom: '10px' }}
              type="date"
              id="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="shadow border rounded-lg px-2 py-1"
            />
          </div>

          <div style={{ marginTop: '5px', marginBottom: '5px' }}>
            <label htmlFor="endDate">End Date:</label>
            <input
              style={{ marginLeft: '20px' }}
              type="date"
              id="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="shadow border rounded-lg px-2 py-1"
            />
          </div>
          <button

            onClick={handleSubmit}
            className="shadow-lg shadow-black-800/80 rounded-lg gradient text-white px-4 py-2 text-sm rounded font-medium focus:ring ring-black ring-opacity-10 gradient element-to-rotate"
            aria-label="Submit"
            title="Submit"
            style={{ backgroundColor: 'black', marginBottom: '8px' }}
            disabled={submitLoading}
          >
            {submitLoading ? 'Loading...' : 'SUBMIT'}
          </button>

          {/*tanggal */}

          {/* <div className="py-20 h-screen bg-gray-300 px-2"> */}
          <div className="max-w-md mx-auto rounded-lg overflow-hidden md:max-w-xl">
            <div className="md:flex">
              <div className="w-full p-3">
                <div className="relative">
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
            </div>
          </div>
          {/* </div> */}
          <Dropdown />
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["NO", "TANGGAL", "ID MEMBER", "PENGIRIM", "PESAN", 'CENTERID', 'TIPE'].map((el) => (
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
              {/* {users.data?.map((user, index) => {
                const className = `py-3 px-5 ${index === users.data.length - 1
                  ? ""
                  : "border-b border-blue-gray-50"
                  }`;
                return ( */}
                  <tr>
                    <td className='border-b border-blue-gray-50'>
                      <div className="flex items-center gap-4">
                        {/* <Avatar src={`${import.meta.env.VITE_API_URL}${user.foto_formal}`} alt={user.nama_lengkap} size="sm" variant="rounded" /> */}
                        <div>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-semibold"
                          >
                            1
                          </Typography>
                          {/* <Typography className="text-xs font-normal text-blue-gray-500">
                         ASDASD
                          </Typography> */}
                        </div>
                      </div>
                    </td>
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
                    {/* <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {user.tanggal_lahir}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {user.nomor_telpon}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {user.nik}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {user.nama_emergency}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {user.hubungan_emergency}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {user.nomor_kontak_emergency}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {user.nomor_rekening_bca}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {user.alamat_lengkap_ktp}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {user.alamat_lengkap_domisili}
                      </Typography>
                    </td>
                    <td className={className}>
                      <a
                        style={{ color: 'blue', fontWeight: 'bold' }}
                        href={`${import.meta.env.VITE_API_URL}${user.foto_ktp}`} download>
                        View
                      </a>
                    </td>
                    <td className={className}>
                      <a
                        style={{ color: 'blue', fontWeight: 'bold' }}
                        href={`${import.meta.env.VITE_API_URL}${user.foto_formal}`} download>
                        View
                      </a>
                    </td>
                    <td className={className}>
                      <a
                        style={{ color: 'blue', fontWeight: 'bold' }}
                        href={`${import.meta.env.VITE_API_URL}${user.file_kontrak}`} download>
                        View
                      </a>
                    </td> */}
                    {/* <td className={className}>
                        <Chip
                          variant="gradient"
                          color={online ? "green" : "blue-gray"}
                          value={online ? "online" : "offline"}
                          className="py-0.5 px-2 text-[11px] font-medium w-fit"
                        />
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {date}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography
                          as="a"
                          href="#"
                          className="text-xs font-semibold text-blue-gray-600"
                        >
                          Edit
                        </Typography>
                      </td> */}
                  </tr>
                {/* );
              }
              )} */}
            </tbody>
          </table>
        </CardBody>
      </Card>
      {/* <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Projects Table
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["companies", "members", "budget", "completion", ""].map(
                  (el) => (
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
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {projectsTableData.map(
                ({ img, name, members, budget, completion }, key) => {
                  const className = `py-3 px-5 ${
                    key === projectsTableData.length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
                  }`;

                  return (
                    <tr key={name}>
                      <td className={className}>
                        <div className="flex items-center gap-4">
                          <Avatar src={img} alt={name} size="sm" />
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-bold"
                          >
                            {name}
                          </Typography>
                        </div>
                      </td>
                      <td className={className}>
                        {members.map(({ img, name }, key) => (
                          <Tooltip key={name} content={name}>
                            <Avatar
                              src={img}
                              alt={name}
                              size="xs"
                              variant="circular"
                              className={`cursor-pointer border-2 border-white ${
                                key === 0 ? "" : "-ml-2.5"
                              }`}
                            />
                          </Tooltip>
                        ))}
                      </td>
                      <td className={className}>
                        <Typography
                          variant="small"
                          className="text-xs font-medium text-blue-gray-600"
                        >
                          {budget}
                        </Typography>
                      </td>
                      <td className={className}>
                        <div className="w-10/12">
                          <Typography
                            variant="small"
                            className="mb-1 block text-xs font-medium text-blue-gray-600"
                          >
                            {completion}%
                          </Typography>
                          <Progress
                            value={completion}
                            variant="gradient"
                            color={completion === 100 ? "green" : "gray"}
                            className="h-1"
                          />
                        </div>
                      </td>
                      <td className={className}>
                        <Typography
                          as="a"
                          href="#"
                          className="text-xs font-semibold text-blue-gray-600"
                        >
                          <EllipsisVerticalIcon
                            strokeWidth={2}
                            className="h-5 w-5 text-inherit"
                          />
                        </Typography>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </CardBody>
      </Card> */}
    </div>
  );
}

export default Tables;
