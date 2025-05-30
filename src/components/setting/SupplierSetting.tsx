// import { useState } from "react";
import Button from "../ui/button/Button";
import { TbCirclePlus } from "react-icons/tb";
import PageMeta from "../common/PageMeta";
import TableDelivery from "./table/TableSupplier";
import { useNavigate } from "react-router";
import { useEffect, useRef, useState } from "react";
import { getSuppliers, Supplier } from "../../service/shopSetting/supplier";
import toast from "react-hot-toast";

export default function DeliverySettingForm() {
  const navigate = useNavigate();
  const hasFetched = useRef(false);
  const [deliveries, setDeliveries] = useState<Supplier[]>([]);

  useEffect(() => {
    const getAllSupplier = async () => {
      const result = await getSuppliers();
      if (result.success && result.responseObject) {
        setDeliveries(result.responseObject);
        if (!hasFetched.current) {
          toast.success(result.message, {
            style: { marginTop: "10vh", zIndex: 100000 },
          });
        } else {
          toast.error("Gagal Mendapatkan Data", {
            style: { marginTop: "10vh", zIndex: 100000 },
          });
        }
      }
    };
    hasFetched.current = true;
    getAllSupplier();
  }, []);

  return (
    <div>
      <PageMeta title="ALBANA GROSIR" description="Asal Pengiriman" />
      <div className="mx-2">
        <div className="mb-4 flex justify-end items-center">
          <Button
            className="bg-green-600 hover:bg-green-800"
            onClick={() => {
              navigate("/setting/form_supplier");
            }}
            startIcon={<TbCirclePlus className="size-5" />}
          >
            Tambah Asal Pengiriman
          </Button>
        </div>
      </div>

      <div>
        <TableDelivery
          deliveries={deliveries}
          setEditDelivery={() => {}}
          deleteDelivery={() => {}}
        />
      </div>
    </div>
  );
}
