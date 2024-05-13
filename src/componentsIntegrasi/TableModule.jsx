import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, fetchTrxs, fetchLaba, fetchKodeOperators, fetchModuleTrxs } from '../store/actionCreators';
import Alerts from './Alerts';
import Dropdown from './Dropdown';
import DetailLogin from './DetailLogin';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';
import '../css/Table.css'
import LoadingIndicator from './LoadingIndicator';
import NavButton from './NavButton';


const TableModule = () => {
    const [submitted, setSubmitted] = useState(false);
    const [submitLoading, setSubmitLoading] = useState(false);

    const trxs = useSelector((state) => state.trxs.trxs);
    let pickedOperator = useSelector((state) => state.operator.operator);


    const moduleTrxs = useSelector((state) => state.moduleTrxs.moduleTrxs);
    // const [startDate, setStartDate] = useState('')
    // const [endDate, setEndDate] = useState('')


    const loadingModuleTrxs = useSelector((state) => state.moduleTrxs.loading);


    const isLoadingWithDates = loadingModuleTrxs


    const formatNumber = (number) => {
        if (number === undefined) {
            return "";
        }
        return number.toLocaleString();
    };

    const calculateTotal = (field) => {
        return moduleTrxs.reduce((acc, moduleTrx) => acc + moduleTrx[field], 0);
    };

    const totalTRX = calculateTotal('totalTrx');
    const totalPemakaianSaldo = calculateTotal('totalPemakaianSaldo');
    const totalLaba = calculateTotal('totalLaba');

    const dispatch = useDispatch();


    // const handleStartDateChange = (event) => {
    //     const value = event.target.value;
    //     setStartDate(value);
    // };

    // const handleEndDateChange = (event) => {
    //     const value = event.target.value;
    //     setEndDate(value);
    // };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (startDate && endDate) {
            setSubmitted(true);
            setSubmitLoading(true);
            dispatch(fetchTrxs(startDate, endDate));
            dispatch(fetchModuleTrxs(startDate, endDate, pickedOperator))
                .then(() => {
                    setSubmitLoading(false);
                });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please enter both start and end dates!',
            });
        }
    };

    let storedStartDate = JSON.parse(localStorage.getItem('startLocal'))
    let storedEndDates = JSON.parse(localStorage.getItem('endLocal'))
    let storedPickedOperator = localStorage.getItem('pickedOperatorLocal')


    let [startDate, setStartDate] = useState(storedStartDate || '');
    let [endDate, setEndDate] = useState(storedEndDates || '');

    let formattedStartDate = startDate.split('-').join('');
    let formattedEndDate = endDate.split('-').join('');

    if (storedStartDate && storedEndDates && storedPickedOperator) {
        formattedStartDate = storedStartDate.split('-').join('');
        formattedEndDate = storedEndDates.split('-').join('');
        pickedOperator = storedPickedOperator
    }

    const exportToExcel = () => {
        const table = document.querySelector('table');
        const ws = XLSX.utils.table_to_sheet(table);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        XLSX.writeFile(wb, `data_module_${pickedOperator}_${formattedStartDate}to${formattedEndDate}.xlsx`);
    };
    function finalFormatDate(inputDate) {
        const months = [
            'JANUARI', 'FEBRUARI', 'MARET', 'APRIL', 'MEI', 'JUNI',
            'JULI', 'AGUSTUS', 'SEPTEMBER', 'OKTOBER', 'NOVEMBER', 'DESEMBER'
        ];

        const year = inputDate.substring(0, 4);
        const month = months[parseInt(inputDate.substring(4, 6)) - 1];
        const day = parseInt(inputDate.substring(6, 8));

        return `${day} ${month} ${year}`;
    }

    useEffect(() => {
        dispatch(fetchKodeOperators());
        dispatch(fetchTrxs(storedStartDate, storedEndDates));
        dispatch(fetchModuleTrxs(storedStartDate, storedEndDates, storedPickedOperator))
    }, [dispatch]);

    console.log(storedPickedOperator, 'pickedOperator');
    console.log(moduleTrxs, 'module');
    console.log(storedStartDate);
    console.log(storedEndDates);

    return (
        <>

            <Alerts submitted={submitted} setSubmitted={setSubmitted} trxs={trxs} />
            <NavButton/>
            <div className="flex flex-col mb-6 lg:justify-between lg:flex-row md:mb-8">
                <h2 className="max-w-lg mb-5 font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none md:mb-6 group">
                    <span className="inline-block mb-1 sm:mb-4">
                        MODULE TRANSACTIONS
                        {formattedStartDate && formattedEndDate && pickedOperator? (
                            <p className="text-gray-700 lg:text-sm lg:max-w-md">
                              {pickedOperator} - {finalFormatDate(formattedStartDate)} S/D {finalFormatDate(formattedEndDate)}
                            </p>
                        ) : ''}
                    </span>
                    <div className="h-1 ml-auto duration-300 origin-left transform bg-deep-purple-accent-400 scale-x-100 group-hover:scale-x-150" style={{ backgroundColor: 'brown'}}/>
                </h2>
            </div>
            <div className="mb-8">
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div className="shadow-md sm:rounded-lg" style={{ marginRight: '20px', flex: 1 }}>
                        <Dropdown pickedOperator={pickedOperator} />

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
                            className="shadow-lg shadow-brown-800/80 rounded-lg gradient text-white px-4 py-2 text-sm rounded font-medium focus:ring ring-black ring-opacity-10 gradient element-to-rotate"
                            aria-label="Submit"
                            title="Submit"
                            style={{ backgroundColor: '#594545', marginBottom: '10px' }}
                            disabled={submitLoading}
                        >
                            {submitLoading ? 'Loading...' : 'Submit'}
                        </button>
                    </div>

                    <div style={{ flex: 'none' }}>
                        <DetailLogin />
                    </div>
                </div>
            </div>

            {isLoadingWithDates && submitted && <LoadingIndicator />}

            {!isLoadingWithDates && (
                <div className="flex justify-center relative overflow-auto shadow-md sm:rounded-lg" style={{ maxHeight: '500px' }}>
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 table-fixed shadow-md sm:rounded-lg">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
                                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ width: '500px' }}>Modul SPL</th>
                                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ width: '200px' }}>TRX</th>
                                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ width: '300px' }}>Pemakaian Saldo</th>
                                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ width: '200px' }}>Laba</th>
                            </tr>
                        </thead>
                        <tbody>
                            {moduleTrxs.map((moduleTrx, index) => {
                                return (
                                    <tr key={index}>
                                        <td className='text-center' style={{ color: 'black' }}>{index + 1}</td>
                                        <td className='text-center' style={{ color: 'black' }}>{moduleTrx.label}</td>
                                        <td className='text-center' style={{ color: 'black' }}>{formatNumber(moduleTrx.totalTrx)}</td>
                                        <td className='text-center' style={{ color: 'black' }}>{formatNumber(moduleTrx.totalPemakaianSaldo)}</td>
                                        <td className='text-center' style={{ color: 'black' }}>{formatNumber(moduleTrx.totalLaba)}</td>
                                    </tr>
                                );
                            })}
                            <tr>
                                <td></td>
                                <td className='text-center' style={{ fontWeight: 'bold', color: 'black' }}>TOTAL</td>
                                <td className='text-center' style={{ fontWeight: 'bold', color: 'black' }}>{formatNumber(totalTRX)}</td>
                                <td className='text-center' style={{ fontWeight: 'bold', color: 'black' }}>{formatNumber(totalPemakaianSaldo)}</td>
                                <td className='text-center' style={{ fontWeight: 'bold', color: 'black' }}>{formatNumber(totalLaba)}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            )}
            <button
                className="shadow-lg shadow-brown-800/80 rounded-lg gradient text-white px-4 py-2 text-sm rounded font-medium focus:ring ring-black ring-opacity-10 gradient element-to-rotate"
                onClick={exportToExcel}
                style={{ backgroundColor: '#594545', marginTop: '10px' }}
            >
                Export to Excel
            </button>
        </>
    );
};

export default TableModule;
