const BASE_URL = `http://36.92.58.82:1523/api`
const BASE_URL_ACN = `http://${import.meta.env.VITE_API_URL2}`
import Swal from 'sweetalert2';



// export const fetchUsers = () => {
//   return async dispatch => {
//     try {
//       const response = await fetch(`${BASE_URL}/datakaryawan`, {
//         method: "GET"
//       });

//       if (!response.ok) {
//         throw new Error('Failed to fetch data');
//       }

//       const data = await response.json();
//       dispatch({ type: 'users/get', payload: data });
//     } catch (error) {
//       console.log(error.message);
//     }
//   };
// }

export const formatNumber = (number) => {
    if (number === undefined) {
        return "";
    }
    return number.toLocaleString();
};

export const setPickedDatabase = (database) => {
    return {
        type: 'SET_PICKED_DATABASE',
        payload: database,
    };
};

export const getKpi = (dataFilter) => {
    console.log('masuk');
    console.log(dataFilter, 'form');
    return async (dispatch) => {
        try {
            const response = await fetch(`${BASE_URL}/kpi/da/list`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataFilter),
            });

            if (!response.ok) {
                throw new Error('Failed to fetch kpi');
            }

            const data = await response.json();
            dispatch({ type: 'kpi/get', payload: data });
        } catch (error) {
            console.log(error.message);
        }
    };
};

export const fetchSaldoSupplier = () => {
    return async dispatch => {
        try {
            const response = await fetch(`${BASE_URL}/supplier/re/balance`, {
                method: "GET",
            });

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            const data = await response.json();
            dispatch({ type: 'saldoSupplier/get', payload: data });
        } catch (error) {
            console.log(error.message);
        }
    };
}

export const fetchPenjualan = (startDate, endDate) => {
    return async dispatch => {
        try {
            const response = await fetch(`${BASE_URL}/sales/ra/periode?startDate=${startDate}&endDate=${endDate}`, {
                method: "GET",
            });

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            const data = await response.json();
            dispatch({ type: 'penjualan/get', payload: data });
        } catch (error) {
            console.log(error.message);
        }
    };
}

export const fetchPenjualanHariIni = () => {
    return async dispatch => {
        try {
            const response = await fetch(`${BASE_URL}/sales/re`, {
                method: "GET"
            });

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            const data = await response.json();
            dispatch({ type: 'penjualanHariIni/get', payload: data });
        } catch (error) {
            console.log(error.message);
        }
    };
}

export const fetchCheckSNNullable = () => {
    return async dispatch => {
        try {
            const response = await fetch(`${BASE_URL}/sn/null/ra`, {
                method: "GET"
            });

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            const data = await response.json();
            dispatch({ type: 'checkSNNullable/get', payload: data });
        } catch (error) {
            console.log(error.message);
        }
    };
}

export const fetchCheckSNDuplicate = () => {
    return async dispatch => {
        try {
            const response = await fetch(`${BASE_URL}/sn/duplicate/ra`, {
                method: "GET"
            });

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            const data = await response.json();
            dispatch({ type: 'checkSNDuplicate/get', payload: data });
        } catch (error) {
            console.log(error.message);
        }
    };
}

export const fetchLabaReseller = (startDate, endDate, selectedCode) => {
    return async dispatch => {
        try {
            const response = await fetch(`${BASE_URL}/reseller/re/sum?startDt=${startDate}&endDt=${endDate}&id=${selectedCode}`, {
                method: "GET"
            });

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            const data = await response.json();
            dispatch({ type: 'labaReseller/get', payload: data });
        } catch (error) {
            console.log(error.message);
        }
    };
}

export const fetchLabaResellerBot = (startDate, endDate, selectedCode) => {
    return async dispatch => {
        try {
            const response = await fetch(`${BASE_URL}/reseller/re/laba?startDt=${startDate}&endDt=${endDate}&id=${selectedCode}`, {
                method: "GET"
            });

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            const data = await response.json();
            dispatch({ type: 'labaResellerBot/get', payload: data });
        } catch (error) {
            console.log(error.message);
        }
    };
}

export const fetchLabaRugi = (startDate, endDate) => {
    return async dispatch => {
        try {
            const response = await fetch(`${BASE_URL}/reseller/ra/labarugi?startDt=${startDate}&endDt=${endDate}`, {
                method: "GET"
            });

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            const data = await response.json();
            dispatch({ type: 'labaRugi/get', payload: data });
        } catch (error) {
            console.log(error.message);
        }
    };
}

