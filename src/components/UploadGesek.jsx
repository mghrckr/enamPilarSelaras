import { Button, CardBody, Typography } from "@material-tailwind/react";
import { useState } from "react";
import DropdownOutbox from "./DropdownOutbox";
import DropdownGesek from "./DropdownGesek";

export function UploadGesek() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [cardBodyHeight, setCardBodyHeight] = useState("auto");

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
        setCardBodyHeight(isModalOpen ? "auto" : "auto"); // Atur ketinggian CardBody saat modal muncul
    };

    const previewFile = () => {
        const preview = document.getElementById('preview');
        const file = document.querySelector('input[type=file]').files[0];
        const reader = new FileReader();

        reader.onloadend = function () {
            preview.src = reader.result;
            preview.style.display = 'block';
        }

        if (file) {
            reader.readAsDataURL(file);
        } else {
            preview.src = '';
            preview.style.display = 'none';
        }
    };

    return (
        <>
            {/* Tombol Toggle modal */}
            {/* <Button
                onClick={toggleModal}
                color="blue"
                size="regular"
                className="mb-4"
                style={{ marginLeft: '8px', backgroundColor: 'green' }}
            >
                UPLOAD PRODUK GESEK
            </Button> */}
            <button
                onClick={toggleModal}
                type="button"
                style={{ marginBottom: '8px' }}
                className="px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border border-gray-900 rounded-e-lg hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700"
            >
                UPLOAD
            </button>

            {/* Modal */}
            {isModalOpen && (
                <div >
                    {/* Konten Modal */}
                    <div>
                        {/* Modal content */}
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            {/* Modal header */}
                            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    Upload Produk Gesek
                                </h3>
                                <button
                                    onClick={() => setIsModalOpen(false)} // Set state isModalOpen menjadi false saat tombol ditekan
                                    type="button"
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
                                            strokeWidth={2}
                                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                        />
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>
                            {/* Modal body */}
                            <form className="p-4 md:p-5">
                                <img
                                    id="preview"
                                    src=""
                                    alt="Preview"
                                    style={{ maxWidth: '300px', maxHeight: '300px', display: 'none', marginBottom: '10px' }}
                                />
                                <div className="grid gap-4 mb-4 grid-cols-2">
                                    <input
                                        type="file"
                                        id="fileInput"
                                        accept="image/*" // Hanya menerima file gambar
                                        onChange={previewFile}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                >
                                    Kirim
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
            <CardBody className="overflow-x-scroll px-0 pt-0 pb-2" style={{ borderTop: '2px solid black' }}>
                <DropdownGesek />
                <button
                    className="shadow-lg shadow-black-800/80 rounded-lg gradient text-white px-4 py-2 text-sm rounded font-medium focus:ring ring-black ring-opacity-10 gradient element-to-rotate"
                    aria-label="Submit"
                    title="Submit"
                    style={{ backgroundColor: 'green', marginBottom: '8px' }}
                >
                    Delete All
                </button>

                <button
                    className="shadow-lg shadow-black-800/80 rounded-lg gradient text-white px-4 py-2 text-sm rounded font-medium focus:ring ring-black ring-opacity-10 gradient element-to-rotate"
                    aria-label="Submit"
                    title="Submit"
                    style={{ backgroundColor: 'blue', marginBottom: '8px', marginLeft: '4px' }}
                >
                    Total Stok
                </button>
                <div style={{ display: 'flex', justifyContent: 'center' }}>

                    <div className="w-full p-3">
                        <div className="relative">
                            <i className="absolute fa fa-search text-gray-400 top-5 left-4" />
                            <input
                                type="text"
                                className="bg-white h-14 w-full px-12 rounded-lg focus:outline-none hover:cursor-pointer border border-gray-300"
                                name=""
                            />
                            <span className="absolute top-4 right-5 border-l pl-4">
                                <i className="fa fa-microphone text-gray-500 hover:text-green-500 hover:cursor-pointer" />
                            </span>
                        </div>
                    </div>
                </div>
                <table className="w-full min-w-[640px] table-auto">
                    <thead>
                        <tr>
                            {["PRODUK", "VSN", "GESEK", "HPP", "EXPDATE", "TGLINPUT", 'TGLPAKAI', 'DETTRX', 'STATUS'].map((el) => (
                                <th
                                    key={el}
                                    className="border-b border-blue-gray-50 py-3 px-5 text-left"
                                >
                                    <Typography
                                        variant="small"
                                        className="text-[11px] font-bold uppercase text-blue-gray-400"
                                    >
                                        {el}
                                    </Typography>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className='border-b border-blue-gray-50'>
                                <div className="flex items-center gap-4">
                                    <input
                                        id="checkbox-table-search-1"
                                        type="checkbox"
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 ml-1"
                                    />
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-semibold"
                                    >
                                        tes
                                    </Typography>
                                </div>
                            </td>
                            <td className='border-b border-blue-gray-50'>
                                <Typography className="text-xs font-semibold text-blue-gray-600">
                                    SFSDFSDFSD
                                </Typography>
                            </td>
                            <td className='border-b border-blue-gray-50'>
                                <Typography className="text-xs font-semibold text-blue-gray-600">
                                    SDFSFDSDFSDF
                                </Typography>
                            </td>
                            <td className='border-b border-blue-gray-50'>
                                <Typography className="text-xs font-semibold text-blue-gray-600">
                                    SDFSFDSDFSDF
                                </Typography>
                            </td>
                            <td className='border-b border-blue-gray-50'>
                                <Typography className="text-xs font-semibold text-blue-gray-600">
                                    SDFSFDSDFSDF
                                </Typography>
                            </td>
                            <td className='border-b border-blue-gray-50'>
                                <Typography className="text-xs font-semibold text-blue-gray-600">
                                    SDFSFDSDFSDF
                                </Typography>
                            </td>
                            <td className='border-b border-blue-gray-50'>
                                <Typography className="text-xs font-semibold text-blue-gray-600">
                                    SDFSFDSDFSDF
                                </Typography>
                            </td>
                            <td className='border-b border-blue-gray-50'>
                                <Typography className="text-xs font-semibold text-blue-gray-600">
                                    SDFSFDSDFSDF
                                </Typography>
                            </td>
                            <td className='border-b border-blue-gray-50'>
                                <Typography className="text-xs font-semibold text-blue-gray-600">
                                    SDFSFDSDFSDF
                                </Typography>
                            </td>
                        </tr>
                        <tr>
                            <td className='border-b border-blue-gray-50'>
                                <div className="flex items-center gap-4">
                                    <input
                                        id="checkbox-table-search-1"
                                        type="checkbox"
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 ml-1"
                                    />
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-semibold"
                                    >
                                        tes
                                    </Typography>
                                </div>
                            </td>
                            <td className='border-b border-blue-gray-50'>
                                <Typography className="text-xs font-semibold text-blue-gray-600">
                                    SFSDFSDFSD
                                </Typography>
                                {/* <Typography className="text-xs font-normal text-blue-gray-500">
                          {job[1]}
                        </Typography> */}
                            </td>
                            <td className='border-b border-blue-gray-50'>
                                <Typography className="text-xs font-semibold text-blue-gray-600">
                                    SDFSFDSDFSDF
                                </Typography>
                            </td>
                            <td className='border-b border-blue-gray-50'>
                                <Typography className="text-xs font-semibold text-blue-gray-600">
                                    SDFSFDSDFSDF
                                </Typography>
                            </td>
                            <td className='border-b border-blue-gray-50'>
                                <Typography className="text-xs font-semibold text-blue-gray-600">
                                    SDFSFDSDFSDF
                                </Typography>
                            </td>
                            <td className='border-b border-blue-gray-50'>
                                <Typography className="text-xs font-semibold text-blue-gray-600">
                                    SDFSFDSDFSDF
                                </Typography>
                            </td>
                            <td className='border-b border-blue-gray-50'>
                                <Typography className="text-xs font-semibold text-blue-gray-600">
                                    SDFSFDSDFSDF
                                </Typography>
                            </td>
                            <td className='border-b border-blue-gray-50'>
                                <Typography className="text-xs font-semibold text-blue-gray-600">
                                    SDFSFDSDFSDF
                                </Typography>
                            </td>
                            <td className='border-b border-blue-gray-50'>
                                <Typography className="text-xs font-semibold text-blue-gray-600">
                                    SDFSFDSDFSDF
                                </Typography>
                            </td>
                        </tr>
                        <tr>
                            <td className='border-b border-blue-gray-50'>
                                <div className="flex items-center gap-4">
                                    <input
                                        id="checkbox-table-search-1"
                                        type="checkbox"
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 ml-1"
                                    />
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-semibold"
                                    >
                                        tes
                                    </Typography>
                                </div>
                            </td>
                            <td className='border-b border-blue-gray-50'>
                                <Typography className="text-xs font-semibold text-blue-gray-600">
                                    SFSDFSDFSD
                                </Typography>
                                {/* <Typography className="text-xs font-normal text-blue-gray-500">
                          {job[1]}
                        </Typography> */}
                            </td>
                            <td className='border-b border-blue-gray-50'>
                                <Typography className="text-xs font-semibold text-blue-gray-600">
                                    SDFSFDSDFSDF
                                </Typography>
                            </td>
                            <td className='border-b border-blue-gray-50'>
                                <Typography className="text-xs font-semibold text-blue-gray-600">
                                    SDFSFDSDFSDF
                                </Typography>
                            </td>
                            <td className='border-b border-blue-gray-50'>
                                <Typography className="text-xs font-semibold text-blue-gray-600">
                                    SDFSFDSDFSDF
                                </Typography>
                            </td>
                            <td className='border-b border-blue-gray-50'>
                                <Typography className="text-xs font-semibold text-blue-gray-600">
                                    SDFSFDSDFSDF
                                </Typography>
                            </td>
                            <td className='border-b border-blue-gray-50'>
                                <Typography className="text-xs font-semibold text-blue-gray-600">
                                    SDFSFDSDFSDF
                                </Typography>
                            </td>
                            <td className='border-b border-blue-gray-50'>
                                <Typography className="text-xs font-semibold text-blue-gray-600">
                                    SDFSFDSDFSDF
                                </Typography>
                            </td>
                            <td className='border-b border-blue-gray-50'>
                                <Typography className="text-xs font-semibold text-blue-gray-600">
                                    SDFSFDSDFSDF
                                </Typography>
                            </td>
                        </tr>
                        <tr>
                            <td className='border-b border-blue-gray-50'>
                                <div className="flex items-center gap-4">
                                    <input
                                        id="checkbox-table-search-1"
                                        type="checkbox"
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 ml-1"
                                    />
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-semibold"
                                    >
                                        tes
                                    </Typography>
                                </div>
                            </td>
                            <td className='border-b border-blue-gray-50'>
                                <Typography className="text-xs font-semibold text-blue-gray-600">
                                    SFSDFSDFSD
                                </Typography>
                                {/* <Typography className="text-xs font-normal text-blue-gray-500">
                          {job[1]}
                        </Typography> */}
                            </td>
                            <td className='border-b border-blue-gray-50'>
                                <Typography className="text-xs font-semibold text-blue-gray-600">
                                    SDFSFDSDFSDF
                                </Typography>
                            </td>
                            <td className='border-b border-blue-gray-50'>
                                <Typography className="text-xs font-semibold text-blue-gray-600">
                                    SDFSFDSDFSDF
                                </Typography>
                            </td>
                            <td className='border-b border-blue-gray-50'>
                                <Typography className="text-xs font-semibold text-blue-gray-600">
                                    SDFSFDSDFSDF
                                </Typography>
                            </td>
                            <td className='border-b border-blue-gray-50'>
                                <Typography className="text-xs font-semibold text-blue-gray-600">
                                    SDFSFDSDFSDF
                                </Typography>
                            </td>
                            <td className='border-b border-blue-gray-50'>
                                <Typography className="text-xs font-semibold text-blue-gray-600">
                                    SDFSFDSDFSDF
                                </Typography>
                            </td>
                            <td className='border-b border-blue-gray-50'>
                                <Typography className="text-xs font-semibold text-blue-gray-600">
                                    SDFSFDSDFSDF
                                </Typography>
                            </td>
                            <td className='border-b border-blue-gray-50'>
                                <Typography className="text-xs font-semibold text-blue-gray-600">
                                    SDFSFDSDFSDF
                                </Typography>
                            </td>
                        </tr>
                        {/* );
              }
              )} */}
                    </tbody>
                </table>
            </CardBody>
        </>
    );
}

export default UploadGesek;
