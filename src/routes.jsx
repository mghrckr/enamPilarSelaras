import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  InformationCircleIcon,
  ServerStackIcon,
  RectangleStackIcon,
  DocumentIcon,
  ShoppingBagIcon,
  SignalIcon,
  FolderOpenIcon,
  EnvelopeIcon,
  ShoppingCartIcon,
  WalletIcon,
  MinusIcon,
} from "@heroicons/react/24/solid";
import { InputForm } from "@/pages/InputForm";
import TablesAntri from "./pages/dashboard/tabllesAntri";
import TablesOutbox from "./pages/dashboard/tabllesOutbox";
import DataProduk from "./pages/dashboard/dataProduk";
import DataKomisi from "./pages/dashboard/dataKomisi";
import Inbox from "./pages/dashboard/Inbox";
import Layout from "./componentsIntegrasi/Layout";
import UserHome from "./pages/report/UserHome";
import MemberSaldo from "./pages/report/MemberSaldo";
import DataMember from "./pages/dashboard/dataMember";
import DataSupplier from "./pages/dashboard/dataSupplier";
import Penjualan from "./pages/dashboard/penjualan";
import PenjualanHariIni from "./pages/dashboard/penjualanHariIni";
import CheckSN from "./pages/dashboard/checkSN";
import LabaReseller from "./pages/dashboard/labaReseller";
import Pph from "./pages/dashboard/pph";
import LabaHarian from "./pages/dashboard/labaHarian";
import LabaRugi from "./pages/dashboard/labaRugi";
import CancelDeposit from "./pages/dashboard/cancelDeposit";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <UserCircleIcon {...icon} />,
        name: "KPI",
        path: "/kpi",
        element: <DataMember />,
      },
      {
        icon: <RectangleStackIcon {...icon} />,
        name: "SALDO SUPPLIER",
        path: "/saldoSupplier",
        element: <DataSupplier />,
      },
      {
        icon: <ShoppingCartIcon {...icon} />,
        name: "PENJUALAN",
        path: "/penjualan",
        element: <Penjualan />,
      },
      {
        icon: <ShoppingCartIcon {...icon} />,
        name: "PENJUALAN HARI INI",
        path: "/penjualanHariIni",
        element: <PenjualanHariIni />,
      },
      // {
      //   icon: <RectangleStackIcon {...icon} />,
      //   name: "PPH",
      //   path: "/pph",
      //   element: <Pph />,
      // },
      {
        icon: <RectangleStackIcon {...icon} />,
        name: "CHECK SN",
        path: "/checkSN",
        element: <CheckSN />,
      },
      {
        icon: <WalletIcon {...icon} />,
        name: "LABA RESELLER",
        path: "/labaReseller",
        element: <LabaReseller />,
      },
      {
        icon: <WalletIcon {...icon} />,
        name: "LABA HARIAN",
        path: "/labaHarian",
        element: <LabaHarian />,
      },
      {
        icon: <WalletIcon {...icon} />,
        name: "LABA RUGI",
        path: "/labaRugi",
        element: <LabaRugi />,
      },

      // {
      //   name: "SPL & BANK",
      //   path: "/dataKomisi",
      //   element: <DataKomisi />,
      // },
      // {
      //   name: "SALDO AWAL BANK",
      //   path: "/dataProduk",
      //   element: < DataProduk />,
      // },
      // {
      //   name: "SALDO",
      //   path: "/saldo",
      //   element: <MemberSaldo />,
      // }
    ],
  },
  {
    title: "FINANCE",
    layout: "dashboard",
    pages: [
      {
        icon: <TableCellsIcon {...icon} />,
        name: "DATA SPL",
        path: "/inbox",
        element: <Inbox />,
      },
      {
        icon: <DocumentIcon {...icon} />,
        name: "DEPO SPL",
        path: "/input",
        element: <InputForm />,
      },
      {
        icon: <DocumentIcon {...icon} />,
        name: "CEK PENDING",
        path: "/tablesOutbox",
        element: <TablesOutbox />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "DATA TRANSAKSI",
        path: "/tablesAntri",
        element: <TablesAntri />,
      },
      {
        icon: <MinusIcon {...icon} />,
        name: "CANCEL DEPOSIT",
        path: "/cancelDeposit",
        element: <CancelDeposit />,
      },
    ],
  },
  // {
  //   layout: <Layout />,
  //   pages: [
  //     {
  //       name: "tes",
  //       path: "/tes",
  //       element: <UserHome />,
  //     }
  //   ],
  // },
];

export default routes;
