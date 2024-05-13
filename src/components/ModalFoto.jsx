import React, { useState } from 'react';
import Swal from 'sweetalert2';

const ModalFoto = ({ url, url2 }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [filePreview, setFilePreview] = useState(null);
    const [formData, setFormData] = useState({
        file: null,
    });

    const toggleModal = () => {
        setModalOpen(!modalOpen);
    };



    return (
        <div>
            <button
                onClick={toggleModal}
                type="button"
                className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-xs px-3 py-1.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            >
                LIHAT BUKTI
            </button>
            <div className={`fixed inset-0 z-50 flex items-center justify-center ${modalOpen ? 'backdrop-filter backdrop-blur-md' : 'hidden'} ${modalOpen ? 'bg-opacity-40 bg-gray-300' : ''}`}>
                <div className="relative p-4 w-full max-w-md max-h-full mx-auto my-32">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Bukti
                            </h3>
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
                        <div className="grid gap-4 mb-4">
                            <div style={{ textAlign: 'center' }}>
                                <img src={url+url2} alt="Preview" className="max-w-xs max-h-40 mb-4 rounded-lg shadow-lg" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalFoto;
