import { combineReducers } from "redux";

// const usersState = {
//   users: [],
//   loading: true
// }
const productsState = {
  products: [],
  loading: true
}

const dataTrxsState = {
  dataTrxs: [],
  loading: true
}

const dataTrxBankState = {
  dataTrxBank: [],
  loading: true
}

const dataTrxSPLState = {
  dataTrxSPL: [],
  loading: true
}

const pickedCategoryState = {
  pickedCategory: '',
  loading: true
}

const operatorsState = {
  operators: [],
  loading: true
}

const banksState = {
  banks: [],
  loading: true
}

const depositsState = {
  deposits: [],
  loading: true
}

const suppliersAcnsState = {
  suppliersAcns: [],
  loading: true
}

const userAcnsState = {
  userAcns: [],
  loading: true
}

const categoriesState = {
  categories: [],
  loading: true
}

const pickedUserState = {
  pickedUser: '',
  loading: true
}

const pickedSupplierState = {
  pickedSupplier: '',
  loading: true
}

const cekPendingsState = {
  cekPendings: [],
  loading: true
}

const pickedBankState = {
  pickedBank: '',
  loading: true
}

const pickedBankAwalState = {
  pickedBankAwal: '',
  loading: true
}

const dataSupplierState = {
  dataSupplier: [],
  loading: true
}

const saldoAwalState = {
  saldoAwal: [],
  loading: true
}

const kpiState = {
  kpi: [],
  loading: true
}

const saldoSupplierState = {
  saldoSupplier: [],
  loading: true
}

const penjualanState = {
  penjualan: [],
  loading: true
}

const penjualanHariIniState = {
  penjualanHariIni: [],
  loading: true
}

const pickedDatabaseState = {
  pickedDatabase: 'Database',
};

const checkSNNullableState = {
  checkSNNullable: 'Database',
};

const checkSNDuplicateState = {
  checkSNDuplicate: 'Database',
};

const labaResellerState = {
  labaReseller: [],
};

const labaResellerBotState = {
  labaResellerBot: [],
};

const resellersState = {
  resellers: [],
};

const labaHarianState = {
  labaHarian: [],
};

const labaRugiState = {
  labaRugi: [],
};

const suppliersState = {
  suppliers: [],
};

const uploadedState = {
  uploaded: [],
};

const dataTransaksiState = {
  dataTransaksi: [],
};

const cancelDepositState = {
  cancelDeposit: [],
};

// const loginState = {
//   loginDetails: {
//     DB_USER: '',
//     DB_PASS: '',
//   },
// };


// const usersReducer = (state = usersState, actions) => {
//   switch (actions.type) {
//     case 'users/get':
//       return {
//         ...state,
//         users: actions.payload,
//         loading: false,
//       };
//     case 'user/add':
//       return {
//         ...state,
//         users: [...state.users, actions.payload],
//       };
//     default:
//       return state;
//   }
// }

const pickedDatabaseReducer = (state = pickedDatabaseState, actions) => {
  switch (actions.type) {
    case 'SET_PICKED_DATABASE':
      return {
        ...state,
        pickedDatabase: actions.payload,
      }
    default:
      return state;
  }
};

const saldoSupplierReducer = (state = saldoSupplierState, actions) => {
  switch (actions.type) {
    case 'saldoSupplier/get':
      return {
        ...state,
        saldoSupplier: actions.payload,
        loading: false,
      };
    default:
      return state;
  }
}

const penjualanReducer = (state = penjualanState, actions) => {
  switch (actions.type) {
    case 'penjualan/get':
      return {
        ...state,
        penjualan: actions.payload,
        loading: false,
      };
    default:
      return state;
  }
}

const penjualanHariIniReducer = (state = penjualanHariIniState, actions) => {
  switch (actions.type) {
    case 'penjualanHariIni/get':
      return {
        ...state,
        penjualanHariIni: actions.payload,
        loading: false,
      };
    default:
      return state;
  }
}

const checkSNNullableReducer = (state = checkSNNullableState, actions) => {
  switch (actions.type) {
    case 'checkSNNullable/get':
      return {
        ...state,
        checkSNNullable: actions.payload,
        loading: false,
      };
    default:
      return state;
  }
}

