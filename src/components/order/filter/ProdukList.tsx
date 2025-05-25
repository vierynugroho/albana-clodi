import { useEffect, useState } from "react";
import Input from "../../form/input/InputField.tsx";
import PrdukImage from "../../../../public/images/icons/produk_image.jpg";
import { getProducts, ArrayProduct } from "../../../service/product/index.ts";

function ProductList() {
  const [search, setSearch] = useState("");
  const [jumlah, setJumlah] = useState<number[]>([]);
  const [produk, setProduk] = useState<ArrayProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    async function fetchProduk() {
      try {
        const response = await getProducts();
        if (response.success && response.responseObject?.data) {
          setProduk(response.responseObject.data);
          setJumlah(response.responseObject.data.map(() => 1));
        } else {
          setProduk([]);
          setJumlah([]);
        }
      } catch (error) {
        console.error("Gagal mengambil data produk:", error);
        setProduk([]);
        setJumlah([]);
      } finally {
        setLoading(false);
      }
    }

    fetchProduk();
  }, []);

  // Filter produk berdasar nama
  const filteredProduk = produk.filter((p) =>
    p.product.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleJumlahChange = (index: number, delta: number) => {
    setJumlah((prev) => {
      const baru = [...prev];
      baru[index] = Math.max(1, baru[index] + delta);
      return baru;
    });
  };

  const handleTambah = (index: number) => {
    alert(
      `Menambahkan ${jumlah[index]} x ${filteredProduk[index].product.name}`
    );
  };

  // Buka dropdown kalau ada input dan produk ditemukan
  useEffect(() => {
    setDropdownOpen(search.length > 0 && filteredProduk.length > 0);
  }, [search, filteredProduk]);

  if (loading) return <p>Memuat data produk...</p>;

  return (
    <div className="mx-auto">
      <div className="relative">
        <Input
          type="text"
          placeholder="Cari produk..."
          className="w-full p-2 mb-1 border rounded"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onFocus={() => setDropdownOpen(filteredProduk.length > 0)}
          onBlur={() => {
            // Delay supaya klik di dropdown masih terbaca
            setTimeout(() => setDropdownOpen(false), 150);
          }}
        />

        {/* Dropdown list */}
        {isDropdownOpen && (
          <div className="absolute top-full mt-1 left-0 bg-white border rounded shadow w-full z-10 max-h-60 overflow-y-auto">
            {filteredProduk.map((p, index) => (
              <div
                key={p.product.id}
                className="flex items-center justify-between px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onMouseDown={(e) => e.preventDefault()} // supaya input gak blur saat klik
              >
                <img
                  src={p.variant.imageUrl || PrdukImage}
                  alt={p.product.name}
                  className="w-10 h-10 rounded object-cover"
                />
                <div className="flex-1 ml-3">
                  <div className="font-semibold">{p.product.name}</div>
                  <div className="text-sm text-gray-600">
                    Rp{p.price.normal.toLocaleString("id-ID")}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleJumlahChange(index, -1)}
                    className="px-2 bg-gray-200 rounded">
                    -
                  </button>
                  <input
                    type="text"
                    readOnly
                    className="w-8 text-center border rounded"
                    value={jumlah[index] || 1}
                  />
                  <button
                    onClick={() => handleJumlahChange(index, 1)}
                    className="px-2 bg-gray-200 rounded">
                    +
                  </button>
                </div>
                <button
                  onClick={() => handleTambah(index)}
                  className="ml-3 bg-blue-600 text-white px-3 py-1 rounded-lg">
                  + Tambahkan
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Kalau tidak ada produk */}
        {isDropdownOpen && filteredProduk.length === 0 && (
          <div className="absolute top-full mt-1 left-0 bg-white border rounded shadow w-full z-10 p-3 text-center text-gray-500">
            Tidak ada produk ditemukan.
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductList;
