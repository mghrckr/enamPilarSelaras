import React, { useState, useEffect } from 'react';
import {
  Card,
  Input,
  Button,
  Typography,
  Textarea,
  Select,
  MenuItem
} from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { addDeposit, fetchBanks, fetchSuppliersAcns, fetchUserAcns, setPickedBank, setPickedSupplier, setPickedUser } from '@/store/actionCreators';

export function InputForm() {
  const [formData, setFormData] = useState({
    user_id: '',
    supplier_id: '',
    nominal: '',
    bankaccount_id: '',
    banknote: ''
  });

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenSupplier, setIsOpenSupplier] = useState(false);
  const [isOpenBank, setIsOpenBank] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdownSupplier = () => {
    setIsOpenSupplier(!isOpenSupplier);
  };

  const toggleDropdownBank = () => {
    setIsOpenBank(!isOpenBank);
  };

  const handleUserClick = (user) => {
    dispatch(setPickedUser(user));
    const selectedUser = userAcns.data.find(u => u.name === user);
    const userId = selectedUser.id;
    setFormData({
      ...formData,
      user_id: userId,
    });
    localStorage.setItem('user', user);
    setIsOpen(false);
  };

  const handleBankClick = (bank) => {
    dispatch(setPickedBank(bank));
    const selectedbank = banks.data.find(u => u.name === bank);
    const bankId = selectedbank.id;
    setFormData({
      ...formData,
      bankaccount_id: bankId,
    });
    localStorage.setItem('bank', bank);
    setIsOpenBank(false);
  };

  const handleSupplierClick = (supplier) => {
    dispatch(setPickedSupplier(supplier));
    const selectedSupplier = suppliersAcns.data.find(s => s.name === supplier);
    const supplierId = selectedSupplier.id;
    setFormData({
      ...formData,
      supplier_id: supplierId,
    });
    localStorage.setItem('supplier', supplier);
    setIsOpenSupplier(false);
  };

  const dispatch = useDispatch();

  const banks = useSelector((state) => state.banks.banks);
  const userAcns = useSelector((state) => state.userAcns.userAcns);
  const suppliersAcns = useSelector((state) => state.suppliersAcns.suppliersAcns);
  const pickedUser = useSelector((state) => state.pickedUser.pickedUser);
  const pickedSupplier = useSelector((state) => state.pickedSupplier.pickedSupplier);
  const pickedBank = useSelector((state) => state.pickedBank.pickedBank);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      // Dispatch the action to add user
      await dispatch(addDeposit(Object.fromEntries(formDataToSend)));
     
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  useEffect(() => {
    dispatch(fetchBanks());
    dispatch(fetchSuppliersAcns());
    dispatch(fetchUserAcns());
  }, [dispatch]);

  console.log(banks, 'benggg');
  console.log(suppliersAcns, 'supp');
  console.log(userAcns, 'uss');
  return (
    <Card color="transparent" shadow={false}>
      <Typography variant="h4" color="blue-gray">
        INPUT DEPOSIT SPL
      </Typography>
      <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={handleSubmit} encType="multipart/form-data">
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
                {pickedUser || 'Select Users'}
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
              name="user_id"
              id="dropdown"
              value={formData.user_id}
              className={`z-10 absolute ${isOpen ? 'block' : 'hidden'} bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}
              style={{ top: 'calc(100% + 5px)', left: 0 }}
            >
              <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                {userAcns?.data?.map((user, index) => (
                  <li key={index}>
                    <button
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      onClick={() => handleUserClick(user.name)}
                      onChange={() => handleSelectChange(user.id)}
                    >
                      {user.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="relative inline-block text-left mb-2 mt-2 mr-2 ml-2">
            <button
              id="dropdownDefaultButton"
              data-dropdown-toggle="dropdown"
              className="flex items-center mt-2 text-white bg-gradient-to-r from-brown-400 via-brown-500 to-brown-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-brown-300 dark:focus:ring-brown-800 shadow-lg shadow-brown-500/50 dark:shadow-lg dark:shadow-brown-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 relative"
              type="button"
              onClick={toggleDropdownSupplier}
              style={{ backgroundColor: '#594545' }}
            >
              <span>
                {pickedSupplier || 'Select Suppliers'}
              </span>
              <svg
                className={`w-2.5 h-2.5 ml-3 transition-transform transform ${isOpenSupplier ? 'rotate-180' : ''}`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
              </svg>
            </button>

            <div
              name="supplier_id"
              id="dropdown"
              value={formData.supplier_id}
              className={`z-10 absolute ${isOpenSupplier ? 'block' : 'hidden'} bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}
              style={{ top: 'calc(100% + 5px)', left: 0 }}
            >
              <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                {suppliersAcns?.data?.map((supplier, index) => (
                  <li key={index}>
                    <a
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      onClick={() => handleSupplierClick(supplier.name)}
                    >
                      {supplier.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div>
            <Typography variant="h6" color="blue-gray" className="-mb-1">
              Nominal Deposit
            </Typography>
            <Input
              type="number"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              name="nominal"
              value={formData.nominal}
              onChange={handleInputChange}
            />
          </div>
          {/* <div>
            <Typography variant="h6" color="blue-gray" className="-mb-1">
              Rekening Asal
            </Typography>
            <fieldset>
              <legend className="sr-only">Countries</legend>
              {banks?.data?.map(bank => (
                <div key={bank.id} className="flex items-center mb-4 mt-4">
                  <input
                    id={bank.id}
                    type="radio"
                    name="bankaccount_id"
                    value={formData.bankaccount_id}
                    className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
                    // defaultChecked={formData.bankaccount_id === bank.id}
                    onChange={handleRadioChange}
                  />
                  <label
                    htmlFor={bank.id}
                    className="block ms-2  text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    {bank.name}
                  </label>
                </div>
              ))}
            </fieldset>
          </div> */}
          <div className="relative inline-block text-left mb-2 mt-2 mr-2 ml-2">
            <button
              id="dropdownDefaultButton"
              data-dropdown-toggle="dropdown"
              className="flex items-center mt-2 text-white bg-gradient-to-r from-brown-400 via-brown-500 to-brown-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-brown-300 dark:focus:ring-brown-800 shadow-lg shadow-brown-500/50 dark:shadow-lg dark:shadow-brown-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 relative"
              type="button"
              onClick={toggleDropdownBank}
              style={{ backgroundColor: '#594545' }}
            >
              <span>
                {pickedBank || 'Select Banks'}
              </span>
              <svg
                className={`w-2.5 h-2.5 ml-3 transition-transform transform ${isOpenBank ? 'rotate-180' : ''}`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
              </svg>
            </button>

            <div
              name="supplier_id"
              id="dropdown"
              value={formData.bankaccount_id}
              className={`z-10 absolute ${isOpenBank ? 'block' : 'hidden'} bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}
              style={{ top: 'calc(100% + 5px)', left: 0 }}
            >
              <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                {banks?.data?.map((bank, index) => (
                  <li key={index}>
                    <a
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      onClick={() => handleBankClick(bank.name)}
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
              Rekening Tujuan
            </Typography>
            <Textarea
              type="text"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              name="banknote"
              value={formData.banknote}
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
    </Card>
  );
}
