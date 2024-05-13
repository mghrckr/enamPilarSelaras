import React, { useState, useEffect } from 'react';

import '../css/TableModal.css'


const TableModal = ({ memberTrxs }) => {
    console.log(memberTrxs, 'ini member');
    const formatNumber = (number) => {
        if (number === undefined) {
            return "";
        }
        return number.toLocaleString();
    };

    return (
        <>
            {memberTrxs.length < 1 ? (
                <h1
                    className="animate-typing overflow-hidden whitespace-nowrap text-5xl text-black font-bold">
                    Tidak Ada Data
                </h1>
            ) : (
                <div className="relative overflow-auto  shadow-md sm:rounded-lg" style={{ minHeight: '500px' }}>
                    <div className="shadow-md sm:rounded-lg" style={{ maxHeight: '500px' }}>
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 table-fixed shadow-md sm:rounded-lg" style={{ minHeight: '500px' }}>
                            <thead className="text-xs text-gray-700 uppercase dark:text-gray-400 shadow-md sm:rounded-lg">
                                <tr>
                                    <th style={{ fontWeight: 'bold', color: 'black' }} key="no" scope="col">No</th>
                                    <th style={{ fontWeight: 'bold', color: 'black' }} key="id" scope="col">Produk</th>
                                    <th style={{ fontWeight: 'bold', color: 'black', width: '60%' }} key="nama" scope="col">Nama</th>
                                    <th style={{ fontWeight: 'bold', color: 'black' }} key="harga" scope="col">Harga</th>
                                    <th style={{ fontWeight: 'bold', color: 'black' }} key="jmlTrx" scope="col">Jml TRX</th>
                                    <th style={{ fontWeight: 'bold', color: 'black' }} key="totalLaba" scope="col">Total Laba</th>
                                </tr>
                            </thead>
                            <tbody className="white-background shadow-md sm:rounded-lg">
                                {memberTrxs.map((memberTrx, index) => (
                                    <tr key={index}>
                                        <td style={{ fontWeight: 'bold', color: 'black' }}>{index + 1}</td>
                                        <td style={{ fontWeight: 'bold', color: 'black' }}>{memberTrx.Produk}</td>
                                        <td style={{ fontWeight: 'bold', color: 'black' }}>{memberTrx.Keterangan}</td>
                                        <td style={{ fontWeight: 'bold', color: 'black' }}>{formatNumber(memberTrx.Harga)}</td>
                                        <td style={{ fontWeight: 'bold', color: 'black' }}>{formatNumber(memberTrx.JmlTrx)}</td>
                                        <td style={{ fontWeight: 'bold', color: 'black' }}>{formatNumber(memberTrx.totalLaba)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </>
    );
};

export default TableModal;
