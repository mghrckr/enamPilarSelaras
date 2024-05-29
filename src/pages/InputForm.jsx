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
import { addDeposit, fetchBanks, fetchSuppliers, fetchSuppliersAcns, fetchUserAcns, setPickedBank, setPickedSupplier, setPickedUser } from '@/store/actionCreators';

export function InputForm() {
  const [formData, setFormData] = useState({
    name: '',
    supplier: '',
    amount: '',
    origin_account: '',
    destination_account: ''
  });


  const [isOpen, setIsOpen] = useState(false);
  const [isOpenSupplier, setIsOpenSupplier] = useState(false);
  const [isOpenBank, setIsOpenBank] = useState(false);
  const [selectedDatabase, setselectedDatabase] = useState('de');
  const [selectedSupplier, setselectedSupplier] = useState('');
  const suppliers = useSelector((state) => state.suppliers.suppliers);

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDropdownChangeSuppliers = (value) => {
    setselectedSupplier(value);
    setFormData({
      ...formData,
      supplier: value,
    });
  };
  const handleDropdownChange = (value) => {
    setselectedDatabase(value);
  };
  const handleDropdownChangeBank = (value) => {
    setFormData({
      ...formData,
      origin_account: value,
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
      await dispatch(addDeposit(formDataToSend));
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  useEffect(() => {
    dispatch(fetchBanks());
    dispatch(fetchSuppliersAcns());
    dispatch(fetchUserAcns());
  }, [dispatch]);

  useEffect(() => {
    if (selectedDatabase) {
      dispatch(fetchSuppliers(selectedDatabase));
    }
  }, [selectedDatabase, dispatch]);

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
            <select
              onChange={(e) => handleDropdownChange(e.target.value)}
              className="bg-white h-10 px-4 rounded-lg focus:outline-none border border-gray-300 mr-2"
            >
              <option value="">Database</option>
              <option value="da">Digipos Amazone</option>
              <option value="de">Digipos EPS</option>
            </select>
          </div>
          <div>
            <Typography variant="h6" color="blue-gray" className="-mb-1">
              PIC
            </Typography>
            <Input
              type="text"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="relative inline-block text-left mb-2 mt-2 mr-2 ml-2">
            <select
              // value={formData.supplier}
              onChange={(e) => handleDropdownChangeSuppliers(e.target.value)}
              className="bg-white h-10 px-4 rounded-lg focus:outline-none border border-gray-300 mr-2"
            >
              <option value="">Suppliers</option>
              {suppliers?.data?.map((supplier, index) => (
                <option key={index} value={supplier.name}>
                  {supplier.name}
                </option>
              ))}
            </select>
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
              name="amount"
              value={formData.amount}
              onChange={handleInputChange}
            />
          </div>
          <div className="relative inline-block text-left mb-2 mt-2 mr-2 ml-2">
            <select
              onChange={(e) => handleDropdownChangeBank(e.target.value)}
              className="bg-white h-10 px-4 rounded-lg focus:outline-none border border-gray-300 mr-2"
            >
              <option value="">Rekening Asal</option>
              {['BCA', 'BNI', 'BRI', 'MANDIRI'].map((bank, index) => (
                <option key={index} value={bank}>
                  {bank}
                </option>
              ))}
            </select>
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
              name="destination_account"
              value={formData.destination_account}
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
