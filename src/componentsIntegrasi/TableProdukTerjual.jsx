import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, fetchTrxs, fetchLaba, fetchKodeOperators, fetchModuleTrxs, fetchProdukTerjual } from '../store/actionCreators';
import Alerts from './Alerts';
import DetailLogin from './DetailLogin';
import DropdownMarket from './DropdownMarket';
import DropdownJenis from './DropdownJenis';
import DropdownBerdasarkan from './DropdownBerdasarkan';
import * as XLSX from 'xlsx';
import LoadingIndicator from './LoadingIndicator';
import Swal from 'sweetalert2';
import NavButton from './NavButton';



const TableProdukTerjual = () => {
    const [submitted, setSubmitted] = useState(false);

    const trxs = useSelector((state) => state.trxs.trxs);
    let pickedOperator = useSelector((state) => state.operator.operator);
    let pickedBerdasarkan = useSelector((state) => state.berdasarkan.berdasarkan);
    let pickedJenis = useSelector((state) => state.jenis.jenis);
    const produktrxs = useSelector((state) => state.produktrxs.produktrxs);
    // const [startDate, setStartDate] = useState('')
    // const [endDate, setEndDate] = useState('')


    const loadingProdukTrxs = useSelector((state) => state.produktrxs.loading);


    const isLoadingWithDates = loadingProdukTrxs


    const formatNumber = (number) => {
        if (number === undefined || number === null) {
            return "";
        }
        return number.toLocaleString();
    };

    const calculateTotalColumn = (field) => {
        const total = produktrxs.reduce((acc, produktrx) => {
            if (field !== 'KodeProduk') {
                return acc + (produktrx[field] || 0);
            }
            return acc;
        }, 0);
        return total;
    };


    const totalHrgStandar = calculateTotalColumn('HrgStandar');
    const totalHrgJualTertinggi = calculateTotalColumn('HrgJualTertinggi');
    const totalHrgJualTerendah = calculateTotalColumn('HrgJualTerendah');
    const totalHrgBeliTertinggi = calculateTotalColumn('HrgBeliTertinggi');
    const totalHrgBeliTerendah = calculateTotalColumn('HrgBeliTerendah');
    const totalLabaTertinggi = calculateTotalColumn('LabaTertinggi');
    const totalLabaTerendah = calculateTotalColumn('LabaTerendah');
    const totalQtyHrgStd = calculateTotalColumn('QtyHrgStd');
    const totalQtyHrgLebihStd = calculateTotalColumn('QtyHrgLebihStd');
    const totalQtyHrgKurangStd = calculateTotalColumn('QtyHrgKurangStd');
    const totalTotalTrx = calculateTotalColumn('TotalTrx');
    const totalRasioHrgStd = calculateTotalColumn('RasioHrgStd');
    const totalRasioHrgKhs = calculateTotalColumn('RasioHrgKhs');
    const dispatch = useDispatch();


    // const handleStartDateChange = (event) => {
    //     const value = event.target.value;
    //     setStartDate(value);
    // };

    // const handleEndDateChange = (event) => {
    //     const value = event.target.value;
    //     setEndDate(value);
    // };

    const [submitLoading, setSubmitLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (startDate && endDate && pickedJenis && pickedOperator && pickedBerdasarkan) {
            setSubmitted(true);
            setSubmitLoading(true);
            dispatch(fetchProdukTerjual(startDate, endDate, pickedJenis, pickedOperator, pickedBerdasarkan))
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
    let storedPickedBerdasarkan = localStorage.getItem('pickedBerdasarkanLocal')
    let storedPickedJenis = localStorage.getItem('pickedJenisLocal')


    let [startDate, setStartDate] = useState(storedStartDate || '');
    let [endDate, setEndDate] = useState(storedEndDates || '');


    let formattedStartDate = startDate.split('-').join('');
    let formattedEndDate = endDate.split('-').join('');

    if (storedStartDate && storedEndDates && storedPickedOperator && storedPickedBerdasarkan && storedPickedJenis) {
        formattedStartDate = storedStartDate.split('-').join('');
        formattedEndDate = storedEndDates.split('-').join('');
        pickedOperator = storedPickedOperator
        pickedBerdasarkan = storedPickedBerdasarkan
        pickedJenis = storedPickedJenis
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


    const exportToExcel = () => {
        const table = document.querySelector('table');
        const ws = XLSX.utils.table_to_sheet(table);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        XLSX.writeFile(wb, `data_produk_terjual_${formattedStartDate}_to_${formattedEndDate}_${pickedJenis}_${pickedOperator}_${pickedBerdasarkan}.xlsx`);
    };

    useEffect(() => {
        dispatch(fetchKodeOperators());
        dispatch(fetchTrxs(storedStartDate, storedEndDates));
        dispatch(fetchProdukTerjual(storedStartDate, storedEndDates, storedPickedJenis, storedPickedOperator, storedPickedBerdasarkan))
    }, [dispatch]);


    console.log(storedPickedOperator, 'pickedOperator');
    console.log(storedPickedJenis, 'pickedJenis');
    console.log(storedPickedBerdasarkan, 'berd');
    console.log(produktrxs, 'module');
    console.log(storedStartDate);
    console.log(storedEndDates);

    return (
        <>

            <Alerts submitted={submitted} setSubmitted={setSubmitted} trxs={trxs} />
            <NavButton/>
            <div className="flex flex-col mb-6 lg:justify-between lg:flex-row md:mb-8">
                <h2 className="max-w-lg mb-5 font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none md:mb-6 group">
                    <span className="inline-block mb-1 sm:mb-4">
                        REKAP PENJUALAN MARKAZ
                        {formattedStartDate && formattedEndDate && pickedOperator && pickedBerdasarkan && pickedJenis ? (
                            <p className="text-gray-700 lg:text-sm lg:max-w-md">
                                {pickedOperator} - {pickedJenis} - {pickedBerdasarkan} - {finalFormatDate(formattedStartDate)} S/D {finalFormatDate(formattedEndDate)}
                            </p>
                        ) : ''}
                    </span>
                    <div className="h-1 ml-auto duration-300 origin-left transform bg-deep-purple-accent-400 scale-x-100 group-hover:scale-x-150" style={{ backgroundColor: 'brown' }} />
                </h2>
            </div>
            <div className="mb-8">
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div className="shadow-md sm:rounded-lg" style={{ marginRight: '20px', flex: 1 }}>
                        <DropdownMarket />
                        <DropdownJenis />
                        <DropdownBerdasarkan />

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
                <div className="relative overflow-auto shadow-md sm:rounded-lg" style={{ maxHeight: '600px' }}>
                    <table className="min-w-full divide-y divide-gray-200 overflow-x-auto">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">No Urut</th>
                                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider sticky-header">Kode Produk</th>
                                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Hrg Standar</th>
                                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">HrgJual Tertinggi</th>
                                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">HrgJual Terendah</th>
                                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">HrgBeli Tertinggi</th>
                                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">HrgBeli Terendah</th>
                                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Laba Tertinggi</th>
                                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Laba Terendah</th>
                                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">=Qty HrgStd</th>
                                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Qty Hrg {'>'} std</th>
                                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Qty Hrg {'<'} std</th>
                                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Total Trx</th>
                                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Rasio HrgStd</th>
                                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Rasio HrgKhs</th>
                            </tr>
                        </thead>
                        <tbody>

                            {produktrxs.map((produktrx, index) => {
                                return (
                                    <tr key={index}>
                                        <td style={{ color: 'black' }}>{index + 1}</td>
                                        <td style={{ color: 'black' }}>{produktrx.KodeProduk}</td>
                                        <td style={{ color: 'black' }}>{formatNumber(produktrx.HrgStandar)}</td>
                                        <td style={{ color: 'black' }}>{formatNumber(produktrx.HrgJualTertinggi)}</td>
                                        <td style={{ color: 'black' }}>{formatNumber(produktrx.HrgJualTerendah)}</td>
                                        <td style={{ color: 'black' }}>{formatNumber(produktrx.HrgBeliTertinggi)}</td>
                                        <td style={{ color: 'black' }}>{formatNumber(produktrx.HrgBeliTerendah)}</td>
                                        <td style={{ color: 'black' }}>{formatNumber(produktrx.LabaTertinggi)}</td>
                                        <td style={{ color: 'black' }}>{formatNumber(produktrx.LabaTerendah)}</td>
                                        <td style={{ color: 'black' }}>{formatNumber(produktrx.QtyHrgStd)}</td>
                                        <td style={{ color: 'black' }}>{formatNumber(produktrx.QtyHrgLebihStd)}</td>
                                        <td style={{ color: 'black' }}>{formatNumber(produktrx.QtyHrgKurangStd)}</td>
                                        <td style={{ color: 'black' }}>{formatNumber(produktrx.TotalTrx)}</td>

                                    </tr>
                                );
                            })}
                            <tr>
                                <td></td>
                                <td style={{ fontWeight: 'bold', color: 'black' }}> TOTAL</td>
                                <td style={{ fontWeight: 'bold', color: 'black' }}>{formatNumber(totalHrgStandar)}</td>
                                <td style={{ fontWeight: 'bold', color: 'black' }}>{formatNumber(totalHrgJualTertinggi)}</td>
                                <td style={{ fontWeight: 'bold', color: 'black' }}>{formatNumber(totalHrgJualTerendah)}</td>
                                <td style={{ fontWeight: 'bold', color: 'black' }}>{formatNumber(totalHrgBeliTertinggi)}</td>
                                <td style={{ fontWeight: 'bold', color: 'black' }}>{formatNumber(totalHrgBeliTerendah)}</td>
                                <td style={{ fontWeight: 'bold', color: 'black' }}>{formatNumber(totalLabaTertinggi)}</td>
                                <td style={{ fontWeight: 'bold', color: 'black' }}>{formatNumber(totalLabaTerendah)}</td>
                                <td style={{ fontWeight: 'bold', color: 'black' }}>{formatNumber(totalQtyHrgStd)}</td>
                                <td style={{ fontWeight: 'bold', color: 'black' }}>{formatNumber(totalQtyHrgLebihStd)}</td>
                                <td style={{ fontWeight: 'bold', color: 'black' }}>{formatNumber(totalQtyHrgKurangStd)}</td>
                                <td style={{ fontWeight: 'bold', color: 'black' }}>{formatNumber(totalTotalTrx)}</td>
                                <td style={{ fontWeight: 'bold', color: 'black' }}>{formatNumber(totalRasioHrgStd)}</td>
                                <td style={{ fontWeight: 'bold', color: 'black' }}>{formatNumber(totalRasioHrgKhs)}</td>
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

export default TableProdukTerjual;
