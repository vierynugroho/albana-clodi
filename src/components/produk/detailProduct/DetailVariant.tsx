import { ProductVariant } from "../../../service/product";

type PropsDetailVariant = {
  numberVariant: number;
  productVariant: ProductVariant;
};
export default function DetailVariant({
  numberVariant,
  productVariant,
}: PropsDetailVariant) {
  return (
    <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6 mt-5">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
            Variant {numberVariant + 1}
          </h4>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-5 lg:gap-7 2xl:gap-x-32">
            <div className="dz-message flex flex-col items-center m-0!">
              {/* Icon Container */}
              <div className="flex justify-center">
                <div
                  className={`flex h-[168px] w-[168px] items-center justify-center overflow-hidden ${
                    productVariant.imageUrl ? "" : "rounded-2xl bg-gray-200"
                  } text-gray-700 dark:bg-gray-800 dark:text-gray-400`}
                >
                  <img
                    src={
                      productVariant.imageUrl
                        ? String(productVariant.imageUrl)
                        : "/images/icons/empty_box.svg"
                    }
                    alt="Default"
                    className="h-[68px] w-[98px]  opacity-60"
                  />
                </div>
              </div>
            </div>
            <div>
              <div>
                <h2 className="text-gray-500 dark:text-gray-400">SKU</h2>
                <h2 className="mb-2 font-bold text-balance leading-normal ">
                  {productVariant.sku}
                </h2>
              </div>
              <div>
                <h2 className="text-gray-500 dark:text-gray-400">Total Stok</h2>
                <h2 className="mb-2 font-bold text-balance leading-normal ">
                  {productVariant.stock}
                </h2>
              </div>
              <div>
                <h2 className="text-gray-500 dark:text-gray-400">
                  Barcode produk
                </h2>
                {productVariant.barcode ? (
                  <img
                    src={productVariant.barcode}
                    alt="Barcode"
                    className="h-10"
                  />
                ) : (
                  <h2 className="font-bold text-balance">-</h2>
                )}
              </div>
            </div>
            {/* Harga Jual */}
            <div>
              <div>
                <h2 className="text-gray-500 dark:text-gray-400">Harga Beli</h2>
                <h2 className="mb-2 font-bold text-balance leading-normal ">
                  Rp {productVariant.productPrices.buy.toLocaleString("IND")}
                </h2>
              </div>
              <div>
                <h2 className="text-gray-500 dark:text-gray-400">Harga Jual</h2>
                <h2 className="mb-2 font-bold text-balance leading-normal ">
                  Rp {productVariant.productPrices.normal.toLocaleString("IND")}
                </h2>
              </div>
              <div>
                <h2 className="text-gray-500 dark:text-gray-400">
                  Harga Member
                </h2>
                <h2 className="mb-2 font-bold text-balance leading-normal ">
                  Rp {productVariant.productPrices.member.toLocaleString("IND")}
                </h2>
              </div>
              <div>
                <h2 className="text-gray-500 dark:text-gray-400">
                  Harga Reseller{" "}
                </h2>
                <h2 className="mb-2 font-bold text-balance leading-normal ">
                  Rp{" "}
                  {productVariant.productPrices.reseller.toLocaleString("IND")}
                </h2>
              </div>
              <div>
                <h2 className="text-gray-500 dark:text-gray-400">Harga Agen</h2>
                <h2 className="mb-2 font-bold text-balance leading-normal ">
                  Rp {productVariant.productPrices.agent.toLocaleString("IND")}
                </h2>
              </div>
            </div>

            {/* Ukuran Dan Warna */}
            <div>
              <div>
                <h2 className="text-gray-500 dark:text-gray-400">Ukuran</h2>
                <h2 className="mb-2 font-bold text-balance leading-normal ">
                  {productVariant.size ? productVariant.size : "-"}
                </h2>
              </div>
              <div>
                <h2 className="text-gray-500 dark:text-gray-400">Warna</h2>
                <h2 className="mb-2 font-bold text-balance leading-normal ">
                  {productVariant.color ? productVariant.color : "-"}
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
