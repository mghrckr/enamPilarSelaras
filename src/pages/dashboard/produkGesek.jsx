import InputGesek from "@/components/InputGesek";
import ModalRegistrasiMember from "@/components/ModalRegistrasiMember";
import ModalTopUpPulsa from "@/components/ModalTopUpPulsa";
import ModalTransaksiManual from "@/components/ModalTransaksiManual";
import UploadGesek from "@/components/UploadGesek";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Chip,
  Tooltip,
  Progress,
  Button
} from "@material-tailwind/react";
import { useState } from "react";

export function ProdukGesek() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cardBodyHeight, setCardBodyHeight] = useState("auto");

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setCardBodyHeight(isModalOpen ? "auto" : "auto"); // Atur ketinggian CardBody saat modal muncul
  };

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            PRODUK GESEK
          </Typography>
        </CardHeader>
        <CardBody
          className="overflow-x-scroll px-0 pt-0 pb-2 "
          style={{ height: cardBodyHeight, marginLeft: '8px' }} // Atur tinggi CardBody dengan state
        >
          <InputGesek />
          <UploadGesek />
        </CardBody>
      </Card>
    </div>
  );
}

export default ProdukGesek;
