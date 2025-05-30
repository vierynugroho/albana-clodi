import { JSX, useState } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import FilterSettingPage from "../../components/setting/FilterSettingPage";
import GeneralSettingForm from "../../components/setting/form/GeneralSettingForm";
import PaymentSettingForm from "../../components/setting/form/PaymentSettingForm";
import SupplierSetting from "../../components/setting/SupplierSetting";
import TableAccountSetting from "../../components/setting/table/TableAccountSetting";
import SalesChannelSetting from "../../components/setting/SalesChannelSetting";
export type Page =
  | "pengaturanUmum"
  | "payment"
  | "asalPengiriman"
  | "pengaturanAkun"
  | "selesChannel";

const PageSetting: Record<Page, { message: string; element: JSX.Element }> = {
  pengaturanUmum: {
    message: "Pengaturan Umum",
    element: <GeneralSettingForm />,
  },
  payment: {
    message: "Payment",
    element: <PaymentSettingForm />,
  },
  asalPengiriman: {
    message: "Asal Pengiriman",
    element: <SupplierSetting />,
  },
  pengaturanAkun: {
    message: "Pengaturan Akun",
    element: <TableAccountSetting />,
  },
  selesChannel: {
    message: "Seles Channel",
    element: <SalesChannelSetting />,
  },
};

export default function SettingPage() {
  const [page, setPage] = useState<Page>("pengaturanUmum");
  return (
    <div>
      <PageMeta
        title="ALBANA GROSIR"
        description="Pusat kontrol untuk semua transaksi dan pesanan pelanggan"
      />
      <PageBreadcrumb pageTitle="Setting" />

      <div className="min-h-screen rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
        <FilterSettingPage setPage={setPage} page={page} />
        <h2
          className="text-xl font-semibold text-gray-800 dark:text-white/90 mt-5 mb-5"
          x-text="pageName">
          {PageSetting[page].message}
        </h2>
        <div className="mx-auto w-full text-center mt-2">
          {PageSetting[page].element}
        </div>
      </div>
    </div>
  );
}
