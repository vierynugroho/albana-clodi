import PageMeta from "../../components/common/PageMeta";
import CustomerPageBreadcrumb from "../../components/customer/CustomerPageBreadcrumb";
import FormCustomer from "../../components/customer/form/FormCustomer";

export default function CustomerFormPage() {
  return (
    <div>
      <PageMeta
        title="ALBANA GROSIR"
        description="Pusat kontrol untuk semua transaksi dan pesanan pelanggan"
      />
      <CustomerPageBreadcrumb pageTitle="Tambah Customer" />
      <div className=" min-h-screen rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
        <FormCustomer />
      </div>
    </div>
  );
}
