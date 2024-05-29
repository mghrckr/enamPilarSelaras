import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button
} from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { addDataSupplier, addSupplier, fetchSuppliers } from "@/store/actionCreators";
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import SupplierStatusCheckbox from "@/components/SupplierStatusCheckbox";

export function Inbox() {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [totalBalance, setTotalBalance] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDatabase, setselectedDatabase] = useState('de');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleDropdownChange = (value) => {
    setselectedDatabase(value);
  };
  console.log(selectedDatabase);
  const formatNumber = (number) => {
    if (number === undefined) {
      return "";
    }
    return number.toLocaleString();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addSupplier(formData))
      .then(() => {
        Swal.fire({
          title: 'Success',
          text: 'Supplier added successfully!',
          icon: 'success',
          timer: 3000,
          timerProgressBar: true,
        }).then(() => {
          toggleModal();
          window.location.reload();
        });
      })
      .catch((error) => {
        Swal.fire('Error', 'Something went wrong!', 'error');
      });
  };

  const [formData, setFormData] = useState({
    name: '',
    status: 'inactive',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const suppliers = useSelector((state) => state.suppliers.suppliers);
  const dataSupplier = useSelector((state) => state.dataSupplier.dataSupplier);

  useEffect(() => {
    if (selectedDatabase) {
      dispatch(fetchSuppliers(selectedDatabase));
    }
  }, [selectedDatabase, dispatch]);

  useEffect(() => {
    if (dataSupplier && dataSupplier.data) {
      const total = dataSupplier.data.reduce((acc, curr) => acc + curr.balance, 0);
      setTotalBalance(total);
    }
  }, [dataSupplier]);

  const filteredData = suppliers?.data?.filter(supplier =>
    supplier.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const paginatedData = filteredData?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredData?.length / itemsPerPage);
  // console.log(paginatedData,'dfdfdf');
  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            DATA SPL
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
        <div className="mb-6 ml-2 mr-2 grid gap-y-10 gap-x-2 md:grid-cols-2 xl:grid-cols-4 flex justify-center">
            <button
              type="button"
              className="ml-2 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
              onClick={() => window.location.reload()}
            >
              REFRESH
            </button>
            <button
              onClick={toggleModal}
              className="shadow-lg shadow-black-800/80 rounded-lg gradient text-white px-4 py-2 text-sm rounded font-medium focus:ring ring-black ring-opacity-10 gradient element-to-rotate"
              aria-label="Submit"
              title="Submit"
              style={{ backgroundColor: 'green', marginBottom: '8px', marginLeft: '4px' }}
            >
              TAMBAH SUPPLIER
            </button>
            <select
              onChange={(e) => handleDropdownChange(e.target.value)}
              className="bg-white h-10 px-4 rounded-lg focus:outline-none border border-gray-300 mr-2"
            >
              <option value="">Database</option>
              <option value="da">Digipos Amazone</option>
              <option value="de">Digipos EPS</option>
            </select>
            <input
              type="text"
              className="bg-white h-10 px-4 rounded-lg focus:outline-none border border-gray-300 mr-2"
              name="search"
              placeholder="Search"
              style={{ backgroundColor: '#F0F0F0' }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] table-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  {["NO", "NAMA", "STATUS", "OPSI (ACTIVE/NON ACTIVE)"].map((el) => (
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
                {paginatedData?.map((supplier, index) => (
                  <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700" key={index}>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {(currentPage - 1) * itemsPerPage + index + 1}
                    </td>
                    <td className="px-6 py-4">{supplier.name}</td>
                    <td className="px-6 py-4">
                      <span className={`bg-${supplier.status === 'active' ? 'green' : 'red'}-100 text-${supplier.status === 'active' ? 'green' : 'red'}-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-${supplier.status === 'active' ? 'green' : 'red'}-900 dark:text-${supplier.status === 'active' ? 'green' : 'red'}-300`}>
                        {supplier.status === 'active' ? 'Aktif' : 'Tidak Aktif'}
                      </span>
                    </td>
                    <td className="px-6 py-4"><SupplierStatusCheckbox idSupplier={supplier.ID} statusSupplier={supplier.status} /></td>
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
              Page {currentPage}  {totalPages ? 'of ' + totalPages : ''}
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
      {modalOpen && (
        <div
          id="crud-modal"
          className={`fixed inset-0 z-50 flex items-center justify-center backdrop-filter backdrop-blur-md bg-opacity-40 bg-gray-300`}
        >
          <div className="relative p-4 w-full max-w-md max-h-full mx-auto my-32">
            {/* Modal content */}
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              {/* Modal header */}
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Tambah Supplier
                </h3>
                {/* Close button */}
                <button
                  type="button"
                  onClick={toggleModal}
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              {/* Modal body */}
              <form className="p-4 md:p-5" onSubmit={handleSubmit}>
                {/* Form content */}
                <div className="grid gap-4 mb-4 grid-cols-2">
                  <div className="col-span-2 sm:col-span-1">
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Name
                    </label>
                    <input
                      value={formData.name}
                      onChange={handleInputChange}
                      type="text"
                      name="name"
                      id="name"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Type supplier name"
                      required=""
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label
                      htmlFor="status"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Status
                    </label>
                    <select
                      name="status"
                      id="status"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      value={formData.status}
                      onChange={handleInputChange}
                    >
                      <option value="" disabled selected>Select Status</option>
                      <option value={'active'}>Aktif</option>
                      <option value={'inactive'}>Tidak Aktif</option>
                    </select>
                  </div>
                </div>
                <button
                  type="submit"
                  className="text-white inline-flex items-center bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                >
                  <svg
                    className="me-1 -ms-1 w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Tambah
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Inbox;
