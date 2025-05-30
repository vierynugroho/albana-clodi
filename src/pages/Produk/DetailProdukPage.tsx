import { useEffect, useRef, useState } from "react";
import PageMeta from "../../components/common/PageMeta";
import DetailProduct from "../../components/produk/detailProduct/DetailProduct";
import DetailVariant from "../../components/produk/detailProduct/DetailVariant";
import ProdukPageBreadcrumb from "../../components/produk/ProdukPageBreadcrumb";
import { getDetailProduct, ResponseDetailProduk } from "../../service/product";
import { useParams } from "react-router";
import toast, { Toaster } from "react-hot-toast";
export default function DetailProduCtPage() {
  const { id } = useParams();
  const hasFetched = useRef(false);
  const [productDetail, setProductDetail] = useState<ResponseDetailProduk>();

  useEffect(() => {
    async function fetchDetailProduct() {
      if (id) {
        const result = await getDetailProduct(id);
        console.log(result);

        if (!hasFetched.current) {
          if (result.success && result.responseObject) {
            setProductDetail(result.responseObject);
            toast.success(result.message, {
              style: { marginTop: "10vh", zIndex: 100000 },
            });
          } else {
            toast.error(result.message, {
              style: { marginTop: "10vh", zIndex: 100000 },
            });
          }
          hasFetched.current = true;
        }
      }
    }

    fetchDetailProduct();
  }, [id]);

  return (
    <div>
      <Toaster />
      <PageMeta
        title="ALBANA GROSIR"
        description="Pusat kontrol untuk semua transaksi dan pesanan pelanggan"
      />
      <ProdukPageBreadcrumb pageTitle="Detail Produk" />
      <div className=" min-h-screen rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
        {/* For Form Produk */}

        <div className="flex-col gap-5">
          <DetailProduct productDetail={productDetail} />
          {productDetail?.productVariants.map((varian, index) => (
            <DetailVariant key={index} numberVariant={index} productVariant={varian} />
          ))}
        </div>
      </div>
    </div>
  );
}