export const fetchResellers = () => {
    return async dispatch => {
        try {
            const response = await fetch(`${BASE_URL}/reseller/re/list`, {
                method: "GET"
            });

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            const data = await response.json();
            dispatch({ type: 'resellers/get', payload: data });
        } catch (error) {
            console.log(error.message);
        }
    };
}

export const fetchLabaHarian = () => {
    return async dispatch => {
        try {
            const response = await fetch(`${BASE_URL}/reseller/re/laba/hourly`, {
                method: "GET"
            });

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            const data = await response.json();
            dispatch({ type: 'labaHarian/get', payload: data });
        } catch (error) {
            console.log(error.message);
        }
    };
}

export const fetchSuppliers = () => {
    return async dispatch => {
        try {
            const response = await fetch(`${BASE_URL}/supplier/de`, {
                method: "GET"
            });

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            const data = await response.json();
            dispatch({ type: 'suppliers/get', payload: data });
        } catch (error) {
            console.log(error.message);
        }
    };
}

export const addSupplier = (formData) => {
    // console.log('masuk');
    // console.log(formData, 'form');
    return async (dispatch) => {
        try {
            const response = await fetch(`${BASE_URL}/supplier/de/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to add supplier');
            }

            const data = await response.json();
            dispatch({ type: 'suppliers/add', payload: data });
        } catch (error) {
            console.log(error.message);
        }
    };
};

export const editSupplier = (formData) => {
    return async (dispatch) => {
        try {
            const response = await fetch(`${BASE_URL}/supplier/de/update`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to edit supplier');
            }

            const data = await response.json();
            dispatch({ type: 'suppliers/edit', payload: data });
        } catch (error) {
            console.log(error.message);
        }
    };
};

export const fetchProducts = (page, limit, pickedCategory, search) => {
    return async dispatch => {
        try {
            // console.log(pickedCategory, 'ini id');
            const response = await fetch(`${BASE_URL}/products/staff/viewall?page=${page}&limit=${limit}&category=${pickedCategory}&search=${search}`, {
                method: "GET"
            });

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            const data = await response.json();
            dispatch({ type: 'products/get', payload: data });
            // console.log(data,'ini data');
        } catch (error) {
            console.log(error.message);
        }
    };
}

export const fetchOperators = () => {
    return async dispatch => {
        try {
            const response = await fetch(`${BASE_URL}/operators/viewAll`, {
                method: "GET"
            });

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            const data = await response.json();
            dispatch({ type: 'operators/get', payload: data });
        } catch (error) {
            console.log(error.message);
        }
    };
}

export const fetchBanks = () => {
    return async dispatch => {
        try {
            const response = await fetch(`${BASE_URL_ACN}/banks/view`, {
                method: "GET"
            });

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            const data = await response.json();
            dispatch({ type: 'banks/get', payload: data });
        } catch (error) {
            console.log(error.message);
        }
    };
}

export const fetchSuppliersAcns = () => {
    return async dispatch => {
        try {
            const response = await fetch(`${BASE_URL_ACN}/suppliers/view`, {
                method: "GET"
            });

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            const data = await response.json();
            dispatch({ type: 'suppliersAcns/get', payload: data });
        } catch (error) {
            console.log(error.message);
        }
    };
}

export const fetchUserAcns = () => {
    return async dispatch => {
        try {
            const response = await fetch(`${BASE_URL_ACN}/users/view`, {
                method: "GET"
            });

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            const data = await response.json();
            dispatch({ type: 'userAcns/get', payload: data });
        } catch (error) {
            console.log(error.message);
        }
    };
}

export const fetchCategories = () => {
    return async dispatch => {
        try {
            const response = await fetch(`${BASE_URL}/categories/viewAll`, {
                method: "GET"
            });

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            const data = await response.json();
            dispatch({ type: 'categories/get', payload: data });
        } catch (error) {
            console.log(error.message);
        }
    };
}

export const fetchDataTrxs = (startDate, endDate) => {
    return async dispatch => {

        // dispatch({ type: 'dartrxs/loading' });

        try {
            const response = await fetch(
                `${BASE_URL_ACN}/data/transaksi?startdate=${startDate}&enddate=${endDate}`,
                {
                    method: 'GET',
                }
            );

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            const data = await response.json();
            dispatch({ type: 'dataTrxs/get', payload: data });
            // console.log(data, 'ini data');
            localStorage.setItem('startLocal', JSON.stringify(startDate));
            localStorage.setItem('endLocal', JSON.stringify(endDate));
        } catch (error) {
            console.log(error.message);
        }
    };
}

export const fetchDataTrxSPL = (startDate, endDate) => {
    return async dispatch => {

        // dispatch({ type: 'dartrxs/loading' });

        try {
            const response = await fetch(
                `${BASE_URL_ACN}/data/saldosupplier?startdate=${startDate}&enddate=${endDate}`,
                {
                    method: 'GET',
                }
            );

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            const data = await response.json();
            dispatch({ type: 'dataTrxSPL/get', payload: data });
            // console.log(data, 'ini data');
            localStorage.setItem('startLocal', JSON.stringify(startDate));
            localStorage.setItem('endLocal', JSON.stringify(endDate));
        } catch (error) {
            console.log(error.message);
        }
    };
}

export const fetchDataTrxBank = (startDate, endDate) => {
    return async dispatch => {

        // dispatch({ type: 'dartrxs/loading' });

        try {
            const response = await fetch(
                `${BASE_URL_ACN}/data/saldobank?startdate=${startDate}&enddate=${endDate}`,
                {
                    method: 'GET',
                }
            );

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            const data = await response.json();
            dispatch({ type: 'dataTrxBank/get', payload: data });
            // console.log(data, 'ini data');
            localStorage.setItem('startLocalBank', JSON.stringify(startDate));
            localStorage.setItem('endLocalBank', JSON.stringify(endDate));
        } catch (error) {
            console.log(error.message);
        }
    };
}

export const fetchDataSupplier = () => {
    return async dispatch => {
        try {
            const response = await fetch(`${BASE_URL_ACN}/suppliers/view`, {
                method: "GET"
            });

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            const data = await response.json();
            dispatch({ type: 'dataSupplier/get', payload: data });
        } catch (error) {
            console.log(error.message);
        }
    };
}

export const editSupplierStatus = (id, status) => {
    console.log(status, 'hihi');
    return async (dispatch) => {
        try {
            const response = await fetch(`${BASE_URL_ACN}/suppliers/edit/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status }),
            });
            if (!response.ok) {
                throw new Error('Failed to edit supplier status');
            }
            const data = await response.json();
            dispatch({ type: 'EDIT_SUPPLIER_STATUS', payload: { id, status: data.status } });
        } catch (error) {
            console.error('Error editing supplier status:', error);
        }
    };
};

