import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchLatestDates } from '../store/actionCreators';
import { format } from 'date-fns';
import { id } from 'date-fns/locale'

const Alerts = ({ submitted, setSubmitted, trxs}) => {
    const dispatch = useDispatch();

    const [showAlert, setShowAlert] = useState(false);
    const latestDates = useSelector((state) => state.latestDates.latestDates);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            return "Invalid Date";
        }
        return format(date, 'dd MMMM yyyy', { locale: id });
    };

    const formattedDate = formatDate(latestDates);



    useEffect(() => {
        dispatch(fetchLatestDates());
    }, [dispatch]);

    useEffect(() => {
        if (submitted && trxs.length > 0 ) {
            setShowAlert(true);
        } else {
            setShowAlert(false);
        }
    }, [submitted, trxs]);

    const closeAlert = () => {
        setShowAlert(false);
    };

    useEffect(() => {
        if (!submitted) {
            setShowAlert(false);
        }
    }, [submitted]);

    return (
        <>
            {showAlert && (
                <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50" role="alert">
                    <span className="font-medium">Transaksi terakhir pada tanggal: {formattedDate}</span>
                    <button
                        style={{ marginLeft: '700px' }}
                        type="button"
                        className="ms-auto -mx-1.5 -my-1.5 bg-white-50 text-white-500 rounded-lg focus:ring-2 focus:ring-blue-400 p-1.5 hover:bg-blue-200 inline-flex items-center justify-center h-8 w-8"
                        aria-label="Close"
                        onClick={() => {
                            setSubmitted(false);
                            closeAlert();
                        }}
                    >
                        <span className="sr-only">Close</span>
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
                                strokeWidth="2"
                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                            />
                        </svg>
                    </button>
                </div>
            )}
        </>
    );
};

export default Alerts;
