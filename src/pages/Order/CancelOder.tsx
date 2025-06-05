import { useEffect, useState } from "react";
import PageMeta from "../../components/common/PageMeta";
// import CancelOrderCard from "../../components/order/card/CancelOrderCard";
// import FilterBarCancelOrder from "../../components/order/filter/FilterBarCancelOrder";
import { getOrders, OrderItem } from "../../service/order";
import OrderPageBreadcrumb from "./OrderPageBreadcrumb";
import OrderCard from "../../components/order/card/OrderCard";

export default function CancelOrderPage() {
  const [orders, setOrders] = useState<OrderItem[]>([]);
  useEffect(() => {
    async function fetchFilteredOrders() {
      const result = await getOrders();
      if (result.success && Array.isArray(result.responseObject)) {
        const filteredOrders = result.responseObject.filter(
          (order) => order.OrderDetail.paymentStatus === "CANCEL"
        );
        setOrders(filteredOrders);
      } else {
        setOrders([]);
      }
    }

    fetchFilteredOrders();
  }, []);

  return (
    <div>
      <PageMeta
        title="ALBANA GROSIR"
        description="Pusat kontrol untuk semua transaksi dan pesanan pelanggan"
      />
      <OrderPageBreadcrumb pageTitle="Cancel Order" />
      <div>{/* <FilterBarCancelOrder /> */}</div>
      <div>
        {/* <CancelOrderCard /> */}
        <OrderCard
          variant="cancel"
          orders={orders}
        />
      </div>
    </div>
  );
}
