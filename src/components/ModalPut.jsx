import React, { useState } from 'react';
import Swal from 'sweetalert2';
const BASE_URL = `http://36.92.58.82:1523/api`

const ModalPut = ({ id, name, supplier, amount, origin_account, destination_account, image_upload }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [filePreview, setFilePreview] = useState(image_upload); // Set file preview to image_upload initially
    const [formData, setFormData] = useState({
        name: name,
        supplier: supplier,
        amount: amount,
        origin_account: origin_account,
        destination_account: destination_account,
        image: image_upload,
        reply: '',
    });

    const toggleModal = () => {
        setModalOpen(!modalOpen);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        toggleModal();

        const formDataToSend = new FormData();
        formDataToSend.append('name', formData.name);
        formDataToSend.append('supplier', formData.supplier);
        formDataToSend.append('amount', formData.amount);
        formDataToSend.append('origin_account', formData.origin_account);
        formDataToSend.append('destination_account', formData.destination_account);
        formDataToSend.append('image', formData.image);
        formDataToSend.append('reply', formData.reply);

        try {
            const response = await fetch(`${BASE_URL}/deposit/de/update/${id}`, {
                method: 'POST',
                body: formDataToSend,
            });

            if (response.ok) {
                const responseData = await response.json();
                Swal.fire({
                    icon: 'success',
                    title: 'Form submitted successfully!',
                    showConfirmButton: false,
                    timer: 2000,
                }).then(() => {
                    setTimeout(() => {
                        window.location.reload();
                    }, 2000);
                });
            } else {
                console.error('Form submission failed');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <div>
            <button
                onClick={toggleModal}
                type="button"
                className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-xs px-3 py-1.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            >
                INPUT REPLY
            </button>
            <div className={`fixed inset-0 z-50 flex items-center justify-center ${modalOpen ? 'backdrop-filter backdrop-blur-md' : 'hidden'} ${modalOpen ? 'bg-opacity-40 bg-gray-300' : ''}`}>
                <div className="relative p-4 w-full max-w-md max-h-full mx-auto my-32">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Submit Reply
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
                        <form className="p-4 md:p-5" onSubmit={handleSubmit}>
                            <div className="grid gap-4 mb-4">
                                <div>
                                    <label
                                        htmlFor="reply"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Reply
                                    </label>
                                    <textarea
                                        id="reply"
                                        name="reply"
                                        value={formData.reply}
                                        onChange={handleInputChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        rows="10"
                                        cols="50"
                                        required
                                    ></textarea>
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
