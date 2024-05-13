import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchTrxs, fetchKodeOperators, fetchmemberTrxs } from '../store/actionCreators';
import Alerts from './Alerts';
import DetailLogin from './DetailLogin';
import '../css/Table.css'
import * as XLSX from 'xlsx';
import LoadingIndicator from './LoadingIndicator';
import { useNavigate } from "react-router-dom"
import Swal from 'sweetalert2';
import NavButton from './NavButton'

const Table = () => {

    const dispatch = useDispatch();
    let navigate = useNavigate()
    const [submitted, setSubmitted] = useState(false);


    const trxs = useSelector((state) => state.trxs.trxs);
    const untungs = useSelector((state) => state.kodeOperators.kodeOperators);
    const filteredUntungs = untungs.filter(untung => untung !== 'laba_awal');

    const [trxsData, setTrxsData] = useState([]);
    const [untungsData, setUntungsData] = useState([]);

    // let [startDate, setStartDate] = useState('')
    // let [endDate, setEndDate] = useState('')

    const loadingTrxs = useSelector((state) => state.trxs.loading);

    const loadingUntungs = useSelector((state) => state.kodeOperators.loading);

    const isLoading = loadingUntungs;

    const isLoadingWithDates = loadingTrxs


    const totalOperators = useMemo(() => {
        const operators = {};
        trxs.forEach((trx) => {
            untungs.forEach((operator) => {
                if (!operators[operator]) {
                    operators[operator] = 0;
                }
                operators[operator] += trx.OperatorKode[operator] || 0;
            });
        });
        return operators;
    }, [trxs, untungs]);

    const totalLabaAwal = trxs.reduce((total, trx) => total + trx.labaawal, 0);
    const totalJmlTrx = trxs.reduce((total, trx) => total + trx.totaltrx, 0);

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
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please enter both start and end dates!',
            });
        }
    };

    // const handleStartDateChange = (event) => {
    //     const value = event.target.value;
    //     setStartDate(value);
    // };

    // const handleEndDateChange = (event) => {
    //     const value = event.target.value;
    //     setEndDate(value);
    // };

    const exportToExcel = () => {
        const formattedStartDate = startDate.split('-').join('');
        const formattedEndDate = endDate.split('-').join('');
        const table = document.querySelector('table');

        const clonedTable = table.cloneNode(true);
        clonedTable.querySelectorAll('th:last-child, td:last-child').forEach((cell) => {
            cell.parentNode.removeChild(cell);
        });

        const ws = XLSX.utils.table_to_sheet(clonedTable);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        XLSX.writeFile(wb, `data_member_${formattedStartDate}to${formattedEndDate}.xlsx`);
    };


    const formatNumber = (number) => {
        if (number === undefined) {
            return "";
        }
        return number.toLocaleString();
    };

    const formatPercentage = (percentage) => {

        const absPercentage = Math.abs(percentage);

        const formattedPercentage = absPercentage.toFixed(2);

        return formattedPercentage + '%';
    };

    let storedStartDate = JSON.parse(localStorage.getItem('startLocal'))
    let storedEndDates = JSON.parse(localStorage.getItem('endLocal'))

    let [startDate, setStartDate] = useState(storedStartDate || '');
    let [endDate, setEndDate] = useState(storedEndDates || '');

    let formattedStartDate = startDate.split('-').join('');
    let formattedEndDate = endDate.split('-').join('');

    if (storedStartDate && storedEndDates) {
        formattedStartDate = storedStartDate.split('-').join('');
        formattedEndDate = storedEndDates.split('-').join('');
    }

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
    }, [dispatch, storedStartDate, storedEndDates]);


    return (
        <>
            <Alerts submitted={submitted} setSubmitted={setSubmitted} trxs={trxs} />
            {/* <NavButton/> */}
            <div className="flex flex-col mb-6 lg:justify-between lg:flex-row md:mb-8">
                <h2 className="max-w-lg mb-5 font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none md:mb-6 group">
                    <span className="inline-block mb-1 sm:mb-4">
                        MEMBER TRANSACTIONS
                        {formattedStartDate && formattedEndDate ? (
                            <p className="text-gray-700 lg:text-sm lg:max-w-md">
                                {finalFormatDate(formattedStartDate)} S/D {finalFormatDate(formattedEndDate)}
                            </p>
                        ) : ''}
                    </span>
                    <div className="h-1 ml-auto duration-300 origin-left transform bg-deep-purple-accent-400 scale-x-100 group-hover:scale-x-150" style={{ backgroundColor: 'brown'}}/>
                </h2>
            </div>

            <div className="mb-8 ">
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div className="shadow-md sm:rounded-lg" style={{ marginRight: '20px', flex: 1 }}>
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
                            style={{ backgroundColor: '#594545', marginBottom: '8px' }}
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
            {isLoading && <LoadingIndicator />}

            {!isLoading && !isLoadingWithDates && (
                <div className="relative overflow-auto shadow-md sm:rounded-lg" style={{ maxHeight: '600px' }}>
                    <table className="min-w-full divide-y divide-gray-200 overflow-x-auto">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
                                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Nama</th>
                                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Jml TRX</th>
                                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Depency Ratio</th>
                                {untungs.map((untung, index) => (
                                    <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider" key={index}>{untung}</th>
                                ))}
                                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {trxs.map((trx, index) => {
                                const memberId = trx.kode
                                let ratioDep = totalLabaAwal !== 0 ? (trx.labaawal / totalLabaAwal).toFixed(2) * 100 : 0;
                                return (
                                    <tr key={index}>
                                        <td style={{ color: 'black' }}>{index + 1}</td>
                                        <td style={{ color: 'black' }}>{trx.kode}</td>
                                        <td style={{ color: 'black' }}>{trx.nama}</td>
                                        <td style={{ color: 'black' }}>{formatNumber(trx.totaltrx)}</td>
                                        <td style={{ color: 'black' }}>{formatPercentage(ratioDep)}</td>
                                        <td style={{ color: 'black' }}>{formatNumber(trx.labaawal)}</td>
                                        {filteredUntungs.map((operator, operatorIndex) => (
                                            <td key={operatorIndex} style={{ color: 'black' }}>
                                                {formatNumber(trx.OperatorKode[operator])}
                                            </td>
                                        ))}
                                        <button onClick={(e) => {
                                            if (storedStartDate && storedEndDates) {
                                                startDate = storedStartDate
                                                endDate = storedEndDates
                                            }
                                            e.preventDefault()
                                            dispatch(fetchmemberTrxs(memberId, startDate, endDate))
                                            navigate(`/cek/${memberId}/${startDate}/${endDate}`)
                                        }}
                                            type="button" className="mt-2 text-white bg-gradient-to-r from-brown-400 via-brown-500 to-brown-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-brown-300 dark:focus:ring-brown-800 shadow-lg shadow-brown-500/50 dark:shadow-lg dark:shadow-brown-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                                            Cek Produk
                                        </button>
                                    </tr>
                                );
                            })}
                            <tr>
                                <td> </td>
                                <td></td>
                                <td style={{ fontWeight: 'bold', color: 'black' }}> TOTAL</td>
                                <td style={{ fontWeight: 'bold', color: 'black' }}>{formatNumber(totalJmlTrx)}</td>
                                <td style={{ fontWeight: 'bold', color: 'black' }}>{submitted ? 100 : 0}%</td>
                                <td style={{ fontWeight: 'bold', color: 'black' }}>{formatNumber(totalLabaAwal)}</td>
                                {filteredUntungs.map((operator) => (
                                    <td style={{ fontWeight: 'bold', color: 'black' }} key={operator}>{formatNumber(totalOperators[operator])}</td>
                                ))}
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
            <button className="shadow-lg shadow-brown-800/80 rounded-lg gradient text-white px-4 py-2 text-sm rounded font-medium focus:ring ring-black ring-opacity-10 gradient element-to-rotate"
                onClick={exportToExcel}
                style={{ backgroundColor: '#594545', marginTop: '10px' }}
            >
                Export to Excel
            </button>
        </>
    );
};

export default Table;
