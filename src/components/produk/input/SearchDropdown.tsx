import { useEffect, useRef, useState } from "react";
import { ArrayProduct, ProductNew } from "../../../service/product";
import Button from "../button/Button";
import { FaPrint } from "react-icons/fa";

type Props = {
  options: ArrayProduct[];
  label: keyof ProductNew;
  id: string | number;
  loading: boolean;
  selectedVal: string | number;
  handleChange: (value: string) => void;
};

type SelectedVariantItem = {
  imageBarcode: string;
  productName: string;
  price: number;
  sku: string;
  quantity: number;
};

export default function SearchableDropdown({
  options,
  id,
  selectedVal,
  loading,
  handleChange,
}: Props) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [selectedProductsWithQty, setSelectedProductsWithQty] = useState<
    SelectedVariantItem[]
  >([]);
  console.log(loading);
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleSelect = (option: ArrayProduct) => {
    setQuery("");
    setIsOpen(false);

    const newVariants = option.variant.map((v) => ({
      imageBarcode: v.barcode || "",
      productName: option.product.name,
      price: option.price.normal,
      sku: v.sku,
      quantity: 1,
    }));

    setSelectedProductsWithQty((prev) => {
      const existingSkus = prev.map((p) => p.sku);
      const filteredNew = newVariants.filter(
        (nv) => !existingSkus.includes(nv.sku)
      );
      return [...prev, ...filteredNew];
    });

    handleChange(option.product.name);
  };

  const updateQuantity = (index: number, newQty: number) => {
    setSelectedProductsWithQty((prev) => {
      const updated = [...prev];
      updated[index].quantity = newQty;
      return updated;
    });
  };

  const removeProduct = (index: number) => {
    setSelectedProductsWithQty((prev) => {
      const updated = [...prev];
      updated.splice(index, 1);
      return updated;
    });
  };

  const displayValue = query || selectedVal || "";

  const filteredOptions = options.filter((option) =>
    String(option.product.name).toLowerCase().includes(query.toLowerCase())
  );

  const handlePrintBarcodes = (jumlahKolom = 1, ukuranTinggi = 25) => {
    const printContent = selectedProductsWithQty
      .map((item) =>
        Array.from({ length: item.quantity })
          .map(
            () => `
          <div class="barcode-item">
            <div class="sku">Rp.${item.price}</div>
            <img src="${item.imageBarcode}" alt="${item.sku}" />                 
          </div>
        `
          )
          .join("")
      )
      .join("");

    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(`
    <html>
      <head>
        <title>Cetak Barcode</title>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            font-family: Arial, sans-serif;
            padding: 5mm;
          }
          
          .barcode-container {
            display: grid;
            grid-template-columns: repeat(${jumlahKolom}, 33mm);
            gap: 2mm;
            justify-content: start;
          }
          
          .barcode-item {
            width: 33mm;
            height: ${ukuranTinggi}mm;
            border: 1px solid #ccc;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 1mm;
            page-break-inside: avoid;
          }
          
          .sku {
            font-size: 8pt;
            font-weight: bold;
            margin-bottom: 1mm;
            text-align: center;
            line-height: 1;
          }
          
          .barcode-item img {
            width: 100%;
            height: auto;
            max-height: calc(${ukuranTinggi}mm - 8mm);
            object-fit: contain;
          }
          
          @media print {
            body {
              padding: 0;
            }
            
            .barcode-item {
              border: 1px solid #000;
            }
            
            @page {
              margin: 5mm;
              size: A4;
            }
          }
        </style>
      </head>
      <body onload="window.print(); window.close();">
        <div class="barcode-container">
          ${printContent}
        </div>
      </body>
    </html>
    `);
      printWindow.document.close();
    }
  };

  return (
    <div>
      <div className="relative cursor-default" ref={wrapperRef}>
        <div className="control">
          <input
            className="w-full px-[10px] pr-[52px] py-[8px] text-base leading-[1.5] bg-white border border-[#ccc] box-border cursor-default outline-none transition-all duration-200 ease-in-out rounded-lg dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30"
            type="text"
            placeholder="Masukkan Nama Produk"
            value={displayValue}
            name="searchTerm"
            onChange={(e) => {
              setQuery(e.target.value);
              handleChange("");
              setIsOpen(true);
            }}
            onClick={() => setIsOpen(true)}
          />
          <div
            className={`absolute top-[14px] right-[10px] mt-[0.3rem] block w-0 h-0 border-[5px] border-solid border-t-[#999] border-x-transparent border-b-0 content-['']   ${
              isOpen ? "open" : ""
            }`}
          ></div>
        </div>

        {/* ⬇️ Dropdown dipindahkan ke sini, sebelum daftar produk */}
        <div
          className={`options bg-white border border-gray-300 shadow-sm box-border mt-[-1px] max-h-[200px] overflow-y-auto absolute top-full w-full z-[1000] overflow-touch ${
            isOpen ? "open" : "hidden"
          }`}
        >
          {loading ? (
            <div className="p-2 text-center text-gray-500 dark:text-white/60">
              Loading...
            </div>
          ) : filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => (
              <div
                onClick={() => handleSelect(option)}
                className={`option box-border cursor-pointer block p-2 hover:text-[#333333] hover:bg-[#f2f9fc] dark:bg-gray-900 dark:text-white/90 ${
                  option.product.name === selectedVal
                    ? "selected bg-[#f2f9fc] text-[#333333]"
                    : ""
                }`}
                key={`${id}-${index}`}
              >
                {option.product.name}
              </div>
            ))
          ) : (
            <div className="p-2 text-center text-gray-400 dark:text-white/50">
              Tidak ada hasil
            </div>
          )}
        </div>
      </div>
      {/*  Daftar produk terpilih */}
      <div className="mt-4 space-y-2">
        {selectedProductsWithQty.map((item, index) => (
          <div
            key={`selected-${index}`}
            className="flex items-center justify-between border p-2 rounded-md bg-white shadow-sm dark:bg-gray-800 dark:text-white"
          >
            <div className="flex flex-col w-full">
              <span className="font-semibold">{item.productName}</span>
              <span className="text-sm text-gray-500 dark:text-white/70">
                SKU: {item.sku}
              </span>
              <span className="text-sm">
                Rp {item.price.toLocaleString("id-ID")}
              </span>
            </div>

            <input
              type="number"
              min={1}
              value={item.quantity}
              onChange={(e) => updateQuantity(index, parseInt(e.target.value))}
              className="w-20 px-2 py-1 ml-4 border rounded-md text-right dark:bg-gray-700"
            />

            <button
              onClick={() => removeProduct(index)}
              className="ml-2 text-red-500 hover:text-red-700 font-semibold"
              title="Hapus produk"
            >
              ❌
            </button>
          </div>
        ))}
      </div>
      <Button
        disabled={selectedProductsWithQty.length === 0}
        className="mt-4"
        onClick={() => handlePrintBarcodes()}
      >
        Cetak Barcode
        <FaPrint size={25} />
      </Button>
    </div>
  );
}