const checkSNDuplicateReducer = (state = checkSNDuplicateState, actions) => {
  switch (actions.type) {
    case 'checkSNDuplicate/get':
      return {
        ...state,
        checkSNDuplicate: actions.payload,
        loading: false,
      };
    default:
      return state;
  }
}

const labaResellerReducer = (state = labaResellerState, actions) => {
  switch (actions.type) {
    case 'labaReseller/get':
      return {
        ...state,
        labaReseller: actions.payload,
        loading: false,
      };
    default:
      return state;
  }
}

const labaResellerBotReducer = (state = labaResellerBotState, actions) => {
  switch (actions.type) {
    case 'labaResellerBot/get':
      return {
        ...state,
        labaResellerBot: actions.payload,
        loading: false,
      };
    default:
      return state;
  }
}

const labaRugiReducer = (state = labaRugiState, actions) => {
  switch (actions.type) {
    case 'labaRugi/get':
      return {
        ...state,
        labaRugi: actions.payload,
        loading: false,
      };
    default:
      return state;
  }
}

const resellersReducer = (state = resellersState, actions) => {
  switch (actions.type) {
    case 'resellers/get':
      return {
        ...state,
        resellers: actions.payload,
        loading: false,
      };
    default:
      return state;
  }
}

const labaHarianReducer = (state = labaHarianState, actions) => {
  switch (actions.type) {
    case 'labaHarian/get':
      return {
        ...state,
        labaHarian: actions.payload,
        loading: false,
      };
    default:
      return state;
  }
}

const suppliersReducer = (state = suppliersState, actions) => {
  switch (actions.type) {
    case 'suppliers/get':
      return {
        ...state,
        suppliers: actions.payload,
        loading: false,
      };
    case 'suppliers/add':
      return {
        ...state,
        suppliers: [...state.suppliers, actions.payload],
      };
    case 'suppliers/edit':
      return {
        ...state,
        suppliers: Array.isArray(state.suppliers)
          ? state.suppliers.map(supplier =>
            supplier.id === actions.payload.id ? actions.payload : supplier
          )
          : state.suppliers,
      };
    default:
      return state;
  }
}

const depositsReducer = (state = depositsState, actions) => {
  switch (actions.type) {
    case 'deposits/get':
      return {
        ...state,
        deposits: actions.payload,
        loading: false,
      };
    case 'deposit/add':
      return {
        ...state,
        deposits: [...state.deposits, actions.payload],
      };
    default:
      return state;
  }
}

const uploadedReducer = (state = uploadedState, actions) => {
  switch (actions.type) {
    case 'uploaded/get':
      return {
        ...state,
        uploaded: actions.payload,
        loading: false,
      };
    // case 'deposit/add':
    //   return {
    //     ...state,
    //     deposits: [...state.deposits, actions.payload],
    //   };
    default:
      return state;
  }
}

const dataTransaksiReducer = (state = dataTransaksiState, actions) => {
  switch (actions.type) {
    case 'dataTransaksi/get':
      return {
        ...state,
        dataTransaksi: actions.payload,
        loading: false,
      };
    default:
      return state;
  }
}

const cancelDepositReducer = (state = cancelDepositState, actions) => {
  switch (actions.type) {
    case 'cancelDeposit/get':
      return {
        ...state,
        cancelDeposit: actions.payload,
        loading: false,
      };
    default:
      return state;
  }
}

const productsReducer = (state = productsState, actions) => {
  switch (actions.type) {
    case 'products/get':
      return {
        ...state,
        products: actions.payload,
        loading: false,
      };
    case 'product/add':
      return {
        ...state,
        products: [...state.products, actions.payload],
      };
    case 'DELETE_PRODUCT':
      // Filter produk yang akan dihapus berdasarkan ID
      console.log(state.products, 'lucu');
      // const updatedProducts = state.products.filter((product) => product.id !== actions.payload);
      return {
        ...state,
        products: actions.payload,
        // Update state lain jika diperlukan
      };
    case 'product/edit':
      const updatedProducts = state.products.map(product => {
        if (product.id === actions.payload.id) {
          return actions.payload;
        } else {
          return product;
        }
      });
      return {
        ...state,
        products: updatedProducts,
      };
    default:
      return state;
  }
}

