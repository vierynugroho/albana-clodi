import { useEffect, useState } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import Carousel from "../../components/laporan/Caraousel";
import CardReport from "../../components/laporan/card/CardReport";
import { FaLifeRing, FaPlaneDeparture } from "react-icons/fa";
import { GiMoneyStack, GiProfit, GiTakeMyMoney } from "react-icons/gi";
import { BiCalculator, BiSolidDiscount } from "react-icons/bi";
import { LuPackageOpen } from "react-icons/lu";
import StatisticsChart from "../../components/ecommerce/StatisticsSalerChart";
import RecentOrders from "../../components/ecommerce/RecentOrders";
import { getReport, type ReportAll } from "../../service/report";

export default function AllReportPage() {
  // const inputRef = useRef<HTMLInputElement>(null);
  const [report, setReport] = useState<ReportAll | null>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchReport = async () => {
      const result = await getReport();
      if (result.success && result.responseObject) {
        setReport(result.responseObject);
        setMessage(result.message);
      } else {
        setMessage(result.message);
      }
    };
    fetchReport();
  }, []);

  console.log(report);
  console.log(message);

  return (
    <div>
      <PageMeta
        title="ALBANA GROSIR"
        description="Pusat kontrol untuk semua transaksi dan pesanan pelanggan"
      />
      <PageBreadcrumb pageTitle="Laporan" />

      <div className="min-h-screen rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
        {/* <div className="lg:block mb-4">
          <form>
            <div className="relative">
              <span className="absolute -translate-y-1/2 pointer-events-none left-4 top-1/2">
                <svg
                  className="fill-gray-500 dark:fill-gray-400"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3.04175 9.37363C3.04175 5.87693 5.87711 3.04199 9.37508 3.04199C12.8731 3.04199 15.7084 5.87693 15.7084 9.37363C15.7084 12.8703 12.8731 15.7053 9.37508 15.7053C5.87711 15.7053 3.04175 12.8703 3.04175 9.37363ZM9.37508 1.54199C5.04902 1.54199 1.54175 5.04817 1.54175 9.37363C1.54175 13.6991 5.04902 17.2053 9.37508 17.2053C11.2674 17.2053 13.003 16.5344 14.357 15.4176L17.177 18.238C17.4699 18.5309 17.9448 18.5309 18.2377 18.238C18.5306 17.9451 18.5306 17.4703 18.2377 17.1774L15.418 14.3573C16.5365 13.0033 17.2084 11.2669 17.2084 9.37363C17.2084 5.04817 13.7011 1.54199 9.37508 1.54199Z"
                    fill=""
                  />
                </svg>
              </span>
              <input
                ref={inputRef}
                type="text"
                placeholder="Cari Rep"
                className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-200 bg-transparent py-2.5 pl-12 pr-14 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800  dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 xl:w-[430px]"
              />
            </div>
          </form>
        </div> */}

        <Carousel>
          {/* Slide 1 */}
          <div className="py-3 mr-5">
            <div className="grid gap-6 md:grid-cols-4">
              <CardReport
                icon={<FaLifeRing size={30} />}
                title="Penjualan Kotor"
                result={`Rp ${
                  report?.reportOrders?.penjualan_kotor.toLocaleString(
                    "id-ID"
                  ) ?? 0
                }`}
                iconColor="bg-brand-100 text-brand-600"
              />
              <CardReport
                icon={<GiProfit size={30} />}
                title="Laba Kotor"
                result={`Rp ${
                  report?.reportOrders?.laba_kotor.toLocaleString("id-ID") ?? 0
                }`}
                iconColor="bg-green-100 text-green-600"
              />
              <CardReport
                icon={<GiTakeMyMoney size={30} />}
                title="Penjualan Bersih"
                result={`Rp ${
                  report?.reportOrders?.penjualan_bersih.toLocaleString(
                    "id-ID"
                  ) ?? 0
                }`}
                iconColor="bg-amber-100 text-amber-600"
              />
              <CardReport
                icon={<GiMoneyStack size={30} />}
                title="Laba Bersih"
                result={`Rp ${
                  report?.reportOrders?.laba_kotor.toLocaleString("id-ID") ?? 0
                }`}
                iconColor="bg-yellow-100 text-yellow-600"
              />
              <CardReport
                icon={<BiCalculator size={30} />}
                title="Pengeluaran"
                result={`Rp ${
                  report?.reportExpenses?.totalExpenses.toLocaleString(
                    "id-ID"
                  ) ?? 0
                }`}
                iconColor="bg-red-100 text-red-600"
              />
              {/* Row 2 */}
              <CardReport
                icon={<BiSolidDiscount size={30} />}
                title="Total Item Terjual"
                result={`${report?.reportOrders?.total_item_terjual ?? 0}`}
                iconColor="bg-red-100 text-red-600"
              />
              <CardReport
                icon={<LuPackageOpen size={30} />}
                title="Total Order"
                result={`${report?.reportOrders?.total_orders ?? 0}`}
                iconColor="bg-cyan-100 text-cyan-600"
              />
              <CardReport
                icon={<FaPlaneDeparture size={30} />}
                title="Biaya Lain"
                result={`${report?.reportOrders?.total_transactions ?? 0}`}
                iconColor="bg-blue-100 text-blue-600"
              />
            </div>
          </div>

          {/* Slide 2 */}
          <div className="py-3">
            <div className="grid gap-6 md:grid-cols-4">
              <CardReport
                icon={<LuPackageOpen size={30} />}
                title="Ongkir"
                result="Rp 1.052.000"
                iconColor="bg-cyan-100 text-cyan-600"
              />
              <CardReport
                icon={<BiCalculator size={30} />}
                title="Pengeluaran"
                result={`Rp ${
                  report?.reportExpenses?.totalExpenses.toLocaleString(
                    "id-ID"
                  ) ?? 0
                }`}
                iconColor="bg-red-100 text-red-600"
              />
              <CardReport
                icon={<FaPlaneDeparture size={30} />}
                title="Biaya Lain"
                result="Rp 1.052.000"
                iconColor="bg-blue-100 text-blue-600"
              />
            </div>
          </div>
        </Carousel>

        <div className="grid grid-cols-12 gap-4 md:gap-6 mt-10">
          <div className="col-span-12">
            <StatisticsChart />
          </div>
          <div className="col-span-12">
            <StatisticsChart />
          </div>
          <div className="col-span-12 xl:col-span-7">
            <RecentOrders />
          </div>
        </div>
      </div>
    </div>
  );
}
