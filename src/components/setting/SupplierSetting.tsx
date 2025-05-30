// import { useState } from "react";
import Button from "../ui/button/Button";
import { TbCirclePlus } from "react-icons/tb";
import PageMeta from "../common/PageMeta";
import TableDelivery from "./table/TableSupplier";
import { useNavigate } from "react-router";

export default function DeliverySettingForm() {
  const navigate = useNavigate();

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
            startIcon={<TbCirclePlus className="size-5" />}>
            Tambah Pengeluaran
          </Button>
        </div>
      </div>

      <div>
        <TableDelivery
          deliveries={[]}
          setEditDelivery={() => {}}
          deleteDelivery={() => {}}
        />
      </div>
    </div>
  );
}
