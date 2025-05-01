import EcommerceMetrics from "../../components/ecommerce/EcommerceMetrics";
import MonthlySalesChart from "../../components/ecommerce/MonthlySalesChart";
import StatisticsChart from "../../components/ecommerce/StatisticsChart";
// import MonthlyTarget from "../../components/ecommerce/MonthlyTarget";
// import RecentOrders from "../../components/ecommerce/RecentOrders";
// import DemographicCard from "../../components/ecommerce/DemographicCard";
import PageMeta from "../../components/common/PageMeta";
import SliderDashboard from "../../components/Carausel/SliderDasboard.";

export default function Home() {
  return (
    <>
      <PageMeta title="ALBANA GROSIR" description="Dashboard" />
      <div className="flex flex-col gap-6 px-4 py-6 lg:px-8 lg:py-8">
        <div>
          <h1 className="text-2xl font-medium text-gray-800 dark:text-white/90 lg:text-3xl">
            Dashboard
          </h1>
          <hr className="my-6 border-gray-300 dark:border-gray-700" />
        </div>
        <div className="mb-6 flex items-center justify-between lg:mb-8">
          <SliderDashboard />
        </div>
        <div className="grid grid-cols-12 gap-4 md:gap-6">
          <div className="col-span-12 space-y-6 xl:col-span-7">
            <EcommerceMetrics />
            <MonthlySalesChart />
          </div>
          <div className="col-span-12">
            <StatisticsChart />
          </div>
        </div>
      </div>
      <div>
        <div className="space-y-6 mx-5">
          <div className="p-4 bg-white rounded-lg shadow dark:bg-gray-800">
            <div className="flex justify-between">
              <h3 className="text-lg font-medium text-gray-800 dark:text-white">
                Keuntungan Paket
              </h3>
              <p className="mt-2 text-xs text-gray-600 dark:text-gray-400">
                keuntungan tersedia
              </p>
            </div>
          </div>
          <div className="p-4 bg-white rounded-lg shadow dark:bg-gray-800">
            <h2 className="text-lg font-medium text-gray-800 dark:text-white">
              Another Section
            </h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Additional content for the left section.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