export const addDataSupplier = (formData) => {
    console.log('masuk');
    console.log(formData, 'form');
    return async (dispatch) => {
        try {
            const response = await fetch(`${BASE_URL_ACN}/suppliers/input`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to add user');
            }

            const data = await response.json();
            dispatch({ type: 'dataSupplier/add', payload: data });
        } catch (error) {
            console.log(error.message);
        }
    };
};

export const fetchCekPendings = () => {
    return async dispatch => {
        try {
            const response = await fetch(`${BASE_URL_ACN}/spldeposit/view`, {
                method: "GET"
            });

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            const data = await response.json();
            dispatch({ type: 'cekPendings/get', payload: data });
        } catch (error) {
            console.log(error.message);
        }
    };
}

export const addProduct = (formData) => {
    return async (dispatch) => {
        try {
            console.log(formData, 'form');
            const response = await fetch(`${BASE_URL}/products/staff/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (!response.ok) {
                throw new Error('Failed to add user');
            }

            const data = await response.json();
            dispatch({ type: 'product/add', payload: data });
        } catch (error) {
            console.log(error.message);
        }
    };
};

export const addUser = (userData) => {
    return async (dispatch) => {
        try {
            const response = await fetch(`${BASE_URL}/datakaryawanbaru`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                throw new Error('Failed to add user');
            }

            const data = await response.json();
            dispatch({ type: 'user/add', payload: data });
        } catch (error) {
            console.log(error.message);
        }
    };
};

export const addDeposit = (formData) => {
    console.log(formData, 'form');
    return async (dispatch) => {
        try {
            const response = await fetch(`${BASE_URL_ACN}/spldeposit/input`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            // if (!response.ok) {
            //     throw new Error('Failed to add user');
            // }
            if (response.ok) {
                // Logika jika PUT berhasil
                Swal.fire({
                    icon: 'success',
                    title: 'Data added successfully!',
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

            const data = await response.json();
            dispatch({ type: 'deposit/add', payload: data });
        } catch (error) {
            console.log(error.message);
        }
    };
};

export const addSaldo = (formData) => {
    console.log(formData, 'form');
    return async (dispatch) => {
        try {
            const response = await fetch(`${BASE_URL_ACN}/data/saldobank/addsaldoawal`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to add user');
            }

            const data = await response.json();
            dispatch({ type: 'saldo/add', payload: data });
        } catch (error) {
            console.log(error.message);
        }
    };
};

// export const loginUser = (DB_USER, DB_PASS) => {
//   return async dispatch => {
//     try {
//       const response = await fetch(`${BASE_URL}/user/login`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           DB_USER,
//           DB_PASS,
//         }),
//       });

//       if (!response.ok) {
//         throw new Error('Login failed');
//       }
//       dispatch({
//         type: 'user/login',
//         payload: {
//           DB_USER,
//           DB_PASS,
//         },
//       });
//       const data = await response.json();
//       localStorage.setItem('access_token', data.msg.access_token)
//       localStorage.setItem('access_user', data.msg.access_user)
//       console.log('syifa 70kg');
//     } catch (error) {
//       // console.log('syifa 70kg');
//       console.log(error.message);
//     }
//   };
// };

export const setPickedCategory = (category) => {
    return {
        type: 'SET_PICKED_CATEGORY',
        payload: category,
    };
};

export const deleteProduct = (productId) => {
    console.log('masukkk');
    return (dispatch) => {
        // Misalnya Anda ingin menghapus produk dengan ID tertentu
        // const productId = 'contoh_id_produk';

        // Disini Anda bisa menambahkan logic untuk mengirim permintaan penghapusan produk ke backend
        fetch(`${BASE_URL}/products/staff/delete/${productId}`, {
            method: 'DELETE',
        })
            .then((response) => {
                // Jika penghapusan berhasil, kirim action DELETE_PRODUCT
                dispatch({
                    type: 'DELETE_PRODUCT',
                    payload: productId,
                });
                console.log('Produk berhasil dihapus');
            })
            .catch((error) => {
                console.error('Gagal menghapus produk:', error);
                // Tangani kesalahan jika penghapusan gagal
            });
    };
};

export const editProductAction = (formData) => {
    return async (dispatch) => {
        try {
            const response = await fetch(`${BASE_URL}/products/staff/edit/${formData.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (!response.ok) {
                throw new Error('Failed to edit product');
            }
            // Jika sukses, panggil action creator lain untuk mengupdate state Redux
            // dispatch(updateProductSuccess(formData)); // Gantilah ini dengan action creator Anda yang sesuai
        } catch (error) {
            console.error('Error editing product:', error.message);
            // dispatch(updateProductFailure(error.message)); // Gantilah ini dengan action creator Anda yang sesuai
        }
    };
};

export const editProduct = (formData) => {
    return dispatch => {
        fetch(`${BASE_URL}/products/staff/edit/${formData.id}`, {
            method: 'PUT',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                dispatch({ type: 'product/edit', payload: data });
            })
            .catch(error => {
                console.error('Error editing product:', error.message);
            });
    };
}

export const setPickedUser = (user) => {
    return {
        type: 'SET_PICKED_USER',
        payload: user,
    };
};

export const setPickedSupplier = (user) => {
    return {
        type: 'SET_PICKED_SUPPLIER',
        payload: user,
    };
};

export const setPickedBank = (user) => {
    return {
        type: 'SET_PICKED_BANK',
        payload: user,
    };
};

export const setPickedBankAwal = (user) => {
    return {
        type: 'SET_PICKED_BANK_AWAL',
        payload: user,
    };
};

/* integrasi */


const BASE_URL_INT = `http://${import.meta.env.VITE_API_URL1}`
// const access_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJEQl9OQU1FIjoib3RvbWF4IiwiREJfVVNFUiI6IndlYnVzZXIwMDEiLCJEQl9QQVNTIjoiVyNCdXNlcjAwMSIsIkRCX1NFUlZFUiI6IjE5Mi4xNjguMTI3Ljk0IiwiaWF0IjoxNzAyNDYwNzA1fQ.6cmlI_iPOdxJmYRFGw2q01o354HzncijNDfMBmpAWmk'
// const access_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJEQl9OQU1FIjoibW9ubW9uIiwiREJfVVNFUiI6IndlYnVzZXIwMDEiLCJEQl9QQVNTIjoiVyNCdXNlcjAwMSIsIkRCX1NFUlZFUiI6IjE5Mi4xNjguMTI3Ljk0IiwiaWF0IjoxNzAyNTQ1OTEzfQ.c0oYsfp1IuCR9OQWODQi4fQHw0kPMm8vJyEPnQulzNg'


export const fetchUsers = () => {
    return async dispatch => {
        try {
            const response = await fetch(`${BASE_URL_INT}/membertrx`, {
                method: "GET",
                headers: {
                    "access_token": localStorage.getItem('access_token')
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            const data = await response.json();
            dispatch({ type: 'users/get', payload: data });
        } catch (error) {
            console.log(error.message);
        }
    };
}

export const fetchSaldoMembers = () => {
    return async dispatch => {
        try {
            const response = await fetch(`${BASE_URL_INT}/member/saldo`, {
                method: "GET",
                headers: {
                    "access_token": localStorage.getItem('access_token')
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            const data = await response.json();
            dispatch({ type: 'saldo/get', payload: data });
        } catch (error) {
            console.log(error.message);
        }
    };
}

export const fetchListProduk = (currentPage) => {
    return async dispatch => {
        try {
            const response = await fetch(`${BASE_URL_INT}/produk/list?page=${currentPage}`, {
                method: "GET",
                headers: {
                    "access_token": localStorage.getItem('access_token')
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            const data = await response.json();
            dispatch({ type: 'listProduk/get', payload: data });
        } catch (error) {
            console.log(error.message);
        }
    };
}

export const fetchInactiveMembers = () => {
    return async dispatch => {
        try {
            const response = await fetch(`${BASE_URL_INT}/member/inactive`, {
                method: "GET",
                headers: {
                    "access_token": localStorage.getItem('access_token')
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            const data = await response.json();
            dispatch({ type: 'inactive/get', payload: data });
        } catch (error) {
            console.log(error.message);
        }
    };
}

export const fetchDepositMembers = () => {
    return async dispatch => {
        try {
            const response = await fetch(`${BASE_URL_INT}/member/deposit`, {
                method: "GET",
                headers: {
                    "access_token": localStorage.getItem('access_token')
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            const data = await response.json();
            dispatch({ type: 'depositMembers/get', payload: data });
        } catch (error) {
            console.log(error.message);
        }
    };
}

export const fetchTrxs = (startDate, endDate) => {
    return async dispatch => {

        dispatch({ type: 'trxs/loading' });

        const formattedStartDate = startDate.split('-').join('');
        const formattedEndDate = endDate.split('-').join('');

        try {
            const response = await fetch(
                `${BASE_URL_INT}/memberTotalTrxLabaSemua?startdate=${formattedStartDate}&enddate=${formattedEndDate}`,
                {
                    method: 'GET',
                    headers: {
                        "access_token": localStorage.getItem('access_token'),
                    },
                }
            );

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            const data = await response.json();
            dispatch({ type: 'trxs/get', payload: data });
            // console.log(data, 'ini data');
            localStorage.setItem('startLocal', JSON.stringify(startDate));
            localStorage.setItem('endLocal', JSON.stringify(endDate));
        } catch (error) {
            console.log(error.message);
        }
    };
}

export const fetchmemberTrxs = (memberId, startDate, endDate) => {
    return async dispatch => {
        const formattedStartDate = startDate.split('-').join('');
        const formattedEndDate = endDate.split('-').join('');

        try {
            const response = await fetch(
                `${BASE_URL_INT}/membertrx?memberid=${memberId}&startdate=${formattedStartDate}&enddate=${formattedEndDate}`,
                {
                    method: 'GET',
                    headers: {
                        "access_token": localStorage.getItem('access_token'),
                    },
                }
            );

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            const data = await response.json();
            dispatch({ type: 'memberTrxs/get', payload: data });
        } catch (error) {
            console.log(error.message);
        }
    };
}

export const fetchLaba = (startDate, endDate) => {
    return async dispatch => {
        dispatch({ type: 'labas/loading' });
        const formattedStartDate = startDate.split('-').join('');
        const formattedEndDate = endDate.split('-').join('');

        try {
            const response = await fetch(
                `${BASE_URL_INT}/memberTotalTrxLaba?startdate=${formattedStartDate}&enddate=${formattedEndDate}`,
                {
                    method: 'GET',
                    headers: {
                        "access_token": localStorage.getItem('access_token'),
                    },
                }
            );

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            const data = await response.json();
            dispatch({ type: 'labas/get', payload: data });
        } catch (error) {
            console.log(error.message);
        }
    };
}

export const fetchProdukTerjual = (startDate, endDate, pickedJenis, pickedOperator, pickedBerdasarkan) => {
    return async dispatch => {

        dispatch({ type: 'produktrxs/loading' });
        const formattedStartDate = startDate.split('-').join('');
        const formattedEndDate = endDate.split('-').join('');

        try {
            const response = await fetch(
                `${BASE_URL_INT}/produktrx?startdate=${formattedStartDate}&enddate=${formattedEndDate}&jenis=${pickedJenis}&provider=${pickedOperator}&berdasarkan=${pickedBerdasarkan}`,
                {
                    method: 'GET',
                    headers: {
                        "access_token": localStorage.getItem('access_token'),
                    },
                }
            );

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            const data = await response.json();
            dispatch({ type: 'produktrxs/get', payload: data });
            localStorage.setItem('startLocal', JSON.stringify(startDate));
            localStorage.setItem('endLocal', JSON.stringify(endDate));
            localStorage.setItem('pickedOperatorLocal', pickedOperator);
            localStorage.setItem('pickedBerdasarkanLocal', pickedBerdasarkan);
            localStorage.setItem('pickedJenisLocal', pickedJenis);
        } catch (error) {
            console.log(error.message);
        }
    };
}

export const fetchModuleTrxs = (startDate, endDate, pickedOperator) => {
    return async dispatch => {

        dispatch({ type: 'moduleTrxs/loading' });
        const formattedStartDate = startDate.split('-').join('');
        const formattedEndDate = endDate.split('-').join('');

        try {
            const response = await fetch(
                `${BASE_URL_INT}/moduletrx?startdate=${formattedStartDate}&enddate=${formattedEndDate}&kodeoperator=${pickedOperator}`,
                {
                    method: 'GET',
                    headers: {
                        "access_token": localStorage.getItem('access_token'),
                    },
                }
            );

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            const data = await response.json();
            dispatch({ type: 'moduleTrxs/get', payload: data });
            localStorage.setItem('startLocal', JSON.stringify(startDate));
            localStorage.setItem('endLocal', JSON.stringify(endDate));
            localStorage.setItem('pickedOperatorLocal', pickedOperator);
        } catch (error) {
            console.log(error.message);
        }
    };
}

export const fetchKodeOperators = (untungs) => {
    return async dispatch => {
        try {
            const response = await fetch(`${BASE_URL_INT}/kodeOperator`, {
                method: "GET",
                headers: {
                    "access_token": localStorage.getItem('access_token')
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            const data = await response.json();
            dispatch({ type: 'kodeOperators/get', payload: data });
        } catch (error) {
            console.log(error.message);
        }
    };
}
export const fetchLatestDates = () => {
    return async dispatch => {
        try {
            const response = await fetch(`${BASE_URL_INT}/latestDateTrx`, {
                method: "GET",
                headers: {
                    "access_token": localStorage.getItem('access_token')
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            const data = await response.json();
            dispatch({ type: 'latestDates/get', payload: data });
        } catch (error) {
            console.log(error.message);
        }
    };
}



export const loginUser = (DB_SERVER, DB_USER, DB_PASS, DB_NAME) => {
    return async dispatch => {
        try {
            const response = await fetch(`${BASE_URL_INT}/verifyconnection`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    DB_SERVER,
                    DB_USER,
                    DB_PASS,
                    DB_NAME
                }),
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }
            dispatch({
                type: 'user/login',
                payload: {
                    DB_SERVER,
                    DB_USER,
                    DB_PASS,
                    DB_NAME
                },
            });
            const data = await response.json();
            localStorage.setItem('access_token', data.msg.access_token)
            localStorage.setItem('access_server', data.msg.access_server)
            localStorage.setItem('access_db', data.msg.access_db)
            localStorage.setItem('access_user', data.msg.access_user)
        } catch (error) {
            console.log(error.message);
        }
    };
};

export const setPickedOperator = (operator) => {
    return {
        type: 'SET_PICKED_OPERATOR',
        payload: operator,
    };
};

export const setPickedJenis = (jenis) => {
    return {
        type: 'SET_PICKED_JENIS',
        payload: jenis,
    };
};

export const setPickedBerdasarkan = (berdasarkan) => {
    return {
        type: 'SET_PICKED_BERDASARKAN',
        payload: berdasarkan,
    };
};
