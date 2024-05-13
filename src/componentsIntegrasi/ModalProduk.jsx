import React from 'react';
import '../css/Modal.css'
import TableModal from './TableModal';
import { useDispatch, useSelector } from 'react-redux';
import { fetchmemberTrxs } from '../store/actionCreators';

const ModalProduk = ({ memberId, startDate, endDate }) => {
    const dispatch = useDispatch()
    const memberTrxs = useSelector((state) => state.memberTrxs.memberTrxs);
    const toggleModal = () => {
        const modal = document.getElementById('crud-modal');
        modal.classList.toggle('hidden');
        dispatch(fetchmemberTrxs(memberId, startDate, endDate))
    };
   

    return (
        <div style={{marginBottom:'4px', marginTop:'2px'}}>
            {/* Modal toggle */}
            <button
                onClick={toggleModal}
                className="block font-bold text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                type="button"
                style={{ backgroundColor: '#594545'}}
            >
                Cek Produk
            </button>

            {/* Main modal */}
            <div
                id="crud-modal"
                tabIndex="-1"
                aria-hidden="true"
                className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
            >
                <div className="relative p-4 w-full max-w-md max-h-full crud-modal">
                    {/* Modal content */}
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        {/* Modal header */}
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 modalH-background">
                            <h3 className="textModal">
                                Cek Produk
                            </h3>
                            <button
                                type="button"
                                onClick={toggleModal}
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                data-modal-toggle="crud-modal"
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
                                        strokeWidth="2"
                                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                    />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        {/* Modal body */}
                        <div>
                            <TableModal memberTrxs={memberTrxs} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalProduk;
