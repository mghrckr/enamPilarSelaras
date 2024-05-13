import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Input,
  Textarea,
  Select,
  MenuItem,
  Button
} from "@material-tailwind/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { authorsTableData, projectsTableData } from "@/data";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, addSaldo, deleteProduct, fetchBanks, fetchCategories, fetchOperators, fetchProducts, fetchUsers, setPickedBankAwal } from "@/store/actionCreators";
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from "react-router-dom"
import Swal from 'sweetalert2';;


export function DataProduk() {
  const dispatch = useDispatch();
  let navigate = useNavigate()
  let [startDate, setStartDate] = useState('');
  let [endDate, setEndDate] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const banks = useSelector((state) => state.banks.banks);

  const [formData, setFormData] = useState({
    bank_id: '',
    initial_balance: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // toggleModal();

    try {
      await dispatch(addSaldo(formData));

      Swal.fire({
        icon: 'success',
        title: 'Add Saldo successfully!',
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        setTimeout(() => {
          window.location.reload()
        }, 100);
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const products = useSelector((state) => state.products.products);
  const categories = useSelector((state) => state.categories.categories);
  const operators = useSelector((state) => state.operators.operators);
  const pickedBankAwal = useSelector((state) => state.pickedBankAwal.pickedBankAwal);

  const [searchTerm, setSearchTerm] = useState('');

  const handleClear = () => {
    setSearchTerm('');
  };


  function formatCurrency(amount) {
    return `Rp. ${amount.toLocaleString('id-ID')}`;
  }

  const [modalOpen, setModalOpen] = useState(false);


  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const handleClick = (bank) => {
    dispatch(setPickedBankAwal(bank.name));
    const bankId = bank.id
    setFormData({
      ...formData,
      bank_id: bankId,
    });
    setIsOpen(false);
  };


  useEffect(() => {
    dispatch(fetchBanks());
  }, [dispatch]);
  // console.log(banks, 'benggg');
  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      {/* {console.log(categories?.data?.categories)} */}
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            INPUT SALDO AWAL
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 p-6">
          <form className=" mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="mb-1 flex flex-col gap-6">
              <div className="relative inline-block text-left mb-2 mt-2 mr-2 ml-2">
                <button
                  id="dropdownDefaultButton"
                  data-dropdown-toggle="dropdown"
                  className="flex items-center mt-2 text-white bg-gradient-to-r from-brown-400 via-brown-500 to-brown-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-brown-300 dark:focus:ring-brown-800 shadow-lg shadow-brown-500/50 dark:shadow-lg dark:shadow-brown-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 relative"
                  type="button"
                  onClick={toggleDropdown}
                  style={{ backgroundColor: '#594545' }}
                >
                  <span>
                    {pickedBankAwal || 'Select Banks'}
                  </span>
                  <svg
                    className={`w-2.5 h-2.5 ml-3 transition-transform transform ${isOpen ? 'rotate-180' : ''}`}
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                  </svg>
                </button>

                <div
                  name="bank_id"
                  id="dropdown"
                  value={formData.bank_id}
                  className={`z-10 absolute ${isOpen ? 'block' : 'hidden'} bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}
                  style={{ top: 'calc(100% + 5px)', left: 0 }}
                >
                  <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                    {banks?.data?.map((bank, index) => (
                      <li key={index}>
                        <a
                          href="#"
                          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          onClick={() => handleClick(bank)}
                        >
                          {bank.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div>
                <Typography variant="h6" color="blue-gray" className="-mb-1">
                  BALANCE
                </Typography>
                <Input
                  type="number"
                  className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  name="initial_balance"
                  value={formData.initial_balance}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <Button
              type="submit"
              className="mt-6" fullWidth>
              Submit
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}

export default DataProduk;