const kpiReducer = (state = kpiState, actions) => {
  switch (actions.type) {
    case 'kpi/get':
      return {
        // ...state,
        // kpi: [...state.kpi, actions.payload],
        ...state,
        kpi: actions.payload,
        loading: false,
      };
    default:
      return state;
  }
}

const dataSupplierReducer = (state = dataSupplierState, actions) => {
  switch (actions.type) {
    case 'dataSupplier/get':
      return {
        ...state,
        dataSupplier: actions.payload,
        loading: false,
      };
    case 'dataSupplier/add':
      return {
        ...state,
        dataSupplier: [...state.dataSupplier, actions.payload],
      };
    case 'EDIT_SUPPLIER_STATUS':
      return {
        ...state,
        dataSupplier: state.dataSupplier.map(supplier =>
          supplier.id === actions.payload.id ? { ...supplier, status: actions.payload.status } : supplier
        ),
      };
    default:
      return state;
  }
}


const saldoAwalReducer = (state = saldoAwalState, actions) => {
  switch (actions.type) {
    // case 'saldoAwal/get':
    //   return {
    //     ...state,
    //     saldoAwal: actions.payload,
    //     loading: false,
    //   };
    case 'saldoAwal/add':
      return {
        ...state,
        saldoAwal: [...state.saldoAwal, actions.payload],
      };
    default:
      return state;
  }
}



const cekPendingsReducer = (state = cekPendingsState, actions) => {
  switch (actions.type) {
    case 'cekPendings/get':
      return {
        ...state,
        cekPendings: actions.payload,
        loading: false,
      };
    default:
      return state;
  }
}

const dataTrxsReducer = (state = dataTrxsState, actions) => {
  switch (actions.type) {
    case 'dataTrxs/get':
      return {
        ...state,
        dataTrxs: actions.payload,
        loading: false,
      };
    default:
      return state;
  }
}

const dataTrxSPLReducer = (state = dataTrxSPLState, actions) => {
  switch (actions.type) {
    case 'dataTrxSPL/get':
      return {
        ...state,
        dataTrxSPL: actions.payload,
        loading: false,
      };
    default:
      return state;
  }
}

const dataTrxBankReducer = (state = dataTrxBankState, actions) => {
  switch (actions.type) {
    case 'dataTrxBank/get':
      return {
        ...state,
        dataTrxBank: actions.payload,
        loading: false,
      };
    default:
      return state;
  }
}

const operatorsReducer = (state = operatorsState, actions) => {
  switch (actions.type) {
    case 'operators/get':
      return {
        ...state,
        operators: actions.payload,
        loading: false,
      };
    default:
      return state;
  }
}

const banksReducer = (state = banksState, actions) => {
  switch (actions.type) {
    case 'banks/get':
      return {
        ...state,
        banks: actions.payload,
        loading: false,
      };
    default:
      return state;
  }
}

const suppliersAcnsReducer = (state = suppliersAcnsState, actions) => {
  switch (actions.type) {
    case 'suppliersAcns/get':
      return {
        ...state,
        suppliersAcns: actions.payload,
        loading: false,
      };
    default:
      return state;
  }
}

const userAcnsReducer = (state = userAcnsState, actions) => {
  switch (actions.type) {
    case 'userAcns/get':
      return {
        ...state,
        userAcns: actions.payload,
        loading: false,
      };
    default:
      return state;
  }
}

const categoriesReducer = (state = categoriesState, actions) => {
  switch (actions.type) {
    case 'categories/get':
      return {
        ...state,
        categories: actions.payload,
        loading: false,
      };
    default:
      return state;
  }
}

const pickedUserReducer = (state = pickedUserState, actions) => {
  switch (actions.type) {
    case 'SET_PICKED_USER':
      return {
        ...state,
        pickedUser: actions.payload,
      }
    default:
      return state;
  }
};

const pickedSupplierReducer = (state = pickedSupplierState, actions) => {
  switch (actions.type) {
    case 'SET_PICKED_SUPPLIER':
      return {
        ...state,
        pickedSupplier: actions.payload,
      }
    default:
      return state;
  }
};

const pickedBankReducer = (state = pickedBankState, actions) => {
  switch (actions.type) {
    case 'SET_PICKED_BANK':
      return {
        ...state,
        pickedBank: actions.payload,
      }
    default:
      return state;
  }
};

