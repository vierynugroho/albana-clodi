import EcommerceMetrics from "../../components/ecommerce/EcommerceMetrics";
import MonthlyGrossProfitChart from "../../components/ecommerce/MonthlyGrossProfitChart";
// import MonthlyTarget from "../../components/ecommerce/MonthlyTarget";
// import RecentOrders from "../../components/ecommerce/RecentOrders";
// import DemographicCard from "../../components/ecommerce/DemographicCard";
import PageMeta from "../../components/common/PageMeta";
import SliderDashboard from "../../components/Carausel/SliderDasboard.";
import SectionDasboard from "./SectionDasboard";
import ProductSoldChart from "../../components/laporan/SalesChart";
import { useEffect, useState } from "react";
import { ProductSold, ProductSolds } from "../../service/report";
import toast from "react-hot-toast";

export default function Home() {
  const [productSold, setProductSold] = useState<ProductSold | null>(null);
  const [totalProductSold, setTotalProductSold] = useState<number>(0);

  useEffect(() => {
    const fetchProductSold = async () => {
      const resultProduct = await ProductSolds();
      if (resultProduct.success && resultProduct.responseObject) {
        setProductSold(resultProduct.responseObject.produk_terjual_per_hari);
        setTotalProductSold(resultProduct.responseObject.totalProductsSold);
      } else {
        toast.error(resultProduct.message, {
          style: { marginTop: "10vh", zIndex: 100000 },
        });
      }
    };
    fetchProductSold();
  }, []);
  return (
    <>
      <PageMeta title="ALBANA GROSIR" description="Dashboard" />
      <div className="mx-2">
        <h1 className="text-3xl font-medium text-gray-800 dark:text-white/90 lg:text-3xl">
          Dashboard
        </h1>
        <hr className="my-6 border-gray-300 dark:border-gray-700" />
      </div>

      <div className="flex flex-col gap-4 y-6 lg:flex-row lg:gap-3 lg:px-2 lg:py-4">
        {/* Dashboard Section */}
        <div className="flex-1">
          <div className="mb-6 flex items-center justify-between lg:mb-8">
            <SliderDashboard />
          </div>
          <div className="grid grid-cols-12 gap-4 md:gap-6">
            <div className="col-span-12 space-y-6">
              <EcommerceMetrics />
              <MonthlyGrossProfitChart />
            </div>
            <div className="col-span-12">
              <ProductSoldChart
                productsSold={productSold}
                totalProductsSold={totalProductSold}
                year={null}
                month={null}
              />
            </div>
          </div>
        </div>

        {/* Aside Section */}
        <div className="w-full lg:w-1/3">
          <SectionDasboard />
        </div>
      </div>
    </>
  );
}
