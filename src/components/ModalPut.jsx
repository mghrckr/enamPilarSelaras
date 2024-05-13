import React, { useState } from 'react';
import Swal from 'sweetalert2';

const ModalPut = ({ additional_proof, id }) => {
    const [modalOpen, setModalOpen] = useState(false);

    const toggleModal = () => {
        setModalOpen(!modalOpen);
    };

    const [formData, setFormData] = useState({
        additional_proof: null,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e, additional_proof, id) => {
        e.preventDefault(); // Sisipkan ini di baris pertama

        toggleModal();

        try {
            const response = await fetch(`http://${import.meta.env.VITE_API_URL2}/spldeposit/edit/${id}`, {
                method: 'PUT', // Mengubah metode menjadi PUT
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    additional_proof: additional_proof, // Mengirim data yang diperlukan dalam format JSON
                }),
            });

            console.log(additional_proof, 'resss');
            if (response.ok) {
                // Logika jika PUT berhasil
                Swal.fire({
                    icon: 'success',
                    title: 'Data updated successfully!',
                    showConfirmButton: false,
                    timer: 2000,
                }).then(() => {
                    setTimeout(() => {
                        window.location.reload();
                    }, 2000);
                });
            } else {
                console.error('PUT request failed');
            }
        } catch (error) {
            console.error('Error updating data:', error);
        }
    };


    return (
        <div>
            <button
                onClick={toggleModal}
                type="button"
                className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-xs px-3 py-1.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            >
                INPUT BUKTI
            </button>
            <div className={`fixed inset-0 z-50 flex items-center justify-center ${modalOpen ? 'backdrop-filter backdrop-blur-md' : 'hidden'} ${modalOpen ? 'bg-opacity-40 bg-gray-300' : ''}`}>
                <div className="relative p-4 w-full max-w-md max-h-full mx-auto my-32">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Bukti Penambahan
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
                        <form className="p-4 md:p-5" onSubmit={(e) => handleSubmit(e, formData.additional_proof, id)}>
                            <div className="grid gap-4 mb-4">
                                <div className="col-span-2">
                                    <label
                                        htmlFor="additional_proof"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Name
                                    </label>
                                    <input
                                        value={additional_proof}
                                        type="text"
                                        name="additional_proof"
                                        id="additional_proof"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="Type supplier name"
                                        required
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalPut;