const pickedBankAwalReducer = (state = pickedBankAwalState, actions) => {
  switch (actions.type) {
    case 'SET_PICKED_BANK_AWAL':
      return {
        ...state,
        pickedBankAwal: actions.payload,
      }
    default:
      return state;
  }
};

// const loginReducer = (state = loginState, actions) => {
//   switch (actions.type) {
//     case 'user/login':
//       return {
//         ...state,
//         loginDetails: actions.payload,
//       };
//     default:
//       return state;
//   }
// };

const pickedCategoryReducer = (state = pickedCategoryState, actions) => {
  switch (actions.type) {
    case 'SET_PICKED_CATEGORY':
      return {
        ...state,
        pickedCategory: actions.payload,
      }
    default:
      return state;
  }
};


/* integrasi */

const operatorState = {
  operator: 'Semua Operator',
  loading: true
}

const listProdukState = {
  listProduk: [],
  loading: true
}

const depositMembersState = {
  depositMembers: [],
  loading: true
}

const jenisState = {
  jenis: ' Semua Jenis',
  loading: true
}

const berdasarkanState = {
  berdasarkan: 'Kode',
  loading: true
}
const produktrxsState = {
  produktrxs: [],
  loading: true
}

const memberTrxsState = {
  memberTrxs: [],
  loading: true
}

const usersState = {
  users: [],
  loading: true
}

const trxsState = {
  trxs: [],
  loading: true
}

const saldoMemberState = {
  saldo: [],
  loading: true
}

const inactiveMemberState = {
  inactive: [],
  loading: true
}

const labasState = {
  labas: [],
  loading: true
}

const moduleTrxsState = {
  moduleTrxs: [],
  loading: true
}

const kodeOperatorsState = {
  kodeOperators: [],
  loading: true
}

const latestDatesState = {
  latestDates: [],
  loading: true
}

const loginState = {
  loginDetails: {
    DB_SERVER: '',
    DB_USER: '',
    DB_PASS: '',
    DB_NAME: ''
  },
};

const usersReducer = (state = usersState, actions) => {
  switch (actions.type) {
    case 'users/get':
      return {
        ...state,
        users: actions.payload,
        loading: false
      }
    default:
      return state;
  }
}

const depositMembersReducer = (state = depositMembersState, actions) => {
  switch (actions.type) {
    case 'depositMembers/get':
      return {
        ...state,
        depositMembers: actions.payload,
        loading: false
      }
    default:
      return state;
  }
}

const listProdukReducer = (state = listProdukState, actions) => {
  switch (actions.type) {
    case 'listProduk/get':
      return {
        ...state,
        listProduk: actions.payload,
        loading: false
      }
    default:
      return state;
  }
}

const saldoMemberReducer = (state = saldoMemberState, actions) => {
  switch (actions.type) {
    case 'saldo/get':
      return {
        ...state,
        saldo: actions.payload,
        loading: false
      }
    default:
      return state;
  }
}

const inactiveMemberReducer = (state = inactiveMemberState, actions) => {
  switch (actions.type) {
    case 'inactive/get':
      return {
        ...state,
        inactive: actions.payload,
        loading: false
      }
    default:
      return state;
  }
}

const trxsReducer = (state = trxsState, actions) => {
  switch (actions.type) {
    case 'trxs/loading':
      return {
        ...state,
        loading: true,
      };
    case 'trxs/get':
      return {
        ...state,
        trxs: actions.payload,
        loading: false,
      };
    default:
      return state;
  }
}

const labasReducer = (state = labasState, actions) => {
  switch (actions.type) {
    case 'labas/loading':
      return {
        ...state,
        loading: true,
      };
    case 'labas/get':
      return {
        ...state,
        labas: actions.payload,
        loading: false
      }
    default:
      return state;
  }
}

const moduleTrxsReducer = (state = moduleTrxsState, actions) => {
  switch (actions.type) {
    case 'moduleTrxs/loading':
      return {
        ...state,
        loading: true,
      };
    case 'moduleTrxs/get':
      return {
        ...state,
        moduleTrxs: actions.payload,
        loading: false,
      };
    default:
      return state;
  }
}

