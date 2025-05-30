import CardBank from "../bankCard/CardBank";
import Button from "../../ui/button/Button";
import { useCallback, useEffect, useRef, useState } from "react";
import BankModalForm from "../modal/BankModalForm";
import DeleteBankModal from "../modal/DeleteBankModal";
import {
  BankPayment,
  getBankPayments,
} from "../../../service/shopSetting/payment";
import toast, { Toaster } from "react-hot-toast";

export default function PaymentSettingForm() {
  const hasFetched = useRef(false);
  const [dataBank, setDataBank] = useState<BankPayment[]>([]);
  const [showModal, setShowModal] = useState(false);
  // const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState<boolean>(false);

  const [idEditData, setIdEditData] = useState("");
  const [idDeleteData, setIdDeleteData] = useState("");

  const allMethodPayments = useCallback(async () => {
    const results = await getBankPayments();

    if (results.success) {
      setDataBank(results.responseObject);
      if (!hasFetched.current) {
        toast.success(results.message, {
          style: { marginTop: "10vh", zIndex: 100000 },
        });
      }
    } else {
      if (!hasFetched.current) {
        toast.error("Gagal Mendapatkan Metode Pembayaran", {
          style: { marginTop: "10vh", zIndex: 100000 },
        });
      }
      console.error(results.message, {
        style: { marginTop: "10vh", zIndex: 100000 },
      });
    }
    hasFetched.current = true;
  }, []);
  useEffect(() => {
    allMethodPayments();
  }, [allMethodPayments]);

  return (
    <div className="flex gap-8 max-md:flex-col">
      <Toaster />
      {/* For Description */}
      <div className="text-start max-w-full md:max-w-60">
        <h2 className="font-bold">Rekening Bank</h2>
        <p className="text-justify mt-3">
          Tambahkan data rekening bank untuk digunakan pada pilihan pembayaran
          di form order
        </p>
        <Button className="w-full mt-4" onClick={() => setShowModal(true)}>
          Tambah Bank
        </Button>
      </div>

      {/* For Card Back */}
      <div className="grid grid-cols-2 max-md:grid-cols-1 gap-6 flex-1">
        {dataBank.map((val, index) => (
          <CardBank
            key={index}
            titleBank={val.bankName ? val.bankName : ""}
            rekeningNumber={val.accountNumber}
            userBank={val.name}
            setStateEdit={() => {
              setShowModal(true);
              setIdEditData(val.id);
            }}
            setDelete={() => {
              setIsDelete(true);
              setIdDeleteData(val.id);
            }}
          />
        ))}
      </div>
      {showModal && (
        <BankModalForm
          changeModal={() => setShowModal(false)}
          refreshData={allMethodPayments}
          id={idEditData}
        />
      )}
      {isDelete && (
        <DeleteBankModal
          id={idDeleteData}
          changeModal={() => {
            setIsDelete(false);
          }}
          refreshData={allMethodPayments}
        />
      )}
    </div>
  );
}