const produktrxsReducer = (state = produktrxsState, actions) => {
  switch (actions.type) {
    case 'produktrxs/loading':
      return {
        ...state,
        loading: true,
      };
    case 'produktrxs/get':
      return {
        ...state,
        produktrxs: actions.payload,
        loading: false,
      };
    default:
      return state;
  }
}

const memberTrxsReducer = (state = memberTrxsState, actions) => {
  switch (actions.type) {
    case 'memberTrxs/get':
      return {
        ...state,
        memberTrxs: actions.payload,
        loading: false
      }
    default:
      return state;
  }
}

const kodeOperatorsReducer = (state = kodeOperatorsState, actions) => {
  switch (actions.type) {
    case 'kodeOperators/get':
      return {
        ...state,
        kodeOperators: actions.payload,
        loading: false
      }
    default:
      return state;
  }
}

const latestDatesReducer = (state = latestDatesState, actions) => {
  switch (actions.type) {
    case 'latestDates/get':
      return {
        ...state,
        latestDates: actions.payload,
        loading: false
      }
    default:
      return state;
  }
}
const loginReducer = (state = loginState, actions) => {
  switch (actions.type) {
    case 'user/login':
      return {
        ...state,
        loginDetails: actions.payload,
      };
    default:
      return state;
  }
};

const pickedOperatorReducer = (state = operatorState, actions) => {
  switch (actions.type) {
    case 'SET_PICKED_OPERATOR':
      return {
        ...state,
        operator: actions.payload,
      }
    default:
      return state;
  }
};

const pickedJenisReducer = (state = jenisState, actions) => {
  switch (actions.type) {
    case 'SET_PICKED_JENIS':
      return {
        ...state,
        jenis: actions.payload,
      }
    default:
      return state;
  }
};

const pickedBerdasarkanReducer = (state = berdasarkanState, actions) => {
  switch (actions.type) {
    case 'SET_PICKED_BERDASARKAN':
      return {
        ...state,
        berdasarkan: actions.payload,
      }
    default:
      return state;
  }
};



const rootReducer = combineReducers({
  // users: usersReducer,
  pickedDatabase: pickedDatabaseReducer,
  kpi: kpiReducer,
  penjualan: penjualanReducer,
  penjualanHariIni: penjualanHariIniReducer,
  checkSNNullable: checkSNNullableReducer,
  checkSNDuplicate: checkSNDuplicateReducer,
  labaReseller: labaResellerReducer,
  labaResellerBot: labaResellerBotReducer,
  labaRugi: labaRugiReducer,
  resellers: resellersReducer,
  saldoSupplier: saldoSupplierReducer,
  labaHarian: labaHarianReducer,
  suppliers: suppliersReducer,
  uploaded: uploadedReducer,
  dataTransaksi: dataTransaksiReducer,
  cancelDeposit: cancelDepositReducer,
  dataTrxBank: dataTrxBankReducer,
  saldoAwal: saldoAwalReducer,
  dataTrxs: dataTrxsReducer,
  dataTrxSPL: dataTrxSPLReducer,
  dataSupplier: dataSupplierReducer,
  products: productsReducer,
  operators: operatorsReducer,
  categories: categoriesReducer,
  pickedUser: pickedUserReducer,
  pickedSupplier: pickedSupplierReducer,
  pickedBank: pickedBankReducer,
  pickedBankAwal: pickedBankAwalReducer,
  deposits: depositsReducer,
  cekPendings: cekPendingsReducer,
  // login: loginReducer,
  banks: banksReducer,
  userAcns: userAcnsReducer,
  suppliersAcns: suppliersAcnsReducer,
  pickedCategory: pickedCategoryReducer,
  depositMembers: depositMembersReducer,
  listProduk: listProdukReducer,
  users: usersReducer,
  saldo: saldoMemberReducer,
  inactive: inactiveMemberReducer,
  trxs: trxsReducer,
  labas: labasReducer,
  kodeOperators: kodeOperatorsReducer,
  latestDates: latestDatesReducer,
  loginDetails: loginReducer,
  moduleTrxs: moduleTrxsReducer,
  operator: pickedOperatorReducer,
  memberTrxs: memberTrxsReducer,
  produktrxs: produktrxsReducer,
  jenis: pickedJenisReducer,
  berdasarkan: pickedBerdasarkanReducer
})

export default rootReducer